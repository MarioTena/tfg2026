// ============================================================================
// app.js
// Playground: carga ejercicio desde URL, pinta metadatos, ejecuta código,
// muestra historial y permite pedir pistas IA.
// ============================================================================

const API_URL = "http://localhost:3000/api/run";
let editor = null;
let currentExerciseId = null;

// Si no hay token, no dejamos entrar al playground
(function redirectIfNotLogged() {
  const token = localStorage.getItem("token");
  if (!token) window.location.href = "../login.html";
})();

// ============================================================================
// Referencias a elementos del DOM
// ============================================================================
const userInput = document.getElementById("user");
const languageSelect = document.getElementById("language");
const codeTextarea = document.getElementById("code");
const runButton = document.getElementById("run-btn");
const statusMsg = document.getElementById("status-msg");

const stdoutEl = document.getElementById("stdout");
const stderrEl = document.getElementById("stderr");
const runStatusEl = document.getElementById("run-status");
const runTimeEl = document.getElementById("run-time");
const attemptsListEl = document.getElementById("attempts-list");
const feedbackEl = document.getElementById("feedback");

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
function resetOutput() {
  if (stdoutEl) stdoutEl.textContent = "";
  if (stderrEl) stderrEl.textContent = "";
  if (runStatusEl) runStatusEl.textContent = "-";
  if (runTimeEl) runTimeEl.textContent = "-";
  if (statusMsg) statusMsg.textContent = "Listo para ejecutar.";
  if (feedbackEl) feedbackEl.textContent = "";
}

function formatTopicLabel(topic) {
  if (!topic) return "Ruta de práctica";
  return topic
    .replace("python/", "")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function getTopicPageFromExercise(ex) {
  if (!ex?.topic) return "../menu.html";

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
  };

  return topicMap[ex.topic] || "../menu.html";
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
  const topicLabel = formatTopicLabel(ex?.topic);
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


  if (backBtn) {
    backBtn.href = getTopicPageFromExercise(ex);
  }

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

    if (exercisePanelEl) {
      exercisePanelEl.style.display = "none";
    }

    updatePlaygroundHeader(null);
    return;
  }

  currentExerciseId = exerciseId;
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

  updatePlaygroundHeader({
    title: `Ejercicio: ${exerciseId}`
  });

  if (topbarSubEl) {
    topbarSubEl.textContent = "Ejercicio no encontrado en catálogo.";
  }
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

  if (!token || !topic || !aiCreditsEl) return;

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
      if (aiHintBtn) aiHintBtn.disabled = true;
      return;
    }

    aiCreditsEl.textContent = `Créditos IA: ${data.remainingCredits}`;

    if (aiHintBtn) {
      aiHintBtn.disabled = data.remainingCredits <= 0;
    }
  } catch (error) {
    console.error("Error cargando créditos IA:", error);
    aiCreditsEl.textContent = "Créditos IA: error";
    if (aiHintBtn) aiHintBtn.disabled = true;
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
      exerciseId: ex.id,
      title: ex.title,
      statement: ex.statement,
      hints: ex.hints || [],
      language: languageSelect?.value || "python",
      code: getEditorCode(),
      stdout: stdoutEl?.textContent || "",
      stderr: stderrEl?.textContent || "",
      status: runStatusEl?.textContent || "unknown",
      timeMs: (() => {
        const raw = runTimeEl?.textContent || "";
        const match = raw.match(/(\d+)/);
        return match ? Number(match[1]) : undefined;
      })(),
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
      if (aiFeedbackEl) {
        aiFeedbackEl.textContent = data.error || "No se pudo obtener una pista";
      }

      if (aiCreditsEl && typeof data.remainingCredits === "number") {
        aiCreditsEl.textContent = `Créditos IA: ${data.remainingCredits}`;
      }

      await loadAiCredits();
      return;
    }

    if (aiFeedbackEl) {
      aiFeedbackEl.textContent = data.hint || "";
    }

    if (aiCreditsEl) {
      aiCreditsEl.textContent = `Créditos IA: ${data.remainingCredits}`;
    }

    if (aiHintBtn) {
      aiHintBtn.disabled = data.remainingCredits <= 0;
    }
  } catch (error) {
    console.error("Error pidiendo pista IA:", error);
    if (aiFeedbackEl) {
      aiFeedbackEl.textContent = "Error de conexión con la IA.";
    }
    await loadAiCredits();
  } finally {
    if (aiHintBtn) {
      const currentCreditsText = aiCreditsEl?.textContent || "";
      aiHintBtn.disabled = currentCreditsText.includes(": 0");
    }
  }
}

// ============================================================================
// Ejecutar código
// ============================================================================
async function runCode() {
  resetOutput();

  const user = userInput?.value.trim() || "alumno1";
  const language = languageSelect?.value || "python";
  const code = getEditorCode();

  if (!code.trim()) {
    if (statusMsg) statusMsg.textContent = "Escribe algún código antes de ejecutar.";
    return;
  }

  if (statusMsg) statusMsg.textContent = "Ejecutando código...";
  if (runButton) runButton.disabled = true;

  try {
    const body = { language, code, exerciseId: currentExerciseId, user };

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
      return;
    }

    const run = data.run || {};

    if (stdoutEl) stdoutEl.textContent = run.stdout || "";
    if (stderrEl) stderrEl.textContent = run.stderr || "";
    if (runStatusEl) runStatusEl.textContent = run.status || "-";
    if (runTimeEl) {
      runTimeEl.textContent =
        typeof run.timeMs === "number" ? `${run.timeMs} ms` : "-";
    }

    if (feedbackEl) {
      const fb = data.feedback;
      feedbackEl.textContent = fb && fb.message ? fb.message : "";
    }

    await loadAttempts();

    if (statusMsg) {
      if (run.status === "success") {
        statusMsg.textContent = "Ejecución completada correctamente.";
      } else if (run.status === "timeout") {
        statusMsg.textContent = "La ejecución ha superado el tiempo límite.";
      } else {
        statusMsg.textContent = "La ejecución ha devuelto un error.";
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