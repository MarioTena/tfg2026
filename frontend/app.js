// ============================================================================
// app.js
// Playground: carga ejercicio desde URL, pinta metadatos, ejecuta código,
// muestra historial y permite pedir pistas IA.
// ============================================================================

const API_URL = "http://localhost:3000/api/run";
let editor = null;
let currentExerciseId = null;
let lastAttemptId = null;
let lastRunStatus = null;
let lastHintSource = null;

let consoleSocket = null;
let interactiveSessionId = null;
let interactiveConsoleRunning = false;

let interactiveStartedAt = null;
let interactiveTimerId = null;

// Si no hay token, no dejamos entrar al playground
(function redirectIfNotLogged() {
  const token = localStorage.getItem("token");
  if (!token) window.location.href = "../login.html";
})();

// ============================================================================
// Referencias a elementos del DOM
// ============================================================================
const sessionUserNameEl = document.getElementById("session-user-name");
const fixedLanguageEl = document.getElementById("fixed-language");
const codeTextarea = document.getElementById("code");
const runButton = document.getElementById("run-btn");
const statusMsg = document.getElementById("status-msg");

const stdoutEl = document.getElementById("stdout");
const stderrEl = document.getElementById("stderr");
const runStatusEl = document.getElementById("run-status");
const runTimeEl = document.getElementById("run-time");
const attemptsListEl = document.getElementById("attempts-list");
const feedbackEl = document.getElementById("feedback");
const consoleOutputEl = document.getElementById("console-output");

const exercisePanelEl = document.getElementById("exercise-panel");
const exerciseTitleEl = document.getElementById("exercise-title");
const exerciseStatementEl = document.getElementById("exercise-statement");
const exerciseHintsEl = document.getElementById("exercise-hints");

const exerciseBadgeLangEl = document.getElementById("exercise-badge-lang");
const exerciseBadgeTypeEl = document.getElementById("exercise-badge-type");
const exerciseBadgeDifficultyEl = document.getElementById("exercise-badge-difficulty");
const exerciseBadgeTimeEl = document.getElementById("exercise-badge-time");
const exerciseBadgeSkillEl = document.getElementById("exercise-badge-skill");

const topbarSubEl = document.getElementById("topbar-sub");
const editorMetaEl = document.getElementById("editor-meta");
const editorTitleEl = document.getElementById("editor-title");
const backBtn = document.getElementById("back-btn");

const aiHintBtn = document.getElementById("ai-hint-btn");
const aiCreditsEl = document.getElementById("ai-credits");
const aiFeedbackEl = document.getElementById("ai-feedback");

const playgroundLangBadgeEl = document.getElementById("playground-lang-badge");
const playgroundModeBadgeEl = document.getElementById("playground-mode-badge");

const outputPanelEl = document.querySelector(".panel-output");

const interactiveConsoleControlsEl = document.getElementById("interactive-console-controls");
const interactiveConsoleInputEl = document.getElementById("interactive-console-input");
const sendConsoleInputBtn = document.getElementById("send-console-input-btn");
const stopConsoleBtn = document.getElementById("stop-console-btn");
const interactiveConsoleHelpEl = document.getElementById("interactive-console-help");

const stdoutBlockEl = document.getElementById("stdout-block");
const stderrBlockEl = document.getElementById("stderr-block");

// ============================================================================
// Editor
// ============================================================================
function initCodeEditor() {
  if (!codeTextarea) {
    console.error("No existe el textarea con id='code'");
    return;
  }

  if (typeof CodeMirror === "undefined") {
    console.error("CodeMirror no está cargado");
    return;
  }

  editor = CodeMirror.fromTextArea(codeTextarea, {
    mode: "python",
    theme: "material-darker",
    lineNumbers: true,
    lineWrapping: false,
    indentUnit: 4,
    tabSize: 4,
    indentWithTabs: false,
    matchBrackets: true,
    extraKeys: {
      Tab: function (cm) {
        cm.replaceSelection("    ", "end");
      },
      "Ctrl-Space": "autocomplete",
    },
  });

editor.on("change", () => {
  if (lastAttemptId && statusMsg) {
    statusMsg.textContent =
      "Has modificado el código. Ejecuta de nuevo para pedir una pista sobre la versión actual.";
    return;
  }

  if (statusMsg && !interactiveConsoleRunning) {
    statusMsg.textContent = "Listo para practicar.";
  }
});
  editor.setSize("100%", 500);
}

