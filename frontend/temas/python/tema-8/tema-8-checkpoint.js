const quizAnswers = {
  q1: "B",
  q2: "B",
  q3: "C",
  q4: "B"
};

const questionFeedback = {
  q1: {
    attempt1: "Piensa si aquí importa el orden y si ese par de datos debería ser estable.",
    attempt2: "Una coordenada suele modelarse mejor como un grupo ordenado que no debería cambiar arbitrariamente.",
    final: "Correcto: una tupla representa mejor una coordenada fija."
  },
  q2: {
    attempt1: "Recuerda el caso especial de la tupla de un solo elemento.",
    attempt2: "Sin un símbolo extra, Python no lo interpreta como tupla.",
    final: "Correcto: falta la coma."
  },
  q3: {
    attempt1: "Aquí debes pensar en unicidad y pertenencia, no en posición.",
    attempt2: "Si no quieres duplicados y te importa comprobar si algo está, una estructura encaja claramente mejor.",
    final: "Correcto: un set es la mejor opción."
  },
  q4: {
    attempt1: "Piensa qué pregunta responde exactamente a a - b.",
    attempt2: "La diferencia depende del orden porque no pregunta lo mismo en ambos sentidos.",
    final: "Correcto: a - b significa lo que está en el primero pero no en el segundo."
  }
};

initCheckpointPage({
  topicId: "8.quiz",
  goToExercisesUrl: "./py-tema8-ejercicios.html",
  attemptStorageKey: "tema8_checkpoint_attempts",
  quizAnswers,
  questionFeedback,
  minCorrect: 3,
  passResultMessage: "Checkpoint superado con {score}/4. Ya se han desbloqueado los ejercicios del tema 8.",
  passSyncMessage: "Ya habías superado este checkpoint. Los ejercicios del tema 8 ya están desbloqueados.",
  failMessageBuilder(score, attemptNumber) {
    if (attemptNumber === 1) {
      return `Has conseguido ${score}/4. Aún no desbloqueas los ejercicios. Revisa las pistas de cada pregunta e inténtalo de nuevo.`;
    }

    if (attemptNumber === 2) {
      return `Has conseguido ${score}/4. Revisa especialmente cuándo conviene una tupla, cuándo un set y cómo interpretar la diferencia entre sets.`;
    }

    return `Has conseguido ${score}/4. A partir de este intento ya puedes ver cuál era la opción correcta para aprender del fallo antes de volver a intentarlo. Los ejercicios seguirán bloqueados hasta que apruebes.`;
  }
});