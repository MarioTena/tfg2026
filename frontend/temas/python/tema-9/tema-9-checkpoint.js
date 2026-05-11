const quizAnswers = {
  q1: "C",
  q2: "B",
  q3: "B",
  q4: "C"
};

const questionFeedback = {
  q1: {
    attempt1: "Piensa si aquí quieres leer, sobrescribir o añadir.",
    attempt2: "Si solo quieres recuperar contenido ya existente, no deberías usar un modo de escritura.",
    final: "Correcto: el modo adecuado es r."
  },
  q2: {
    attempt1: "Recuerda qué ocurre con el contenido previo al usar w.",
    attempt2: "Este modo no conserva lo anterior: empieza desde cero.",
    final: "Correcto: w sobrescribe el contenido anterior."
  },
  q3: {
    attempt1: "No pienses en sintaxis bonita, sino en seguridad y gestión del archivo.",
    attempt2: "Su ventaja principal no es leer más rápido, sino cerrar bien el recurso.",
    final: "Correcto: with cierra el archivo automáticamente y hace el flujo más seguro."
  },
  q4: {
    attempt1: "Piensa en cómo suelen venir las líneas leídas desde un archivo.",
    attempt2: "Muchas veces arrastran saltos de línea o espacios que no quieres mostrar tal cual.",
    final: "Correcto: strip() limpia espacios o saltos sobrantes."
  }
};

initCheckpointPage({
  topicId: "9.quiz",
  goToExercisesUrl: "./py-tema9-ejercicios.html",
  attemptStorageKey: "tema9_checkpoint_attempts",
  quizAnswers,
  questionFeedback,
  minCorrect: 3,
  passResultMessage: "Checkpoint superado con {score}/4. Ya se han desbloqueado los ejercicios del tema 9.",
  passSyncMessage: "Ya habías superado este checkpoint. Los ejercicios del tema 9 ya están desbloqueados.",
  failMessageBuilder(score, attemptNumber) {
    if (attemptNumber === 1) {
      return `Has conseguido ${score}/4. Aún no desbloqueas los ejercicios. Revisa las pistas de cada pregunta e inténtalo de nuevo.`;
    }

    if (attemptNumber === 2) {
      return `Has conseguido ${score}/4. Revisa especialmente la diferencia entre r, w y a, y qué aportan with y strip().`;
    }

    return `Has conseguido ${score}/4. A partir de este intento ya puedes ver cuál era la opción correcta para aprender del fallo antes de volver a intentarlo. Los ejercicios seguirán bloqueados hasta que apruebes.`;
  }
});