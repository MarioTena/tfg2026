const quizAnswers = {
  q1: "C",
  q2: "A",
  q3: "C",
  q4: "C"
};

const questionFeedback = {
  q1: {
    attempt1: "Revisa qué significan los índices negativos en una lista.",
    attempt2: "El índice -1 no apunta al principio, sino al final.",
    final: "Bien: has interpretado correctamente cómo funcionan los índices negativos."
  },
  q2: {
    attempt1: "Piensa en qué posición empieza y cuál es el límite final.",
    attempt2: "En slicing, el límite final no se incluye.",
    final: "Bien: has entendido correctamente cómo funciona el slicing."
  },
  q3: {
    attempt1: "Aquí debes distinguir entre trabajar por valor y trabajar por posición.",
    attempt2: "Uno piensa en el contenido y el otro en el índice.",
    final: "Bien: has distinguido correctamente entre trabajar por valor y por posición."
  },
  q4: {
    attempt1: "Sigue mentalmente cómo cambia la variable suma en cada iteración.",
    attempt2: "No cuenta elementos: va acumulando el valor de cada número.",
    final: "Bien: has entendido correctamente la lógica del acumulador."
  }
};

initCheckpointPage({
  topicId: "4.quiz",
  goToExercisesUrl: "./py-tema4-ejercicios.html",
  attemptStorageKey: "tema4_checkpoint_attempts",
  quizAnswers,
  questionFeedback,
  minCorrect: 3,
  passResultMessage: "Checkpoint superado con {score}/4. Ya se han desbloqueado los ejercicios del tema 4.",
  passSyncMessage: "Ya habías superado este checkpoint. Los ejercicios del tema 4 ya están desbloqueados.",
  failMessageBuilder(score, attemptNumber) {
    if (attemptNumber === 1) {
      return `Has conseguido ${score}/4. Aún no desbloqueas los ejercicios. Revisa las pistas de cada pregunta e inténtalo de nuevo.`;
    }

    if (attemptNumber === 2) {
      return `Has conseguido ${score}/4. Revisa especialmente índices negativos, slicing, acumuladores y la diferencia entre trabajar por valor y por posición.`;
    }

    return `Has conseguido ${score}/4. Aún no has interiorizado bien los conceptos clave del tema 4. Vuelve a repasar la teoría y la práctica guiada antes de repetir el checkpoint.`;
  }
});