function setEditorCode(code) {
  if (editor) {
    editor.setValue(code || "");
  } else if (codeTextarea) {
    codeTextarea.value = code || "";
  }
}

function getEditorCode() {
  if (editor) return editor.getValue();
  return codeTextarea ? codeTextarea.value : "";
}

// ============================================================================
// Helpers visuales
// ============================================================================
function resetAiPanel() {
  if (aiFeedbackEl) aiFeedbackEl.textContent = "";
  lastHintSource = null;
}

function setAiMessage(message, source = null) {
  if (!aiFeedbackEl) return;

  let prefix = "";

  if (source === "openrouter") {
    prefix = "Pista IA:\n\n";
  } else if (source === "fallback") {
    prefix = "Ayuda técnica básica:\n\n";
  }

  aiFeedbackEl.textContent = `${prefix}${message || ""}`;
  lastHintSource = source;
}

function updateAiButtonState() {
  if (!aiHintBtn) return;

  const token = localStorage.getItem("token");
  const hasExercise = !!currentExerciseId;
  const hasAttempt = !!lastAttemptId;
  const creditsText = aiCreditsEl?.textContent || "";

  const noCredits = creditsText.includes(": 0");
  const creditsError = creditsText.toLowerCase().includes("error");

  aiHintBtn.disabled = !token || !hasExercise || !hasAttempt || noCredits || creditsError;
}

function setRunStatus(status) {
  if (!runStatusEl) return;

  runStatusEl.textContent = status || "-";

  runStatusEl.classList.remove(
    "status-success",
    "status-error",
    "status-running",
    "status-timeout",
    "status-stopped"
  );

  if (status === "success") {
    runStatusEl.classList.add("status-success");
  } else if (status === "running") {
    runStatusEl.classList.add("status-running");
  } else if (status === "stopped") {
    runStatusEl.classList.add("status-stopped");
  } else if (
    status === "timeout" ||
    status === "timeout_total" ||
    status === "timeout_inactive"
  ) {
    runStatusEl.classList.add("status-timeout");
  } else if (status && status !== "-") {
    runStatusEl.classList.add("status-error");
  }
}

function startInteractiveTimer() {
  stopInteractiveTimer();
  interactiveStartedAt = Date.now();

  if (runTimeEl) {
    runTimeEl.textContent = "0 s";
  }

  interactiveTimerId = setInterval(() => {
    if (!interactiveStartedAt || !runTimeEl) return;

    const elapsedMs = Date.now() - interactiveStartedAt;
    const elapsedSec = Math.floor(elapsedMs / 1000);

    if (elapsedSec < 60) {
      runTimeEl.textContent = `${elapsedSec} s`;
      return;
    }

    const minutes = Math.floor(elapsedSec / 60);
    const seconds = elapsedSec % 60;
    runTimeEl.textContent = `${minutes} min ${seconds} s`;
  }, 1000);
}

function stopInteractiveTimer() {
  if (interactiveTimerId) {
    clearInterval(interactiveTimerId);
    interactiveTimerId = null;
  }
}



function clearConsoleOutput() {
  if (!consoleOutputEl) return;
  consoleOutputEl.innerHTML = "";
}

function appendConsoleLine(text, kind = "output") {
  if (!consoleOutputEl) return;

  const line = document.createElement("div");
  line.className = `console-line console-line-${kind}`;

  if (kind === "input") {
    line.textContent = `> ${text}`;
  } else if (kind === "error") {
    line.textContent = text;
  } else {
    line.textContent = text;
  }

  consoleOutputEl.appendChild(line);
  consoleOutputEl.scrollTop = consoleOutputEl.scrollHeight;
}

