window.EXERCISE_CATALOG = window.EXERCISE_CATALOG || {};

window.EXERCISE_CATALOG["py_tema1_ej1"] = {
  id: "py_tema1_ej1",
  language: "python",
  topic: "python/tema-1",
  type: "Ejercicio",
  difficulty: "Fácil",
  estimatedTime: "4 min",
  skill: "print()",
  title: "Tu primer print",
  statement: "Muestra por pantalla el texto exacto: Hola, Python",
  hints: [
    "Necesitas mostrar un texto por pantalla.",
    "Recuerda cómo se representa el texto en Python.",
    "Respeta exactamente el mensaje pedido."
  ],
  expectedOutput: "Debe mostrar exactamente el texto: Hola, Python",
  checks: [
    "Debe mostrar texto por pantalla.",
    "El texto debe coincidir exactamente con el enunciado.",
    "No debe mostrar texto adicional."
  ],
  starterCode: 'print("")'
};

window.EXERCISE_CATALOG["py_tema1_ej2"] = {
  id: "py_tema1_ej2",
  language: "python",
  topic: "python/tema-1",
  type: "Ejercicio",
  difficulty: "Fácil",
  estimatedTime: "5 min",
  skill: "Salida en pantalla",
  title: "Dos líneas",
  statement: "Muestra dos mensajes en líneas separadas. El primer mensaje debe ser 'Estoy aprendiendo Python' y el segundo 'Paso a paso'.",
  hints: [
    "La salida debe aparecer en dos líneas distintas.",
    "Piensa cuántas instrucciones necesitas para conseguirlo.",
    "Comprueba que cada mensaje quede en su propia línea."
  ],
  expectedOutput: "Debe mostrar dos líneas: primero 'Estoy aprendiendo Python' y después 'Paso a paso'.",
  checks: [
    "Debe mostrar dos mensajes.",
    "Cada mensaje debe aparecer en una línea distinta.",
    "El orden de los mensajes debe coincidir con el enunciado."
  ],
  starterCode: 'print("")\nprint("")'
};

window.EXERCISE_CATALOG["py_tema1_ej3"] = {
  id: "py_tema1_ej3",
  language: "python",
  topic: "python/tema-1",
  type: "Ejercicio",
  difficulty: "Fácil",
  estimatedTime: "6 min",
  skill: "Variables",
  title: "Guardar un nombre",
  statement: "Crea una variable llamada nombre, guarda en ella tu nombre y muéstralo por pantalla.",
  hints: [
    "Primero guarda el dato y después muéstralo.",
    "Recuerda que un nombre es texto.",
    "El valor que se imprime debe salir de la variable."
  ],
  expectedOutput: "Debe mostrar por pantalla el nombre guardado en la variable.",
  checks: [
    "Debe crear una variable llamada nombre.",
    "La variable debe guardar un valor de texto.",
    "Debe mostrar el contenido de la variable por pantalla."
  ],
  starterCode: 'nombre = ""\nprint(nombre)'
};

window.EXERCISE_CATALOG["py_tema1_ej4"] = {
  id: "py_tema1_ej4",
  language: "python",
  topic: "python/tema-1",
  type: "Ejercicio",
  difficulty: "Fácil",
  estimatedTime: "6 min",
  skill: "Datos básicos",
  title: "Dos variables",
  statement: "Guarda tu edad y tu ciudad en dos variables distintas y muéstralas por pantalla.",
  hints: [
    "Necesitas guardar dos datos diferentes.",
    "Piensa qué dato es numérico y cuál es texto.",
    "La salida final debe mostrar ambos valores."
  ],
  expectedOutput: "Debe mostrar por pantalla una edad y una ciudad guardadas previamente en variables.",
  checks: [
    "Debe usar una variable para la edad.",
    "Debe usar una variable para la ciudad.",
    "Debe mostrar ambos valores por pantalla."
  ],
  starterCode:
`edad = 0
ciudad = ""

# Muestra los dos valores por pantalla
`
};

