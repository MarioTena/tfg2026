const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";


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


function buildCasePromptBlock(issueType, attempt, extraContext = {}) {
  switch (issueType) {
    case "syntax":
      return `
    CASO: Error de sintaxis

    Objetivo de la ayuda:
    - Explica que hay una instrucción incompleta o mal formada.
    - Guía al alumno a revisar la estructura general de esa instrucción.
    - No digas qué símbolo exacto falta.
    - No digas literalmente qué debe añadir.
    - No reescribas la instrucción.
    - No menciones líneas concretas ni zonas exactas del código.

    Qué priorizar:
    - instrucción incompleta
    - cierres de paréntesis, corchetes o comillas
    - separación entre elementos
    - estructura de llamadas a funciones
    - cabeceras de bloques
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
- Analiza si el código realmente resuelve lo que pide el enunciado.
- Compara el objetivo del ejercicio con la salida obtenida.
- Si la salida no cumple el objetivo, explica qué aspecto debe revisar sin dar la solución.
- No escribas la salida exacta esperada completa.
- No completes el ejercicio.
- No digas simplemente que "no hay error"; recuerda que puede haber un error lógico.

Qué priorizar:
- relación entre código y enunciado
- contenido de la salida
- formato de la salida
- orden de impresión
- lógica usada para calcular el resultado
- datos que faltan o sobran
- diferencia entre ejecutar bien y resolver bien
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
- zona conceptual del fallo
- causa probable
- siguiente paso pequeño
      `.trim();
  }
}


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

function detectPossibleStatementMismatch(attempt, extraContext = {}) {
  const code = (attempt.code || "").toLowerCase();
  const statement = (extraContext.statement || "").toLowerCase();
  const title = (extraContext.title || "").toLowerCase();

  if (!code.trim() || !statement.trim()) return false;

  const expectedSignals = [
    "lista",
    "diccionario",
    "tupla",
    "set",
    "string",
    "función",
    "return",
    "bucle",
    "for",
    "while",
    "if",
    "archivo",
    "input",
    "print"
  ];

  const signalMatchers = {
    lista: (code) => code.includes("[") || code.includes("append") || code.includes("lista"),
    diccionario: (code) => code.includes("{") || code.includes(":") || code.includes("diccionario"),
    tupla: (code) => code.includes("(") || code.includes("tupla"),
    set: (code) => code.includes("set(") || code.includes("{") || code.includes("set"),
    string: (code) => code.includes('"') || code.includes("'") || code.includes("string"),
    función: (code) => code.includes("def ") || code.includes("return"),
    return: (code) => code.includes("return"),
    bucle: (code) => code.includes("for ") || code.includes("while "),
    for: (code) => code.includes("for "),
    while: (code) => code.includes("while "),
    if: (code) => code.includes("if "),
    archivo: (code) => code.includes("open(") || code.includes(".txt") || code.includes(".csv"),
    input: (code) => code.includes("input("),
    print: (code) => code.includes("print(")
  };

  const statementSignals = expectedSignals.filter((word) =>
    statement.includes(word) || title.includes(word)
  );

  if (!statementSignals.length) return false;

  const matchedSignals = statementSignals.filter((word) => {
    const matcher = signalMatchers[word];
    return matcher ? matcher(code) : code.includes(word);
  });

  return matchedSignals.length === 0 && code.length > 20;
}

