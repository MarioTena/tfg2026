const quizAnswers = {
  q1: "B",
  q2: "C",
  q3: "C",
  q4: "C"
};

const questionFeedback = {
  q1: {
    attempt1: "Revisa cómo funciona range(n) y desde qué valor empieza.",
    attempt2: "range(3) no llega hasta 3 incluido.",
    final: "Bien: has entendido correctamente cómo se generan los valores con range()."
  },
  q2: {
    attempt1: "Piensa en cuándo controlas la secuencia y cuándo dependes de una condición.",
    attempt2: "No elijas por sintaxis: piensa en el tipo de problema que resuelve cada uno.",
    final: "Bien: has distinguido correctamente cuándo encaja mejor for y cuándo while."
  },
  q3: {
    attempt1: "Compáralo mentalmente con continue.",
    attempt2: "Una instrucción salta una iteración; la otra termina el bucle entero.",
    final: "Bien: has diferenciado correctamente entre interrumpir una iteración y salir del bucle."
  },
  q4: {
    attempt1: "Observa si la condición puede dejar de cumplirse en algún momento.",
    attempt2: "Dentro del bucle no se está actualizando la variable de control.",
    final: "Bien: has identificado correctamente el riesgo de un bucle infinito."
  }
};

initCheckpointPage({
  topicId: "3.quiz",
  goToExercisesUrl: "./py-tema3-ejercicios.html",
  attemptStorageKey: "tema3_checkpoint_attempts",
  quizAnswers,
  questionFeedback,
  minCorrect: 3,
  passResultMessage: "Checkpoint superado con {score}/4. Ya se han desbloqueado los ejercicios del tema 3.",
  passSyncMessage: "Ya habías superado este checkpoint. Los ejercicios del tema 3 ya están desbloqueados.",
  failMessageBuilder(score, attemptNumber) {
    if (attemptNumber === 1) {
      return `Has conseguido ${score}/4. Aún no desbloqueas los ejercicios. Revisa las pistas de cada pregunta e inténtalo de nuevo.`;
    }

    if (attemptNumber === 2) {
      return `Has conseguido ${score}/4. Revisa especialmente cómo funciona range(), la diferencia entre for y while, y qué cambia entre break y continue.`;
    }

    return `Has conseguido ${score}/4. Aún no has interiorizado bien los conceptos clave del tema 3. Vuelve a repasar la teoría y la práctica guiada antes de repetir el checkpoint.`;
  }
});