window.EXERCISE_CATALOG["py_tema1_ej5"] = {
  id: "py_tema1_ej5",
  language: "python",
  topic: "python/tema-1",
  type: "Ejercicio",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Operaciones",
  title: "Suma básica",
  statement: "Crea dos variables numéricas, súmalas y muestra el resultado por pantalla.",
  hints: [
    "Primero guarda los dos valores.",
    "Después calcula el resultado con una operación.",
    "Muestra el resultado final por pantalla."
  ],
  expectedOutput: "Debe mostrar el resultado de sumar dos variables numéricas.",
  checks: [
    "Debe crear dos variables numéricas.",
    "Debe realizar una suma entre ellas.",
    "Debe mostrar el resultado de la operación."
  ],
  starterCode:
`a = 0
b = 0

# Calcula y muestra la suma
`
};

window.EXERCISE_CATALOG["py_tema1_ej6"] = {
  id: "py_tema1_ej6",
  language: "python",
  topic: "python/tema-1",
  type: "Ejercicio",
  difficulty: "Media",
  estimatedTime: "6 min",
  skill: "Números",
  title: "Multiplicación",
  statement: "Calcula el doble de un número guardado en una variable y muestra el resultado.",
  hints: [
    "Empieza guardando un número.",
    "El objetivo es obtener una cantidad multiplicada respecto al valor original.",
    "Comprueba que la salida sea el doble del valor inicial."
  ],
  expectedOutput: "Debe mostrar el doble del número guardado en la variable.",
  checks: [
    "Debe partir de una variable numérica.",
    "Debe calcular el doble de ese valor.",
    "Debe mostrar el resultado final por pantalla."
  ],
  starterCode:
`numero = 0

# Calcula y muestra el doble
`
};

window.EXERCISE_CATALOG["py_tema1_ej7"] = {
  id: "py_tema1_ej7",
  language: "python",
  topic: "python/tema-1",
  type: "Ejercicio",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Strings",
  title: "Unir texto",
  statement: "Crea un saludo uniendo un texto fijo con una variable llamada nombre.",
  hints: [
    "Necesitas combinar una parte fija con un dato variable.",
    "Piensa cómo construir una salida legible.",
    "Vigila los espacios para que el saludo quede natural."
  ],
  expectedOutput: "Debe mostrar un saludo formado por texto fijo y el valor de la variable nombre.",
  checks: [
    "Debe usar una variable llamada nombre.",
    "Debe combinar texto fijo con el valor de la variable.",
    "La salida debe ser legible y tener espacios correctos."
  ],
  starterCode:
`nombre = ""

# Construye y muestra un saludo usando la variable
`
};

window.EXERCISE_CATALOG["py_tema1_ej8"] = {
  id: "py_tema1_ej8",
  language: "python",
  topic: "python/tema-1",
  type: "Ejercicio",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Concatenación",
  title: "Frase personalizada",
  statement: "Usa varias variables para construir una frase completa sobre una persona. Debe incluir al menos nombre, edad y ciudad.",
  hints: [
    "Necesitas guardar varios datos antes de imprimir.",
    "La frase debe sonar completa y natural.",
    "Revisa que aparezcan los tres datos pedidos."
  ],
  expectedOutput: "Debe mostrar una frase completa que incluya nombre, edad y ciudad.",
  checks: [
    "Debe crear o usar una variable para el nombre.",
    "Debe crear o usar una variable para la edad.",
    "Debe crear o usar una variable para la ciudad.",
    "Debe mostrar una frase legible con los tres datos."
  ],
  starterCode:
`nombre = ""
edad = 0
ciudad = ""

# Construye una frase completa con los tres datos
`
};

