// ============================================================================
// aiFeedback.js
// Feedback heurístico + IA real con fallback
// ============================================================================


const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// ----------------------------------------------------------------------------
// FEEDBACK HEURÍSTICO ACTUAL
// ----------------------------------------------------------------------------
function buildSimpleFeedback(attempt, extraContext = {}) {
  const { language, code, stdout, stderr, status, timeMs } = attempt;
  const exerciseId = extraContext.exerciseId || null;

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

  if (status === "success" && (!stderr || stderr.trim() === "")) {
    mensaje += "✅ La ejecución ha sido correcta.\n";

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
      level: "ok",
      source: "heuristic",
    };
  }

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
      source: "heuristic",
    };
  }

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
    source: "heuristic",
  };
}

// ----------------------------------------------------------------------------
//prompt para IA real
// ----------------------------------------------------------------------------
function buildTutorPrompt(attempt, extraContext = {}) {
  const { language, code, stdout, stderr, status } = attempt;

  const title = extraContext.title || extraContext.exerciseId || "Ejercicio sin título";
  const statement = extraContext.statement || "Sin enunciado";
  const hints = Array.isArray(extraContext.hints) ? extraContext.hints : [];

  return `
Eres un tutor de programación para estudiantes principiantes.

Tu objetivo es ayudar sin dar la solución completa.

Reglas obligatorias:
- No escribas la solución final completa.
- No devuelvas el código entero resuelto.
- No reescribas el ejercicio completo.
- Da solo pistas graduales y concretas.
- Explica el error si lo hay.
- Señala qué concepto debe revisar el alumno.
- Sugiere un siguiente paso pequeño.
- Si el alumno está muy cerca, da una pista más precisa, pero sin resolverlo.
- Responde en español.
- Sé breve, clara y didáctica.

Datos del ejercicio:
Título: ${title}
Lenguaje: ${language}
Estado de ejecución: ${status}
Enunciado: ${statement}
Pistas ya disponibles: ${hints.length ? hints.join(" | ") : "Sin pistas"}

Código actual del alumno:
${code || ""}

Salida stdout:
${stdout || ""}

Salida stderr:
${stderr || ""}

Devuelve la respuesta exactamente en este formato:

1. Qué está pasando
2. Qué debe revisar
3. Siguiente paso sugerido
4. Una pista extra
`.trim();
}

// ----------------------------------------------------------------------------
// llamada a IA real (OpenRouter)
// ----------------------------------------------------------------------------
async function generateRealAiFeedback(attempt, extraContext = {}) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY no configurada");
  }

  const prompt = buildTutorPrompt(attempt, extraContext);

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "TFG Python Tutor",
    },
    body: JSON.stringify({
      model: "openrouter/free",
      messages: [
        {
          role: "system",
          content:
            "Eres un tutor de programación que solo da pistas y nunca entrega la solución completa.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
      max_tokens: 350,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Error llamando a la IA");
  }

  const text = data?.choices?.[0]?.message?.content?.trim();

  if (!text) {
    throw new Error("La IA no devolvió contenido");
  }

  return {
    message: text,
    level: "ai",
    source: "openrouter",
  };
}

// ----------------------------------------------------------------------------
// FUNCIÓN PRINCIPAL
// ----------------------------------------------------------------------------
async function generateFeedbackForAttempt(attempt, extraContext = {}) {
  try {
    // Si quieres activar IA real solo en ciertos casos, puedes condicionar aquí.
    // Por ejemplo, si extraContext.useRealAI === true
    if (extraContext.useRealAI) {
      return await generateRealAiFeedback(attempt, extraContext);
    }

    return buildSimpleFeedback(attempt, extraContext);
  } catch (error) {
    console.error("Fallo IA real, uso feedback heurístico:", error.message);
    return buildSimpleFeedback(attempt, extraContext);
  }
}

module.exports = {
  generateFeedbackForAttempt,
  buildSimpleFeedback,
  generateRealAiFeedback,
};