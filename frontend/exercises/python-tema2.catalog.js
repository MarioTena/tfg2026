window.EXERCISE_CATALOG = window.EXERCISE_CATALOG || {};

window.EXERCISE_CATALOG["py_tema2_ej1"] = {
  id: "py_tema2_ej1",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 1 – Mayor de edad",
  statement: "Si edad es 18 o más, imprime 'Mayor de edad'. Si no, imprime 'Menor de edad'.",
  difficulty: "Fácil",
  estimatedTime: "5 min",
  skill: "if/else",
  type: "Ejercicio",
  starterCode:
`edad = 0

# Escribe aquí la condición
# y muestra el mensaje correspondiente
`,
  hints: [
    "Piensa qué comparación separa los dos casos.",
    "Necesitas un camino para cuando se cumple y otro para cuando no.",
    "Prueba también el caso límite."
  ],
  expectedOutput: "Debe mostrar si la persona es mayor o menor de edad según el valor de edad.",
  checks: [
    "Debe usar una estructura condicional.",
    "Debe contemplar el caso de edad suficiente.",
    "Debe contemplar el caso contrario.",
    "Debe mostrar un mensaje claro por pantalla."
  ]
};

window.EXERCISE_CATALOG["py_tema2_ej2"] = {
  id: "py_tema2_ej2",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 2 – Nota aprobado o suspenso",
  statement: "Si nota es 5 o más, imprime 'Aprobado'. Si no, imprime 'Suspenso'.",
  difficulty: "Fácil",
  estimatedTime: "5 min",
  skill: "Comparación",
  type: "Ejercicio",
  starterCode:
`nota = 0

# Decide si la nota alcanza el aprobado
# y muestra el mensaje correspondiente
`,
  hints: [
    "Piensa cuál es la nota mínima para aprobar.",
    "Necesitas distinguir dos resultados posibles.",
    "Prueba también el valor justo del aprobado."
  ],
  expectedOutput: "Debe mostrar Aprobado o Suspenso según el valor de nota.",
  checks: [
    "Debe usar una condición.",
    "Debe contemplar el caso aprobado.",
    "Debe contemplar el caso suspenso.",
    "Debe tratar correctamente el caso límite."
  ]
};

window.EXERCISE_CATALOG["py_tema2_ej3"] = {
  id: "py_tema2_ej3",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 3 – Clasificación con elif",
  statement: "Clasifica una nota como sobresaliente, notable, aprobado o suspenso.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "elif",
  type: "Ejercicio",
  starterCode:
`nota = 0

# Clasifica la nota en uno de estos grupos:
# sobresaliente, notable, aprobado o suspenso
`,
  hints: [
    "Necesitas más de dos caminos posibles.",
    "El orden de las condiciones importa.",
    "Prueba valores bajos, medios y altos."
  ],
  expectedOutput: "Debe mostrar una clasificación coherente para la nota indicada.",
  checks: [
    "Debe usar if, elif y else.",
    "Debe diferenciar al menos cuatro casos.",
    "Debe ordenar las condiciones correctamente.",
    "Debe mostrar solo una clasificación final."
  ]
};

window.EXERCISE_CATALOG["py_tema2_ej4"] = {
  id: "py_tema2_ej4",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 4 – Número positivo, negativo o cero",
  statement: "Guarda un número e imprime si es positivo, negativo o cero.",
  difficulty: "Media",
  estimatedTime: "6 min",
  skill: "Condiciones",
  type: "Ejercicio",
  starterCode:
`numero = 0

# Clasifica el número en positivo, negativo o cero
`,
  hints: [
    "Necesitas distinguir tres casos.",
    "Piensa qué comparación identifica un número positivo.",
    "No olvides el caso que no es positivo ni negativo."
  ],
  expectedOutput: "Debe mostrar si el número es positivo, negativo o cero.",
  checks: [
    "Debe contemplar números positivos.",
    "Debe contemplar números negativos.",
    "Debe contemplar el cero.",
    "Debe mostrar un único resultado coherente."
  ]
};

window.EXERCISE_CATALOG["py_tema2_ej5"] = {
  id: "py_tema2_ej5",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 5 – Comparar dos números",
  statement: "Guarda dos números e imprime cuál es mayor o si son iguales.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Comparar",
  type: "Ejercicio",
  starterCode:
`a = 0
b = 0

# Compara ambos valores
# y muestra cuál es mayor o si son iguales
`,
  hints: [
    "Necesitas comparar las dos variables entre sí.",
    "Hay tres resultados posibles.",
    "El caso de igualdad también debe estar contemplado."
  ],
  expectedOutput: "Debe indicar si a es mayor, si b es mayor o si ambos son iguales.",
  checks: [
    "Debe comparar dos variables.",
    "Debe contemplar cuando a es mayor.",
    "Debe contemplar cuando b es mayor.",
    "Debe contemplar cuando son iguales."
  ]
};

