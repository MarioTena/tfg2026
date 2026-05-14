const { spawn } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { randomUUID } = require("crypto");
const Attempt = require("../models/Attempt");
const { validateUserCode } = require("./dockerRunner");

const sessions = new Map();

const MAX_SESSION_MS = 5 * 60 * 1000; // 5 minutos
const INACTIVITY_MS = 90 * 1000; // 90 segundos
const DOCKER_IMAGE_PYTHON = "python:3.11";

function mapSessionStatusToAttemptStatus(status) {
  if (status === "success") return "success";
  if (status === "timeout_total" || status === "timeout_inactive") return "timeout";
  return "error";
}

async function finalizeAttempt(session, finalStatus) {
  if (!session || !session.attemptId || session.attemptFinalized) return;

  session.attemptFinalized = true;

  try {
    const elapsedMs = Math.max(0, Date.now() - session.startedAt);

    await Attempt.findByIdAndUpdate(session.attemptId, {
      stdout: session.stdoutBuffer || "",
      stderr: session.stderrBuffer || "",
      stdin: session.stdinBuffer || "",
      status: mapSessionStatusToAttemptStatus(finalStatus),
      timeMs: elapsedMs,
    });
  } catch (error) {
    console.error("Error finalizando intento interactivo:", error.message);
  }
}

async function cleanupSession(sessionId, finalStatus = "error") {
  const session = sessions.get(sessionId);
  if (!session) return;

  try {
    if (session.timeout) clearTimeout(session.timeout);
  } catch {}

  try {
    if (session.inactivityTimeout) clearTimeout(session.inactivityTimeout);
  } catch {}

  await finalizeAttempt(session, finalStatus);

  try {
    if (session.proc && !session.finished) {
      session.proc.kill("SIGKILL");
    }
  } catch {}

  try {
    if (session.tempDir) {
      fs.rmSync(session.tempDir, { recursive: true, force: true });
    }
  } catch {}

  sessions.delete(sessionId);
}

function scheduleInactivityTimeout(session) {
  if (!session || session.finished) return;

  try {
    if (session.inactivityTimeout) {
      clearTimeout(session.inactivityTimeout);
    }
  } catch {}

  session.inactivityTimeout = setTimeout(async () => {
    if (!session.finished) {
      session.finished = true;

      session.emitToSocket("console:error", {
        sessionId: session.sessionId,
        message: "La consola se ha cerrado por inactividad.",
      });

      session.emitToSocket("console:end", {
        sessionId: session.sessionId,
        status: "timeout_inactive",
        attemptId: session.attemptId || null,
      });

      await cleanupSession(session.sessionId, "timeout_inactive");
    }
  }, INACTIVITY_MS);
}

function buildInteractiveDockerArgs(tempDir) {
  return [
    "run",
    "--rm",
    "-i",
    "--network",
    "none",
    "--memory",
    "128m",
    "--cpus",
    "0.5",
    "--pids-limit",
    "64",
    "-v",
    `${tempDir}:/app:ro`,
    "--tmpfs",
    "/tmp:rw,noexec,nosuid,size=16m",
    DOCKER_IMAGE_PYTHON,
    "python",
    "/app/main.py",
  ];
}

