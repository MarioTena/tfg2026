// ============================================================================
// dockerRunner.js
// ----------------------------------------------------------------------------
// Ejecución de código en Docker.
// - Python: ejecución real en contenedor python:3.11
// - C: de momento simulado
// - Soporte para stdin en Python
// ============================================================================

const { spawn } = require("child_process");

// Ejecuta un contenedor Docker
function runDockerCommand(image, extraArgs, stdinData = "", timeoutMs = 15000) {
  return new Promise((resolve) => {
    let stdout = "";
    let stderr = "";
    let finished = false;
    const start = Date.now();

    const args = ["run", "--rm", "-i", image, ...extraArgs];
    const proc = spawn("docker", args, {
      stdio: ["pipe", "pipe", "pipe"],
    });

    proc.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    proc.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    proc.on("error", (err) => {
      if (finished) return;
      finished = true;
      const timeMs = Date.now() - start;
      resolve({
        stdout,
        stderr: "Error al lanzar Docker: " + err.message,
        status: "error",
        timeMs,
      });
    });

    const timeout = setTimeout(() => {
      if (finished) return;
      finished = true;
      proc.kill("SIGKILL");
      const timeMs = Date.now() - start;
      resolve({
        stdout,
        stderr: (stderr || "") + "\nTiempo de ejecución excedido.",
        status: "timeout",
        timeMs,
      });
    }, timeoutMs);

    proc.on("close", (exitCode) => {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);
      const timeMs = Date.now() - start;

      const status = exitCode === 0 ? "success" : "error";
      resolve({ stdout, stderr, status, timeMs });
    });

    proc.stdin.write(stdinData || "");
    proc.stdin.end();
  });
}

// ============================================================================
// Python: ejecución real en contenedor python:3.11
// Usa python -c <code> para dejar stdin libre para input()
// ============================================================================
async function runPythonInDocker(code, stdin = "") {
  return runDockerCommand(
    "python:3.11",
    ["python", "-c", code],
    stdin,
    10000
  );
}

// ============================================================================
// C: de momento simulado
// ============================================================================
async function runCInDockerSimulado(code) {
  let stdout = "";
  let stderr = "";
  let status = "success";
  const start = Date.now();

  if (code.toLowerCase().includes("error")) {
    status = "error";
    stderr = "Simulación C: error detectado en el código.";
  } else {
    stdout = "Simulación C: ejecución completada correctamente.";
  }

  const timeMs = Date.now() - start;
  return { stdout, stderr, status, timeMs };
}

// ============================================================================
// Función principal usada por server.js
// ============================================================================
async function runCodeInDocker(language, code, stdin = "") {
  if (language === "python") {
    return runPythonInDocker(code, stdin);
  }

  if (language === "c") {
    return runCInDockerSimulado(code);
  }

  return {
    stdout: "",
    stderr: `Lenguaje no soportado: ${language}`,
    status: "error",
    timeMs: 0,
  };
}

module.exports = { runCodeInDocker };