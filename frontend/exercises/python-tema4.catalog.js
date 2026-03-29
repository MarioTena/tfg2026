window.EXERCISE_CATALOG["py_tema4_ej1"] = {
  id: "py_tema4_ej1",
  language: "python",
  topic: "python/tema-4",
  title: "Ejercicio 1 – Crear una lista",
  statement: "Crea una lista con 5 comidas favoritas y muéstrala.",
  difficulty: "Fácil",
  estimatedTime: "5 min",
  skill: "Listas",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Crear una lista

# Crea una lista con 5 comidas
# y guárdala en una variable

# Después imprímela
`,
  hints: [
    "Usa corchetes []",
    "Separa los elementos con comas",
    "Guarda la lista en una variable y luego usa print",
  ],
};

window.EXERCISE_CATALOG["py_tema4_ej2"] = {
  id: "py_tema4_ej2",
  language: "python",
  topic: "python/tema-4",
  title: "Ejercicio 2 – Primer y último elemento",
  statement: "Muestra el primer y el último elemento de una lista.",
  difficulty: "Fácil",
  estimatedTime: "6 min",
  skill: "Índices",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Primer y último elemento

numeros = [10, 20, 30, 40]

# Imprime el primer elemento
# Imprime el último elemento
`,
  hints: [
    "El primer índice es 0",
    "Puedes usar -1 para el último",
    "Haz dos print separados",
  ],
};

window.EXERCISE_CATALOG["py_tema4_ej3"] = {
  id: "py_tema4_ej3",
  language: "python",
  topic: "python/tema-4",
  title: "Ejercicio 3 – Modificar una posición",
  statement: "Cambia el segundo elemento de una lista por otro valor.",
  difficulty: "Fácil",
  estimatedTime: "6 min",
  skill: "Modificar",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Modificar una posición

colores = ["rojo", "verde", "azul"]

# Cambia "verde" por "amarillo"
# Después imprime la lista
`,
  hints: [
    "El segundo elemento tiene índice 1",
    "Puedes asignar un nuevo valor con =",
    "Imprime la lista al final",
  ],
};

window.EXERCISE_CATALOG["py_tema4_ej4"] = {
  id: "py_tema4_ej4",
  language: "python",
  topic: "python/tema-4",
  title: "Ejercicio 4 – Recorrer una lista",
  statement: "Muestra cada elemento de una lista en una línea distinta.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "for",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Recorrer una lista

animales = ["gato", "perro", "loro"]

# Recorre la lista con un for
# e imprime cada elemento
`,
  hints: [
    "Puedes recorrer directamente la lista",
    "La variable del bucle puede llamarse animal",
    "Imprime dentro del bucle",
  ],
};

window.EXERCISE_CATALOG["py_tema4_ej5"] = {
  id: "py_tema4_ej5",
  language: "python",
  topic: "python/tema-4",
  title: "Ejercicio 5 – Sumar elementos",
  statement: "Suma todos los números de una lista.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Acumulador",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Sumar elementos de una lista

numeros = [1, 2, 3, 4, 5]
suma = 0

# Recorre la lista
# y acumula el total en suma

print(suma)
`,
  hints: [
    "Necesitas un for y un acumulador",
    "Usa suma = suma + numero",
    "Imprime suma al final",
  ],
};

window.EXERCISE_CATALOG["py_tema4_ej6"] = {
  id: "py_tema4_ej6",
  language: "python",
  topic: "python/tema-4",
  title: "Ejercicio 6 – Contar pares",
  statement: "Cuenta cuántos números pares hay en una lista.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Contador",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Contar pares

numeros = [2, 5, 8, 11, 14]
contador = 0

# Recorre la lista
# Si un número es par, suma 1 a contador

print(contador)
`,
  hints: [
    "Usa numero % 2 == 0",
    "Contador empieza en 0",
    "Aumenta contador solo cuando se cumpla la condición",
  ],
};

window.EXERCISE_CATALOG["py_tema4_ej7"] = {
  id: "py_tema4_ej7",
  language: "python",
  topic: "python/tema-4",
  title: "Ejercicio 7 – Buscar un nombre",
  statement: "Comprueba si un nombre concreto aparece en una lista.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Búsqueda",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Buscar un nombre

nombres = ["Ana", "Luis", "Marta"]
buscado = "Luis"

# Recorre la lista
# Si encuentras el nombre buscado,
# imprime "Encontrado"
`,
  hints: [
    "Compara cada elemento con buscado",
    "Puedes resolverlo con un for y un if",
    "Si quieres, puedes usar break cuando lo encuentres",
  ],
};

window.EXERCISE_CATALOG["py_tema4_ej8"] = {
  id: "py_tema4_ej8",
  language: "python",
  topic: "python/tema-4",
  title: "Ejercicio 8 – Añadir elementos",
  statement: "Añade dos elementos nuevos a una lista con append().",
  difficulty: "Fácil",
  estimatedTime: "6 min",
  skill: "append()",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Añadir elementos

lista = [1, 2]

# Añade 3
# Añade 4
# Imprime la lista final
`,
  hints: [
    "Usa append()",
    "Llama al método dos veces",
    "Imprime la lista al final",
  ],
};

window.EXERCISE_CATALOG["py_tema4_reto1"] = {
  id: "py_tema4_reto1",
  language: "python",
  topic: "python/tema-4",
  title: "Reto final – Analizar notas",
  statement: "Dada una lista de notas, muestra la suma total y cuántas están aprobadas.",
  difficulty: "Media",
  estimatedTime: "12 min",
  skill: "Combinado",
  type: "Reto final",
  starterCode:
`# RETO FINAL: Analizar notas

notas = [4, 7, 5, 2, 9]
suma = 0
aprobadas = 0

# Recorre la lista de notas
# 1. suma todas las notas
# 2. cuenta cuántas son >= 5

print(suma)
print(aprobadas)
`,
  hints: [
    "Necesitas dos acumuladores: suma y aprobadas",
    "Cada nota se suma siempre",
    "Solo cuentas aprobadas si nota >= 5",
  ],
};