function appendMultilineConsole(text, kind = "output") {
  if (!text) return;

  const lines = String(text).split("\n");

  lines.forEach((line) => {
    appendConsoleLine(line, kind);
  });
}

function resetOutput() {
  stopInteractiveTimer();
  interactiveStartedAt = null;

  if (stdoutEl) stdoutEl.textContent = "";
  if (stderrEl) stderrEl.textContent = "";
  setRunStatus("-");
  if (runTimeEl) runTimeEl.textContent = "-";
  if (statusMsg) statusMsg.textContent = "Listo para ejecutar.";
  if (feedbackEl) feedbackEl.textContent = "";
  clearConsoleOutput();
  resetAiPanel();
}

function getReturnToFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("returnTo");
}

function getTopicPageFromExercise(ex) {
  if (!ex?.topic) return null;

  const topicMap = {
    "python/tema-1": "../temas/python/tema-1/index.html",
    "python/tema-2": "../temas/python/tema-2/index.html",
    "python/tema-3": "../temas/python/tema-3/index.html",
    "python/tema-4": "../temas/python/tema-4/index.html",
    "python/tema-5": "../temas/python/tema-5/index.html",
    "python/tema-6": "../temas/python/tema-6/index.html",
    "python/tema-7": "../temas/python/tema-7/index.html",
    "python/tema-8": "../temas/python/tema-8/index.html",
    "python/tema-9": "../temas/python/tema-9/index.html",
    "python/tema-10": "../temas/python/tema-10/index.html",
    "python/retos": "../temas/python/retos/index.html",
    "python/proyectos": "../temas/python/proyectos/index.html",
  };

  return topicMap[ex.topic] || "../temas/python/index.html";
}

function updateBackToTopicButton(exercise) {
  if (!backBtn) return;

  const explicitReturnTo = getReturnToFromURL();

  if (explicitReturnTo) {
    backBtn.style.display = "inline-flex";
    backBtn.href = explicitReturnTo;
    return;
  }

  const target = getTopicPageFromExercise(exercise);

  if (!exercise || !target) {
    backBtn.style.display = "none";
    backBtn.removeAttribute("href");
    return;
  }

  backBtn.style.display = "inline-flex";
  backBtn.href = target;
}

function updatePlaygroundHeader(exercise) {
  const langLabel = "Python";

  if (playgroundLangBadgeEl) {
    playgroundLangBadgeEl.textContent = langLabel;
  }

  if (playgroundModeBadgeEl) {
    playgroundModeBadgeEl.textContent = exercise ? "Modo ejercicio" : "Modo libre";
  }

  if (editorMetaEl) {
    if (exercise) {
      const type = exercise.type || "Práctica";
      const estimatedTime = exercise.estimatedTime || "-";
      editorMetaEl.textContent = `${langLabel} · ${type} · ${estimatedTime}`;
    } else {
      editorMetaEl.textContent = `${langLabel} · Modo libre`;
    }
  }

  if (editorTitleEl) {
    editorTitleEl.textContent = exercise?.title
      ? `Resolviendo: ${exercise.title}`
      : "Editor de código";
  }

  if (topbarSubEl) {
    topbarSubEl.textContent = exercise
      ? `Trabajando: ${exercise.title || "Ejercicio"}`
      : "Ejecuta código y prueba ideas libremente.";
  }
}

function updateExerciseUI(ex, lang) {
  const type = ex?.type || "Práctica";
  const difficulty = ex?.difficulty || "-";
  const estimatedTime = ex?.estimatedTime || "-";
  const skill = ex?.skill || "-";
  const langLabel = lang || ex?.language || "python";

  if (exerciseBadgeLangEl) {
    exerciseBadgeLangEl.textContent = `Lenguaje: ${langLabel}`;
  }

  if (exerciseBadgeTypeEl) {
    exerciseBadgeTypeEl.textContent = `Modo: ${type}`;
  }

  if (exerciseBadgeDifficultyEl) {
    exerciseBadgeDifficultyEl.textContent = `Dificultad: ${difficulty}`;
  }

  if (exerciseBadgeTimeEl) {
    exerciseBadgeTimeEl.textContent = `Tiempo: ${estimatedTime}`;
  }

  if (exerciseBadgeSkillEl) {
    exerciseBadgeSkillEl.textContent = `Skill: ${skill}`;
  }

  updateBackToTopicButton(ex);
  updatePlaygroundHeader(ex);
}

