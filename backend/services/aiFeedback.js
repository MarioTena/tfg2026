// ============================================================================
// aiFeedback.js
// "IA" esto es un ejemplo de ia que me ha hecho chatgpt, todo esto hay que cambiarlo por una IA real
// ============================================================================

// attempt: documento Attempt (Mongoose) con campos como:
// { userId, language, code, stdout, stderr, status, timeMs }
function buildSimpleFeedback(attempt, extraContext = {}) {
  const { language, code, stdout, stderr, status, timeMs } = attempt;
  const exerciseId = extraContext.exerciseId || null;

  // Empezamos a construir un texto de feedback en castellano
  let mensaje = `Lenguaje: ${language}\n`;
  if (exerciseId) {
    mensaje += `Ejercicio: ${exerciseId}\n`;
  }
  mensaje += `Estado de la ejecución: ${status}\n`;
  if (typeof timeMs === "number") {
    mensaje += `Tiempo de ejecución aproximado: ${timeMs} ms\n\n`;
  } else {
    mensaje += `\n`;
  }

  // Caso 1: ejecución correcta
  if (status === "success" && (!stderr || stderr.trim() === "")) {
    mensaje += "✅ La ejecución ha sido correcta.\n";

    // Pistas según el ejercicio (opcional)
    if (exerciseId === "py_tema1_ej1") {
      mensaje +=
        "- Has conseguido imprimir un mensaje en pantalla, que es el objetivo principal de este ejercicio.\n" +
        "- Comprueba que el texto coincide exactamente con lo que pide el enunciado (mayúsculas, espacios, etc.).\n";
    } else if (exerciseId === "py_tema1_ej2") {
      mensaje +=
        "- Revisa que la suma, resta y multiplicación se imprimen en líneas separadas.\n" +
        "- Piensa si tendría sentido añadir un texto delante de cada resultado para que sea más legible.\n";
    } else if (exerciseId === "py_tema1_ej3") {
      mensaje +=
        "- Verifica que el mensaje sigue el formato solicitado (por ejemplo: 'Me llamo ...').\n";
    } else {
      mensaje +=
        "- El código se ha ejecutado sin errores. A partir de aquí puedes probar variantes y pequeñas modificaciones para seguir practicando.\n";
    }

    if (stdout && stdout.trim() !== "") {
      mensaje += `\nSalida producida (stdout):\n${stdout}\n`;
    }

    return {
      message: mensaje,
      level: "ok", // etiqueta sencilla para el frontend
    };
  }

  // Caso 2: timeout
  if (status === "timeout") {
    mensaje +=
      "⚠️ La ejecución ha superado el tiempo máximo permitido.\n" +
      "- Revisa si has escrito un bucle infinito o una operación muy costosa.\n" +
      "- En los ejercicios de este tema lo normal es que el código termine casi al instante.\n";

    if (stderr && stderr.trim() !== "") {
      mensaje += `\nMensaje adicional de error:\n${stderr}\n`;
    }

    return {
      message: mensaje,
      level: "warning",
    };
  }

  // Caso 3: hay error (status === "error" o similar)
  mensaje +=
    "❌ La ejecución ha terminado con error.\n" +
    "A continuación tienes algunas pistas para interpretar lo que ha pasado:\n\n";

  if (stderr && stderr.trim() !== "") {
    mensaje += `Mensaje de error devuelto por el programa:\n${stderr}\n\n`;


    const lower = stderr.toLowerCase();

    if (lower.includes("nameerror")) {
      mensaje +=
        "- Parece que estás usando una variable que no ha sido definida.\n" +
        "- Revisa si el nombre de la variable está bien escrito y si la has inicializado antes de usarla.\n";
    } else if (lower.includes("syntaxerror")) {
      mensaje +=
        "- Hay un problema de sintaxis (estructura del código).\n" +
        "- Revisa comillas, paréntesis, dos puntos al final de if/for, y la indentación.\n";
    } else if (lower.includes("zerodivisionerror")) {
      mensaje +=
        "- Estás intentando dividir entre cero.\n" +
        "- Revisa las variables que usas en la división y evita el valor 0 en el denominador.\n";
    } else {
      mensaje +=
        "- Revisa con calma el mensaje de error: muchas veces indica la línea exacta y el tipo de problema.\n";
    }
  } else {
    mensaje +=
      "- No se ha recibido un mensaje de error detallado, pero el estado indica que la ejecución no ha sido correcta.\n" +
      "- Prueba a simplificar el código e ir ejecutándolo por partes para localizar el fallo.\n";
  }

  mensaje +=
    "\nSugerencia general:\n" +
    "- Vuelve a leer el enunciado del ejercicio y asegúrate de que tu código hace exactamente lo que se pide.\n" +
    "- Intenta añadir comentarios (#) para explicar lo que hace cada bloque de código.\n";

  return {
    message: mensaje,
    level: "error",
  };
}

// Función asíncrona por si en el futuro queremos llamar a una API externa
async function generateFeedbackForAttempt(attempt, extraContext = {}) {
  // Aquí podríamos detectar si hay OPENAI_API_KEY y usar un modelo real.
  // De momento devolvemos la versión heurística.
  return buildSimpleFeedback(attempt, extraContext);
}

module.exports = {
  generateFeedbackForAttempt,
};
