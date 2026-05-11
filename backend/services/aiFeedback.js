// ============================================================================
// aiFeedback.js
// IA real + validación + fallback técnico mejorado
// ============================================================================

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// ----------------------------------------------------------------------------
// Clasificación simple del caso
// ----------------------------------------------------------------------------
function detectIssueType(attempt) {
  const { status, stderr = "", stdout = "" } = attempt;
  const errorText = stderr.toLowerCase();

  if (status === "timeout") return "timeout";
  if (errorText.includes("syntaxerror")) return "syntax";
  if (errorText.includes("indentationerror")) return "indentation";
  if (errorText.includes("nameerror")) return "name";
  if (errorText.includes("typeerror")) return "type";
  if (errorText.includes("valueerror")) return "value";
  if (errorText.includes("zerodivisionerror")) return "zero_division";
  if (errorText.includes("indexerror")) return "index";
  if (errorText.includes("keyerror")) return "key";
  if (errorText.includes("filenotfounderror")) return "file_not_found";

  if (status === "success" && !stderr.trim()) {
    if (stdout.trim()) return "success_but_maybe_output";
    return "success_no_output";
  }

  return "generic_error";
}

// ----------------------------------------------------------------------------
// Prompt específico según tipo de problema
// ----------------------------------------------------------------------------
function buildCasePromptBlock(issueType, attempt, extraContext = {}) {
  switch (issueType) {
    case "syntax":
      return `
CASO: Error de sintaxis

Objetivo de la ayuda:
- Explica que hay un problema en la estructura de la instrucción.
- Guía al alumno a revisar la línea marcada y, como mucho, la anterior.
- No digas qué símbolo exacto falta.
- No digas el nombre del carácter concreto.
- No digas literalmente qué debe añadir.
- No reescribas la línea.
- No menciones la corrección exacta.

Qué priorizar:
- estructura incompleta
- cierre correcto de la instrucción
- final correcto de cabeceras de bloques
- relación entre la línea señalada y la siguiente
      `.trim();

    case "indentation":
      return `
CASO: Error de indentación

Objetivo de la ayuda:
- Explica que el fallo está en la organización de bloques.
- Guía para revisar el sangrado dentro de if, for, while, def, try.
- No reindentes el código por el alumno.
- No des la solución exacta línea a línea.

Qué priorizar:
- bloque que empieza
- bloque que termina
- alineación de líneas hermanas
- consistencia de sangrado
      `.trim();

    case "name":
      return `
CASO: NameError

Objetivo de la ayuda:
- Explica que se está usando un nombre que Python no reconoce.
- Haz que el alumno piense dónde se define esa variable o función.
- No digas directamente el nombre correcto si parece un typo claro.
- No resuelvas la línea exacta.

Qué priorizar:
- variables no definidas
- nombres mal escritos
- uso antes de definir
      `.trim();

    case "type":
      return `
CASO: TypeError

Objetivo de la ayuda:
- Ayuda al alumno a identificar tipos incompatibles.
- Si hay input(), recuerda implícitamente que devuelve texto.
- No des la conversión exacta salvo que sea imprescindible.
- No escribas la línea corregida.

Qué priorizar:
- string vs int
- string vs float
- llamada incorrecta de funciones
- operaciones incompatibles
      `.trim();

    case "value":
      return `
CASO: ValueError

Objetivo de la ayuda:
- Explica que el valor recibido no tiene el formato esperado.
- Haz que el alumno revise qué dato está intentando convertir o procesar.
- No digas la solución completa.
- Si hay input(), centra la ayuda en validar entrada.

Qué priorizar:
- int()
- float()
- valores vacíos
- texto donde se esperaba número
      `.trim();

    case "zero_division":
      return `
CASO: ZeroDivisionError

Objetivo de la ayuda:
- Explica que el problema está en el denominador.
- Guía al alumno a pensar de dónde sale ese 0.
- No escribas directamente la condición final exacta.
- No completes el if por él.

Qué priorizar:
- valor del denominador
- validación previa
- entrada del usuario
- cálculo previo
      `.trim();

    case "index":
      return `
CASO: IndexError

Objetivo de la ayuda:
- Explica que se accede a una posición inexistente.
- Haz que el alumno relacione índice usado con tamaño real de la secuencia.
- No des el índice correcto exacto.
- No resuelvas la expresión literal.

Qué priorizar:
- len(...)
- primer índice
- último índice válido
- bucles que se pasan de rango
      `.trim();

    case "key":
      return `
CASO: KeyError

Objetivo de la ayuda:
- Explica que la clave no existe en el diccionario.
- Haz que el alumno revise si la clave realmente está disponible.
- No escribas la clave exacta correcta salvo que sea imprescindible.

Qué priorizar:
- claves existentes
- diferencias entre clave y valor
- uso de in o get()
      `.trim();

    case "file_not_found":
      return `
CASO: FileNotFoundError

Objetivo de la ayuda:
- Explica que el archivo no se encuentra en esa ruta.
- Guía a revisar nombre, extensión y ubicación.
- No inventes rutas.

Qué priorizar:
- nombre del archivo
- ruta relativa
- extensión
- carpeta de ejecución
      `.trim();

    case "timeout":
      return `
CASO: Timeout

Objetivo de la ayuda:
- Explica que el programa probablemente no termina.
- Haz que el alumno revise la condición de salida.
- No describas un código completo de arreglo.
- No escribas el bucle correcto.

Qué priorizar:
- while infinito
- variable de control que no cambia
- condición que nunca se cumple
      `.trim();

    case "success_but_maybe_output":
      return `
CASO: Ejecución correcta pero posible salida incorrecta

Objetivo de la ayuda:
- No centres la respuesta en errores técnicos.
- Compara el objetivo del ejercicio con la salida obtenida.
- No escribas la salida exacta esperada completa.
- No completes el ejercicio.
- Haz que el alumno revise formato, orden, lógica y contenido.

Qué priorizar:
- texto exacto
- orden de impresión
- saltos de línea
- estructura de salida
- lógica correcta aunque no haya error
      `.trim();

    case "success_no_output":
      return `
CASO: Ejecución correcta pero sin salida útil

Objetivo de la ayuda:
- Señala que el programa puede ejecutarse sin error y aun así no resolver el objetivo.
- No escribas directamente qué línea de print o return falta.
- Guía con conceptos.

Qué priorizar:
- objetivo del ejercicio
- necesidad de mostrar o devolver información
- diferencia entre calcular y mostrar
      `.trim();

    default:
      return `
CASO: Error genérico

Objetivo de la ayuda:
- Ayuda a interpretar el error real sin inventar.
- Prioriza claridad, no soluciones completas.
- No reescribas el ejercicio.

Qué priorizar:
- línea señalada
- causa probable
- siguiente paso pequeño
      `.trim();
  }
}

