const quizAnswers = {
  q1: "B",
  q2: "C",
  q3: "C",
  q4: "B"
};

const questionFeedback = {
  q1: {
    attempt1: "Piensa en nivel general frente a caso concreto detectado por Python.",
    attempt2: "Uno es la idea amplia del problema; el otro es el tipo concreto que aparece durante la ejecución.",
    final: "Correcto: error es la idea general y excepción es un fallo concreto detectado durante la ejecución."
  },
  q2: {
    attempt1: "Aquí el riesgo viene de convertir algo con formato no válido.",
    attempt2: "No estás abriendo archivos ni dividiendo: estás convirtiendo texto a entero.",
    final: "Correcto: la excepción más típica aquí es ValueError."
  },
  q3: {
    attempt1: "Distingue entre bloque de error, bloque de éxito y bloque final.",
    attempt2: "Uno se activa si falla, otro siempre, y otro solo si todo fue bien.",
    final: "Correcto: else se ejecuta solo si no hubo excepción."
  },
  q4: {
    attempt1: "Aquí no ha fallado Python todavía: el valor existe, pero incumple una regla del programa.",
    attempt2: "Esto se parece más a validar una condición propia que a capturar un fallo técnico externo.",
    final: "Correcto: aquí encaja validar y lanzar una excepción con raise."
  }
};

initCheckpointPage({
  topicId: "10.quiz",
  goToExercisesUrl: "./py-tema10-ejercicios.html",
  attemptStorageKey: "tema10_checkpoint_attempts",
  quizAnswers,
  questionFeedback,
  minCorrect: 3,
  passResultMessage: "Checkpoint superado con {score}/4. Ya se han desbloqueado los ejercicios del tema 10.",
  passSyncMessage: "Ya habías superado este checkpoint. Los ejercicios del tema 10 ya están desbloqueados.",
  failMessageBuilder(score, attemptNumber) {
    if (attemptNumber === 1) {
      return `Has conseguido ${score}/4. Aún no desbloqueas los ejercicios. Revisa las pistas de cada pregunta e inténtalo de nuevo.`;
    }

    if (attemptNumber === 2) {
      return `Has conseguido ${score}/4. Revisa especialmente la diferencia entre excepción y regla del programa, el papel de else y cuándo usar raise.`;
    }

    return `Has conseguido ${score}/4. A partir de este intento ya puedes ver cuál era la opción correcta para aprender del fallo antes de volver a intentarlo. Los ejercicios seguirán bloqueados hasta que apruebes.`;
  }
});