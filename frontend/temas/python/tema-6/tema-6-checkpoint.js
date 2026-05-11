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

initCheckpointPage({
  topicId: "6.quiz",
  goToExercisesUrl: "./py-tema6-ejercicios.html",
  attemptStorageKey: "tema6_checkpoint_attempts",
  quizAnswers,
  questionFeedback,
  minCorrect: 3,
  passResultMessage: "Checkpoint superado con {score}/4. Ya se han desbloqueado los ejercicios del tema 6.",
  passSyncMessage: "Ya habías superado este checkpoint. Los ejercicios del tema 6 ya están desbloqueados.",
  failMessageBuilder(score, attemptNumber) {
    if (attemptNumber === 1) {
      return `Has conseguido ${score}/4. Aún no desbloqueas los ejercicios. Revisa las pistas de cada pregunta e inténtalo de nuevo.`;
    }

    if (attemptNumber === 2) {
      return `Has conseguido ${score}/4. Revisa especialmente la diferencia entre lista y diccionario, el acceso por clave y cuándo conviene usar get().`;
    }

    return `Has conseguido ${score}/4. A partir de este intento ya puedes ver cuál era la opción correcta para aprender del fallo antes de volver a intentarlo. Los ejercicios seguirán bloqueados hasta que apruebes.`;
  }
});