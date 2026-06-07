window.EXERCISE_CATALOG = window.EXERCISE_CATALOG || {};

window.EXERCISE_CATALOG["py_tema8_ej1"] = {
  id: "py_tema8_ej1",
  language: "python",
  topic: "python/tema-8",
  title: "Ejercicio 1 – Crear una tupla",
  statement: "Crea una tupla con tres colores y muestra el segundo.",
  difficulty: "Fácil",
  estimatedTime: "5 min",
  skill: "Tuplas",
  type: "Ejercicio",
  starterCode:
`# Crea una tupla con tres colores
# y muestra el segundo elemento
`,
  hints: [
    "Necesitas una colección estable de varios valores.",
    "El elemento pedido no es el primero.",
    "Recuerda cómo se accede a una posición concreta."
  ],
  expectedOutput: "Debe mostrar el segundo color de una tupla con tres colores.",
  checks: [
    "Debe crear una tupla.",
    "La tupla debe contener tres colores.",
    "Debe acceder al segundo elemento.",
    "Debe mostrar ese elemento por pantalla."
  ]
};

window.EXERCISE_CATALOG["py_tema8_ej2"] = {
  id: "py_tema8_ej2",
  language: "python",
  topic: "python/tema-8",
  title: "Ejercicio 2 – Tupla de un elemento",
  statement: "Crea correctamente una tupla con un solo número.",
  difficulty: "Fácil",
  estimatedTime: "5 min",
  skill: "Sintaxis",
  type: "Ejercicio",
  starterCode:
`# Crea correctamente una tupla con un solo número
# y muéstrala por pantalla
`,
  hints: [
    "Una tupla de un solo elemento tiene una sintaxis especial.",
    "No basta con escribir un valor entre paréntesis.",
    "Comprueba que Python lo interpreta como tupla."
  ],
  expectedOutput: "Debe mostrar una tupla de un solo elemento.",
  checks: [
    "Debe crear una tupla.",
    "La tupla debe tener un solo elemento.",
    "Debe usar la sintaxis correcta para un único elemento.",
    "Debe mostrar el resultado."
  ]
};

window.EXERCISE_CATALOG["py_tema8_ej3"] = {
  id: "py_tema8_ej3",
  language: "python",
  topic: "python/tema-8",
  title: "Ejercicio 3 – Tupla vacía y longitud",
  statement: "Crea una tupla vacía y comprueba su longitud.",
  difficulty: "Fácil",
  estimatedTime: "5 min",
  skill: "Casos frontera",
  type: "Ejercicio",
  starterCode:
`# Crea una tupla vacía
# y muestra cuántos elementos tiene
`,
  hints: [
    "Una colección puede no tener elementos.",
    "Después de crearla, debes medir su tamaño.",
    "El resultado esperado es una cantidad."
  ],
  expectedOutput: "Debe mostrar la longitud de una tupla vacía.",
  checks: [
    "Debe crear una tupla vacía.",
    "Debe calcular su longitud.",
    "Debe mostrar el resultado.",
    "La longitud debe corresponder a una colección sin elementos."
  ]
};

window.EXERCISE_CATALOG["py_tema8_ej4"] = {
  id: "py_tema8_ej4",
  language: "python",
  topic: "python/tema-8",
  title: "Ejercicio 4 – Crear un set",
  statement: "Crea un set con números repetidos y observa el resultado.",
  difficulty: "Media",
  estimatedTime: "6 min",
  skill: "Duplicados",
  type: "Ejercicio",
  starterCode:
`# Crea un set con números repetidos
# y muestra el resultado
`,
  hints: [
    "La colección debe representar valores únicos.",
    "Incluye algunos valores repetidos al crearla.",
    "Comprueba qué ocurre con los duplicados al mostrarla."
  ],
  expectedOutput: "Debe mostrar un set donde los valores repetidos aparecen una sola vez.",
  checks: [
    "Debe crear un set.",
    "Debe partir de valores con repetidos.",
    "Debe mostrar el resultado.",
    "Debe reflejar que los sets no conservan duplicados."
  ]
};

window.EXERCISE_CATALOG["py_tema8_ej5"] = {
  id: "py_tema8_ej5",
  language: "python",
  topic: "python/tema-8",
  title: "Ejercicio 5 – Set vacío correcto",
  statement: "Crea correctamente un set vacío y añade dos elementos.",
  difficulty: "Media",
  estimatedTime: "6 min",
  skill: "set()",
  type: "Ejercicio",
  starterCode:
`# Crea un set vacío correctamente
# añade dos valores
# y muestra el resultado
`,
  hints: [
    "Crear un set vacío tiene una forma concreta.",
    "Después debes añadir elementos al conjunto.",
    "Comprueba que el resultado no sea un diccionario."
  ],
  expectedOutput: "Debe mostrar un set con dos elementos añadidos desde un set vacío.",
  checks: [
    "Debe crear un set vacío.",
    "No debe crear un diccionario vacío por error.",
    "Debe añadir dos elementos.",
    "Debe mostrar el set final."
  ]
};

