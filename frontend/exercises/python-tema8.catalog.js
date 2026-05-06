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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Crear una tupla

# Crea una tupla con tres colores
# Después imprime el segundo elemento
`,
  hints: [
    "Usa paréntesis ()",
    "El segundo elemento tiene índice 1",
    "Recuerda que una tupla expresa estabilidad",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Tupla de un elemento

# Crea una tupla con un solo elemento: 7
# Después imprímela
`,
  hints: [
    "Necesitas una coma: (7,)",
    "Sin coma, Python no lo interpreta como tupla de un elemento",
    "Imprime la variable para comprobarlo",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Tupla vacía y longitud

# Crea una tupla vacía
# Después imprime su longitud con len()
`,
  hints: [
    "Una tupla vacía se puede crear con ()",
    "Sigue siendo una secuencia",
    "len() debería dar 0",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Crear un set

# Crea un set con estos números:
# 1, 2, 2, 3, 3, 4

# Después imprímelo
`,
  hints: [
    "Usa llaves {}",
    "Los sets eliminan duplicados",
    "No esperes ver repetidos al imprimir",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Set vacío correcto

# Crea un set vacío correctamente
# Añade los valores 10 y 20
# Después imprímelo
`,
  hints: [
    "No uses {} porque eso crea un diccionario vacío",
    "El set vacío correcto es set()",
    "Usa add() para añadir elementos",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Añadir y eliminar en un set

letras = {"a", "b", "c"}

# Añade "d"
# Elimina "b"
# Imprime el set final
`,
  hints: [
    "Usa add() para añadir",
    "Usa remove() para eliminar",
    "Imprime el set al final",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Pertenencia en set

numeros = {1, 2, 3, 4}

# Comprueba si el número 3 pertenece al set
# Si pertenece, imprime "Sí está"
# Si no, imprime "No está"
`,
  hints: [
    "La idea clave aquí es pertenencia",
    "Usa el operador in",
    "Resuelve con if",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Unión e intersección

a = {1, 2, 3}
b = {3, 4, 5}

# Imprime la unión
# Imprime la intersección
`,
  hints: [
    "La unión se puede hacer con |",
    "La intersección se puede hacer con &",
    "Haz dos print separados",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Diferencia y dirección

a = {1, 2, 3}
b = {3, 4, 5}

# Imprime a - b
# Imprime b - a
# Después escribe un comentario explicando
# por qué no devuelven lo mismo
`,
  hints: [
    "La diferencia depende del orden de los operandos",
    "Cada una responde a una pregunta distinta",
    "Piensa qué sobra en A y qué sobra en B",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Diferencia simétrica

a = {1, 2, 3}
b = {3, 4, 5}

# Imprime los elementos que están
# en uno u otro pero no en ambos
`,
  hints: [
    "Aquí conviene la diferencia simétrica",
    "El operador es ^",
    "Piensa en lo no compartido",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Elegir estructura

# Decide qué estructura usarías para:
# 1. coordenadas de un punto
# 2. usuarios únicos conectados
# 3. lista ordenada de tareas
#
# Escribe una estructura para cada caso
# y añade un comentario justificando la elección
`,
  hints: [
    "Piensa en orden, duplicados, cambios y pertenencia",
    "No todas las colecciones representan igual de bien el problema",
    "Aquí importa justificar, no solo escribir algo que funcione",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Estructura que funciona pero representa peor

coordenada = [40.4, -3.7]

# Reescribe este caso con una estructura mejor
# y añade un comentario explicando por qué
# representa mejor el problema
`,
  hints: [
    "Aquí la clave no es si la lista funciona, sino si expresa bien la intención",
    "Piensa en estabilidad",
    "Compara lista y tupla",
  ],
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
`# MINI RETO: Limpiar duplicados

numeros = [1, 2, 2, 3, 4, 4, 5]

# Convierte la lista en un set
# Imprime el resultado
# Después escribe comentarios explicando:
# 1. qué se gana
# 2. qué información se pierde
`,
  hints: [
    "Se gana unicidad",
    "Se pierde la idea de secuencia con repetidos",
    "Piensa también en el orden",
  ],
};

window.EXERCISE_CATALOG["py_tema8_reto2"] = {
  id: "py_tema8_reto2",
  language: "python",
  topic: "python/tema-8",
  title: "Reto final – Elegir estructura y operar",
  statement: "Resuelve varios casos combinando decisión de estructura, unicidad y comparación entre grupos.",
  difficulty: "Reto final",
  estimatedTime: "12-15 min",
  skill: "Integrador",
  type: "Reto final",
  starterCode:
`# RETO FINAL: Elegir estructura y operar

# 1. Crea una tupla para representar unas coordenadas
# 2. Crea un set con usuarios únicos conectados
# 3. Crea otro set con usuarios de otro grupo
# 4. Imprime:
#    - usuarios en ambos grupos
#    - usuarios exclusivos del primero
#    - todos los usuarios distintos
# 5. Añade comentarios justificando
#    por qué en cada caso has usado tupla o set
`,
  hints: [
    "Combinas estabilidad de tupla con unicidad y comparación de sets",
    "Piensa primero en qué representa cada dato",
    "Después usa las operaciones adecuadas entre sets",
  ],
};