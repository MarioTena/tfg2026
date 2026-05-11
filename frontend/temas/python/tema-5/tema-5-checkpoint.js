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

initCheckpointPage({
  topicId: "5.quiz",
  goToExercisesUrl: "./py-tema5-ejercicios.html",
  attemptStorageKey: "tema5_checkpoint_attempts",
  quizAnswers,
  questionFeedback,
  minCorrect: 3,
  passResultMessage: "Checkpoint superado con {score}/4. Ya se han desbloqueado los ejercicios del tema 5.",
  passSyncMessage: "Ya habías superado este checkpoint. Los ejercicios del tema 5 ya están desbloqueados.",
  failMessageBuilder(score, attemptNumber) {
    if (attemptNumber === 1) {
      return `Has conseguido ${score}/4. Aún no desbloqueas los ejercicios. Revisa las pistas de cada pregunta e inténtalo de nuevo.`;
    }

    if (attemptNumber === 2) {
      return `Has conseguido ${score}/4. Revisa especialmente la diferencia entre definir y llamar, entre parámetro y argumento, y entre print y return.`;
    }

    return `Has conseguido ${score}/4. A partir de este intento ya puedes ver cuál era la opción correcta para aprender del fallo antes de volver a intentarlo. Los ejercicios seguirán bloqueados hasta que apruebes.`;
  }
});