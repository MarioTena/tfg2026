const quizAnswers = {
  q1: "B",
  q2: "B",
  q3: "B",
  q4: "B"
};

const questionFeedback = {
  q1: {
    attempt1: "Piensa si estás pidiendo una posición exacta o un tramo del texto.",
    attempt2: "Una expresión usa índice y la otra slicing, aunque ambas puedan parecerse mucho en el resultado visual.",
    final: "Correcto: una pide una posición exacta y la otra un fragmento."
  },
  q2: {
    attempt1: "Recuerda que el slicing no incluye el límite final.",
    attempt2: "El 4 marca hasta dónde llega el corte sin incluir esa posición.",
    final: "Correcto: imprime prog."
  },
  q3: {
    attempt1: "No confundas aplicar un método con modificar el string original.",
    attempt2: "Los strings son inmutables y muchos métodos devuelven una nueva cadena.",
    final: "Correcto: imprime HOLA porque no se guardó el resultado."
  },
  q4: {
    attempt1: "Piensa qué método separa y cuál une.",
    attempt2: "Uno convierte texto en partes; el otro reconstruye texto a partir de varias partes.",
    final: "Correcto: join() sirve para unir palabras y reconstruir una frase."
  }
};

initCheckpointPage({
  topicId: "7.quiz",
  goToExercisesUrl: "./py-tema7-ejercicios.html",
  attemptStorageKey: "tema7_checkpoint_attempts",
  quizAnswers,
  questionFeedback,
  minCorrect: 3,
  passResultMessage: "Checkpoint superado con {score}/4. Ya se han desbloqueado los ejercicios del tema 7.",
  passSyncMessage: "Ya habías superado este checkpoint. Los ejercicios del tema 7 ya están desbloqueados.",
  failMessageBuilder(score, attemptNumber) {
    if (attemptNumber === 1) {
      return `Has conseguido ${score}/4. Aún no desbloqueas los ejercicios. Revisa las pistas de cada pregunta e inténtalo de nuevo.`;
    }

    if (attemptNumber === 2) {
      return `Has conseguido ${score}/4. Revisa especialmente la diferencia entre índice y slicing, la inmutabilidad y qué método conviene según la tarea.`;
    }

    return `Has conseguido ${score}/4. A partir de este intento ya puedes ver cuál era la opción correcta para aprender del fallo antes de volver a intentarlo. Los ejercicios seguirán bloqueados hasta que apruebes.`;
  }
});