// ----------------------------------------------------------------------------
// Riesgo de dar solución demasiado directa
// ----------------------------------------------------------------------------
function detectHintRisk(attempt, extraContext = {}) {
  const code = (attempt.code || "").toLowerCase();
  const statement = (extraContext.statement || "").toLowerCase();
  const title = (extraContext.title || "").toLowerCase();

  const hasPlaceholders =
    code.includes("___") ||
    code.includes("todo") ||
    code.includes("completa") ||
    code.includes("rellena") ||
    statement.includes("completa") ||
    statement.includes("rellena") ||
    statement.includes("faltan") ||
    statement.includes("faltan líneas");

  const functionExercise =
    code.includes("def ") ||
    title.includes("función") ||
    statement.includes("función") ||
    statement.includes("return");

  const listExercise =
    code.includes("[") ||
    title.includes("lista") ||
    statement.includes("lista");

  if (hasPlaceholders) return "high_direct_solution_risk";
  if (functionExercise && listExercise) return "medium_direct_solution_risk";
  return "normal";
}

function buildAntiSolutionInstruction(riskLevel) {
  if (riskLevel === "high_direct_solution_risk") {
    return `
Restricción extra muy importante:
- No completes líneas faltantes.
- No digas qué expresión exacta debe escribir.
- No menciones índices concretos, variables concretas ni código exacto.
- Guía solo con conceptos: por ejemplo "primer elemento", "último elemento", "valor de retorno", "posición inicial", etc.
- Si el código tiene huecos o partes incompletas, no las rellenes.
    `.trim();
  }

  if (riskLevel === "medium_direct_solution_risk") {
    return `
Restricción extra:
- Evita dar la expresión exacta.
- Evita escribir la línea que falta.
- Prioriza describir la idea y no el código literal.
    `.trim();
  }

  return `
Restricción extra:
- Da pistas útiles, pero sin escribir la solución literal.
  `.trim();
}

