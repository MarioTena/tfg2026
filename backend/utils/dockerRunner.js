// ============================================================================
// dockerRunner.js
// ----------------------------------------------------------------------------
// Ejecución de código en Docker.
// - Python: ejecución real en contenedor python:3.11
// - Soporte para stdin
// ============================================================================

const { spawn } = require("child_process");

const DOCKER_IMAGE_PYTHON = "python:3.11";
const DEFAULT_TIMEOUT_MS = 10000;

function buildSafeDockerArgs(image, extraArgs = []) {
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
    "--read-only",
    "--tmpfs",
    "/tmp:rw,noexec,nosuid,size=16m",
    image,
    ...extraArgs,
  ];
}

function runDockerCommand(image, extraArgs, stdinData = "", timeoutMs = DEFAULT_TIMEOUT_MS) {
  return new Promise((resolve) => {
    let stdout = "";
    let stderr = "";
    let finished = false;
    const start = Date.now();

    const args = buildSafeDockerArgs(image, extraArgs);
    const proc = spawn("docker", args, {
      stdio: ["pipe", "pipe", "pipe"],
    });

    const finalize = (result) => {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);
      resolve(result);
    };

    proc.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    proc.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    proc.on("error", (err) => {
      const timeMs = Date.now() - start;
      finalize({
        stdout,
        stderr: `Error al lanzar Docker: ${err.message}`,
        status: "error",
        timeMs,
      });
    });

    const timeout = setTimeout(() => {
      try {
        proc.kill("SIGKILL");
      } catch {}

      const timeMs = Date.now() - start;
      finalize({
        stdout,
        stderr: `${stderr || ""}\nTiempo de ejecución excedido.`.trim(),
        status: "timeout",
        timeMs,
      });
    }, timeoutMs);

    proc.on("close", (exitCode) => {
      const timeMs = Date.now() - start;
      const status = exitCode === 0 ? "success" : "error";

      finalize({
        stdout,
        stderr,
        status,
        timeMs,
      });
    });

    try {
      proc.stdin.write(stdinData || "");
      proc.stdin.end();
    } catch (err) {
      const timeMs = Date.now() - start;
      finalize({
        stdout,
        stderr: `Error enviando stdin al contenedor: ${err.message}`,
        status: "error",
        timeMs,
      });
    }
  });
}

// ============================================================================
// Python: ejecución real en contenedor python:3.11
// Usa python -c <code> para dejar stdin libre para input()
// ============================================================================
async function runPythonInDocker(code, stdin = "") {
  return runDockerCommand(
    DOCKER_IMAGE_PYTHON,
    ["python", "-c", code],
    stdin,
    DEFAULT_TIMEOUT_MS
  );
}

// ============================================================================
// Función principal usada por server.js
// ============================================================================
async function runCodeInDocker(language, code, stdin = "") {
  if (language !== "python") {
    return {
      stdout: "",
      stderr: `Lenguaje no soportado: ${language}`,
      status: "error",
      timeMs: 0,
    };
  }

  return runPythonInDocker(code, stdin);
}

module.exports = { runCodeInDocker };