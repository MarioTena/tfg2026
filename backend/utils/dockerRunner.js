const { spawn } = require("child_process");

const DEFAULT_TIMEOUT_MS = 10000;

function validateUserCode(code) {
  if (!code || typeof code !== "string") {
    return "No hay código para ejecutar.";
  }

  if (code.length > 5000) {
    return "El código es demasiado largo para este entorno de práctica.";
  }

  const forbiddenPatterns = [
    /import\s+os\b/,
    /from\s+os\s+import\b/,
    /import\s+subprocess\b/,
    /from\s+subprocess\s+import\b/,
    /import\s+socket\b/,
    /from\s+socket\s+import\b/,
    /import\s+shutil\b/,
    /from\s+shutil\s+import\b/,
    /exec\s*\(/,
    /eval\s*\(/,
    /compile\s*\(/,
    /__import__/,
    /globals\s*\(/,
    /locals\s*\(/,
    /vars\s*\(/,
  ];

  for (const pattern of forbiddenPatterns) {
    if (pattern.test(code)) {
      return "Este código usa instrucciones no permitidas en el entorno de práctica.";
    }
  }

  return null;
}

function runPython(code, stdinData = "", timeoutMs = DEFAULT_TIMEOUT_MS) {
  return new Promise((resolve) => {
    const validationError = validateUserCode(code);

    if (validationError) {
      return resolve({
        stdout: "",
        stderr: validationError,
        status: "error",
        timeMs: 0,
      });
    }

    let stdout = "";
    let stderr = "";
    let finished = false;
    const start = Date.now();

    const proc = spawn("python3", ["-c", code], {
      stdio: ["pipe", "pipe", "pipe"],
      env: {
        PATH: process.env.PATH,
        PYTHONIOENCODING: "utf-8",
      },
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
        stderr: `Error al lanzar Python: ${err.message}`,
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
        stderr: `Error enviando stdin a Python: ${err.message}`,
        status: "error",
        timeMs,
      });
    }
  });
}

async function runCodeInDocker(language, code, stdin = "") {
  if (language !== "python") {
    return {
      stdout: "",
      stderr: `Lenguaje no soportado: ${language}`,
      status: "error",
      timeMs: 0,
    };
  }

  return runPython(code, stdin);
}

module.exports = { runCodeInDocker, validateUserCode };