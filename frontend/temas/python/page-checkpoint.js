function initCheckpointPage({
  topicId,
  goToExercisesUrl,
  attemptStorageKey,
  quizAnswers,
  questionFeedback,
  minCorrect = 3,
  submitQuizBtnId = "submitQuizBtn",
  quizResultId = "quizResult",
  goToExercisesBtnId = "goToExercisesBtn",
  quizPassedCardId = "quizPassedCard",
  quizFormId = "quizForm",
  unlockHintId = "unlockHint",
  passButtonText = "Checkpoint superado",
  unlockedButtonText = "Ir a ejercicios",
  passResultMessage = "Checkpoint superado. Ya se han desbloqueado los ejercicios.",
  passSyncMessage = "Ya habías superado este checkpoint. Los ejercicios ya están desbloqueados.",
  passErrorMessage = "Has aprobado, pero no se pudo guardar el desbloqueo. Vuelve a intentarlo.",
  failMessageBuilder = null,
  maxGuidedAttempts = 2
}) {
  const submitQuizBtn = document.getElementById(submitQuizBtnId);
  const quizResult = document.getElementById(quizResultId);
  const goToExercisesBtn = document.getElementById(goToExercisesBtnId);
  const quizPassedCard = document.getElementById(quizPassedCardId);
  const quizForm = document.getElementById(quizFormId);
  const unlockHint = document.getElementById(unlockHintId);

  const quizCompletion = initTopicCompletion({
    topicId,
    nextUrl: goToExercisesUrl
  });

  function getAttempts() {
    const raw = localStorage.getItem(attemptStorageKey);
    const parsed = Number(raw);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }

  function setAttempts(value) {
    localStorage.setItem(attemptStorageKey, String(value));
  }

  function resetAttempts() {
    localStorage.removeItem(attemptStorageKey);
  }

  function getSelectedValue(name) {
    const checked = document.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : null;
  }

  function showResult(message) {
    if (!quizResult) return;
    quizResult.textContent = message;
    quizResult.style.display = "block";
  }

  function hideUnlockHint() {
    if (!unlockHint) return;
    unlockHint.style.display = "none";
  }

  function unlockExercises() {
    if (!goToExercisesBtn) return;
    goToExercisesBtn.classList.remove("btn-disabled");
    goToExercisesBtn.href = goToExercisesUrl;
    goToExercisesBtn.textContent = unlockedButtonText;
  }

  function showPassedCard() {
    if (quizPassedCard) {
      quizPassedCard.style.display = "block";
    }
  }

  function disableQuizAfterPass() {
    if (submitQuizBtn) {
      submitQuizBtn.disabled = true;
      submitQuizBtn.textContent = passButtonText;
      submitQuizBtn.classList.add("btn-disabled");
    }

    if (quizForm) {
      const inputs = quizForm.querySelectorAll("input");
      inputs.forEach((input) => {
        input.disabled = true;
      });
    }
  }

  function resetQuestionStyles() {
    const questions = document.querySelectorAll(".checkpoint-question");

    questions.forEach((question) => {
      question.classList.remove("checkpoint-correct", "checkpoint-incorrect");

      const options = question.querySelectorAll(".checkpoint-option");
      options.forEach((option) => {
        option.classList.remove("checkpoint-option-correct", "checkpoint-option-incorrect");
      });

      const feedback = question.querySelector(".checkpoint-feedback");
      if (feedback) {
        feedback.style.display = "none";
        feedback.textContent = "";
      }
    });
  }

  function renderCorrection(attemptNumber) {
    let correct = 0;

    Object.keys(quizAnswers).forEach((key) => {
      const questionEl = document.querySelector(`.checkpoint-question[data-question="${key}"]`);
      if (!questionEl) return;

      const selected = getSelectedValue(key);
      const expected = quizAnswers[key];
      const feedbackEl = questionEl.querySelector(".checkpoint-feedback");

      const isCorrect = selected === expected;

      if (isCorrect) {
        correct += 1;
        questionEl.classList.add("checkpoint-correct");
      } else {
        questionEl.classList.add("checkpoint-incorrect");
      }

      if (feedbackEl) {
        let feedbackText = "";

        if (isCorrect) {
          feedbackText = questionFeedback[key].final;
        } else if (attemptNumber === 1) {
          feedbackText = questionFeedback[key].attempt1;
        } else if (attemptNumber === 2) {
          feedbackText = questionFeedback[key].attempt2;
        } else {
          feedbackText =
            "Todavía no has interiorizado bien este concepto. Vuelve a repasar la teoría y la práctica guiada del tema antes de intentarlo de nuevo.";
        }

        feedbackEl.textContent = feedbackText;
        feedbackEl.style.display = "block";
      }
    });

    return correct;
  }

  async function markQuizAsPassed(score) {
    try {
      await quizCompletion.completeTopic();
      unlockExercises();
      showPassedCard();
      disableQuizAfterPass();
      hideUnlockHint();
      resetAttempts();
      showResult(passResultMessage.replace("{score}", score));
    } catch (error) {
      console.error(error);
      showResult(passErrorMessage);
    }
  }

  function defaultFailMessageBuilder(score, attemptNumber) {
    if (attemptNumber === 1) {
      return `Has conseguido ${score}/4. Aún no desbloqueas los ejercicios. Revisa las pistas de cada pregunta e inténtalo de nuevo.`;
    }

    if (attemptNumber === 2) {
      return `Has conseguido ${score}/4. Revisa de nuevo las ideas clave del tema antes de volver a intentarlo.`;
    }

    return `Has conseguido ${score}/4. Aún no has interiorizado bien los conceptos clave de este tema. Vuelve a repasar la teoría y la práctica guiada antes de repetir el checkpoint.`;
  }

  async function syncQuizUI() {
    try {
      const completed = await quizCompletion.isCompleted();
      if (completed) {
        unlockExercises();
        showPassedCard();
        disableQuizAfterPass();
        hideUnlockHint();
        showResult(passSyncMessage);
      }
    } catch (error) {
      console.error("Error comprobando el checkpoint:", error);
    }
  }

  submitQuizBtn?.addEventListener("click", async () => {
    resetQuestionStyles();

    const nextAttempt = getAttempts() + 1;
    setAttempts(nextAttempt);

    const score = renderCorrection(nextAttempt);

    if (score >= minCorrect) {
      await markQuizAsPassed(score);
      return;
    }

    const buildMessage = failMessageBuilder || defaultFailMessageBuilder;
    showResult(buildMessage(score, nextAttempt));
  });

  syncQuizUI();
}