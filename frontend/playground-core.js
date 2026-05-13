window.PlaygroundApp = {
  state: {
    editor: null,
    currentExerciseId: null,
    lastAttemptId: null,
    lastRunStatus: null,
    lastHintSource: null,

    consoleSocket: null,
    interactiveSessionId: null,
    interactiveConsoleRunning: false,

    interactiveStartedAt: null,
    interactiveTimerId: null,

    remainingAiCredits: null,
    aiCreditsLoadError: false,
  },

  config: {
    API_BASE_URL: "http://localhost:3000",
    DEFAULT_STATUS_MESSAGE:
      "Listo para practicar. Escribe código y pulsa “Ejecutar código”.",
  },

  dom: {
    sessionUserNameEl: document.getElementById("session-user-name"),
    fixedLanguageEl: document.getElementById("fixed-language"),
    codeTextarea: document.getElementById("code"),
    runButton: document.getElementById("run-btn"),
    statusMsg: document.getElementById("status-msg"),

    stdoutEl: document.getElementById("stdout"),
    stderrEl: document.getElementById("stderr"),
    runStatusEl: document.getElementById("run-status"),
    runTimeEl: document.getElementById("run-time"),
    attemptsListEl: document.getElementById("attempts-list"),
    consoleOutputEl: document.getElementById("console-output"),

    exercisePanelEl: document.getElementById("exercise-panel"),
    exerciseTitleEl: document.getElementById("exercise-title"),
    exerciseStatementEl: document.getElementById("exercise-statement"),
    exerciseHintsEl: document.getElementById("exercise-hints"),

    exerciseBadgeLangEl: document.getElementById("exercise-badge-lang"),
    exerciseBadgeTypeEl: document.getElementById("exercise-badge-type"),
    exerciseBadgeDifficultyEl: document.getElementById("exercise-badge-difficulty"),
    exerciseBadgeTimeEl: document.getElementById("exercise-badge-time"),
    exerciseBadgeSkillEl: document.getElementById("exercise-badge-skill"),

    editorMetaEl: document.getElementById("editor-meta"),
    editorTitleEl: document.getElementById("editor-title"),

    aiHintBtn: document.getElementById("ai-hint-btn"),
    aiCreditsEl: document.getElementById("ai-credits"),
    aiFeedbackEl: document.getElementById("ai-feedback"),

    playgroundLangBadgeEl: document.getElementById("playground-lang-badge"),
    playgroundModeBadgeEl: document.getElementById("playground-mode-badge"),

    outputPanelEl: document.querySelector(".panel-output"),

    interactiveConsoleControlsEl: document.getElementById("interactive-console-controls"),
    interactiveConsoleInputEl: document.getElementById("interactive-console-input"),
    sendConsoleInputBtn: document.getElementById("send-console-input-btn"),
    stopConsoleBtn: document.getElementById("stop-console-btn"),
    interactiveConsoleHelpEl: document.getElementById("interactive-console-help"),

    stdoutBlockEl: document.getElementById("stdout-block"),
    stderrBlockEl: document.getElementById("stderr-block"),
  },

  get api() {
    return {
      attempts: `${this.config.API_BASE_URL}/api/attempts?limit=5`,
      aiHint: `${this.config.API_BASE_URL}/api/ai/hint`,
      aiCredits: `${this.config.API_BASE_URL}/api/ai/credits`,
      socket: this.config.API_BASE_URL,
    };
  },

  getToken() {
    return localStorage.getItem("token");
  },

  getStoredUser() {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  },

  getCatalog() {
    return window.EXERCISE_CATALOG || {};
  },

  getExerciseById(exerciseId) {
    if (!exerciseId) return null;
    return this.getCatalog()[exerciseId] || null;
  },

  setStatusMessage(message = "") {
    if (this.dom.statusMsg) {
      this.dom.statusMsg.textContent = message;
    }
  },

  setTopbarSubtitle(text = "") {
    if (typeof window.setAppTopbarSubtitle === "function") {
      window.setAppTopbarSubtitle(text);
    }
  },

  setTopbarBackLink(href, label = "Volver") {
    if (typeof window.setAppTopbarBackLink === "function") {
      window.setAppTopbarBackLink(href, label);
    }
  },

  resetAttemptState() {
    this.state.lastAttemptId = null;
    this.state.lastRunStatus = null;
    this.resetAiPanel?.();
    this.updateAiButtonState?.();
  },

  redirectIfNotLogged() {
    if (!this.getToken()) {
      window.location.href = "../login.html";
    }
  },

  initCodeEditor() {
    const { codeTextarea } = this.dom;

    if (!codeTextarea) {
      console.error("No existe el textarea con id='code'");
      return;
    }

    if (typeof CodeMirror === "undefined") {
      console.error("CodeMirror no está cargado");
      return;
    }

    this.state.editor = CodeMirror.fromTextArea(codeTextarea, {
      mode: "python",
      theme: "material-darker",
      lineNumbers: true,
      lineWrapping: false,
      indentUnit: 4,
      tabSize: 4,
      indentWithTabs: false,
      matchBrackets: true,
      extraKeys: {
        Tab(cm) {
          cm.replaceSelection("    ", "end");
        },
        "Ctrl-Space": "autocomplete",
      },
    });

    this.state.editor.on("change", () => {
      if (this.state.lastAttemptId) {
        this.setStatusMessage(
          "Has modificado el código. Ejecuta de nuevo para pedir una pista sobre la versión actual."
        );
        return;
      }

      if (!this.state.interactiveConsoleRunning) {
        this.setStatusMessage(this.config.DEFAULT_STATUS_MESSAGE);
      }
    });

    this.state.editor.setSize("100%", 500);
  },

  setEditorCode(code) {
    if (this.state.editor) {
      this.state.editor.setValue(code || "");
    } else if (this.dom.codeTextarea) {
      this.dom.codeTextarea.value = code || "";
    }
  },

  getEditorCode() {
    return this.state.editor
      ? this.state.editor.getValue()
      : this.dom.codeTextarea?.value || "";
  },

  paintSessionUser() {
    const user = this.getStoredUser();

    if (this.dom.sessionUserNameEl) {
      this.dom.sessionUserNameEl.textContent = user?.name || user?.email || "Alumno";
    }

    if (this.dom.fixedLanguageEl) {
      this.dom.fixedLanguageEl.textContent = "Python";
    }
  },
};