window.EXERCISE_CATALOG["py_tema1_ej9"] = {
  id: "py_tema1_ej9",
  language: "python",
  topic: "python/tema-1",
  type: "Ejercicio",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Errores",
  title: "Detectar un error",
  statement: "Corrige este programa para que funcione correctamente:\n\nprint(\"Hola mundo)",
  hints: [
    "El problema está en cómo se ha escrito el texto.",
    "Revisa si el inicio y el final están bien cerrados.",
    "Después de corregirlo, el programa debe mostrar el mensaje sin fallar."
  ],
  expectedOutput: "Debe mostrar el mensaje Hola mundo sin provocar error de sintaxis.",
  checks: [
    "Debe corregir el texto mal cerrado.",
    "Debe mantener el mensaje pedido.",
    "El programa debe ejecutarse sin error."
  ],
  starterCode: 'print("Hola mundo)'
};

window.EXERCISE_CATALOG["py_tema1_ej10"] = {
  id: "py_tema1_ej10",
  language: "python",
  topic: "python/tema-1",
  type: "Ejercicio",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Tipos de datos",
  title: "Tipo incorrecto",
  statement: "Corrige este programa para que funcione correctamente:\n\nedad = 18\nprint(\"Tengo \" + edad + \" años\")",
  hints: [
    "El problema no es de sintaxis, sino de tipos de datos.",
    "Revisa cómo estás construyendo el mensaje.",
    "Busca una forma de mostrar texto y número sin forzar una suma incorrecta."
  ],
  expectedOutput: "Debe mostrar una frase con la edad sin provocar un error de tipos.",
  checks: [
    "Debe mantener una variable numérica para la edad.",
    "Debe construir una salida que mezcle texto y número correctamente.",
    "El programa debe ejecutarse sin TypeError."
  ],
  starterCode: 'edad = 18\nprint("Tengo " + edad + " años")'
};

window.EXERCISE_CATALOG["py_tema1_reto1"] = {
  id: "py_tema1_reto1",
  language: "python",
  topic: "python/tema-1",
  type: "Reto",
  difficulty: "Media",
  estimatedTime: "10 min",
  skill: "Variables + strings",
  title: "Mini reto – Tarjeta personal",
  statement: "Crea un pequeño programa que muestre una tarjeta personal con nombre, edad y ciudad en formato claro y ordenado.",
  hints: [
    "Primero decide qué información vas a guardar.",
    "La salida debe verse clara y separada.",
    "Piensa en un formato que haga fácil leer cada dato."
  ],
  expectedOutput: "Debe mostrar una tarjeta personal clara con nombre, edad y ciudad.",
  checks: [
    "Debe guardar nombre, edad y ciudad.",
    "Debe mostrar los datos de forma ordenada.",
    "La salida debe ser fácil de leer.",
    "Debe combinar variables y texto."
  ],
  starterCode:
`nombre = ""
edad = 0
ciudad = ""

# Crea aquí tu tarjeta personal
`
};

window.EXERCISE_CATALOG["py_tema1_reto2"] = {
  id: "py_tema1_reto2",
  language: "python",
  topic: "python/tema-1",
  type: "Reto final",
  difficulty: "Media",
  estimatedTime: "12 min",
  skill: "Integrador",
  title: "Reto final – Presentación completa",
  statement: "Construye un programa corto que use impresión, variables, operaciones y strings para presentar información personal de forma más elaborada. Debe incluir al menos: nombre, edad, ciudad y el doble de la edad.",
  hints: [
    "Necesitas combinar datos de texto y de número.",
    "Hay un cálculo sencillo que debe aparecer en la salida.",
    "Antes de ejecutar, revisa que el programa incluya todos los elementos pedidos."
  ],
  expectedOutput: "Debe mostrar una presentación personal que incluya nombre, edad, ciudad y el doble de la edad.",
  checks: [
    "Debe usar variables de texto y numéricas.",
    "Debe calcular el doble de la edad.",
    "Debe mostrar todos los datos pedidos.",
    "La salida debe estar organizada y ser legible."
  ],
  starterCode:
`nombre = ""
edad = 0
ciudad = ""

# Calcula el doble de la edad
# y construye una presentación completa
`
};