(function (app) {
  app.resetAiPanel = function resetAiPanel() {
    if (this.dom.aiFeedbackEl) this.dom.aiFeedbackEl.textContent = "";
    this.state.lastHintSource = null;
  };

  app.setAiMessage = function setAiMessage(message, source = null) {
    if (!this.dom.aiFeedbackEl) return;

    const prefixMap = {
      openrouter: "Pista IA:\n\n",
      fallback: "Ayuda técnica básica:\n\n",
    };

    this.dom.aiFeedbackEl.textContent = `${prefixMap[source] || ""}${message || ""}`;
    this.state.lastHintSource = source;
  };

  app.updateAiButtonState = function updateAiButtonState() {
    const { aiHintBtn } = this.dom;
    if (!aiHintBtn) return;

    const hasExercise = !!this.state.currentExerciseId;
    const hasAttempt = !!this.state.lastAttemptId;
    const creditsKnown = typeof this.state.remainingAiCredits === "number";
    const noCredits = creditsKnown && this.state.remainingAiCredits <= 0;

    aiHintBtn.disabled =
      !this.getToken() ||
      !hasExercise ||
      !hasAttempt ||
      this.state.aiCreditsLoadError ||
      noCredits;
  };

  app.getCurrentTopic = function getCurrentTopic() {
    const exerciseId = new URLSearchParams(window.location.search).get("exerciseId");
    if (!exerciseId) return null;

    return this.getExerciseById(exerciseId)?.topic || null;
  };

  app.loadAiCredits = async function loadAiCredits() {
    const token = this.getToken();
    const topic = this.getCurrentTopic();

    if (!token || !topic || !this.dom.aiCreditsEl) {
      this.state.remainingAiCredits = null;
      this.state.aiCreditsLoadError = false;
      this.updateAiButtonState();
      return;
    }

    try {
      const res = await fetch(`${this.api.aiCredits}?topic=${encodeURIComponent(topic)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        this.state.remainingAiCredits = null;
        this.state.aiCreditsLoadError = true;
        this.dom.aiCreditsEl.textContent = "Créditos IA: error";
        this.updateAiButtonState();
        return;
      }

      this.state.remainingAiCredits = data.remainingCredits;
      this.state.aiCreditsLoadError = false;
      this.dom.aiCreditsEl.textContent = `Créditos IA: ${this.state.remainingAiCredits}`;
      this.updateAiButtonState();
    } catch (error) {
      console.error("Error cargando créditos IA:", error);
      this.state.remainingAiCredits = null;
      this.state.aiCreditsLoadError = true;
      this.dom.aiCreditsEl.textContent = "Créditos IA: error";
      this.updateAiButtonState();
    }
  };

  app.requestAiHint = async function requestAiHint() {
    const token = this.getToken();

    if (!token) {
      this.setStatusMessage("Debes iniciar sesión para usar la IA.");
      return;
    }

    if (!this.state.currentExerciseId) {
      this.setStatusMessage("La IA solo está disponible dentro de un ejercicio.");
      return;
    }

    if (!this.state.lastAttemptId) {
      if (this.dom.aiFeedbackEl) {
        this.dom.aiFeedbackEl.textContent =
          "Primero ejecuta tu código para que pueda analizar un intento real.";
      }
      return;
    }

    const ex = this.getExerciseById(this.state.currentExerciseId);

    if (!ex) {
      if (this.dom.aiFeedbackEl) {
        this.dom.aiFeedbackEl.textContent =
          "No se encontró el ejercicio en el catálogo.";
      }
      return;
    }

    if (this.dom.aiHintBtn) this.dom.aiHintBtn.disabled = true;
    if (this.dom.aiFeedbackEl) this.dom.aiFeedbackEl.textContent = "Pensando...";

    try {
      const body = {
        topic: ex.topic,
        attemptId: this.state.lastAttemptId,
        exerciseId: ex.id,
        title: ex.title,
        statement: ex.statement,
        hints: ex.hints || [],
      };

      const res = await fetch(this.api.aiHint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        this.setAiMessage(data.error || "No se pudo obtener una pista");

        if (typeof data.remainingCredits === "number") {
          this.state.remainingAiCredits = data.remainingCredits;
          this.state.aiCreditsLoadError = false;

          if (this.dom.aiCreditsEl) {
            this.dom.aiCreditsEl.textContent = `Créditos IA: ${this.state.remainingAiCredits}`;
          }
        } else {
          await this.loadAiCredits();
        }

        return;
      }

      this.setAiMessage(data.hint || "", data.source || null);

      if (typeof data.remainingCredits === "number") {
        this.state.remainingAiCredits = data.remainingCredits;
        this.state.aiCreditsLoadError = false;

        if (this.dom.aiCreditsEl) {
          this.dom.aiCreditsEl.textContent = `Créditos IA: ${this.state.remainingAiCredits}`;
        }
      }

      this.setStatusMessage(
        data.creditsSpent
          ? "Pista IA generada correctamente."
          : "Se ha mostrado ayuda técnica sin consumir crédito."
      );
    } catch (error) {
      console.error("Error pidiendo pista IA:", error);
      this.setAiMessage("Error de conexión con la IA.");
      await this.loadAiCredits();
    } finally {
      this.updateAiButtonState();
    }
  };
})(window.PlaygroundApp);