// ----------------------------------------------------------------------------
// Fallback técnico mejorado
// ----------------------------------------------------------------------------
function buildTechnicalFallback(attempt, extraContext = {}) {
  const { stderr, status } = attempt;
  const issueType = detectIssueType(attempt);

  let message = "";

  switch (issueType) {
    case "timeout":
      message =
        "1. El programa parece quedarse en un flujo que no termina.\n" +
        "2. Revisa si hay un bucle sin una condición de salida clara.\n" +
        "3. Piensa qué valor o condición debería hacer que el proceso termine.\n" +
        "4. Comprueba si dentro del bucle realmente cambia algo que permita salir.";
      break;

    case "syntax":
      message =
        "1. El problema está en la estructura de una instrucción o cabecera.\n" +
        "2. Revisa cómo debe cerrarse correctamente esa línea antes de empezar el bloque siguiente.\n" +
        "3. Compara esa instrucción con la sintaxis habitual de Python para ese caso.\n" +
        "4. Comprueba si el fallo está en el final de la línea y no en el cuerpo indentado.";
      break;

    case "indentation":
      message =
        "1. El error está en la organización del bloque y no en la idea general del código.\n" +
        "2. Revisa el sangrado de las líneas que pertenecen a la misma estructura.\n" +
        "3. Piensa qué líneas deberían estar al mismo nivel y cuáles deberían ir dentro.\n" +
        "4. Comprueba especialmente el inicio y el cierre de cada bloque.";
      break;

    case "name":
      message =
        "1. El problema aparece porque Python no reconoce uno de los nombres usados.\n" +
        "2. Revisa si esa variable o función existe realmente y está escrita igual en todas partes.\n" +
        "3. Piensa dónde debería haberse definido antes de utilizarla.\n" +
        "4. Comprueba mayúsculas, minúsculas y posibles errores de escritura.";
      break;

    case "type":
      message =
        "1. El problema está en una operación entre tipos de datos que no encajan bien.\n" +
        "2. Revisa qué tipo tienen los valores que estás combinando en esa parte del código.\n" +
        "3. Piensa si esa operación tiene sentido para el resultado que quieres obtener.\n" +
        "4. Comprueba si estás mezclando texto con números o usando una operación poco adecuada.";
      break;

    case "value":
      message =
        "1. El valor recibido no tiene el formato que esa parte del programa espera.\n" +
        "2. Revisa qué dato real se está intentando convertir o procesar.\n" +
        "3. Piensa si antes hace falta validar o transformar la entrada.\n" +
        "4. Comprueba si el dato viene vacío o con un formato distinto del esperado.";
      break;

    case "zero_division":
      message =
        "1. El error aparece porque una operación está usando un denominador no válido.\n" +
        "2. Revisa de dónde sale ese valor antes de hacer la división.\n" +
        "3. Piensa si necesitas comprobar ese caso antes de operar.\n" +
        "4. Comprueba si el problema viene de una entrada, un cálculo previo o un valor fijo.";
      break;

    case "index":
      message =
        "1. El error aparece porque intentas acceder a una posición que no existe.\n" +
        "2. Revisa el tamaño real de la secuencia y la posición que estás usando.\n" +
        "3. Piensa si estás suponiendo una longitud que no siempre se cumple.\n" +
        "4. Comprueba la relación entre el índice usado y el tamaño de la lista o cadena.";
      break;

    case "key":
      message =
        "1. El problema aparece al intentar acceder a una clave que no está disponible.\n" +
        "2. Revisa si esa clave existe realmente en la estructura que estás usando.\n" +
        "3. Piensa cómo comprobar su presencia antes de acceder.\n" +
        "4. Comprueba si el problema es la clave concreta o el tipo de estructura.";
      break;

    case "file_not_found":
      message =
        "1. El problema aparece porque el recurso que intentas abrir no se encuentra.\n" +
        "2. Revisa nombre, ruta y ubicación del archivo.\n" +
        "3. Piensa si la ruta usada coincide con el contexto desde el que se ejecuta el programa.\n" +
        "4. Comprueba si hay diferencias en carpeta, extensión o nombre exacto.";
      break;

    case "success_but_maybe_output":
      message =
        "1. El programa se ejecuta, pero eso no garantiza que resuelva bien el ejercicio.\n" +
        "2. Revisa si la salida coincide con lo que pide el enunciado en contenido y formato.\n" +
        "3. Piensa si el problema está en la lógica o en la forma de mostrar el resultado.\n" +
        "4. Comprueba el orden, el texto y los saltos de línea de la salida.";
      break;

    case "success_no_output":
      message =
        "1. El código se ejecuta sin error, pero no está produciendo una salida útil.\n" +
        "2. Revisa qué haces con el resultado después de calcularlo.\n" +
        "3. Piensa si falta mostrar, devolver o usar mejor la información.\n" +
        "4. Comprueba si el programa calcula algo pero nunca lo hace visible.";
      break;

    default:
      message =
        "1. El programa ha fallado por un problema técnico en la ejecución.\n" +
        "2. Revisa el mensaje de error y la parte del código más cercana al fallo.\n" +
        "3. Piensa qué pequeña comprobación te ayudaría a aislar la causa real.\n" +
        "4. Comprueba primero el error más cercano al punto donde se rompe.";
      break;
  }

  return {
    message,
    level: "warning",
    source: "fallback",
  };
}