function buildTechnicalFallback(attempt, extraContext = {}) {
  const possibleMismatch = detectPossibleStatementMismatch(attempt, extraContext);
  const issueType = detectIssueType(attempt);

  let message = "";
  let level = "warning";

  if (possibleMismatch) {
    const hasTechnicalError = issueType !== "success_but_maybe_output" && issueType !== "success_no_output";

    return {
      message:
        "1. Vuelve a comparar tu código con el enunciado del ejercicio.\n" +
        "2. El código actual no parece estar usando todavía los conceptos principales que pide la actividad.\n" +
        "3. Revisa qué estructura, operación o resultado espera realmente el ejercicio.\n" +
        (hasTechnicalError
          ? "4. Después corrige el error técnico y comprueba si la salida responde al objetivo pedido."
          : "4. Después comprueba si la salida responde al objetivo completo de la actividad."),
      level: "warning",
      source: "fallback",
    };
  }

  switch (issueType) {
    case "success_but_maybe_output":
      level = "info";
      message =
        "1. El programa se ejecuta sin errores.\n" +
        "2. La salida obtenida parece coherente, pero compárala con el enunciado antes de darlo por cerrado.\n" +
        "3. Revisa especialmente valores límite, orden de los mensajes y formato de salida.\n" +
        "4. Si la salida coincide con lo pedido, puedes continuar con el siguiente ejercicio.";
      break;

    case "success_no_output":
      level = "info";
      message =
        "1. El programa se ejecuta sin errores, pero no muestra ninguna salida.\n" +
        "2. Revisa si el ejercicio esperaba algún mensaje o resultado visible.\n" +
        "3. Comprueba si has calculado un valor pero no lo has mostrado.\n" +
        "4. Si el enunciado no pedía imprimir nada, puede estar bien.";
      break;

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
        "2. Revisa si esa instrucción está completa antes de empezar el bloque siguiente.\n" +
        "3. Compara esa instrucción con la sintaxis habitual de Python para ese caso.\n" +
        "4. Comprueba si el fallo está en el cierre de la instrucción y no en el cuerpo indentado.";
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
    level,
    source: "fallback",
  };
}

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

function buildExerciseAlignmentBlock(attempt, extraContext = {}) {
  const code = (attempt.code || "").trim();
  const title = extraContext.title || extraContext.exerciseId || "Ejercicio sin título";
  const statement = extraContext.statement || "Sin enunciado";
  const hints = Array.isArray(extraContext.hints) ? extraContext.hints : [];
  const expectedOutput = extraContext.expectedOutput || "";
  const checks = Array.isArray(extraContext.checks) ? extraContext.checks : [];

  return `
Revisión obligatoria del enunciado:
- Antes de hablar del error técnico, comprueba si el código del alumno parece responder al objetivo del ejercicio.
- Si el código parece ir por otro camino o no usa los conceptos esperados por el enunciado, indícalo en la primera pista.
- Si el código se ejecuta sin error, analiza si la salida realmente responde al enunciado.
- Si hay salida esperada, compárala de forma conceptual con la salida obtenida, sin escribir la solución exacta.
- Si la salida no coincide, da pistas sobre lógica, formato, orden, datos usados o información que falta.
- No digas que está "mal" de forma brusca; di que todavía no parece responder del todo al objetivo pedido.
- Usa el título, el enunciado, las pistas disponibles y la salida obtenida para orientar la ayuda.
- No inventes requisitos que no aparezcan en el enunciado.

Título del ejercicio:
${title}

Enunciado:
${statement}

Pistas del ejercicio:
${hints.length ? hints.join(" | ") : "Sin pistas"}

Salida esperada o comprobaciones:
${expectedOutput || (checks.length ? checks.join(" | ") : "No especificada")}

Código del alumno:
${code || "Sin código"}
  `.trim();
}

