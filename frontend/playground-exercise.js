(function (app) {
  app.getReturnToFromURL = function getReturnToFromURL() {
    return new URLSearchParams(window.location.search).get("returnTo");
  };

  app.getTopicPageFromExercise = function getTopicPageFromExercise(ex) {
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
  };

  app.updateBackToTopicButton = function updateBackToTopicButton(exercise) {
    const backHref =
      this.getReturnToFromURL() ||
      this.getTopicPageFromExercise(exercise) ||
      "../temas/python/index.html";

    const topbar = document.getElementById("app-topbar");

    if (topbar) {
      topbar.dataset.showBack = "true";
      topbar.dataset.backHref = backHref;
      topbar.dataset.backLabel = "Volver";
    }

    this.setTopbarBackLink(backHref, "Volver");

    const applyBackLink = () => {
      this.setTopbarBackLink(backHref, "Volver");
    };

    applyBackLink();

    document.addEventListener("DOMContentLoaded", applyBackLink);

    setTimeout(applyBackLink, 100);
  };

  app.updatePlaygroundHeader = function updatePlaygroundHeader(exercise) {
    const langLabel = "Python";

    if (this.dom.playgroundLangBadgeEl) {
      this.dom.playgroundLangBadgeEl.textContent = langLabel;
    }

    if (this.dom.playgroundModeBadgeEl) {
      this.dom.playgroundModeBadgeEl.textContent = exercise
        ? "Modo ejercicio"
        : "Modo libre";
    }

    if (this.dom.editorMetaEl) {
      this.dom.editorMetaEl.textContent = exercise
        ? `${langLabel} · ${exercise.type || "Práctica"} · ${exercise.estimatedTime || "-"}`
        : `${langLabel} · Modo libre`;
    }

    if (this.dom.editorTitleEl) {
      this.dom.editorTitleEl.textContent = exercise?.title
        ? `Resolviendo: ${exercise.title}`
        : "Editor de código";
    }

    this.setTopbarSubtitle(
      exercise
        ? `Trabajando: ${exercise.title || "Ejercicio"}`
        : "Ejecuta código y prueba ideas libremente."
    );
  };

  app.updateExerciseUI = function updateExerciseUI(ex, lang) {
    const langLabel = lang || ex?.language || "python";

    const badgeMap = [
      [this.dom.exerciseBadgeLangEl, `Lenguaje: ${langLabel}`],
      [this.dom.exerciseBadgeTypeEl, `Modo: ${ex?.type || "Práctica"}`],
      [this.dom.exerciseBadgeDifficultyEl, `Dificultad: ${ex?.difficulty || "-"}`],
      [this.dom.exerciseBadgeTimeEl, `Tiempo: ${ex?.estimatedTime || "-"}`],
      [this.dom.exerciseBadgeSkillEl, `Enfoque: ${ex?.skill || "-"}`],
    ];

    badgeMap.forEach(([el, text]) => {
      if (el) el.textContent = text;
    });

    this.updateBackToTopicButton(ex);
    this.updatePlaygroundHeader(ex);
  };

  app.stopInteractiveConsoleIfRunning = function stopInteractiveConsoleIfRunning() {
    if (this.state.interactiveSessionId) {
      this.stopInteractiveConsole();
    }
  };

  app.loadExerciseFromURL = function loadExerciseFromURL() {
    this.stopInteractiveConsoleIfRunning();

    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang");
    const exerciseId = params.get("exerciseId");

    if (!exerciseId) {
      this.state.currentExerciseId = null;
      this.resetAttemptState();

      if (this.dom.exercisePanelEl) {
        this.dom.exercisePanelEl.style.display = "none";
      }

      this.updateBackToTopicButton(null);
      this.updatePlaygroundHeader(null);
      return;
    }

    this.state.currentExerciseId = exerciseId;
    this.resetAttemptState();

    const ex = this.getExerciseById(exerciseId);

    if (this.dom.exercisePanelEl) {
      this.dom.exercisePanelEl.style.display = "block";
    }

    if (ex) {
      if (this.dom.exerciseTitleEl) {
        this.dom.exerciseTitleEl.textContent = ex.title || `Ejercicio: ${exerciseId}`;
      }

      if (this.dom.exerciseStatementEl) {
        this.dom.exerciseStatementEl.textContent = ex.statement || "";
      }

      if (this.dom.exerciseHintsEl) {
        this.dom.exerciseHintsEl.innerHTML = "";
        (ex.hints || []).forEach((hint) => {
          const li = document.createElement("li");
          li.textContent = hint;
          this.dom.exerciseHintsEl.appendChild(li);
        });
      }

      this.updateExerciseUI(ex, lang || ex.language);

      if (ex.starterCode) {
        this.setEditorCode(ex.starterCode);
      }

      const resetBtn = document.getElementById("btn-reset-template");
      if (resetBtn) {
        resetBtn.onclick = () => {
          this.stopInteractiveConsoleIfRunning();
          if (ex.starterCode) this.setEditorCode(ex.starterCode);
          this.setStatusMessage("Plantilla reiniciada.");
        };
      }

      const copyBtn = document.getElementById("btn-copy-hints");
      if (copyBtn) {
        copyBtn.onclick = async () => {
          const txt = (ex.hints || []).join("\n- ");
          try {
            await navigator.clipboard.writeText("- " + txt);
            this.setStatusMessage("Pistas copiadas al portapapeles.");
          } catch {
            this.setStatusMessage("No se pudo copiar (permiso del navegador).");
          }
        };
      }

      return;
    }

    if (this.dom.exerciseTitleEl) {
      this.dom.exerciseTitleEl.textContent = `Ejercicio: ${exerciseId}`;
    }

    if (this.dom.exerciseStatementEl) {
      this.dom.exerciseStatementEl.textContent =
        "Este ejercicio no está en el catálogo todavía.";
    }

    if (this.dom.exerciseHintsEl) {
      this.dom.exerciseHintsEl.innerHTML = "";
      const li = document.createElement("li");
      li.textContent = "Añade este exerciseId al archivo del catálogo correspondiente.";
      this.dom.exerciseHintsEl.appendChild(li);
    }

    this.updateBackToTopicButton(null);
    this.updatePlaygroundHeader({ title: `Ejercicio: ${exerciseId}` });
    this.setTopbarSubtitle("Ejercicio no encontrado en catálogo.");
  };
})(window.PlaygroundApp);