// ----------------------------------------------------------------------------
// Etiqueta legible para logs
// ----------------------------------------------------------------------------
function getIssueTypeLabel(issueType) {
  const labels = {
    syntax: "SyntaxError",
    indentation: "IndentationError",
    name: "NameError",
    type: "TypeError",
    value: "ValueError",
    zero_division: "ZeroDivisionError",
    index: "IndexError",
    key: "KeyError",
    file_not_found: "FileNotFoundError",
    timeout: "Timeout",
    success_but_maybe_output: "ejecución correcta pero posible salida incorrecta",
    success_no_output: "ejecución correcta pero sin salida útil",
    generic_error: "error genérico",
  };

  return labels[issueType] || issueType;
}

// ----------------------------------------------------------------------------
// Prompt IA
// ----------------------------------------------------------------------------
function buildTutorPrompt(attempt, extraContext = {}) {
  const { language, code, stdin, stdout, stderr, status } = attempt;

  const title = extraContext.title || extraContext.exerciseId || "Ejercicio sin título";
  const statement = extraContext.statement || "Sin enunciado";
  const hints = Array.isArray(extraContext.hints) ? extraContext.hints : [];

  const issueType = detectIssueType(attempt);

  const casePromptBlock = buildCasePromptBlock(issueType, attempt, extraContext);
  const riskLevel = detectHintRisk(attempt, extraContext);
  const antiSolutionInstruction = buildAntiSolutionInstruction(riskLevel);

  return `
Eres un tutor de programación para principiantes.

Tu objetivo es ayudar a un alumno sin darle la solución completa.

Reglas generales obligatorias:
- No escribas la solución final completa.
- No devuelvas el código entero resuelto.
- No reescribas el ejercicio completo.
- No uses bloques de código largos.
- Da pistas graduales, concretas y útiles.
- Prioriza explicar el error real si existe.
- Señala qué concepto debe revisar.
- Sugiere un único siguiente paso pequeño y claro.
- Responde en español.
- Sé breve, clara y didáctica.
- No inventes información.

Guía específica para este tipo de caso:
${casePromptBlock}

Nivel de riesgo de dar solución directa: ${riskLevel}

${antiSolutionInstruction}

Formato obligatorio de respuesta:
1. Qué concepto está fallando.
2. Qué parte del problema debe revisar.
3. Qué idea general necesita aplicar.
4. Qué debe comprobar antes de volver a ejecutar.

Reglas del formato:
- Máximo 4 líneas numeradas.
- Una sola frase por línea.
- No uses negritas.
- No uses bloques de código.
- No menciones funciones concretas, índices concretos, expresiones concretas ni líneas concretas.
- No escribas la solución literal.
- No señales líneas concretas, posiciones concretas ni una zona exacta del código; orienta solo por bloque o concepto.

Datos del ejercicio:
Título: ${title}
Lenguaje: ${language}
Estado de ejecución: ${status}
Tipo de caso detectado: ${issueType}
Enunciado: ${statement}
Pistas ya disponibles: ${hints.length ? hints.join(" | ") : "Sin pistas"}

Código actual del alumno:
${code || ""}

Entrada del usuario (stdin):
${stdin || ""}

Salida stdout:
${stdout || ""}

Salida stderr:
${stderr || ""}
`.trim();
}

