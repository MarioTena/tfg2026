function initPracticePage({
  topicId,
  nextUrl,
  nextBtnId = "nextBtn",
  completeBtnId = "completeBtn",
  unlockHintId = "unlockHint",
  completionMessageId = "completionMessage",
  lockedLabel = "Siguiente bloque",
  unlockedLabel = "Continuar",
  successMessage = "Has marcado este bloque como completado.",
  alreadyCompletedMessage = "Este bloque ya estaba completado.",
  onCompleted = null,
  onAlreadyCompleted = null
}) {
  const completion = initTopicCompletion({
    topicId,
    nextUrl
  });

  const nextBtn = document.getElementById(nextBtnId);
  const completeBtn = document.getElementById(completeBtnId);
  const unlockHint = document.getElementById(unlockHintId);
  const completionMessage = document.getElementById(completionMessageId);

  function unlockNextButton() {
    if (!nextBtn) return;

    nextBtn.classList.remove("btn-disabled");
    nextBtn.classList.add("btn-primary");
    nextBtn.href = nextUrl || "javascript:void(0)";
    nextBtn.textContent = unlockedLabel;
  }

  function lockNextButton() {
    if (!nextBtn) return;

    nextBtn.classList.add("btn-disabled");
    nextBtn.classList.remove("btn-primary");
    nextBtn.href = "javascript:void(0)";
    nextBtn.textContent = lockedLabel;
  }

  function showCompletedState() {
    if (completeBtn) {
      completeBtn.style.display = "none";
    }
  }

  async function syncCompletionUI() {
    try {
      const completed = await completion.isCompleted();

      if (completed) {
        unlockNextButton();
        showCompletedState();
        hideElement(unlockHint);
        showCompletionMessage(completionMessage, alreadyCompletedMessage);

        if (typeof onAlreadyCompleted === "function") {
          onAlreadyCompleted();
        }
      } else {
        lockNextButton();
      }
    } catch (error) {
      console.error("Error comprobando estado del bloque:", error);
      lockNextButton();
    }
  }

  completeBtn?.addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    const originalText = btn.textContent;

    try {
      btn.disabled = true;
      btn.textContent = "Guardando...";

      await completion.completeTopic();

      unlockNextButton();
      showCompletedState();
      hideElement(unlockHint);
      showCompletionMessage(completionMessage, successMessage);

      if (typeof onCompleted === "function") {
        onCompleted();
      }
    } catch (error) {
      console.error("Error marcando práctica como completada:", error);
      btn.disabled = false;
      btn.textContent = originalText;
      showCompletionMessage(
        completionMessage,
        error.message || "No se pudo guardar el progreso."
      );
    }
  });

  syncCompletionUI();
}