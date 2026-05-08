const quizAnswers = {
  q1: "B",
  q2: "B",
  q3: "B",
  q4: "C"
};

const questionFeedback = {
  q1: {
    attempt1: "Piensa si aquí importa la posición o el significado de cada dato.",
    attempt2: "Cuando quieres acceder por nombre como precio o stock, una lista suele ser peor opción.",
    final: "Correcto: un diccionario encaja mejor porque cada dato tiene una clave con significado."
  },
  q2: {
    attempt1: "Aquí solo estás accediendo al valor asociado a una clave concreta.",
    attempt2: "La clave 'anio' apunta al valor numérico guardado en el diccionario.",
    final: "Correcto: imprime 2010."
  },
  q3: {
    attempt1: "Piensa en qué pasa si la clave no existe realmente.",
    attempt2: "Acceder directamente con corchetes puede fallar si la clave falta.",
    final: "Correcto: get() o una comprobación con in es más seguro cuando no tienes certeza."
  },
  q4: {
    attempt1: "Distingue entre métodos que consultan y métodos que modifican.",
    attempt2: "Uno de estos métodos elimina algo y además te lo entrega como resultado.",
    final: "Correcto: pop() elimina una clave y devuelve su valor."
  }
};

const minCorrect = 3;
const attemptStorageKey = "tema6_checkpoint_attempts";

const submitQuizBtn = document.getElementById("submitQuizBtn");
const quizResult = document.getElementById("quizResult");
const goToExercisesBtn = document.getElementById("goToExercisesBtn");
const quizPassedCard = document.getElementById("quizPassedCard");
const quizForm = document.getElementById("quizForm");
const unlockHint = document.getElementById("unlockHint");

const quizCompletion = initTopicCompletion({
  topicId: "6.quiz",
  nextUrl: "./py-tema6-ejercicios.html"
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
  goToExercisesBtn.href = "./py-tema6-ejercicios.html";
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
    showResult(`Checkpoint superado con ${score}/4. Ya se han desbloqueado los ejercicios del tema 6.`);
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
    return `Has conseguido ${score}/4. Revisa especialmente la diferencia entre lista y diccionario, el acceso por clave y cuándo conviene usar get().`;
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
      showResult("Ya habías superado este checkpoint. Los ejercicios del tema 6 ya están desbloqueados.");
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