window.EXERCISE_CATALOG["py_tema2_ej6"] = {
  id: "py_tema2_ej6",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 6 – Usuario administrador",
  statement: "Si usuario es 'admin', imprime 'Acceso total'. Si no, imprime 'Acceso limitado'.",
  difficulty: "Fácil",
  estimatedTime: "5 min",
  skill: "Strings",
  type: "Ejercicio",
  starterCode:
`usuario = ""

# Comprueba el tipo de usuario
# y muestra el nivel de acceso
`,
  hints: [
    "Aquí estás comparando texto.",
    "Python distingue mayúsculas y minúsculas.",
    "Necesitas un caso especial y un caso general."
  ],
  expectedOutput: "Debe mostrar Acceso total para admin y Acceso limitado para el resto.",
  checks: [
    "Debe comparar el valor de usuario.",
    "Debe contemplar el usuario administrador.",
    "Debe contemplar cualquier otro usuario.",
    "Debe mostrar el mensaje adecuado."
  ]
};

window.EXERCISE_CATALOG["py_tema2_ej7"] = {
  id: "py_tema2_ej7",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 7 – Descuento",
  statement: "Un cliente tiene descuento si es estudiante o si tiene menos de 25 años.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "or",
  type: "Ejercicio",
  starterCode:
`es_estudiante = False
edad = 0

# Decide si tiene descuento
# según las condiciones del enunciado
`,
  hints: [
    "Hay dos motivos posibles para tener descuento.",
    "No tienen que cumplirse los dos a la vez.",
    "Piensa qué operador lógico encaja con esa idea."
  ],
  expectedOutput: "Debe indicar si el cliente tiene descuento según si es estudiante o tiene menos de 25 años.",
  checks: [
    "Debe usar una condición compuesta.",
    "Debe contemplar el caso de estudiante.",
    "Debe contemplar el caso de edad menor de 25.",
    "Debe contemplar el caso sin descuento."
  ]
};

window.EXERCISE_CATALOG["py_tema2_ej8"] = {
  id: "py_tema2_ej8",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 8 – Acceso seguro",
  statement: "Un usuario puede entrar si la contraseña es correcta y la cuenta está activa.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "and",
  type: "Ejercicio",
  starterCode:
`password_correcta = False
cuenta_activa = False

# Decide si el acceso está permitido
`,
  hints: [
    "Aquí hay dos condiciones necesarias.",
    "Si una de las dos falla, no debería entrar.",
    "Piensa qué operador lógico exige que todo se cumpla."
  ],
  expectedOutput: "Debe permitir el acceso solo si la contraseña es correcta y la cuenta está activa.",
  checks: [
    "Debe comprobar la contraseña.",
    "Debe comprobar si la cuenta está activa.",
    "Debe exigir que ambas condiciones se cumplan.",
    "Debe mostrar si el acceso está permitido o denegado."
  ]
};

window.EXERCISE_CATALOG["py_tema2_ej9"] = {
  id: "py_tema2_ej9",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 9 – Rango numérico",
  statement: "Comprueba si un número está entre 10 y 20, ambos inclusive.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Rangos",
  type: "Ejercicio",
  starterCode:
`numero = 0

# Comprueba si el número está dentro del rango pedido
`,
  hints: [
    "Debes comprobar un límite inferior y uno superior.",
    "Los extremos también cuentan.",
    "Piensa si puedes expresar el rango en una sola condición."
  ],
  expectedOutput: "Debe indicar si el número está dentro o fuera del rango de 10 a 20 incluidos.",
  checks: [
    "Debe comprobar el límite inferior.",
    "Debe comprobar el límite superior.",
    "Debe incluir los extremos del rango.",
    "Debe mostrar si está dentro o fuera."
  ]
};

window.EXERCISE_CATALOG["py_tema2_ej10"] = {
  id: "py_tema2_ej10",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 10 – Par o impar",
  statement: "Usa el operador % para comprobar si un número es par o impar.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Módulo",
  type: "Ejercicio",
  starterCode:
`numero = 0

# Decide si el número es par o impar
`,
  hints: [
    "El resto de una división puede ayudarte.",
    "Piensa qué resto deja un número par al dividirlo entre 2.",
    "Necesitas contemplar los dos casos."
  ],
  expectedOutput: "Debe mostrar si el número es par o impar.",
  checks: [
    "Debe usar el operador de resto.",
    "Debe detectar los números pares.",
    "Debe contemplar los números impares.",
    "Debe mostrar un mensaje claro."
  ]
};

