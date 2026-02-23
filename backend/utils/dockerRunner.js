// ============================================================================
// dockerRunner.js
// ----------------------------------------------------------------------------
// Ejecución de código en Docker.
// - Python: ejecución real en contenedor python:3.11
// - C: de momento simulado (mismo formato de salida)
// ============================================================================

const { spawn } = require("child_process");

// Ejecuta un contenedor Docker y pasa el código por stdin
function runDockerCommand(image, extraArgs, code, timeoutMs = 15000) {
  return new Promise((resolve) => {
    let stdout = "";
    let stderr = "";
    let finished = false;
    const start = Date.now();

    // Comando: docker run --rm -i <image> ...extraArgs
    const args = ["run", "--rm", "-i", image, ...extraArgs];
    const proc = spawn("docker", args, {
      stdio: ["pipe", "pipe", "pipe"],
    });

    // Acumulo salida estándar
    proc.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    // Acumulo errores
    proc.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    // Por si Docker no arranca o no está en PATH
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

    // Timeout para evitar que se quede colgado
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

    // Cuando el proceso termina
    proc.on("close", (exitCode) => {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);
      const timeMs = Date.now() - start;

      const status = exitCode === 0 ? "success" : "error";
      resolve({ stdout, stderr, status, timeMs });
    });

    // Envío el código al contenedor por stdin
    proc.stdin.write(code);
    proc.stdin.end();
  });
}

// ============================================================================
// Python: ejecución real en contenedor python:3.11
// Usa: docker run --rm -i python:3.11 python -
// ============================================================================
async function runPythonInDocker(code) {
  // python -  => lee el código desde stdin
  return runDockerCommand("python:3.11", ["python", "-"], code, 10000);
}

// ============================================================================
// C: der momento simulado
// ============================================================================
async function runCInDockerSimulado(code) {
  let stdout = "";
  let stderr = "";
  let status = "success";
  const start = Date.now();

  // Simulación sencilla para C
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
async function runCodeInDocker(language, code) {
  if (language === "python") {
    return runPythonInDocker(code);
  }

  if (language === "c") {
    return runCInDockerSimulado(code);
  }

  // Por si llega algún lenguaje raro
  return {
    stdout: "",
    stderr: `Lenguaje no soportado: ${language}`,
    status: "error",
    timeMs: 0,
  };
}

module.exports = { runCodeInDocker };
