const quizAnswers = {
  q1: "B",
  q2: "C",
  q3: "A",
  q4: "B"
};

const questionFeedback = {
  q1: {
    attempt1: "Revisa la diferencia entre definir una función y llamarla.",
    attempt2: "def crea la función, pero no la ejecuta por sí sola.",
    final: "Correcto: ese código solo define la función; para ejecutarla hay que llamarla."
  },
  q2: {
    attempt1: "Piensa en qué aparece en la definición y qué aparece en la llamada.",
    attempt2: "Uno es el nombre interno que recibe el dato; el otro es el valor real que se pasa.",
    final: "Correcto: nombre es el parámetro y \"Ana\" es el argumento."
  },
  q3: {
    attempt1: "No confundas imprimir con devolver.",
    attempt2: "La función muestra un valor, pero como no devuelve nada útil, el resultado asignado no es 8.",
    final: "Correcto: primero imprime 8 y después imprime None."
  },
  q4: {
    attempt1: "Piensa en dónde existe la variable mensaje.",
    attempt2: "La variable se crea dentro de la función y no está disponible fuera.",
    final: "Correcto: mensaje es local a la función y fuera no existe."
  }
};

const minCorrect = 3;
const attemptStorageKey = "tema5_checkpoint_attempts";

const submitQuizBtn = document.getElementById("submitQuizBtn");
const quizResult = document.getElementById("quizResult");
const goToExercisesBtn = document.getElementById("goToExercisesBtn");
const quizPassedCard = document.getElementById("quizPassedCard");
const quizForm = document.getElementById("quizForm");
const unlockHint = document.getElementById("unlockHint");

const quizCompletion = initTopicCompletion({
  topicId: "5.quiz",
  nextUrl: "./py-tema5-ejercicios.html"
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
  goToExercisesBtn.href = "./py-tema5-ejercicios.html";
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
    showResult(`Checkpoint superado con ${score}/4. Ya se han desbloqueado los ejercicios del tema 5.`);
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
    return `Has conseguido ${score}/4. Revisa especialmente la diferencia entre definir y llamar, entre parámetro y argumento, y entre print y return.`;
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
      showResult("Ya habías superado este checkpoint. Los ejercicios del tema 5 ya están desbloqueados.");
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