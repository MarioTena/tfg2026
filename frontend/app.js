// ============================================================================
// app.js
// Lógica del playground: coge los datos del formulario,
// llama a /api/run y pinta la salida en la parte derecha.
// ============================================================================

const API_URL = "http://localhost:3000/api/run";

// Si no hay token, no dejamos entrar al playground
(function redirectIfNotLogged() {
  const token = localStorage.getItem("token");
  if (!token) window.location.href = "../login.html";
})();

// ============================================================================
// Snippets de ejemplo para precargar ejercicios
// Cada clave es un id que se pasa por la URL (?snippet=...)
// IMPORTANTE: aquí van plantillas, no las soluciones completas.
// ============================================================================
const SNIPPETS = {
  // Tema 1 (Python) – Ejercicio 1 (Hola mundo)
  py_tema1_ej1: `# Escribe un programa que imprima exactamente:\n# Hola mundo desde TFG\n`,

  // Tema 1 (Python) – Ejercicio 2 (Operaciones básicas)
  py_tema1_ej2: `# Crea dos variables a y b con valores 7 y 4\n# y muestra la suma, la resta y el producto.\n\na = ___\nb = ___\n\n# Escribe aquí los prints con las operaciones`,

  // Tema 1 (Python) – Ejercicio 3 (Nombre del alumno)
  py_tema1_ej3: `# Define una variable 'nombre' con tu nombre\n# y muestra un mensaje del estilo: Me llamo Mario\n\nnombre = ___\n\n# Completa el print\nprint("Me llamo", nombre)`,

  // Tema 1 (Python) – Ejercicio 4 (Error intencional)
  // Aquí sí va código "completo" porque el objetivo es aprender del error.
  py_tema1_ej4: `# Ejecuta este código y observa el error que aparece\nx = 5\ny = z + 1\nprint(x + y)`,
};

// ============================================================================
// Referencias a elementos del DOM
// ============================================================================
const userInput = document.getElementById("user");
const languageSelect = document.getElementById("language");
const codeInput = document.getElementById("code");
const runButton = document.getElementById("run-btn");
const statusMsg = document.getElementById("status-msg");

const stdoutEl = document.getElementById("stdout");
const stderrEl = document.getElementById("stderr");
const runStatusEl = document.getElementById("run-status");
const runTimeEl = document.getElementById("run-time");
const attemptsListEl = document.getElementById("attempts-list");
const feedbackEl = document.getElementById("feedback");

// ============================================================================
// Función para limpiar la salida antes de una nueva ejecución
// ============================================================================
function resetOutput() {
  stdoutEl.textContent = "";
  stderrEl.textContent = "";
  runStatusEl.textContent = "-";
  runTimeEl.textContent = "-";
  statusMsg.textContent = "";

  if (feedbackEl) {
    feedbackEl.textContent = "";
  }
}

// ============================================================================
// Carga código inicial desde la URL (snippet + lenguaje)
// Ejemplo de URL:
//   index.html?lang=python&snippet=py_tema1_ej1
// ============================================================================
function loadSnippetFromURL() {
  const params = new URLSearchParams(window.location.search);
  const snippetId = params.get("snippet");
  const lang = params.get("lang");

  // Si viene ?lang=python o similar, lo aplico
  if (lang) {
    languageSelect.value = lang;
  }

  // Si viene un snippet conocido, relleno el textarea
  if (snippetId && SNIPPETS[snippetId]) {
    codeInput.value = SNIPPETS[snippetId];
  }
}


