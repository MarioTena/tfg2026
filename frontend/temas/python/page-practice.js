function initPracticePage({
  topicId,
  nextUrl,
  completeBtnId = "completeBtn",
  nextBtnId = "nextBtn",
  unlockHintId = "unlockHint",
  completionMessageId = "completionMessage",
  unlockedLabel = "Ir al checkpoint",
  showCompletedBadge = false,
  completedText = "Misión completada ✅",
  successMessage = "Has marcado esta misión como completada. Ya se ha desbloqueado el siguiente paso.",
  alreadyCompletedMessage = "Esta misión ya estaba completada. El siguiente paso ya está disponible."
}) {
  const completion = initTopicCompletion({
    topicId,
    nextUrl,
    nextBtnId
  });

  const completeBtn = document.getElementById(completeBtnId);
  const nextBtn = document.getElementById(nextBtnId);
  const unlockHint = document.getElementById(unlockHintId);
  const completionMessage = document.getElementById(completionMessageId);

  function showCompletedState() {
    if (!completeBtn) return;

    if (showCompletedBadge) {
      hideButtonAndShowBadge(completeBtn, "completedBadge", completedText);
      return;
    }

    completeBtn.style.display = "none";
  }

  async function syncCompletionUI() {
    try {
      const completed = await completion.isCompleted();

      if (completed) {
        showCompletedState();
        unlockNextButton(nextBtn, nextUrl, unlockedLabel);
        hideElement(unlockHint);
        showCompletionMessage(completionMessage, alreadyCompletedMessage);
      }
    } catch (error) {
      console.error("Error comprobando estado:", error);
    }
  }

  completeBtn?.addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    const originalText = btn.textContent;

    try {
      btn.disabled = true;
      btn.textContent = "Guardando...";

      await completion.completeTopic();

      showCompletedState();
      unlockNextButton(nextBtn, nextUrl, unlockedLabel);
      hideElement(unlockHint);
      showCompletionMessage(completionMessage, successMessage);
    } catch (error) {
      console.error("Error al completar:", error);
      btn.disabled = false;
      btn.textContent = originalText;
      showCompletionMessage(completionMessage, error.message || "No se pudo guardar el progreso.");
    }
  });

  syncCompletionUI();
}