function buildTutorPrompt(attempt, extraContext = {}) {
  const { language, code, stdin, stdout, stderr, status } = attempt;

  const title = extraContext.title || extraContext.exerciseId || "Ejercicio sin título";
  const statement = extraContext.statement || "Sin enunciado";
  const hints = Array.isArray(extraContext.hints) ? extraContext.hints : [];

  const issueType = detectIssueType(attempt);

  const casePromptBlock = buildCasePromptBlock(issueType, attempt, extraContext);
  const riskLevel = detectHintRisk(attempt, extraContext);
  const antiSolutionInstruction = buildAntiSolutionInstruction(riskLevel);
  const exerciseAlignmentBlock = buildExerciseAlignmentBlock(attempt, extraContext);

return `
Eres un tutor de programación para principiantes.

Tu objetivo es ayudar a un alumno sin darle la solución completa.

Reglas generales obligatorias:
- No escribas la solución final completa.
- No devuelvas el código entero resuelto.
- No reescribas el ejercicio completo.
- No uses bloques de código.
- No escribas código ni fragmentos de código.
- No des expresiones exactas que resuelvan el ejercicio.
- Puedes mencionar conceptos o herramientas del tema si ya aparecen en el enunciado, en las pistas o en el código del alumno.
- Puedes mencionar funciones o estructuras de forma general, pero no escribas la línea exacta que debe usar.
- No menciones índices concretos salvo que el enunciado ya los mencione.
- No señales la línea donde está el fallo.
- No menciones números de línea.
- No uses expresiones como "línea 3", "línea 15", "línea anterior", "línea siguiente" o "línea marcada".
- Da pistas graduales, concretas y útiles.
- Antes de centrarte en el error técnico, revisa si el código responde al enunciado.
- Si el código no parece responder al enunciado, dilo en la primera pista.
- Prioriza explicar el desajuste con el enunciado si existe.
- Señala qué concepto debe revisar.
- Sugiere un único siguiente paso pequeño y claro.
- Responde en español.
- Sé breve, clara y didáctica.
- No inventes información.
- Si el programa se ejecuta sin error, no asumas que está correcto.
- Cuando haya stdout, compara la salida con lo que pide el enunciado.
- Si la salida parece incorrecta, da pistas sobre la lógica o el formato sin escribir la salida correcta completa.
- Distingue entre error técnico, error lógico y código que no responde al enunciado.

Revisión del objetivo del ejercicio:
${exerciseAlignmentBlock}

Guía específica para este tipo de caso:
${casePromptBlock}

Nivel de riesgo de dar solución directa: ${riskLevel}

${antiSolutionInstruction}

Formato deseado de respuesta:
1. Indica si el código está enfocado al enunciado o si primero debe revisar el objetivo del ejercicio.
2. Da una pista sobre el concepto principal que debería revisar.
3. Da una pista sobre el error técnico o lógico más probable, si lo hay.
4. Indica una comprobación pequeña antes de volver a ejecutar.

Reglas del formato:
- Intenta responder en 4 líneas numeradas.
- Una sola idea principal por línea.
- No uses negritas.
- No uses bloques de código.
- No escribas la solución literal.
- No empieces frases con "Estás buscando", "Parece que quieres" o "Tu objetivo es entender".
- Usa frases directas como "Revisa", "Comprueba", "Piensa si" o "Vuelve al enunciado".
- No señales líneas concretas, números de línea, posiciones concretas ni una zona exacta del código; orienta solo por bloque, concepto o intención.

Datos de ejecución:
Lenguaje: ${language}
Estado de ejecución: ${status}
Tipo de caso detectado: ${issueType}

Entrada usada por el programa:
${stdin || "Sin entrada"}

Resultado que produjo el programa:
${stdout || "Sin salida"}

Error técnico:
${stderr || "Sin error técnico"}

Análisis obligatorio de la salida:
- Si hay salida, revisa si responde al enunciado completo.
- No valores solo que el programa ejecute sin error.
- Si la salida parece incompleta, desordenada o no relacionada con el objetivo, indícalo como pista.
- No escribas la salida correcta completa.
- Si no hay salida, revisa si el ejercicio pedía mostrar o devolver algún resultado.
`.trim();

}