// ============================================================================
// Carga el historial de intentos desde el backend y lo pinta en la lista
// (ahora viene del usuario autenticado por JWT)
// ============================================================================
async function loadAttempts() {
  const url = `http://localhost:3000/api/attempts?limit=5`;

  // Si no hay token, lo mostramos claro (en vez de intentar llamar y fallar)
  const token = localStorage.getItem("token");
  attemptsListEl.innerHTML = "";

  if (!token) {
    const li = document.createElement("li");
    li.textContent = "Necesitas hacer login para ver el historial.";
    attemptsListEl.appendChild(li);
    return;
  }

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Si el token no vale (caducado / inválido)
    if (res.status === 401) {
      const li = document.createElement("li");
      li.textContent = "Sesión caducada o token inválido. Vuelve a hacer login.";
      attemptsListEl.appendChild(li);
      return;
    }

    // Intentamos parsear JSON de forma segura
    let data = null;
    try {
      data = await res.json();
    } catch {
      const li = document.createElement("li");
      li.textContent = "Respuesta inválida del servidor (no es JSON).";
      attemptsListEl.appendChild(li);
      return;
    }

    if (!res.ok || !data.ok) {
      const li = document.createElement("li");
      li.textContent = data?.error || "No se ha podido cargar el historial.";
      attemptsListEl.appendChild(li);
      return;
    }

    if (!data.items || !data.items.length) {
      const li = document.createElement("li");
      li.textContent = "Sin intentos todavía.";
      attemptsListEl.appendChild(li);
      return;
    }

    data.items.forEach((attempt) => {
      const li = document.createElement("li");

      const statusClassMap = {
        success: "attempt-status-success",
        error: "attempt-status-error",
        timeout: "attempt-status-timeout",
      };

      const statusClass = statusClassMap[attempt.status] || "attempt-status-error";

      const when = attempt.createdAt
        ? new Date(attempt.createdAt).toLocaleString()
        : "";

      li.innerHTML = `
        <span>[${attempt.language}]</span>
        &nbsp;
        <span class="${statusClass}">${attempt.status}</span>
        &nbsp;
        <span>(${attempt.timeMs ?? "-"} ms)</span>
        &nbsp;
        <span>${when}</span>
      `;

      attemptsListEl.appendChild(li);
    });
  } catch (err) {
    console.error("Error cargando historial:", err);
    const li = document.createElement("li");
    li.textContent = "Error de conexión al cargar el historial.";
    attemptsListEl.appendChild(li);
  }
}



// ============================================================================
// Función principal: envía el código al backend y procesa la respuesta
// ============================================================================
async function runCode() {
  resetOutput();

  const user = userInput.value.trim() || "alumno1";
  const language = languageSelect.value;
  const code = codeInput.value;

  if (!code.trim()) {
    statusMsg.textContent = "Escribe algún código antes de ejecutar.";
    return;
  }

  // Mensaje de estado mientras se ejecuta
  statusMsg.textContent = "Ejecutando código...";
  runButton.disabled = true;

  try {
    const body = { language, code };

    const response = await fetch(API_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
  },
  body: JSON.stringify(body),
});


    const data = await response.json();

    if (!response.ok || !data.ok) {
      statusMsg.textContent = data.error || "Error al ejecutar el código.";
      runStatusEl.textContent = "error";
      return;
    }

    // Pinto la salida que viene de /api/run
    const run = data.run || {};

    stdoutEl.textContent = run.stdout || "";
    stderrEl.textContent = run.stderr || "";
    runStatusEl.textContent = run.status || "-";
    runTimeEl.textContent =
      typeof run.timeMs === "number" ? `${run.timeMs} ms` : "-";

      // Feedback automático devuelto por el backend
    if (feedbackEl) {
      const fb = data.feedback;
      feedbackEl.textContent = fb && fb.message ? fb.message : "";
    }

    // Actualizo el historial de intentos
    await loadAttempts();

    // Mensaje general de estado
    if (run.status === "success") {
      statusMsg.textContent = "Ejecución completada correctamente.";
    } else if (run.status === "timeout") {
      statusMsg.textContent = "La ejecución ha superado el tiempo límite.";
    } else {
      statusMsg.textContent = "La ejecución ha devuelto un error.";
    }
  } catch (err) {
    console.error("Error llamando a /api/run:", err);
    statusMsg.textContent = "No se ha podido conectar con la API.";
    runStatusEl.textContent = "error";
  } finally {
    runButton.disabled = false;
  }
}

const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "../login.html";
  });
}

// ============================================================================
// Evento del botón Ejecutar + carga inicial
// ============================================================================

// Botón ejecutar
runButton.addEventListener("click", () => {
  runCode();
});

// Primero miro si viene algún snippet por la URL (ejercicios)
loadSnippetFromURL();

// Luego cargo el historial inicial
loadAttempts();
