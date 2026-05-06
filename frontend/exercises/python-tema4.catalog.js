window.EXERCISE_CATALOG = window.EXERCISE_CATALOG || {};

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

# Crea una lista con 5 comidas favoritas
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
    "Necesitas un contador que empiece en 0",
    "Solo aumenta el contador cuando se cumpla la condición",
  ],
};

window.EXERCISE_CATALOG["py_tema4_ej7"] = {
  id: "py_tema4_ej7",
  language: "python",
  topic: "python/tema-4",
  title: "Ejercicio 7 – Buscar un valor",
  statement: "Comprueba si el valor 'Marta' aparece dentro de una lista de nombres.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Búsqueda",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Buscar un valor

nombres = ["Ana", "Luis", "Marta", "Carlos"]
encontrado = False

# Recorre la lista
# Si encuentras "Marta", cambia encontrado a True

print(encontrado)
`,
  hints: [
    "Puedes usar un for",
    "Compara cada nombre con 'Marta'",
    "Cuando lo encuentres, cambia la variable encontrado",
  ],
};

window.EXERCISE_CATALOG["py_tema4_ej8"] = {
  id: "py_tema4_ej8",
  language: "python",
  topic: "python/tema-4",
  title: "Ejercicio 8 – Slicing básico",
  statement: "Obtén una sublista con los tres primeros elementos de una lista.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Slicing",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Slicing básico

numeros = [10, 20, 30, 40, 50]

# Guarda en otra variable
# los tres primeros elementos
# Después imprímela
`,
  hints: [
    "Usa slicing con :",
    "Piensa en qué índice quieres dejar fuera",
    "El límite final no se incluye",
  ],
};

window.EXERCISE_CATALOG["py_tema4_ej9"] = {
  id: "py_tema4_ej9",
  language: "python",
  topic: "python/tema-4",
  title: "Ejercicio 9 – append()",
  statement: "Añade un nuevo elemento al final de una lista y muestra el resultado.",
  difficulty: "Media",
  estimatedTime: "6 min",
  skill: "append()",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: append()

tareas = ["estudiar", "repasar"]

# Añade "practicar"
# al final de la lista
# Después imprime la lista
`,
  hints: [
    "Usa append()",
    "append() añade al final",
    "Imprime la lista al terminar",
  ],
};

window.EXERCISE_CATALOG["py_tema4_ej10"] = {
  id: "py_tema4_ej10",
  language: "python",
  topic: "python/tema-4",
  title: "Ejercicio 10 – remove() vs pop()",
  statement: "Elimina un elemento por valor y otro por posición para ver la diferencia.",
  difficulty: "Media",
  estimatedTime: "9 min",
  skill: "Métodos",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: remove() vs pop()

frutas = ["manzana", "pera", "uva", "plátano"]

# Elimina "pera" por valor
# Luego elimina el último elemento por posición
# Después imprime la lista final
`,
  hints: [
    "remove() elimina por valor",
    "pop() elimina por posición",
    "Si no pasas posición a pop(), elimina el último",
  ],
};

window.EXERCISE_CATALOG["py_tema4_ej11"] = {
  id: "py_tema4_ej11",
  language: "python",
  topic: "python/tema-4",
  title: "Ejercicio 11 – Ordenar una lista",
  statement: "Ordena una lista de números de menor a mayor y muestra el resultado.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "sort()",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Ordenar una lista

numeros = [8, 3, 12, 1, 5]

# Ordena la lista
# Después imprímela
`,
  hints: [
    "Usa sort()",
    "sort() modifica la lista original",
    "Imprime la lista después de ordenarla",
  ],
};

window.EXERCISE_CATALOG["py_tema4_ej12"] = {
  id: "py_tema4_ej12",
  language: "python",
  topic: "python/tema-4",
  title: "Ejercicio 12 – Predecir qué cambia",
  statement: "Lee el código, piensa qué imprime y explica cómo cambia la lista.",
  difficulty: "Media",
  estimatedTime: "9 min",
  skill: "Razonamiento",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Predecir qué cambia

numeros = [10, 20, 30]
numeros[1] = 99
numeros.append(40)
print(numeros)

# Antes de ejecutar:
# 1. piensa qué imprime
# 2. explica qué operaciones cambian la lista
`,
  hints: [
    "Primero se modifica una posición",
    "Luego se añade un nuevo elemento al final",
    "Piensa en el estado de la lista después de cada línea",
  ],
};

window.EXERCISE_CATALOG["py_tema4_ej13"] = {
  id: "py_tema4_ej13",
  language: "python",
  topic: "python/tema-4",
  title: "Ejercicio 13 – Índice fuera de rango",
  statement: "Corrige un acceso incorrecto a una lista cuyo índice no existe.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Depuración",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Índice fuera de rango

colores = ["rojo", "verde", "azul"]

print(colores[3])

# Corrige el código para acceder
# a un índice válido
`,
  hints: [
    "Si una lista tiene 3 elementos, sus índices válidos son 0, 1 y 2",
    "El índice 3 queda fuera",
    "Puedes acceder al último con 2 o con -1",
  ],
};

window.EXERCISE_CATALOG["py_tema4_ej14"] = {
  id: "py_tema4_ej14",
  language: "python",
  topic: "python/tema-4",
  title: "Ejercicio 14 – Contar apariciones",
  statement: "Cuenta cuántas veces aparece un valor dentro de una lista.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "count()",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Contar apariciones

numeros = [1, 2, 2, 3, 2, 4]

# Cuenta cuántas veces aparece el número 2
# Después imprime el resultado
`,
  hints: [
    "Puedes usar count()",
    "El valor buscado es 2",
    "Imprime el resultado final",
  ],
};

window.EXERCISE_CATALOG["py_tema4_reto1"] = {
  id: "py_tema4_reto1",
  language: "python",
  topic: "python/tema-4",
  title: "Mini reto – Buscar y detener",
  statement: "Recorre una lista de nombres y detén el bucle cuando encuentres uno concreto.",
  difficulty: "Media",
  estimatedTime: "10 min",
  skill: "for + break",
  type: "Reto",
  starterCode:
`# MINI RETO: Buscar y detener

nombres = ["Ana", "Luis", "Marta", "Carlos"]

# Recorre la lista
# Si encuentras "Marta":
# 1. imprime "Encontrado"
# 2. detén el bucle
`,
  hints: [
    "Necesitas un for",
    "Compara cada elemento con 'Marta'",
    "Cuando la encuentres, usa break",
  ],
};

window.EXERCISE_CATALOG["py_tema4_reto2"] = {
  id: "py_tema4_reto2",
  language: "python",
  topic: "python/tema-4",
  title: "Reto final – Gestión básica de notas",
  statement: "Trabaja con una lista de notas para mostrarla, contar aprobados y calcular la suma total.",
  difficulty: "Media",
  estimatedTime: "12-15 min",
  skill: "Integrador",
  type: "Reto final",
  starterCode:
`# RETO FINAL: Gestión básica de notas

notas = [3, 7, 5, 2, 9, 6]

# 1. Imprime la lista completa
# 2. Cuenta cuántas notas son mayores o iguales que 5
# 3. Calcula la suma total de todas las notas
# 4. Imprime ambos resultados al final
`,
  hints: [
    "Puedes resolverlo recorriendo la lista una sola vez",
    "Necesitas una variable para contar y otra para acumular",
    "Revisa bien qué representa cada variable",
  ],
};