window.EXERCISE_CATALOG["py_tema8_ej6"] = {
  id: "py_tema8_ej6",
  language: "python",
  topic: "python/tema-8",
  title: "Ejercicio 6 – Añadir y eliminar en un set",
  statement: "Añade un elemento y elimina otro de un set.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Modificar",
  type: "Ejercicio",
  starterCode:
`letras = {"a", "b", "c"}

# Añade un elemento
# elimina otro
# y muestra el set final
`,
  hints: [
    "Debes modificar el conjunto existente.",
    "Una operación incorpora un valor nuevo.",
    "La otra operación quita un valor que ya estaba."
  ],
  expectedOutput: "Debe mostrar el set después de añadir un elemento y eliminar otro.",
  checks: [
    "Debe usar el set dado.",
    "Debe añadir un elemento nuevo.",
    "Debe eliminar un elemento existente.",
    "Debe mostrar el set final."
  ]
};

window.EXERCISE_CATALOG["py_tema8_ej7"] = {
  id: "py_tema8_ej7",
  language: "python",
  topic: "python/tema-8",
  title: "Ejercicio 7 – Pertenencia en set",
  statement: "Comprueba si un valor pertenece a un set y actúa según el resultado.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Pertenencia",
  type: "Ejercicio",
  starterCode:
`numeros = {1, 2, 3, 4}

# Comprueba si un valor pertenece al set
# y muestra un mensaje según el resultado
`,
  hints: [
    "La idea clave es comprobar pertenencia.",
    "El resultado de esa comprobación debe decidir el mensaje.",
    "Piensa qué estructura condicional necesitas."
  ],
  expectedOutput: "Debe mostrar si el valor buscado pertenece o no al set.",
  checks: [
    "Debe usar el set dado.",
    "Debe comprobar pertenencia.",
    "Debe usar una condición.",
    "Debe mostrar un mensaje coherente."
  ]
};

window.EXERCISE_CATALOG["py_tema8_ej8"] = {
  id: "py_tema8_ej8",
  language: "python",
  topic: "python/tema-8",
  title: "Ejercicio 8 – Unión e intersección",
  statement: "Calcula la unión y la intersección entre dos sets.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Operaciones",
  type: "Ejercicio",
  starterCode:
`a = {1, 2, 3}
b = {3, 4, 5}

# Calcula y muestra la unión
# Calcula y muestra la intersección
`,
  hints: [
    "Una operación reúne elementos de ambos grupos.",
    "La otra se queda solo con lo compartido.",
    "Muestra ambos resultados por separado."
  ],
  expectedOutput: "Debe mostrar la unión y la intersección de los dos sets.",
  checks: [
    "Debe usar los dos sets dados.",
    "Debe calcular la unión.",
    "Debe calcular la intersección.",
    "Debe mostrar ambos resultados."
  ]
};

window.EXERCISE_CATALOG["py_tema8_ej9"] = {
  id: "py_tema8_ej9",
  language: "python",
  topic: "python/tema-8",
  title: "Ejercicio 9 – Diferencia y dirección",
  statement: "Compara a - b y b - a y explica por qué no son iguales.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Diferencia",
  type: "Ejercicio",
  starterCode:
`a = {1, 2, 3}
b = {3, 4, 5}

# Calcula ambas diferencias
# y explica por qué no devuelven lo mismo
`,
  hints: [
    "La diferencia depende del orden.",
    "Cada operación responde a una pregunta distinta.",
    "Piensa qué elementos sobran en cada conjunto."
  ],
  expectedOutput: "Debe mostrar ambas diferencias y explicar que el orden cambia el resultado.",
  checks: [
    "Debe calcular la diferencia de a respecto a b.",
    "Debe calcular la diferencia de b respecto a a.",
    "Debe mostrar ambos resultados.",
    "Debe incluir una explicación en comentarios."
  ]
};

window.EXERCISE_CATALOG["py_tema8_ej10"] = {
  id: "py_tema8_ej10",
  language: "python",
  topic: "python/tema-8",
  title: "Ejercicio 10 – Diferencia simétrica",
  statement: "Obtén los elementos no compartidos entre dos sets.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "^",
  type: "Ejercicio",
  starterCode:
`a = {1, 2, 3}
b = {3, 4, 5}

# Obtén los elementos que están en uno u otro,
# pero no en ambos
`,
  hints: [
    "Debes quedarte con lo no compartido.",
    "No es lo mismo que una diferencia en una sola dirección.",
    "Piensa qué elementos aparecen solo en uno de los dos sets."
  ],
  expectedOutput: "Debe mostrar los elementos que están en uno de los sets pero no en ambos.",
  checks: [
    "Debe usar los dos sets dados.",
    "Debe obtener los elementos no compartidos.",
    "Debe excluir los elementos comunes.",
    "Debe mostrar el resultado."
  ]
};

