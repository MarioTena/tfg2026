(function (app) {
  app.setRunStatus = function setRunStatus(status) {
    const { runStatusEl } = this.dom;
    if (!runStatusEl) return;

    runStatusEl.textContent = status || "-";
    runStatusEl.classList.remove(
      "status-success",
      "status-error",
      "status-running",
      "status-timeout",
      "status-stopped"
    );

    const statusClassMap = {
      success: "status-success",
      running: "status-running",
      stopped: "status-stopped",
      timeout: "status-timeout",
      timeout_total: "status-timeout",
      timeout_inactive: "status-timeout",
    };

    const cssClass =
      statusClassMap[status] || (status && status !== "-" ? "status-error" : null);

    if (cssClass) runStatusEl.classList.add(cssClass);
  };

  app.startInteractiveTimer = function startInteractiveTimer() {
    this.stopInteractiveTimer();
    this.state.interactiveStartedAt = Date.now();

    if (this.dom.runTimeEl) {
      this.dom.runTimeEl.textContent = "0 s";
    }

    this.state.interactiveTimerId = setInterval(() => {
      if (!this.state.interactiveStartedAt || !this.dom.runTimeEl) return;

      const elapsedSec = Math.floor(
        (Date.now() - this.state.interactiveStartedAt) / 1000
      );

      if (elapsedSec < 60) {
        this.dom.runTimeEl.textContent = `${elapsedSec} s`;
        return;
      }

      const minutes = Math.floor(elapsedSec / 60);
      const seconds = elapsedSec % 60;
      this.dom.runTimeEl.textContent = `${minutes} min ${seconds} s`;
    }, 1000);
  };

  app.stopInteractiveTimer = function stopInteractiveTimer() {
    if (this.state.interactiveTimerId) {
      clearInterval(this.state.interactiveTimerId);
      this.state.interactiveTimerId = null;
    }
  };

  app.clearConsoleOutput = function clearConsoleOutput() {
    if (this.dom.consoleOutputEl) {
      this.dom.consoleOutputEl.innerHTML = "";
    }
  };

  app.appendConsoleLine = function appendConsoleLine(text, kind = "output") {
    const { consoleOutputEl } = this.dom;
    if (!consoleOutputEl) return;

    const line = document.createElement("div");
    line.className = `console-line console-line-${kind}`;
    line.textContent = kind === "input" ? `> ${text}` : text;

    consoleOutputEl.appendChild(line);
    consoleOutputEl.scrollTop = consoleOutputEl.scrollHeight;
  };

  app.appendMultilineConsole = function appendMultilineConsole(text, kind = "output") {
    if (!text) return;
    String(text).split("\n").forEach((line) => this.appendConsoleLine(line, kind));
  };

  app.appendInteractiveConsole = function appendInteractiveConsole(text, kind = "output") {
    if (!this.dom.consoleOutputEl) return;

    const normalized = String(text ?? "").replace(/\r/g, "");
    const lines = normalized.split("\n");

    lines.forEach((line, index) => {
      const isLastEmpty = index === lines.length - 1 && line === "";
      if (!isLastEmpty) this.appendConsoleLine(line, kind);
    });
  };

  app.focusOutputPanel = function focusOutputPanel() {
    const { outputPanelEl } = this.dom;
    if (!outputPanelEl) return;

    outputPanelEl.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    outputPanelEl.classList.add("panel-output-active");
    setTimeout(() => outputPanelEl.classList.remove("panel-output-active"), 1200);
  };

  app.resetOutput = function resetOutput() {
    this.stopInteractiveTimer();
    this.state.interactiveStartedAt = null;

    if (this.dom.stdoutEl) this.dom.stdoutEl.textContent = "";
    if (this.dom.stderrEl) this.dom.stderrEl.textContent = "";
    this.setRunStatus("-");
    if (this.dom.runTimeEl) this.dom.runTimeEl.textContent = "-";

    this.setStatusMessage(this.config.DEFAULT_STATUS_MESSAGE);
    this.clearConsoleOutput();
    this.resetAiPanel?.();
  };

  app.updateExecutionModeUI = function updateExecutionModeUI() {
    if (this.dom.interactiveConsoleControlsEl) {
      this.dom.interactiveConsoleControlsEl.style.display = "block";
    }

    if (this.dom.runButton && !this.state.interactiveConsoleRunning) {
      this.dom.runButton.textContent = "Ejecutar código";
    }

    if (!this.state.interactiveConsoleRunning) {
      this.setStatusMessage(this.config.DEFAULT_STATUS_MESSAGE);
    }

    if (this.dom.stdoutBlockEl) this.dom.stdoutBlockEl.style.display = "none";
    if (this.dom.stderrBlockEl) this.dom.stderrBlockEl.style.display = "none";
  };

  app.setInteractiveConsoleRunningState = function setInteractiveConsoleRunningState(isRunning) {
    this.state.interactiveConsoleRunning = isRunning;

    const {
      sendConsoleInputBtn,
      stopConsoleBtn,
      interactiveConsoleInputEl,
      runButton,
      interactiveConsoleHelpEl,
    } = this.dom;

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
      interactiveConsoleInputEl.classList.toggle(
        "interactive-console-input-disabled",
        !isRunning
      );
    }

    if (runButton) {
      runButton.disabled = isRunning;
      runButton.textContent = isRunning
        ? "Programa en ejecución..."
        : "Ejecutar código";
    }

    if (interactiveConsoleHelpEl) {
      interactiveConsoleHelpEl.textContent = isRunning
        ? "La ejecución está activa. Si el programa pide datos, escríbelos aquí."
        : "Ejecuta el programa para activar la consola y responder a los input() si los hay.";
    }
  };
})(window.PlaygroundApp);