function normalizeAiResponse(text) {
  if (!text) return "";

  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\*\*/g, "")
    .replace(/^[•\-–]\s*/gm, "")
    .replace(/\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function isUselessAiResponse(text) {
  if (!text) return true;

  const cleaned = normalizeAiResponse(text).toLowerCase().trim();

  const uselessPatterns = [
    "user safety: safe",
    "safety: safe",
    "safe",
    "user_safe",
    "content safety",
    "policy: safe",
    "no issues found"
  ];

  return uselessPatterns.some((pattern) => cleaned === pattern || cleaned.includes(pattern));
}

function validateAiResponse(text, issueType = "generic_error", options = {}) {
  const { strict = false } = options;

  if (!text || !text.trim()) {
    return { ok: false, reason: "empty_response" };
  }

  const cleaned = normalizeAiResponse(text);

  if (cleaned.length < 18) {
    return { ok: false, reason: "too_short" };
  }
  
  let lines = cleaned
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  if (!strict && lines.length === 1) {
    lines = cleaned
      .split(/(?<=\.)\s+(?=\d+\.|[A-ZÁÉÍÓÚÑ])/)
      .map((l) => l.trim())
      .filter(Boolean);
  }

if (strict) {
  if (lines.length < 3) {
    return { ok: false, reason: "wrong_line_count" };
  }

  const finalLines = lines.slice(0, 4);

  const normalizedLines = finalLines.map((line, index) => {
    const expected = `${index + 1}.`;

    if (/^\d+\./.test(line)) {
      return line.replace(/^\d+\./, expected);
    }

    return `${expected} ${line}`;
  });

  const tooLongLine = normalizedLines.some((line) => line.length > 280);
  if (tooLongLine) {
    return { ok: false, reason: "line_too_long" };
  }

  if (cleaned.includes("```")) {
    return { ok: false, reason: "forbidden_format" };
  }

  return {
    ok: true,
    normalizedText: normalizedLines.join("\n"),
  };
}

  if (lines.length < 3) {
    return { ok: false, reason: "too_few_lines" };
  }

  const firstLines = lines.slice(0, 4);

  const normalizedLines = firstLines.map((line, index) => {
    const expected = `${index + 1}.`;

    if (/^\d+\./.test(line)) {
      return line.replace(/^\d+\./, expected);
    }

    return `${expected} ${line}`;
  });

  const tooLongLine = normalizedLines.some((line) => line.length > 320);
  if (tooLongLine) {
    return { ok: false, reason: "line_too_long" };
  }

  if (cleaned.includes("```")) {
    return { ok: false, reason: "forbidden_format" };
  }

  return {
    ok: true,
    normalizedText: normalizedLines.join("\n"),
  };
}

function looksAwkwardTutorPhrase(text) {
  if (!text) return false;

  const lower = text.toLowerCase();

  const awkwardPatterns = [
    "estás buscando entender",
    "parece que quieres entender",
    "tu objetivo es entender",
    "estás intentando comprender",
    "es importante revisar la estructura de las llamadas a funciones",
    "cómo se conectan los elementos"
  ];

  return awkwardPatterns.some((p) => lower.includes(p));
}


function expandSingleLineHint(text) {
  const cleaned = normalizeAiResponse(text);
  if (!cleaned || isUselessAiResponse(cleaned)) return "";

  const firstLine = cleaned.replace(/^\d+\.\s*/, "").trim();
  if (!firstLine) return "";

  return [
    `1. ${firstLine}`,
    "2. Revisa el bloque donde se construye o se cierra ese texto.",
    "3. Piensa si la estructura del texto empieza y termina de forma coherente.",
    "4. Comprueba ese bloque antes de volver a ejecutar."
  ].join("\n");
}


function looksTooSolutionLike(text) {
  if (!text) return false;

  const lower = text.toLowerCase();

  const directCodePatterns = [
    "print(",
    "input(",
    "def ",
    "else:",
    "elif ",
    "[0]",
    "[-1]",
    " = ",
    " == ",
    " += ",
    "return "
  ];

  const directivePatterns = [
    "usa exactamente",
    "usa esta expresión",
    "convierte directamente",
    "añade directamente",
    "escribe exactamente",
    "asigna directamente",
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

function mentionsSpecificLine(text) {
  if (!text) return false;

  const lower = text.toLowerCase();

  const linePatterns = [
    /\blínea\s+\d+\b/,
    /\blinea\s+\d+\b/,
    /\brevisa la línea\b/,
    /\brevisa la linea\b/,
    /\ben la línea\b/,
    /\ben la linea\b/,
    /\bla línea anterior\b/,
    /\bla linea anterior\b/,
    /\bla línea siguiente\b/,
    /\bla linea siguiente\b/,
    /\blínea marcada\b/,
    /\blinea marcada\b/,
    /\bjusto en la línea\b/,
    /\bjusto en la linea\b/,
  ];

  return linePatterns.some((pattern) => pattern.test(lower));
}


async function requestFormattingFix(apiKey, rawText) {
  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "HTTP-Referer": process.env.OPENROUTER_HTTP_REFERER || process.env.APP_BASE_URL || "http://localhost:3000",
      "X-Title": "TFG Python Tutor",
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || "openrouter/free",
      messages: [
        {
          role: "system",
          content:
            "Reformula el texto en español en 4 líneas numeradas, una idea breve por línea. No añadas bloques de código, líneas corregidas ni expresiones que resuelvan el ejercicio. Puedes mencionar conceptos o herramientas de forma general si ya aparecen en el texto original. No des la solución. No menciones líneas ni números de línea."
        },
        {
          role: "user",
          content: rawText,
        },
      ],
      temperature: 0.1,
      max_tokens: 220,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Error reformateando respuesta IA");
  }

  return data?.choices?.[0]?.message?.content?.trim() || "";
}

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
          "Eres un tutor de programación para principiantes. Responde siempre en español. No des la solución literal. No escribas bloques de código ni líneas corregidas. Puedes mencionar conceptos, estructuras o herramientas del tema si ayudan a orientar, pero sin construir la solución. No indiques la línea concreta del fallo ni números de línea. Habla en términos de concepto, estructura, tipo de dato, salida obtenida o intención del código. Si una respuesta suena como una instrucción exacta de implementación, es demasiado directa.",},
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

    if (!retryResponse.ok) {
      throw new Error(retryData?.error?.message || "Error llamando a la IA");
    }

    text = retryData?.choices?.[0]?.message?.content?.trim();
  }

  if (!text) {
    throw new Error("La IA no devolvió contenido");
  }

  if (isUselessAiResponse(text)) {
    throw new Error("Respuesta IA inválida: useless_response");
  }

  const issueType = detectIssueType(attempt);
  let validation = validateAiResponse(text, issueType, { strict: false });

  if (!validation.ok) {
    if (validation.reason === "too_few_lines" || validation.reason === "too_short") {
      const expanded = expandSingleLineHint(text);
      const expandedValidation = validateAiResponse(expanded, issueType, { strict: true });

      if (expandedValidation.ok) {
        text = expandedValidation.normalizedText || expanded;
      } else {
        try {
          const reformatted = await requestFormattingFix(apiKey, text);
          const strictRetried = validateAiResponse(reformatted, issueType, { strict: true });

          if (!strictRetried.ok) {
            throw new Error(`Respuesta IA inválida: ${strictRetried.reason}`);
          }

          text = strictRetried.normalizedText || reformatted;
        } catch {
          throw new Error(`Respuesta IA inválida: ${validation.reason}`);
        }
      }
    } else {
      try {
        const reformatted = await requestFormattingFix(apiKey, text);
        const strictRetried = validateAiResponse(reformatted, issueType, { strict: true });

        if (!strictRetried.ok) {
          throw new Error(`Respuesta IA inválida: ${strictRetried.reason}`);
        }

        text = strictRetried.normalizedText || reformatted;
      } catch {
        throw new Error(`Respuesta IA inválida: ${validation.reason}`);
      }
    }
  } else {
    const strictValidation = validateAiResponse(validation.normalizedText || text, issueType, { strict: true });

    if (!strictValidation.ok) {
      try {
        const reformatted = await requestFormattingFix(apiKey, validation.normalizedText || text);
        const strictRetried = validateAiResponse(reformatted, issueType, { strict: true });

        if (!strictRetried.ok) {
          throw new Error(`Respuesta IA inválida: ${strictRetried.reason}`);
        }

        text = strictRetried.normalizedText || reformatted;
      } catch {
        throw new Error(`Respuesta IA inválida: ${strictValidation.reason}`);
      }
    } else {
      text = strictValidation.normalizedText || validation.normalizedText || text;
    }
  }

  if (looksTooSolutionLikeForIssue(text, issueType)) {
    throw new Error("Respuesta IA inválida: too_solution_like_for_issue");
  }

  if (looksTooSolutionLike(text)) {
    throw new Error("Respuesta IA inválida: too_solution_like");
  }

  if (mentionsSpecificLine(text)) {
    throw new Error("Respuesta IA inválida: mentions_specific_line");
  }

  if (looksAwkwardTutorPhrase(text)) {
    throw new Error("Respuesta IA inválida: awkward_tutor_phrase");
  }
  
  if (isUselessAiResponse(text)) {
    throw new Error("Respuesta IA inválida: useless_response");
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
  mentionsSpecificLine,
  generateRealAiFeedback,
  looksAwkwardTutorPhrase,
  isUselessAiResponse,
};