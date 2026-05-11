const quizAnswers = {
  q1: "B",
  q2: "B",
  q3: "B",
  q4: "C"
};

const questionFeedback = {
  q1: {
    attempt1: "Revisa cuál es la función básica de print() dentro de un programa.",
    attempt2: "print() no guarda datos ni cambia el flujo: su papel es mostrar información.",
    final: "Correcto: print() sirve para mostrar información por pantalla."
  },
  q2: {
    attempt1: "Piensa cuál de las opciones está representada como texto en Python.",
    attempt2: "En Python, el texto se representa entre comillas.",
    final: "Correcto: un string es texto y va entre comillas."
  },
  q3: {
    attempt1: "Aquí el problema no es de sintaxis, sino de cómo se combinan los datos.",
    attempt2: "Revisa la diferencia entre texto y número al construir un mensaje.",
    final: "Correcto: el error aparece por mezclar directamente texto y número."
  },
  q4: {
    attempt1: "Piensa qué muestra Python cuando imprimes una variable.",
    attempt2: "Una variable no imprime su nombre, sino el valor que contiene.",
    final: "Correcto: Python imprime el valor guardado en la variable, es decir, Ana."
  }
};

initCheckpointPage({
  topicId: "1.quiz",
  goToExercisesUrl: "./py-tema1-ejercicios.html",
  attemptStorageKey: "tema1_checkpoint_attempts",
  quizAnswers,
  questionFeedback,
  minCorrect: 3,
  passResultMessage: "Checkpoint superado con {score}/4. Ya se han desbloqueado los ejercicios del tema 1.",
  passSyncMessage: "Ya habías superado este checkpoint. Los ejercicios del tema 1 ya están desbloqueados.",
  failMessageBuilder(score, attemptNumber) {
    if (attemptNumber === 1) {
      return `Has conseguido ${score}/4. Aún no desbloqueas los ejercicios. Revisa las pistas de cada pregunta e inténtalo de nuevo.`;
    }

    if (attemptNumber === 2) {
      return `Has conseguido ${score}/4. Vas acercándote. Ahora las pistas son más concretas: revisa especialmente qué hace print(), cómo se representa el texto y la diferencia entre texto y número.`;
    }

    return `Has conseguido ${score}/4. A partir de este intento ya puedes ver cuál era la opción correcta para aprender del fallo antes de volver a intentarlo. Los ejercicios seguirán bloqueados hasta que apruebes.`;
  }
});