// ----------------------------------------------------------------------------
// Normalización y validación mínima
// ----------------------------------------------------------------------------
function normalizeAiResponse(text) {
  if (!text) return "";

  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\*\*/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function validateAiResponse(text, issueType = "generic_error") {
  if (!text || !text.trim()) {
    return { ok: false, reason: "empty_response" };
  }

  const cleaned = normalizeAiResponse(text);
  const lower = cleaned.toLowerCase();

  if (cleaned.length < 40) {
    return { ok: false, reason: "too_short" };
  }

  const lines = cleaned
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length < 4) {
    return { ok: false, reason: "too_few_lines" };
  }

  const firstFour = lines.slice(0, 4);

  const numbered = [
    /^1\./.test(firstFour[0] || ""),
    /^2\./.test(firstFour[1] || ""),
    /^3\./.test(firstFour[2] || ""),
    /^4\./.test(firstFour[3] || ""),
  ].every(Boolean);

  if (!numbered) {
    return { ok: false, reason: "bad_format" };
  }

  const tooLongLine = firstFour.some((line) => line.length > 180);
  if (tooLongLine) {
    return { ok: false, reason: "line_too_long" };
  }

  if (cleaned.includes("**") || cleaned.includes("```")) {
    return { ok: false, reason: "forbidden_format" };
  }

  return {
    ok: true,
    normalizedText: firstFour.join("\n"),
  };
}

// ----------------------------------------------------------------------------
// Detectores de respuesta demasiado resolutiva
// ----------------------------------------------------------------------------
function looksTooSolutionLike(text) {
  if (!text) return false;

  const lower = text.toLowerCase();

  const directCodePatterns = [
    "str()",
    "int()",
    "float()",
    "len()",
    "get()",
    "append()",
    "split()",
    "join()",
    "[0]",
    "[-1]",
    "return ",
    "print(",
    "input(",
  ];

  const directivePatterns = [
    "usa ",
    "convierte ",
    "añade ",
    "escribe ",
    "asigna ",
    "debe devolver",
    "debe quedar",
    "la línea que falta",
    "por ejemplo usando",
    "haz un ",
    "cambia a ",
    "revisa la línea donde",
    "la línea donde",
    "la anterior inmediata",
    "la línea anterior",
  ];

  const directCodeHits = directCodePatterns.filter((p) => lower.includes(p)).length;
  const directiveHits = directivePatterns.filter((p) => lower.includes(p)).length;

  return directCodeHits + directiveHits >= 2;
}

