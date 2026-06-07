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
  type: "Ejercicio",
  starterCode:
`# Crea una lista con 5 comidas favoritas
# y muéstrala por pantalla
`,
  hints: [
    "Necesitas una colección con varios elementos.",
    "Cada comida debe ser un texto.",
    "Comprueba que la salida muestra los 5 elementos."
  ],
  expectedOutput: "Debe mostrar una lista con 5 comidas favoritas.",
  checks: [
    "Debe crear una lista.",
    "La lista debe tener 5 elementos.",
    "Los elementos deben representar comidas.",
    "Debe mostrar la lista por pantalla."
  ]
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
  type: "Ejercicio",
  starterCode:
`numeros = [10, 20, 30, 40]

# Muestra el primer y el último elemento
`,
  hints: [
    "Necesitas acceder a posiciones concretas.",
    "El primer elemento está al inicio de la lista.",
    "Para el último, piensa en una forma que no dependa tanto de contar a mano."
  ],
  expectedOutput: "Debe mostrar el primer y el último elemento de la lista.",
  checks: [
    "Debe acceder al primer elemento.",
    "Debe acceder al último elemento.",
    "Debe mostrar ambos valores por pantalla.",
    "No debe modificar la lista."
  ]
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
  type: "Ejercicio",
  starterCode:
`colores = ["rojo", "verde", "azul"]

# Cambia el segundo elemento por otro color
# y muestra la lista final
`,
  hints: [
    "Debes modificar una posición existente.",
    "Piensa qué índice corresponde al segundo elemento.",
    "Comprueba la lista después del cambio."
  ],
  expectedOutput: "Debe mostrar la lista con el segundo elemento cambiado.",
  checks: [
    "Debe acceder a una posición de la lista.",
    "Debe modificar el segundo elemento.",
    "Debe mantener el resto de elementos.",
    "Debe mostrar la lista actualizada."
  ]
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
  type: "Ejercicio",
  starterCode:
`animales = ["gato", "perro", "loro"]

# Recorre la lista y muestra cada elemento
`,
  hints: [
    "Una lista se puede recorrer elemento a elemento.",
    "Cada vuelta debe trabajar con un animal.",
    "La salida debe aparecer separada por elementos."
  ],
  expectedOutput: "Debe mostrar cada animal de la lista en una línea distinta.",
  checks: [
    "Debe recorrer la lista.",
    "Debe mostrar cada elemento.",
    "Debe imprimir dentro del recorrido.",
    "No debe mostrar la lista completa como un único bloque."
  ]
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
  type: "Ejercicio",
  starterCode:
`numeros = [1, 2, 3, 4, 5]
suma = 0

# Recorre la lista y acumula el total

print(suma)
`,
  hints: [
    "Necesitas recorrer todos los números.",
    "La variable suma debe cambiar durante el recorrido.",
    "El resultado final debe mostrarse después."
  ],
  expectedOutput: "Debe mostrar la suma total de todos los números de la lista.",
  checks: [
    "Debe recorrer la lista.",
    "Debe usar un acumulador.",
    "Debe sumar todos los elementos.",
    "Debe mostrar el total final."
  ]
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
  type: "Ejercicio",
  starterCode:
`numeros = [2, 5, 8, 11, 14]
contador = 0

# Recorre la lista
# y cuenta cuántos números son pares

print(contador)
`,
  hints: [
    "Necesitas revisar cada número.",
    "Solo algunos elementos deben aumentar el contador.",
    "Piensa qué propiedad identifica a un número par."
  ],
  expectedOutput: "Debe mostrar cuántos números pares hay en la lista.",
  checks: [
    "Debe recorrer la lista.",
    "Debe identificar los números pares.",
    "Debe usar un contador.",
    "Debe mostrar el número total de pares."
  ]
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
  type: "Ejercicio",
  starterCode:
`nombres = ["Ana", "Luis", "Marta", "Carlos"]
encontrado = False

# Recorre la lista
# y cambia encontrado si aparece el nombre buscado

print(encontrado)
`,
  hints: [
    "Debes comparar cada elemento con el valor buscado.",
    "La variable encontrado representa si ya apareció.",
    "Comprueba que el resultado final sea coherente."
  ],
  expectedOutput: "Debe mostrar True si Marta aparece en la lista.",
  checks: [
    "Debe recorrer la lista de nombres.",
    "Debe buscar el valor Marta.",
    "Debe actualizar la variable encontrado.",
    "Debe mostrar el resultado final."
  ]
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
  type: "Ejercicio",
  starterCode:
`numeros = [10, 20, 30, 40, 50]

# Guarda en otra variable los tres primeros elementos
# y muestra el resultado
`,
  hints: [
    "Necesitas quedarte solo con una parte de la lista.",
    "Piensa desde dónde empieza el fragmento.",
    "Recuerda que el límite final no se incluye."
  ],
  expectedOutput: "Debe mostrar una sublista con los tres primeros elementos.",
  checks: [
    "Debe partir de la lista original.",
    "Debe obtener solo los tres primeros elementos.",
    "Debe guardar o mostrar la sublista.",
    "No debe modificar la lista original."
  ]
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
  type: "Ejercicio",
  starterCode:
`tareas = ["estudiar", "repasar"]

# Añade una nueva tarea al final
# y muestra la lista actualizada
`,
  hints: [
    "Debes modificar la lista existente.",
    "El nuevo elemento debe quedar al final.",
    "Comprueba la lista después de añadirlo."
  ],
  expectedOutput: "Debe mostrar la lista con una nueva tarea añadida al final.",
  checks: [
    "Debe añadir un elemento nuevo.",
    "El elemento debe añadirse al final.",
    "Debe conservar los elementos anteriores.",
    "Debe mostrar la lista actualizada."
  ]
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
  type: "Ejercicio",
  starterCode:
`frutas = ["manzana", "pera", "uva", "plátano"]

# Elimina un elemento por valor
# y otro por posición

print(frutas)
`,
  hints: [
    "Una eliminación depende del contenido del elemento.",
    "La otra eliminación depende de su posición.",
    "Comprueba cómo queda la lista final."
  ],
  expectedOutput: "Debe mostrar la lista después de eliminar un elemento por valor y otro por posición.",
  checks: [
    "Debe eliminar un elemento usando su valor.",
    "Debe eliminar otro elemento usando su posición.",
    "Debe modificar la lista original.",
    "Debe mostrar el resultado final."
  ]
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
  type: "Ejercicio",
  starterCode:
`numeros = [8, 3, 12, 1, 5]

# Ordena la lista de menor a mayor
# y muestra el resultado
`,
  hints: [
    "Debes cambiar el orden de la lista.",
    "El resultado debe quedar de menor a mayor.",
    "Comprueba que la salida ya aparece ordenada."
  ],
  expectedOutput: "Debe mostrar la lista ordenada de menor a mayor.",
  checks: [
    "Debe ordenar la lista.",
    "El orden debe ser ascendente.",
    "Debe mostrar la lista después de ordenarla.",
    "Debe conservar todos los números originales."
  ]
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
  type: "Ejercicio",
  starterCode:
`numeros = [10, 20, 30]
numeros[1] = 99
numeros.append(40)
print(numeros)

# Antes de ejecutar:
# explica con comentarios qué ha cambiado en la lista
`,
  hints: [
    "Primero se modifica una posición existente.",
    "Después se añade un nuevo elemento.",
    "Piensa en el estado de la lista paso a paso."
  ],
  expectedOutput: "Debe mostrar la lista final y explicar cómo ha cambiado.",
  checks: [
    "Debe identificar el cambio de una posición.",
    "Debe identificar la adición de un nuevo elemento.",
    "Debe mostrar la lista final.",
    "Debe incluir una explicación en comentarios."
  ]
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
  type: "Ejercicio",
  starterCode:
`colores = ["rojo", "verde", "azul"]

print(colores[3])

# Corrige el acceso para usar una posición válida
`,
  hints: [
    "El problema está en la posición usada.",
    "Revisa cuántos elementos tiene realmente la lista.",
    "El programa debe mostrar un elemento existente sin fallar."
  ],
  expectedOutput: "Debe acceder a un elemento existente de la lista sin provocar IndexError.",
  checks: [
    "Debe corregir el índice inválido.",
    "Debe acceder a una posición existente.",
    "Debe mantener la lista original.",
    "El programa debe ejecutarse sin IndexError."
  ]
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
  type: "Ejercicio",
  starterCode:
`numeros = [1, 2, 2, 3, 2, 4]

# Cuenta cuántas veces aparece el valor indicado
# y muestra el resultado
`,
  hints: [
    "Debes contar apariciones dentro de la lista.",
    "Piensa si existe un método que ya hace ese recuento.",
    "El resultado final debe ser un número."
  ],
  expectedOutput: "Debe mostrar cuántas veces aparece el número 2 en la lista.",
  checks: [
    "Debe analizar la lista.",
    "Debe contar las apariciones del valor 2.",
    "Debe mostrar el resultado final.",
    "No debe modificar la lista."
  ]
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
`nombres = ["Ana", "Luis", "Marta", "Carlos"]

# Recorre la lista
# muestra un mensaje cuando encuentres el nombre buscado
# y detén el bucle en ese momento
`,
  hints: [
    "Necesitas recorrer la lista de nombres.",
    "Cuando encuentres el objetivo, no hace falta seguir.",
    "Piensa qué instrucción detiene un bucle."
  ],
  expectedOutput: "Debe mostrar un mensaje al encontrar el nombre buscado y detener el recorrido.",
  checks: [
    "Debe recorrer la lista.",
    "Debe comparar cada nombre con el objetivo.",
    "Debe mostrar un mensaje cuando lo encuentre.",
    "Debe detener el bucle al encontrarlo."
  ]
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
`notas = [3, 7, 5, 2, 9, 6]

# Muestra la lista completa
# cuenta cuántas notas están aprobadas
# calcula la suma total
# y muestra los resultados finales
`,
  hints: [
    "Puedes recorrer la lista una sola vez.",
    "Necesitas una variable para contar y otra para acumular.",
    "Revisa bien qué representa cada variable."
  ],
  expectedOutput: "Debe mostrar la lista, el número de aprobados y la suma total de las notas.",
  checks: [
    "Debe recorrer la lista de notas.",
    "Debe contar las notas aprobadas.",
    "Debe calcular la suma total.",
    "Debe mostrar los resultados finales de forma clara."
  ]
};