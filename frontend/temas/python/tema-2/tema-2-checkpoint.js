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
    final: "Bien: has entendido correctamente cómo influye el orden de evaluación en un bloque condicional."
  },
  q2: {
    attempt1: "Piensa en tipos y en mayúsculas/minúsculas.",
    attempt2: "No es lo mismo string que número, y el texto distingue mayúsculas de minúsculas.",
    final: "Bien: has distinguido correctamente cómo funcionan las comparaciones entre valores."
  },
  q3: {
    attempt1: "Aquí tienes que decidir si basta una condición o si deben cumplirse ambas.",
    attempt2: "Si el acceso vale con cualquiera de los dos roles, no debes exigir los dos a la vez.",
    final: "Bien: has identificado correctamente cuándo basta con que se cumpla una condición."
  },
  q4: {
    attempt1: "Piensa en el caso frontera: el 5 debe entrar como aprobado.",
    attempt2: "Si el valor exacto del límite debe contar como válido, necesitas incluirlo.",
    final: "Bien: has entendido correctamente cómo tratar un caso frontera en una condición."
  }
};

initCheckpointPage({
  topicId: "2.quiz",
  goToExercisesUrl: "./py-tema2-ejercicios.html",
  attemptStorageKey: "tema2_checkpoint_attempts",
  quizAnswers,
  questionFeedback,
  minCorrect: 3,
  passResultMessage: "Checkpoint superado con {score}/4. Ya se han desbloqueado los ejercicios del tema 2.",
  passSyncMessage: "Ya habías superado este checkpoint. Los ejercicios del tema 2 ya están desbloqueados.",
  failMessageBuilder(score, attemptNumber) {
    if (attemptNumber === 1) {
      return `Has conseguido ${score}/4. Aún no desbloqueas los ejercicios. Revisa las pistas de cada pregunta e inténtalo de nuevo.`;
    }

    if (attemptNumber === 2) {
      return `Has conseguido ${score}/4. Revisa especialmente el orden de los elif, la diferencia entre tipos y los casos frontera.`;
    }

    return `Has conseguido ${score}/4. Aún no has interiorizado bien los conceptos clave del tema 2. Vuelve a repasar la teoría y la práctica guiada antes de repetir el checkpoint.`;
  }
});