window.EXERCISE_CATALOG["py_tema8_ej11"] = {
  id: "py_tema8_ej11",
  language: "python",
  topic: "python/tema-8",
  title: "Ejercicio 11 – Elegir estructura",
  statement: "Decide si usarías lista, tupla o set según varios casos y justifica la elección.",
  difficulty: "Media",
  estimatedTime: "9 min",
  skill: "Diseño",
  type: "Ejercicio",
  starterCode:
`# Decide qué estructura usarías para:
# 1. coordenadas de un punto
# 2. usuarios únicos conectados
# 3. lista ordenada de tareas

# Crea una estructura para cada caso
# y añade un comentario justificando la elección
`,
  hints: [
    "Piensa en orden, duplicados, cambios y pertenencia.",
    "No todas las colecciones representan igual de bien el problema.",
    "Aquí importa justificar, no solo escribir algo que funcione."
  ],
  expectedOutput: "Debe crear estructuras adecuadas para varios casos y justificar la elección.",
  checks: [
    "Debe elegir una estructura para coordenadas.",
    "Debe elegir una estructura para usuarios únicos.",
    "Debe elegir una estructura para tareas ordenadas.",
    "Debe incluir comentarios de justificación.",
    "Las estructuras deben representar bien cada problema."
  ]
};

window.EXERCISE_CATALOG["py_tema8_ej12"] = {
  id: "py_tema8_ej12",
  language: "python",
  topic: "python/tema-8",
  title: "Ejercicio 12 – Estructura que funciona pero representa peor",
  statement: "Reescribe una solución con una estructura más adecuada y explica por qué mejora.",
  difficulty: "Media",
  estimatedTime: "9 min",
  skill: "Comparación",
  type: "Ejercicio",
  starterCode:
`coordenada = [40.4, -3.7]

# Reescribe este caso con una estructura más adecuada
# y explica por qué representa mejor el problema
`,
  hints: [
    "La clave no es si la lista funciona, sino si expresa bien la intención.",
    "Piensa si esos datos deberían cambiar o mantenerse estables.",
    "La explicación importa tanto como la estructura."
  ],
  expectedOutput: "Debe representar la coordenada con una estructura más adecuada y explicar la mejora.",
  checks: [
    "Debe partir del caso dado.",
    "Debe sustituir la lista por una estructura más adecuada.",
    "Debe explicar por qué mejora la representación.",
    "Debe mantener los valores de la coordenada."
  ]
};

window.EXERCISE_CATALOG["py_tema8_reto1"] = {
  id: "py_tema8_reto1",
  language: "python",
  topic: "python/tema-8",
  title: "Mini reto – Limpiar duplicados",
  statement: "Convierte una lista con repetidos en un set y luego explica qué información se pierde y cuál se gana.",
  difficulty: "Reto",
  estimatedTime: "10 min",
  skill: "Unicidad",
  type: "Reto",
  starterCode:
`numeros = [1, 2, 2, 3, 4, 4, 5]

# Convierte la lista en una estructura sin duplicados
# muestra el resultado
# y explica qué se gana y qué se pierde
`,
  hints: [
    "El objetivo es quedarte con valores únicos.",
    "Piensa qué ocurre con los repetidos.",
    "También debes explicar qué pasa con la idea de orden o repetición."
  ],
  expectedOutput: "Debe mostrar los valores únicos y explicar qué se gana y qué se pierde al usar un set.",
  checks: [
    "Debe partir de la lista dada.",
    "Debe obtener una estructura sin duplicados.",
    "Debe mostrar el resultado.",
    "Debe explicar qué se gana.",
    "Debe explicar qué información se pierde."
  ]
};

window.EXERCISE_CATALOG["py_tema8_reto2"] = {
  id: "py_tema8_reto2",
  language: "python",
  topic: "python/tema-8",
  title: "Reto final – Elegir estructura y operar",
  statement: "Resuelve varios casos combinando decisión de estructura, unicidad y comparación entre grupos.",
  difficulty: "Reto final",
  estimatedTime: "12-15 min",
  skill: "Integración",
  type: "Reto final",
  starterCode:
`# Resuelve estos casos:
# 1. unas coordenadas estables
# 2. usuarios únicos conectados
# 3. comparación entre dos grupos de usuarios
# 4. justificación de las estructuras elegidas
`,
  hints: [
    "Combinas estabilidad, unicidad y comparación entre grupos.",
    "Primero decide qué representa mejor cada dato.",
    "Después aplica operaciones entre conjuntos donde tenga sentido."
  ],
  expectedOutput: "Debe resolver varios casos usando tuplas y sets de forma justificada.",
  checks: [
    "Debe usar una estructura estable para coordenadas.",
    "Debe usar una estructura de unicidad para usuarios.",
    "Debe comparar dos grupos de usuarios.",
    "Debe mostrar resultados de operaciones entre grupos.",
    "Debe justificar las estructuras elegidas."
  ]
};