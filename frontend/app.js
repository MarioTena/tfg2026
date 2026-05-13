const app = window.PlaygroundApp;

// Si no hay token, no dejamos entrar al playground
app.redirectIfNotLogged();

// ============================================================================
// Historial
// ============================================================================
async function loadAttempts() {
  const { attemptsListEl } = app.dom;
  if (!attemptsListEl) return;

  const token = app.getToken();
  attemptsListEl.innerHTML = "";

  function appendHistoryMessage(message) {
    const li = document.createElement("li");
    li.textContent = message;
    attemptsListEl.appendChild(li);
  }

  if (!token) {
    appendHistoryMessage("Necesitas hacer login para ver el historial.");
    return;
  }

  try {
    const res = await fetch(app.api.attempts, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      appendHistoryMessage("Sesión caducada o token inválido. Vuelve a hacer login.");
      return;
    }

    let data = null;
    try {
      data = await res.json();
    } catch {
      appendHistoryMessage("Respuesta inválida del servidor (no es JSON).");
      return;
    }

    if (!res.ok || !data.ok) {
      appendHistoryMessage(data?.error || "No se ha podido cargar el historial.");
      return;
    }

    if (!data.items?.length) {
      appendHistoryMessage("Sin intentos todavía.");
      return;
    }

    const statusClassMap = {
      success: "attempt-status-success",
      error: "attempt-status-error",
      timeout: "attempt-status-timeout",
    };

    data.items.forEach((attempt) => {
      const li = document.createElement("li");
      const statusClass = statusClassMap[attempt.status] || "attempt-status-error";
      const when = attempt.createdAt ? new Date(attempt.createdAt).toLocaleString() : "";

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
    appendHistoryMessage("Error de conexión al cargar el historial.");
  }
}

// ============================================================================
// Console / execution modes
// ============================================================================
function initInteractiveSocket() {
  if (app.state.consoleSocket || typeof io === "undefined") return;

  const token = app.getToken();
  if (!token) return;

  app.state.consoleSocket = io(app.api.socket, {
    auth: { token }
  });

  app.state.consoleSocket.on("console:started", ({ sessionId, attemptId }) => {
    app.state.interactiveSessionId = sessionId;
    app.state.lastAttemptId = attemptId || null;

    app.appendInteractiveConsole(">>> Consola iniciada", "system");
    app.setInteractiveConsoleRunningState(true);
    app.setRunStatus("running");
    app.startInteractiveTimer();
    app.updateAiButtonState();
    app.setStatusMessage("Consola interactiva iniciada.");
  });

  app.state.consoleSocket.on("console:output", ({ text }) => {
    app.appendInteractiveConsole(text);
  });

  app.state.consoleSocket.on("console:error", ({ message }) => {
    app.appendInteractiveConsole(message, "error");
  });

  app.state.consoleSocket.on("console:end", async ({ status, attemptId }) => {
    app.appendInteractiveConsole(`>>> Sesión finalizada (${status})`, "system");
    app.state.interactiveSessionId = null;

    if (attemptId) app.state.lastAttemptId = attemptId;
    app.state.lastRunStatus = status || null;

    app.setInteractiveConsoleRunningState(false);
    app.setRunStatus(status || "-");
    app.stopInteractiveTimer();
    app.updateAiButtonState();

    try {
      await loadAttempts();
    } catch (error) {
      console.error("Error refrescando historial tras consola interactiva:", error);
    }

    const statusMessageMap = {
      success: "La consola ha finalizado correctamente.",
      timeout_total: "La consola ha alcanzado el tiempo máximo permitido.",
      timeout_inactive: "La consola se ha cerrado por inactividad.",
      stopped: "La consola se ha detenido.",
    };

    app.setStatusMessage(statusMessageMap[status] || `Consola finalizada: ${status}.`);
    app.focusOutputPanel();
  });
}

function sendInteractiveConsoleInput() {
  const { consoleSocket, interactiveSessionId } = app.state;
  const { interactiveConsoleInputEl } = app.dom;

  if (!consoleSocket || !interactiveSessionId || !interactiveConsoleInputEl) return;

  const input = interactiveConsoleInputEl.value;
  if (input === "") return;

  consoleSocket.emit("console:input", {
    sessionId: interactiveSessionId,
    input
  });

  app.appendInteractiveConsole(input, "input");
  interactiveConsoleInputEl.value = "";
}

function stopInteractiveConsole() {
  const { consoleSocket, interactiveSessionId } = app.state;
  if (!consoleSocket || !interactiveSessionId) return;

  consoleSocket.emit("console:stop", {
    sessionId: interactiveSessionId
  });

  app.appendInteractiveConsole(">>> Consola detenida por el usuario", "system");
  app.state.interactiveSessionId = null;
  app.setInteractiveConsoleRunningState(false);
  app.setRunStatus("stopped");
  app.stopInteractiveTimer();

  if (app.dom.interactiveConsoleInputEl) {
    app.dom.interactiveConsoleInputEl.value = "";
  }

  app.setStatusMessage("La consola se ha detenido.");
}

app.stopInteractiveConsole = stopInteractiveConsole;

function startInteractiveConsole() {
  initInteractiveSocket();

  if (!app.state.consoleSocket) {
    app.setStatusMessage("No se pudo iniciar la consola.");
    return;
  }

  const code = app.getEditorCode();

  if (!code.trim()) {
    app.setStatusMessage("Escribe algún código antes de ejecutar.");
    return;
  }

  const ex = app.state.currentExerciseId
    ? app.getExerciseById(app.state.currentExerciseId)
    : null;

  app.resetOutput();
  app.setInteractiveConsoleRunningState(false);
  app.resetAttemptState();

  app.setRunStatus("running");
  if (app.dom.runTimeEl) app.dom.runTimeEl.textContent = "0 s";

  app.state.consoleSocket.emit("console:start", {
    language: "python",
    code,
    exerciseId: app.state.currentExerciseId || null,
    topic: ex?.topic || null
  });

  app.setStatusMessage("Iniciando ejecución...");
}

// ============================================================================
// Ejecutar código
// ============================================================================
function runCode() {
  app.resetAttemptState();
  app.resetOutput();
  startInteractiveConsole();
}

// ============================================================================
// Init
// ============================================================================
app.initCodeEditor();

if (app.dom.runButton) {
  app.dom.runButton.addEventListener("click", runCode);
}

if (app.dom.aiHintBtn) {
  app.dom.aiHintBtn.addEventListener("click", () => app.requestAiHint());
}

if (app.dom.sendConsoleInputBtn) {
  app.dom.sendConsoleInputBtn.addEventListener("click", sendInteractiveConsoleInput);
}

if (app.dom.stopConsoleBtn) {
  app.dom.stopConsoleBtn.addEventListener("click", stopInteractiveConsole);
}

if (app.dom.interactiveConsoleInputEl) {
  app.dom.interactiveConsoleInputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendInteractiveConsoleInput();
    }
  });
}

window.addEventListener("beforeunload", () => {
  if (app.state.consoleSocket && app.state.interactiveSessionId) {
    app.state.consoleSocket.emit("console:stop", {
      sessionId: app.state.interactiveSessionId
    });
  }
});

app.loadExerciseFromURL();
loadAttempts();
app.loadAiCredits();
app.updateAiButtonState();
app.setInteractiveConsoleRunningState(false);
app.updateExecutionModeUI();
initInteractiveSocket();
app.paintSessionUser();