async function startInteractivePythonSession({
  code,
  userId,
  socket,
  io,
  language = "python",
  exerciseId = null,
  topic = null,
}) {
  const sessionId = randomUUID();
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "tfg-python-"));
  const scriptPath = path.join(tempDir, "main.py");

  fs.writeFileSync(scriptPath, code, "utf8");

  const dockerArgs = buildInteractiveDockerArgs(tempDir);

  const proc = spawn("docker", dockerArgs, {
    stdio: ["pipe", "pipe", "pipe"],
  });

  const attempt = await Attempt.create({
    userId,
    language,
    topic: topic || null,
    exerciseId: exerciseId || null,
    code,
    stdin: "",
    stdout: "",
    stderr: "",
    status: "error",
    timeMs: 0,
  });

  const emitToSocket = (event, payload) => {
    io.to(socket.id).emit(event, payload);
  };

  const session = {
    sessionId,
    userId,
    socketId: socket.id,
    proc,
    tempDir,
    finished: false,
    startedAt: Date.now(),
    lastActivityAt: Date.now(),
    timeout: null,
    inactivityTimeout: null,
    emitToSocket,
    attemptId: attempt._id,
    attemptFinalized: false,
    stdoutBuffer: "",
    stderrBuffer: "",
    stdinBuffer: "",
  };

  sessions.set(sessionId, session);

  proc.stdout.on("data", (chunk) => {
    const text = chunk.toString();

    session.lastActivityAt = Date.now();
    session.stdoutBuffer += text;
    scheduleInactivityTimeout(session);

    emitToSocket("console:output", {
      sessionId,
      stream: "stdout",
      text,
    });
  });

  proc.stderr.on("data", (chunk) => {
    const text = chunk.toString();

    session.lastActivityAt = Date.now();
    session.stderrBuffer += text;
    scheduleInactivityTimeout(session);

    emitToSocket("console:output", {
      sessionId,
      stream: "stderr",
      text,
    });
  });

  proc.on("error", async (error) => {
    session.finished = true;
    session.stderrBuffer += `\nError lanzando proceso: ${error.message}`;

    emitToSocket("console:error", {
      sessionId,
      message: `Error lanzando proceso: ${error.message}`,
    });

    emitToSocket("console:end", {
      sessionId,
      status: "error",
      attemptId: session.attemptId || null,
    });

    await cleanupSession(sessionId, "error");
  });

  proc.on("close", async (code, signal) => {
    if (session.finished) return;

    session.finished = true;
    const finalStatus = code === 0 ? "success" : "error";

    if (signal) {
      session.stderrBuffer += `\nProceso terminado por señal: ${signal}`;
    }

    emitToSocket("console:end", {
      sessionId,
      status: finalStatus,
      exitCode: code,
      signal: signal || null,
      attemptId: session.attemptId || null,
    });

    await cleanupSession(sessionId, finalStatus);
  });

  session.timeout = setTimeout(async () => {
    if (!session.finished) {
      session.finished = true;
      session.stderrBuffer += "\nLa sesión interactiva ha alcanzado el tiempo máximo permitido.";

      emitToSocket("console:error", {
        sessionId,
        message: "La sesión interactiva ha alcanzado el tiempo máximo permitido.",
      });

      emitToSocket("console:end", {
        sessionId,
        status: "timeout_total",
        attemptId: session.attemptId || null,
      });

      await cleanupSession(sessionId, "timeout_total");
    }
  }, MAX_SESSION_MS);

  scheduleInactivityTimeout(session);

  return {
    sessionId,
    attemptId: attempt._id,
  };
}

function sendInputToSession({ sessionId, input, userId }) {
  const session = sessions.get(sessionId);

  if (!session) {
    throw new Error("Sesión no encontrada");
  }

  if (session.userId !== userId) {
    throw new Error("No autorizado para esta sesión");
  }

  if (session.finished) {
    throw new Error("La sesión ya ha terminado");
  }

  session.lastActivityAt = Date.now();
  session.stdinBuffer += `${input}\n`;
  scheduleInactivityTimeout(session);
  session.proc.stdin.write(`${input}\n`);
}

async function stopSession({ sessionId, userId }) {
  const session = sessions.get(sessionId);

  if (!session) return;
  if (session.userId !== userId) return;
  if (session.finished) return;

  session.finished = true;
  session.stderrBuffer += "\nLa sesión fue detenida por el usuario.";

  session.emitToSocket("console:end", {
    sessionId,
    status: "stopped",
    attemptId: session.attemptId || null,
  });

  await cleanupSession(sessionId, "error");
}

async function stopAllUserSessions(userId) {
  const pending = [];

  for (const [sessionId, session] of sessions.entries()) {
    if (session.userId === userId) {
      session.finished = true;
      session.stderrBuffer += "\nLa sesión fue cerrada por desconexión del usuario.";
      pending.push(cleanupSession(sessionId, "error"));
    }
  }

  await Promise.allSettled(pending);
}

module.exports = {
  startInteractivePythonSession,
  sendInputToSession,
  stopSession,
  stopAllUserSessions,
};