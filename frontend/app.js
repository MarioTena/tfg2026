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

// Si no hay token, no dejamos entrar al playground
(function redirectIfNotLogged() {
  const token = localStorage.getItem("token");
  if (!token) window.location.href = "../login.html";
})();

// ============================================================================
// Referencias a elementos del DOM
// ============================================================================
const languageSelect = document.getElementById("language");
const codeTextarea = document.getElementById("code");
const stdinTextarea = document.getElementById("stdin");
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
    if (lastAttemptId) {
      if (statusMsg) {
        statusMsg.textContent = "Has modificado el código. Ejecuta de nuevo para pedir una pista sobre la versión actual.";
      }
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

function resetOutput() {
  if (stdoutEl) stdoutEl.textContent = "";
  if (stderrEl) stderrEl.textContent = "";
  if (runStatusEl) runStatusEl.textContent = "-";
  if (runTimeEl) runTimeEl.textContent = "-";
  if (statusMsg) statusMsg.textContent = "Listo para ejecutar.";
  if (feedbackEl) feedbackEl.textContent = "";
  if (consoleOutputEl) consoleOutputEl.textContent = "";
  resetAiPanel();
}

function formatTopicLabel(topic) {
  if (!topic) return "Ruta de práctica";
  return topic
    .replace("python/", "")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
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
  const language = languageSelect?.value || "python";
  const langLabel = language.charAt(0).toUpperCase() + language.slice(1);

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

// ============================================================================
// Carga ejercicio desde URL
// ============================================================================
function loadExerciseFromURL() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");
  const exerciseId = params.get("exerciseId");

  if (lang && languageSelect) {
    languageSelect.value = lang;
  }

  const catalog = window.EXERCISE_CATALOG || {};

  // Caso 1: modo libre
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

  // Caso 2: ejercicio encontrado
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

  // Caso 3: viene exerciseId pero no existe en catálogo
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
// Ejecutar código
// ============================================================================
async function runCode() {
  resetOutput();

  lastRunStatus = null;
  lastAttemptId = null;
  updateAiButtonState();

  const language = languageSelect?.value || "python";
  const code = getEditorCode();
  const stdin = stdinTextarea?.value || "";

  if (!code.trim()) {
    if (statusMsg) statusMsg.textContent = "Escribe algún código antes de ejecutar.";
    return;
  }

  if (statusMsg) statusMsg.textContent = "Ejecutando código...";
  if (runButton) runButton.disabled = true;
  
 

  try {
    const catalog = window.EXERCISE_CATALOG || {};
    const ex = currentExerciseId ? catalog[currentExerciseId] : null;

    const body = {
      language,
      code,
      stdin,
      exerciseId: currentExerciseId,
      topic: ex?.topic || null,
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok || !data.ok) {
      if (statusMsg) statusMsg.textContent = data.error || "Error al ejecutar el código.";
      if (runStatusEl) runStatusEl.textContent = "error";
      if (stderrEl && data.details) stderrEl.textContent = data.details;
      return;
    }

    const run = data.run || {};

    lastAttemptId = data.attemptId || null;
    lastRunStatus = run.status || null;

    if (stdoutEl) stdoutEl.textContent = run.stdout || "";
    if (stderrEl) stderrEl.textContent = run.stderr || "";
    if (runStatusEl) runStatusEl.textContent = run.status || "-";
    if (runTimeEl) {
      runTimeEl.textContent =
        typeof run.timeMs === "number" ? `${run.timeMs} ms` : "-";
    }

    updateAiButtonState();


    if (consoleOutputEl) {
      consoleOutputEl.textContent = buildConsoleTranscript(run.stdout || "", stdin);
    }

    await loadAttempts();

    if (statusMsg) {
      if (run.status === "success") {
        statusMsg.textContent = "Ejecución completada correctamente.";
         focusOutputPanel();
      } else if (run.status === "timeout") {
        statusMsg.textContent = "La ejecución ha superado el tiempo límite.";
         focusOutputPanel();
      } else {
        statusMsg.textContent = "La ejecución ha devuelto un error.";
         focusOutputPanel();
      }
    }
  } catch (err) {
    console.error("Error llamando a /api/run:", err);
    if (statusMsg) statusMsg.textContent = "No se ha podido conectar con la API.";
    if (runStatusEl) runStatusEl.textContent = "error";
  } finally {
    if (runButton) runButton.disabled = false;
  }
}

// ============================================================================
// Logout
// ============================================================================
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "../login.html";
  });
}

function buildConsoleTranscript(stdout, stdin) {
  const cleanStdout = stdout || "";
  const inputLines = (stdin || "").split("\n");

  if (!cleanStdout && !stdin) return "";

  let transcript = cleanStdout;

  // Fuerza saltos visuales detrás de prompts típicos
  transcript = transcript.replace(/: /g, ":\n");

  // Añade lo que el usuario escribió debajo de cada prompt
  let result = "";
  let inputIndex = 0;

  const lines = transcript.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    result += line + "\n";

    const trimmed = line.trim();

    // Heurística simple: si la línea parece un prompt, añadimos una línea de entrada
    if (
      trimmed.endsWith(":") &&
      inputIndex < inputLines.length &&
      inputLines[inputIndex] !== undefined
    ) {
      result += inputLines[inputIndex] + "\n";
      inputIndex += 1;
    }
  }

  return result.trim();
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

// ============================================================================
// Init
// ============================================================================
initCodeEditor();

if (languageSelect) {
  languageSelect.addEventListener("change", () => {
    const catalog = window.EXERCISE_CATALOG || {};
    const currentExercise = currentExerciseId ? catalog[currentExerciseId] : null;

    if (currentExercise) {
      updateExerciseUI(currentExercise, languageSelect.value);
    } else {
      updatePlaygroundHeader(null);
    }
  });
}

if (runButton) {
  runButton.addEventListener("click", runCode);
}

if (aiHintBtn) {
  aiHintBtn.addEventListener("click", requestAiHint);
}

loadExerciseFromURL();
loadAttempts();
loadAiCredits();
updateAiButtonState();