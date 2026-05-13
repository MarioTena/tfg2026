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
    final: "Bien: has identificado correctamente cuándo una tupla encaja mejor que otras estructuras."
  },
  q2: {
    attempt1: "Recuerda el caso especial de la tupla de un solo elemento.",
    attempt2: "Sin un símbolo extra, Python no lo interpreta como tupla.",
    final: "Bien: has entendido correctamente cómo se representa una tupla de un solo elemento."
  },
  q3: {
    attempt1: "Aquí debes pensar en unicidad y pertenencia, no en posición.",
    attempt2: "Si no quieres duplicados y te importa comprobar si algo está, una estructura encaja claramente mejor.",
    final: "Bien: has identificado correctamente cuándo conviene usar un set."
  },
  q4: {
    attempt1: "Piensa qué pregunta responde exactamente a a - b.",
    attempt2: "La diferencia depende del orden porque no pregunta lo mismo en ambos sentidos.",
    final: "Bien: has interpretado correctamente la diferencia entre sets."
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

    return `Has conseguido ${score}/4. Aún no has interiorizado bien los conceptos clave del tema 8. Vuelve a repasar la teoría y la práctica guiada antes de repetir el checkpoint.`;
  }
});