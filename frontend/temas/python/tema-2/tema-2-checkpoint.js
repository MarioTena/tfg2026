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
      return `Has conseguido ${score}/4. Vas acercándote. Revisa especialmente el orden de los elif, la diferencia entre tipos y los casos frontera.`;
    }

    return `Has conseguido ${score}/4. A partir de este intento ya puedes ver cuál era la opción correcta para aprender del fallo antes de volver a intentarlo. Los ejercicios seguirán bloqueados hasta que apruebes.`;
  }
});