function focusOutputPanel() {
  if (!outputPanelEl) return;

  outputPanelEl.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  outputPanelEl.classList.add("panel-output-active");

  setTimeout(() => {
    outputPanelEl.classList.remove("panel-output-active");
  }, 1200);
}

function stopInteractiveConsoleIfRunning() {
  if (interactiveSessionId) {
    stopInteractiveConsole();
  }
}

function getSessionUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
}

function paintSessionUser() {
  const user = getSessionUser();
  if (sessionUserNameEl) {
    sessionUserNameEl.textContent = user?.name || user?.email || "Alumno";
  }

  if (fixedLanguageEl) {
    fixedLanguageEl.textContent = "Python";
  }
}
// ============================================================================
// Carga ejercicio desde URL
// ============================================================================
function loadExerciseFromURL() {
  stopInteractiveConsoleIfRunning();

  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");
  const exerciseId = params.get("exerciseId");


  const catalog = window.EXERCISE_CATALOG || {};

  if (!exerciseId) {
    currentExerciseId = null;
    lastAttemptId = null;
    lastRunStatus = null;
    resetAiPanel();

    if (exercisePanelEl) {
      exercisePanelEl.style.display = "none";
    }

    updateBackToTopicButton(null);
    updatePlaygroundHeader(null);
    updateAiButtonState();
    return;
  }

  currentExerciseId = exerciseId;
  lastAttemptId = null;
  lastRunStatus = null;
  resetAiPanel();
  const ex = catalog[exerciseId];

  if (exercisePanelEl) {
    exercisePanelEl.style.display = "block";
  }

  if (ex) {
    if (exerciseTitleEl) {
      exerciseTitleEl.textContent = ex.title || `Ejercicio: ${exerciseId}`;
    }

    if (exerciseStatementEl) {
      exerciseStatementEl.textContent = ex.statement || "";
    }

    if (exerciseHintsEl) {
      exerciseHintsEl.innerHTML = "";
      (ex.hints || []).forEach((hint) => {
        const li = document.createElement("li");
        li.textContent = hint;
        exerciseHintsEl.appendChild(li);
      });
    }

    updateExerciseUI(ex, lang || ex.language);

    if (ex.starterCode) {
      setEditorCode(ex.starterCode);
    }

    const resetBtn = document.getElementById("btn-reset-template");
    if (resetBtn) {
      resetBtn.onclick = () => {
        stopInteractiveConsoleIfRunning();

        if (ex.starterCode) {
          setEditorCode(ex.starterCode);
        }
        if (statusMsg) {
          statusMsg.textContent = "Plantilla reiniciada.";
        }
      };
    }

    const copyBtn = document.getElementById("btn-copy-hints");
    if (copyBtn) {
      copyBtn.onclick = async () => {
        const txt = (ex.hints || []).join("\n- ");
        try {
          await navigator.clipboard.writeText("- " + txt);
          if (statusMsg) {
            statusMsg.textContent = "Pistas copiadas al portapapeles.";
          }
        } catch {
          if (statusMsg) {
            statusMsg.textContent = "No se pudo copiar (permiso del navegador).";
          }
        }
      };
    }

    updateAiButtonState();
    return;
  }

  if (exerciseTitleEl) {
    exerciseTitleEl.textContent = `Ejercicio: ${exerciseId}`;
  }

  if (exerciseStatementEl) {
    exerciseStatementEl.textContent = "Este ejercicio no está en el catálogo todavía.";
  }

  if (exerciseHintsEl) {
    exerciseHintsEl.innerHTML = "";
    const li = document.createElement("li");
    li.textContent = "Añade este exerciseId al archivo del catálogo correspondiente.";
    exerciseHintsEl.appendChild(li);
  }

  updateBackToTopicButton(null);

  updatePlaygroundHeader({
    title: `Ejercicio: ${exerciseId}`
  });

  if (topbarSubEl) {
    topbarSubEl.textContent = "Ejercicio no encontrado en catálogo.";
  }

  updateAiButtonState();
}