window.EXERCISE_CATALOG["py_tema2_ej11"] = {
  id: "py_tema2_ej11",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 11 – Detectar cuenta inactiva con not",
  statement: "Si la cuenta no está activa, imprime 'Cuenta inactiva'. Si no, imprime 'Cuenta activa'.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "not",
  type: "Ejercicio",
  starterCode:
`cuenta_activa = False

# Muestra si la cuenta está activa o inactiva
`,
  hints: [
    "Puedes razonar a partir del valor contrario.",
    "Piensa cómo se invierte un booleano.",
    "El resultado debe cubrir los dos estados posibles."
  ],
  expectedOutput: "Debe mostrar Cuenta inactiva si la cuenta no está activa y Cuenta activa en caso contrario.",
  checks: [
    "Debe trabajar con un valor booleano.",
    "Debe detectar el caso inactivo.",
    "Debe detectar el caso activo.",
    "Debe mostrar el mensaje correspondiente."
  ]
};

window.EXERCISE_CATALOG["py_tema2_ej12"] = {
  id: "py_tema2_ej12",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 12 – Corregir lógica de clasificación",
  statement: "Reordena una clasificación con elif para que no tape los casos más altos.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Depuración",
  type: "Ejercicio",
  starterCode:
`nota = 0

# Este planteamiento está mal ordenado:
#
# if nota >= 5:
#     print("Aprobado")
# elif nota >= 7:
#     print("Notable")
# elif nota >= 9:
#     print("Sobresaliente")
# else:
#     print("Suspenso")
#
# Reescríbelo para que los casos altos no queden tapados
`,
  hints: [
    "El problema no es la sintaxis, sino el orden.",
    "Piensa qué condiciones son más exigentes.",
    "Prueba valores que deberían entrar en categorías altas."
  ],
  expectedOutput: "Debe clasificar correctamente una nota sin que los casos altos queden atrapados por condiciones anteriores.",
  checks: [
    "Debe usar una estructura if, elif y else.",
    "Debe ordenar correctamente las condiciones.",
    "Debe permitir detectar sobresaliente.",
    "Debe permitir detectar notable, aprobado y suspenso."
  ]
};

window.EXERCISE_CATALOG["py_tema2_ej13"] = {
  id: "py_tema2_ej13",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 13 – Input y mayor de edad",
  statement: "Pide una edad con input(), conviértela a número y decide si la persona es mayor o menor de edad.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "input()",
  type: "Ejercicio",
  starterCode:
`# Pide la edad al usuario
# conviértela a número
# y decide si es mayor o menor de edad
`,
  hints: [
    "Recuerda que input() devuelve texto.",
    "Necesitas convertir la entrada antes de compararla como número.",
    "Después aplica la misma lógica de mayoría de edad."
  ],
  expectedOutput: "Debe pedir una edad, convertirla a número y mostrar si la persona es mayor o menor de edad.",
  checks: [
    "Debe pedir un dato al usuario.",
    "Debe convertir la entrada a número.",
    "Debe usar una condición para clasificar la edad.",
    "Debe mostrar el resultado por pantalla."
  ]
};

window.EXERCISE_CATALOG["py_tema2_reto1"] = {
  id: "py_tema2_reto1",
  language: "python",
  topic: "python/tema-2",
  title: "Mini reto – Clasificador de acceso",
  statement: "Decide si una persona puede pasar según su edad y si tiene entrada.",
  difficulty: "Reto",
  estimatedTime: "10 min",
  skill: "and",
  type: "Reto",
  starterCode:
`edad = 0
tiene_entrada = False

# Decide si puede pasar
# según las dos condiciones del enunciado
`,
  hints: [
    "Hay dos requisitos que deben cumplirse a la vez.",
    "Piensa qué ocurre si falta la entrada.",
    "Prueba varios casos, no solo uno."
  ],
  expectedOutput: "Debe indicar si la persona puede pasar según su edad y si tiene entrada.",
  checks: [
    "Debe comprobar la edad.",
    "Debe comprobar si tiene entrada.",
    "Debe exigir que se cumplan ambos requisitos.",
    "Debe mostrar si puede pasar o no."
  ]
};

window.EXERCISE_CATALOG["py_tema2_reto2"] = {
  id: "py_tema2_reto2",
  language: "python",
  topic: "python/tema-2",
  title: "Reto final – Clasificación por edad",
  statement: "Clasifica una edad como niño, adolescente, adulto o senior.",
  difficulty: "Reto final",
  estimatedTime: "12 min",
  skill: "Integrador",
  type: "Reto final",
  starterCode:
`edad = 0

# Clasifica la edad en:
# niño, adolescente, adulto o senior
`,
  hints: [
    "Necesitas dividir la edad en varios rangos.",
    "El orden de las condiciones debe evitar solapamientos.",
    "Piensa en los casos límite."
  ],
  expectedOutput: "Debe clasificar una edad en niño, adolescente, adulto o senior.",
  checks: [
    "Debe usar varias condiciones.",
    "Debe contemplar todos los rangos pedidos.",
    "Debe tratar correctamente los límites entre grupos.",
    "Debe mostrar una única clasificación final."
  ]
};