function looksTooSolutionLikeForIssue(text, issueType) {
  if (!text) return false;

  const lower = text.toLowerCase();

  if (issueType === "syntax") {
    const syntaxLeakPatterns = [
      "debe haber dos puntos",
      "debe llevar dos puntos",
      "añade el carácter",
      "añade el símbolo",
      "añade los dos puntos",
      "añade el carácter :",
      "debe terminar con :",
      "al final de la línea",
      "línea `def ",
      "línea def ",
      "después de `def ",
      "después de def ",
      "la línea debe quedar así",
      "corrige la línea a",
    ];

    return syntaxLeakPatterns.some((p) => lower.includes(p));
  }

  return false;
}

// ----------------------------------------------------------------------------
// Llamada IA real
// ----------------------------------------------------------------------------
async function generateRealAiFeedback(attempt, extraContext = {}) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY no configurada");
  }

  const prompt = buildTutorPrompt(attempt, extraContext);

  const requestPayload = {
    model: process.env.OPENROUTER_MODEL || "openrouter/free",
    messages: [
      {
        role: "system",
        content:
          "Eres un tutor de programación para principiantes. Responde siempre en español con 4 líneas breves y numeradas. No des la solución literal. No escribas funciones, expresiones, índices, conversiones ni líneas exactas que el alumno deba copiar. Habla en términos de concepto, estructura, tipo de dato o intención del código. Si una respuesta suena como una instrucción exacta de implementación, es demasiado directa.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3,
    max_tokens: 280,
  };

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": process.env.OPENROUTER_HTTP_REFERER || process.env.APP_BASE_URL || "http://localhost:3000",
      "X-Title": "TFG Python Tutor",
    },
    body: JSON.stringify(requestPayload),
  });

  const data = await response.json();
  
  const finishReason = data?.choices?.[0]?.finish_reason;

  if (!response.ok) {
    throw new Error(data?.error?.message || "Error llamando a la IA");
  }

  let text = data?.choices?.[0]?.message?.content?.trim();

  if (!text) {
    const retryResponse = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": process.env.OPENROUTER_HTTP_REFERER || process.env.APP_BASE_URL || "http://localhost:3000",
        "X-Title": "TFG Python Tutor",
      },
      body: JSON.stringify({
        ...requestPayload,
        temperature: 0.2,
        max_tokens: 240,
      }),
    });

    const retryData = await retryResponse.json();

    const retryFinishReason = retryData?.choices?.[0]?.finish_reason;

    if (!retryResponse.ok) {
      throw new Error(retryData?.error?.message || "Error llamando a la IA");
    }

    text = retryData?.choices?.[0]?.message?.content?.trim();
  }

  if (!text) {
    throw new Error("La IA no devolvió contenido");
  }

  const issueType = detectIssueType(attempt);
  const validation = validateAiResponse(text, issueType);

  if (!validation.ok) {
    throw new Error(`Respuesta IA inválida: ${validation.reason}`);
  }

  text = validation.normalizedText || text;

  if (looksTooSolutionLikeForIssue(text, issueType)) {
    throw new Error("Respuesta IA inválida: too_solution_like_for_issue");
  }

  if (looksTooSolutionLike(text)) {
    throw new Error("Respuesta IA inválida: too_solution_like");
  }

  return {
    message: text,
    level: "ai",
    source: "openrouter",
  };
}

module.exports = {
  detectIssueType,
  buildCasePromptBlock,
  buildTechnicalFallback,
  getIssueTypeLabel,
  buildTutorPrompt,
  normalizeAiResponse,
  validateAiResponse,
  detectHintRisk,
  buildAntiSolutionInstruction,
  looksTooSolutionLike,
  looksTooSolutionLikeForIssue,
  generateRealAiFeedback,
};