// ============================================================================
// Historial
// ============================================================================
async function loadAttempts() {
  if (!attemptsListEl) return;

  const url = "http://localhost:3000/api/attempts?limit=5";
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

    if (res.status === 401) {
      const li = document.createElement("li");
      li.textContent = "Sesión caducada o token inválido. Vuelve a hacer login.";
      attemptsListEl.appendChild(li);
      return;
    }

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
// IA
// ============================================================================
function getCurrentTopic() {
  const params = new URLSearchParams(window.location.search);
  const exerciseId = params.get("exerciseId");

  if (!exerciseId) return null;

  const catalog = window.EXERCISE_CATALOG || {};
  const ex = catalog[exerciseId];

  return ex?.topic || null;
}

async function loadAiCredits() {
  const token = localStorage.getItem("token");
  const topic = getCurrentTopic();

  if (!token || !topic || !aiCreditsEl) {
    updateAiButtonState();
    return;
  }

  try {
    const res = await fetch(
      `http://localhost:3000/api/ai/credits?topic=${encodeURIComponent(topic)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok || !data.ok) {
      aiCreditsEl.textContent = "Créditos IA: error";
      updateAiButtonState();
      return;
    }

    aiCreditsEl.textContent = `Créditos IA: ${data.remainingCredits}`;
    updateAiButtonState();
  } catch (error) {
    console.error("Error cargando créditos IA:", error);
    aiCreditsEl.textContent = "Créditos IA: error";
    updateAiButtonState();
  }
}

async function requestAiHint() {
  const token = localStorage.getItem("token");

  if (!token) {
    if (statusMsg) statusMsg.textContent = "Debes iniciar sesión para usar la IA.";
    return;
  }

  if (!currentExerciseId) {
    if (statusMsg) statusMsg.textContent = "La IA solo está disponible dentro de un ejercicio.";
    return;
  }

  if (!lastAttemptId) {
    if (aiFeedbackEl) {
      aiFeedbackEl.textContent = "Primero ejecuta tu código para que pueda analizar un intento real.";
    }
    return;
  }

  const catalog = window.EXERCISE_CATALOG || {};
  const ex = catalog[currentExerciseId];

  if (!ex) {
    if (aiFeedbackEl) {
      aiFeedbackEl.textContent = "No se encontró el ejercicio en el catálogo.";
    }
    return;
  }

  if (aiHintBtn) aiHintBtn.disabled = true;
  if (aiFeedbackEl) aiFeedbackEl.textContent = "Pensando...";

  try {
    const body = {
      topic: ex.topic,
      attemptId: lastAttemptId,
      exerciseId: ex.id,
      title: ex.title,
      statement: ex.statement,
      hints: ex.hints || [],
    };

    const res = await fetch("http://localhost:3000/api/ai/hint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      setAiMessage(data.error || "No se pudo obtener una pista");

      if (aiCreditsEl && typeof data.remainingCredits === "number") {
        aiCreditsEl.textContent = `Créditos IA: ${data.remainingCredits}`;
      }

      await loadAiCredits();
      return;
    }

    setAiMessage(data.hint || "", data.source || null);

    if (statusMsg) {
      if (data.creditsSpent) {
        statusMsg.textContent = "Pista IA generada correctamente.";
      } else {
        statusMsg.textContent = "Se ha mostrado ayuda técnica sin consumir crédito.";
      }
    }

    if (aiCreditsEl) {
      aiCreditsEl.textContent = `Créditos IA: ${data.remainingCredits}`;
    }
  } catch (error) {
    console.error("Error pidiendo pista IA:", error);
    setAiMessage("Error de conexión con la IA.");
    await loadAiCredits();
  } finally {
    updateAiButtonState();
  }
}

// ============================================================================
// Console / execution modes
// ============================================================================


function updateExecutionModeUI() {
  if (interactiveConsoleControlsEl) {
    interactiveConsoleControlsEl.style.display = "block";
  }

  if (runButton && !interactiveConsoleRunning) {
    runButton.textContent = "Ejecutar código";
  }

  if (statusMsg && !interactiveConsoleRunning) {
    statusMsg.textContent = "Listo para practicar.";
  }

  if (stdoutBlockEl) stdoutBlockEl.style.display = "none";
  if (stderrBlockEl) stderrBlockEl.style.display = "none";
}

function appendInteractiveConsole(text, kind = "output") {
  if (!consoleOutputEl) return;

  const normalized = String(text ?? "").replace(/\r/g, "");
  const lines = normalized.split("\n");

  lines.forEach((line, index) => {
    const isLastEmpty = index === lines.length - 1 && line === "";
    if (!isLastEmpty) {
      appendConsoleLine(line, kind);
    }
  });
}

function initInteractiveSocket() {
  if (consoleSocket || typeof io === "undefined") return;

  const token = localStorage.getItem("token");
  if (!token) return;

  consoleSocket = io("http://localhost:3000", {
    auth: { token }
  });

  consoleSocket.on("console:started", ({ sessionId, attemptId }) => {
    interactiveSessionId = sessionId;
    lastAttemptId = attemptId || null;

    appendInteractiveConsole(">>> Consola iniciada", "system");
    setInteractiveConsoleRunningState(true);
    setRunStatus("running");
    startInteractiveTimer();
    updateAiButtonState();

    if (statusMsg) {
      statusMsg.textContent = "Consola interactiva iniciada.";
    }
  });

  consoleSocket.on("console:output", ({ text }) => {
    appendInteractiveConsole(text);
  });

  consoleSocket.on("console:error", ({ message }) => {
    appendInteractiveConsole(message, "error");
  });

  consoleSocket.on("console:end", async ({ status, attemptId }) => {
    appendInteractiveConsole(`>>> Sesión finalizada (${status})`, "system");
    interactiveSessionId = null;

    if (attemptId) {
      lastAttemptId = attemptId;
    }

    lastRunStatus = status || null;

    setInteractiveConsoleRunningState(false);
    setRunStatus(status || "-");
    stopInteractiveTimer();
    updateAiButtonState();

    try {
      await loadAttempts();
    } catch (error) {
      console.error("Error refrescando historial tras consola interactiva:", error);
    }

    if (statusMsg) {
      if (status === "success") {
        statusMsg.textContent = "La consola ha finalizado correctamente.";
      } else if (status === "timeout_total") {
        statusMsg.textContent = "La consola ha alcanzado el tiempo máximo permitido.";
      } else if (status === "timeout_inactive") {
        statusMsg.textContent = "La consola se ha cerrado por inactividad.";
      } else if (status === "stopped") {
        statusMsg.textContent = "La consola se ha detenido.";
      } else {
        statusMsg.textContent = `Consola finalizada: ${status}.`;
      }
    }

    focusOutputPanel();
  });
}

function setInteractiveConsoleRunningState(isRunning) {
  interactiveConsoleRunning = isRunning;

  if (sendConsoleInputBtn) {
    sendConsoleInputBtn.disabled = !isRunning;
    sendConsoleInputBtn.classList.toggle("btn-disabled", !isRunning);
  }

  if (stopConsoleBtn) {
    stopConsoleBtn.disabled = !isRunning;
    stopConsoleBtn.classList.toggle("btn-disabled", !isRunning);
  }

  if (interactiveConsoleInputEl) {
    interactiveConsoleInputEl.disabled = !isRunning;
    interactiveConsoleInputEl.classList.toggle("interactive-console-input-disabled", !isRunning);
  }

  if (runButton) {
    runButton.disabled = isRunning;
    runButton.textContent = isRunning ? "Programa en ejecución..." : "Ejecutar código";
  }

  if (interactiveConsoleHelpEl) {
    interactiveConsoleHelpEl.textContent = isRunning
      ? "La ejecución está activa. Si el programa pide datos, escríbelos aquí."
      : "Ejecuta el programa para activar la consola y responder a los input() si los hay.";
  }
}

function sendInteractiveConsoleInput() {
  if (!consoleSocket || !interactiveSessionId || !interactiveConsoleInputEl) return;

  const input = interactiveConsoleInputEl.value;
  if (input === "") return;

  consoleSocket.emit("console:input", {
    sessionId: interactiveSessionId,
    input
  });

  appendInteractiveConsole(input, "input");
  interactiveConsoleInputEl.value = "";
}

function stopInteractiveConsole() {
  if (!consoleSocket || !interactiveSessionId) return;

  consoleSocket.emit("console:stop", {
    sessionId: interactiveSessionId
  });

  appendInteractiveConsole(">>> Consola detenida por el usuario", "system");
  interactiveSessionId = null;
  setInteractiveConsoleRunningState(false);
  setRunStatus("stopped");
  stopInteractiveTimer();

    if (interactiveConsoleInputEl) {
    interactiveConsoleInputEl.value = "";
  }

  if (statusMsg) {
    statusMsg.textContent = "La consola se ha detenido.";
  }
}

function startInteractiveConsole() {
  initInteractiveSocket();

  if (!consoleSocket) {
    if (statusMsg) statusMsg.textContent = "No se pudo iniciar la consola.";
    return;
  }

  const language = "python";
  const code = getEditorCode();

  if (!code.trim()) {
    if (statusMsg) statusMsg.textContent = "Escribe algún código antes de ejecutar.";
    return;
  }

  const catalog = window.EXERCISE_CATALOG || {};
  const ex = currentExerciseId ? catalog[currentExerciseId] : null;

  resetOutput();
  setInteractiveConsoleRunningState(false);
  clearConsoleOutput();

  lastAttemptId = null;
  lastRunStatus = null;
  updateAiButtonState();

  setRunStatus("running");
  if (runTimeEl) runTimeEl.textContent = "0 s";
  if (stdoutEl) stdoutEl.textContent = "";
  if (stderrEl) stderrEl.textContent = "";
  if (feedbackEl) feedbackEl.textContent = "";

  consoleSocket.emit("console:start", {
    language,
    code,
    exerciseId: currentExerciseId || null,
    topic: ex?.topic || null
  });

  if (statusMsg) {
    statusMsg.textContent = "Iniciando ejecución...";
  }
}

// ============================================================================
// Ejecutar código
// ============================================================================
async function runCode() {
  lastRunStatus = null;
  lastAttemptId = null;
  updateAiButtonState();

  resetOutput();
  startInteractiveConsole();
}
// ============================================================================
// Logout
// ============================================================================
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    if (consoleSocket && interactiveSessionId) {
      consoleSocket.emit("console:stop", {
        sessionId: interactiveSessionId
      });
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "../login.html";
  });
}

// ============================================================================
// Init
// ============================================================================
initCodeEditor();

if (runButton) {
  runButton.addEventListener("click", runCode);
}

if (aiHintBtn) {
  aiHintBtn.addEventListener("click", requestAiHint);
}


if (sendConsoleInputBtn) {
  sendConsoleInputBtn.addEventListener("click", sendInteractiveConsoleInput);
}

if (stopConsoleBtn) {
  stopConsoleBtn.addEventListener("click", stopInteractiveConsole);
}

if (interactiveConsoleInputEl) {
  interactiveConsoleInputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendInteractiveConsoleInput();
    }
  });
}

window.addEventListener("beforeunload", () => {
  if (consoleSocket && interactiveSessionId) {
    consoleSocket.emit("console:stop", {
      sessionId: interactiveSessionId
    });
  }
});

loadExerciseFromURL();
loadAttempts();
loadAiCredits();
updateAiButtonState();
setInteractiveConsoleRunningState(false);
updateExecutionModeUI();
initInteractiveSocket();
paintSessionUser();