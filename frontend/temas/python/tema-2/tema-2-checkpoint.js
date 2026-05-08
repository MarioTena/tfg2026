const quizAnswers = {
  q1: "C",
  q2: "C",
  q3: "B",
  q4: "C"
};

const questionFeedback = {
  q1: {
    attempt1: "Revisa el orden de los casos en un bloque if / elif / else.",
    attempt2: "Python se detiene en la primera condición verdadera, aunque haya otra más específica más abajo.",
    final: "Correcto: imprime “Aprobado”, porque la primera condición ya se cumple y tapa las demás."
  },
  q2: {
    attempt1: "Piensa en tipos y en mayúsculas/minúsculas.",
    attempt2: "No es lo mismo string que número, y el texto distingue mayúsculas de minúsculas.",
    final: "Correcto: 10 == 10.0 devuelve True."
  },
  q3: {
    attempt1: "Aquí tienes que decidir si basta una condición o si deben cumplirse ambas.",
    attempt2: "Si el acceso vale con cualquiera de los dos roles, no debes exigir los dos a la vez.",
    final: "Correcto: si vale cualquiera de las dos condiciones, el operador adecuado es or."
  },
  q4: {
    attempt1: "Piensa en el caso frontera: el 5 debe entrar como aprobado.",
    attempt2: "Si el valor exacto del límite debe contar como válido, necesitas incluirlo.",
    final: "Correcto: nota >= 5 incluye el caso frontera."
  }
};

const minCorrect = 3;
const attemptStorageKey = "tema2_checkpoint_attempts";

const submitQuizBtn = document.getElementById("submitQuizBtn");
const quizResult = document.getElementById("quizResult");
const goToExercisesBtn = document.getElementById("goToExercisesBtn");
const quizPassedCard = document.getElementById("quizPassedCard");
const quizForm = document.getElementById("quizForm");
const unlockHint = document.getElementById("unlockHint");

const quizCompletion = initTopicCompletion({
  topicId: "2.quiz",
  nextUrl: "./py-tema2-ejercicios.html"
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
  goToExercisesBtn.href = "./py-tema2-ejercicios.html";
  goToExercisesBtn.textContent = "Ir a ejercicios";
}

function showPassedCard() {
  if (quizPassedCard) {
    quizPassedCard.style.display = "block";
  }
}

function disableQuizAfterPass() {
  if (submitQuizBtn) {
    submitQuizBtn.disabled = true;
    submitQuizBtn.textContent = "Checkpoint superado";
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
    const options = questionEl.querySelectorAll(".checkpoint-option");

    const isCorrect = selected === expected;

    if (isCorrect) {
      correct += 1;
      questionEl.classList.add("checkpoint-correct");
    } else {
      questionEl.classList.add("checkpoint-incorrect");
    }

    const showCorrectAnswer = attemptNumber >= 3;

    if (showCorrectAnswer) {
      options.forEach((option) => {
        const input = option.querySelector("input");
        if (!input) return;

        if (input.value === expected) {
          option.classList.add("checkpoint-option-correct");
        }

        if (selected && input.value === selected && selected !== expected) {
          option.classList.add("checkpoint-option-incorrect");
        }
      });
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
        feedbackText = `${questionFeedback[key].attempt2} ${questionFeedback[key].final}`;
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
    showResult(`Checkpoint superado con ${score}/4. Ya se han desbloqueado los ejercicios del tema 2.`);
  } catch (error) {
    console.error(error);
    showResult("Has aprobado, pero no se pudo guardar el desbloqueo. Vuelve a intentarlo.");
  }
}

function buildFailMessage(score, attemptNumber) {
  if (attemptNumber === 1) {
    return `Has conseguido ${score}/4. Aún no desbloqueas los ejercicios. Revisa las pistas de cada pregunta e inténtalo de nuevo.`;
  }

  if (attemptNumber === 2) {
    return `Has conseguido ${score}/4. Vas acercándote. Revisa especialmente el orden de los elif, la diferencia entre tipos y los casos frontera.`;
  }

    return `Has conseguido ${score}/4. A partir de este intento ya puedes ver cuál era la opción correcta para aprender del fallo antes de volver a intentarlo. Los ejercicios seguirán bloqueados hasta que apruebes.`;
}

async function syncQuizUI() {
  try {
    const completed = await quizCompletion.isCompleted();
    if (completed) {
      unlockExercises();
      showPassedCard();
      disableQuizAfterPass();
      hideUnlockHint();
      showResult("Ya habías superado este checkpoint. Los ejercicios del tema 2 ya están desbloqueados.");
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

  showResult(buildFailMessage(score, nextAttempt));
});

syncQuizUI();