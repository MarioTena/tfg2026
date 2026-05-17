function initSubtopicPage({
  topicId,
  miniTopicId = null,
  nextUrl,
  completeBtnId = "completeBtn",
  miniCompleteBtnId = "miniCompleteBtn",
  nextBtnId = "nextBtn",
  unlockHintId = "unlockHint",
  completionMessageId = "completionMessage",
  unlockedLabel = "Ir al siguiente bloque",
  showCompletedBadge = false,
  completedText = "Subtema completado ✅",
  miniCompletedText = "Mini-reto completado ✅",
  completionSuccessMessage = "Has marcado este subtema como completado. Ya se ha desbloqueado el siguiente bloque del tema.",
  alreadyCompletedMessage = "Este subtema ya estaba completado. Ya puedes pasar al siguiente bloque.",  
  bothCompletedMessage = "Ya habías completado este subtema y su mini-reto. El siguiente bloque ya está disponible.",
}) {
  const subtopicCompletion = initTopicCompletion({
    topicId,
    nextUrl,
    nextBtnId
  });

  const miniCompletion = miniTopicId
    ? initTopicCompletion({ topicId: miniTopicId })
    : null;

  const completeBtn = document.getElementById(completeBtnId);
  const miniCompleteBtn = document.getElementById(miniCompleteBtnId);
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

  function showMiniCompletedState() {
    hideButtonAndShowBadge(miniCompleteBtn, "miniCompletedBadge", miniCompletedText);
  }

  function addReturnToToPlaygroundLinks() {
    const currentPage = window.location.href;

    document.querySelectorAll('a[href*="playground/index.html"]').forEach((link) => {
      try {
        const url = new URL(link.getAttribute("href"), window.location.href);

        if (!url.searchParams.has("returnTo")) {
          url.searchParams.set("returnTo", currentPage);
          link.href = url.href;
        }
      } catch (error) {
        console.warn("No se pudo añadir returnTo al enlace de playground:", error);
      }
    });
  }

document.addEventListener("DOMContentLoaded", addReturnToToPlaygroundLinks);

  async function syncCompletionUI() {
    try {
      const subtopicDone = await subtopicCompletion.isCompleted();
      const miniDone = miniCompletion ? await miniCompletion.isCompleted() : false;

      if (subtopicDone) {
        showCompletedState();
        unlockNextButton(nextBtn, nextUrl, unlockedLabel);
        hideElement(unlockHint);
      }

      if (miniDone) {
        showMiniCompletedState();
      }

      if (subtopicDone && miniDone) {
        showCompletionMessage(completionMessage, bothCompletedMessage);
      } else if (subtopicDone) {
        showCompletionMessage(completionMessage, alreadyCompletedMessage);
      }
    } catch (error) {
      console.error("Error comprobando estado del subtema:", error);
    }
  }

  completeBtn?.addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    const originalText = btn.textContent;

    try {
      btn.disabled = true;
      btn.textContent = "Guardando...";

      await subtopicCompletion.completeTopic();

      showCompletedState();
      unlockNextButton(nextBtn, nextUrl, unlockedLabel);
      hideElement(unlockHint);
      showCompletionMessage(completionMessage, completionSuccessMessage);
    } catch (error) {
      console.error("Error al completar el subtema:", error);
      btn.disabled = false;
      btn.textContent = originalText;
      showCompletionMessage(completionMessage, error.message || "No se pudo guardar el progreso.");
    }
  });

  miniCompleteBtn?.addEventListener("click", async (e) => {
    if (!miniCompletion) return;

    const btn = e.currentTarget;
    const originalText = btn.textContent;

    try {
      btn.disabled = true;
      btn.textContent = "Guardando...";

      await miniCompletion.completeTopic();

      showMiniCompletedState();
    } catch (error) {
      console.error("Error al completar el mini-reto:", error);
      btn.disabled = false;
      btn.textContent = originalText;
      showCompletionMessage(completionMessage, error.message || "No se pudo guardar el progreso del mini-reto.");
    }
  });

  syncCompletionUI();
}