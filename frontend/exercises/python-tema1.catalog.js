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
  statement: "Muestra dos mensajes en líneas separadas usando dos instrucciones print(). El primer mensaje debe ser 'Estoy aprendiendo Python' y el segundo 'Paso a paso'.",
  hints: [
    "La salida debe aparecer en dos líneas distintas.",
    "Piensa cuántas instrucciones necesitas para conseguirlo.",
    "Comprueba que cada mensaje quede en su propia línea."
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
    "Necesitas una variable para cada dato.",
    "No ambos datos tienen el mismo tipo.",
    "La salida final debe mostrar los dos valores."
  ],
  starterCode: 'edad = 0\nciudad = ""\nprint(edad)\nprint(ciudad)'
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
  starterCode: 'a = 0\nb = 0\nprint(a + b)'
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
  starterCode: 'numero = 0\nprint(numero * 2)'
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
  starterCode: 'nombre = ""\nprint("Hola", nombre)'
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
  starterCode: 'nombre = ""\nedad = 0\nciudad = ""\nprint("Me llamo", nombre, "tengo", edad, "años y vivo en", ciudad)'
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
  title: "Tarjeta personal",
  statement: "Crea un pequeño programa que muestre una tarjeta personal con nombre, edad y ciudad en formato claro y ordenado.",
  hints: [
    "Primero decide qué información vas a guardar.",
    "La salida debe verse clara y separada.",
    "Piensa en un formato que haga fácil leer cada dato."
  ],
  starterCode: 'nombre = ""\nedad = 0\nciudad = ""\n\nprint("=== TARJETA PERSONAL ===")\nprint("Nombre:", nombre)\nprint("Edad:", edad)\nprint("Ciudad:", ciudad)'
};

window.EXERCISE_CATALOG["py_tema1_reto2"] = {
  id: "py_tema1_reto2",
  language: "python",
  topic: "python/tema-1",
  type: "Reto final",
  difficulty: "Media",
  estimatedTime: "12 min",
  skill: "Integrador",
  title: "Presentación completa",
  statement: "Construye un programa corto que use impresión, variables, operaciones y strings para presentar información personal de forma más elaborada. Debe incluir al menos: nombre, edad, ciudad y el doble de la edad.",
  hints: [
    "Necesitas combinar datos de texto y de número.",
    "Hay un cálculo sencillo que debe aparecer en la salida.",
    "Antes de ejecutar, revisa que el programa incluya todos los elementos pedidos."
  ],
  starterCode: 'nombre = ""\nedad = 0\nciudad = ""\n\ndoble_edad = edad * 2\n\nprint("Hola, me llamo", nombre)\nprint("Vivo en", ciudad)\nprint("Tengo", edad, "años")\nprint("El doble de mi edad es", doble_edad)'
};