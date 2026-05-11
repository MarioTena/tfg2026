function initExercisesPage({
  topicId,
  completeBtnId = "completeExercisesBtn",
  unlockHintId = "unlockHint",
  completionMessageId = "completionMessage",
  showCompletedBadge = false,
  completedText = "Ejercicios completados ✅",
  successMessage = "Has marcado los ejercicios como completados.",
  alreadyCompletedMessage = "Estos ejercicios ya estaban completados."
}) {
  const completion = initTopicCompletion({ topicId });

  const completeBtn = document.getElementById(completeBtnId);
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
        hideElement(unlockHint);
        showCompletionMessage(completionMessage, alreadyCompletedMessage);
      }
    } catch (error) {
      console.error("Error comprobando estado de ejercicios:", error);
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
      hideElement(unlockHint);
      showCompletionMessage(completionMessage, successMessage);
    } catch (error) {
      console.error("Error marcando ejercicios como completados:", error);
      btn.disabled = false;
      btn.textContent = originalText;
      showCompletionMessage(completionMessage, error.message || "No se pudo guardar el progreso.");
    }
  });

  syncCompletionUI();
}