(function (app) {
  app.resetAiPanel = function resetAiPanel() {
    if (this.dom.aiFeedbackEl) this.dom.aiFeedbackEl.textContent = "";
    this.state.lastHintSource = null;
    this.state.lastAiHintAttemptId = null;
  };

  app.setAiMessage = function setAiMessage(message, source = null, level = null) {
    if (!this.dom.aiFeedbackEl) return;

    let prefix = "";

    if (source === "openrouter") {
      prefix = "Pista IA:\n\n";
    } else if (source === "fallback" && level === "info") {
      prefix = "Comprobación final:\n\n";
    } else if (source === "fallback") {
      prefix = "Ayuda técnica básica:\n\n";
    }

    this.dom.aiFeedbackEl.textContent = `${prefix}${message || ""}`;
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
      this.state.aiHintLoading ||
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
    const exerciseId = this.state.currentExerciseId || "";

    if (!token || !topic || !this.dom.aiCreditsEl) {
      this.state.remainingAiCredits = null;
      this.state.aiCreditsLoadError = false;
      this.updateAiButtonState();
      return;
    }

    try {
      const res = await fetch(
        `${this.api.aiCredits}?topic=${encodeURIComponent(topic)}&exerciseId=${encodeURIComponent(exerciseId)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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

    if (this.state.aiHintLoading) {
      return;
    }

    if (
      this.state.lastAiHintAttemptId === this.state.lastAttemptId &&
      this.dom.aiFeedbackEl?.textContent.trim()
    ) {
      this.setStatusMessage("Ya se ha mostrado una pista para este intento. Ejecuta de nuevo para pedir otra.");
      return;
    }

    this.state.aiHintLoading = true;
    const currentRequestId = ++this.state.aiHintRequestId;
    const currentAttemptId = this.state.lastAttemptId;

    if (this.dom.aiHintBtn) this.dom.aiHintBtn.disabled = true;
    if (this.dom.aiFeedbackEl) this.dom.aiFeedbackEl.textContent = "Pensando...";

    try {
      const body = {
        topic: ex.topic,
        attemptId: currentAttemptId,
        exerciseId: ex.id,
        title: ex.title,
        statement: ex.statement,
        hints: Array.isArray(ex.hints) ? ex.hints : [],
        expectedOutput: ex.expectedOutput || "",
        checks: Array.isArray(ex.checks) ? ex.checks : [],
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

      if (currentRequestId !== this.state.aiHintRequestId) {
        return;
      }

      if (currentAttemptId !== this.state.lastAttemptId) {
        return;
      }

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

      const hintText = data.hint || "";
      const lowerHint = hintText.toLowerCase();

      if (
        lowerHint.includes("user safety: safe") ||
        lowerHint.includes("safety: safe") ||
        lowerHint.includes("content safety") ||
        lowerHint.includes("policy: safe")
      ) {
        this.setAiMessage(
          "No se ha podido generar una pista útil para este intento. Ejecuta de nuevo o revisa el enunciado paso a paso.",
          "fallback",
          "warning"
        );
        this.state.lastAiHintAttemptId = currentAttemptId;
        return;
      }

      this.setAiMessage(hintText, data.source || null, data.level || null);
      this.state.lastAiHintAttemptId = currentAttemptId;

      if (typeof data.remainingCredits === "number") {
        this.state.remainingAiCredits = data.remainingCredits;
        this.state.aiCreditsLoadError = false;

        if (this.dom.aiCreditsEl) {
          this.dom.aiCreditsEl.textContent = `Créditos IA: ${this.state.remainingAiCredits}`;
        }
      }

      const isInfoFallback = data.source === "fallback" && data.level === "info";

      this.setStatusMessage(
        data.creditsSpent
          ? "Pista IA generada correctamente."
          : isInfoFallback
            ? "Se ha mostrado una comprobación automática sin consumir crédito."
            : "Se ha mostrado ayuda técnica sin consumir crédito."
      );
    } catch (error) {
      console.error("Error pidiendo pista IA:", error);
      this.setAiMessage("Error de conexión con la IA.");
      await this.loadAiCredits();
    } finally {
      this.state.aiHintLoading = false;
      this.updateAiButtonState();
    }
  };

})(window.PlaygroundApp);