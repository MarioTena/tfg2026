// ======================================================
// Tema 3 - Python
// ======================================================

window.EXERCISE_CATALOG["py_tema3_ej1"] = {
  id: "py_tema3_ej1",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 1 – Del 1 al 5",
  statement: "Muestra los números del 1 al 5 usando for.",
  starterCode:
`# EJERCICIO: Del 1 al 5

# Usa un bucle for para imprimir
# los números del 1 al 5
`,
  hints: [
    "Usa range(1, 6)",
    "Recuerda que el final no se incluye",
    "Imprime la variable del bucle",
  ],
};

window.EXERCISE_CATALOG["py_tema3_ej2"] = {
  id: "py_tema3_ej2",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 2 – Cuenta atrás",
  statement: "Muestra los números del 10 al 1 en orden descendente.",
  starterCode:
`# EJERCICIO: Cuenta atrás

# Usa un for para imprimir
# del 10 al 1
`,
  hints: [
    "Necesitas un salto negativo",
    "Piensa en range(10, 0, -1)",
    "El 0 no se imprime si pones ese final",
  ],
};

window.EXERCISE_CATALOG["py_tema3_ej3"] = {
  id: "py_tema3_ej3",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 3 – Números pares",
  statement: "Muestra los números pares del 2 al 20.",
  starterCode:
`# EJERCICIO: Números pares

# Imprime los números pares del 2 al 20
`,
  hints: [
    "Puedes usar un salto de 2",
    "Empieza en 2",
    "El final debe permitir llegar a 20",
  ],
};

window.EXERCISE_CATALOG["py_tema3_ej4"] = {
  id: "py_tema3_ej4",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 4 – Recorrer palabra",
  statement: "Muestra una letra por línea de la palabra 'python'.",
  starterCode:
`# EJERCICIO: Recorrer palabra

palabra = "python"

# Recorre la palabra con un for
# e imprime cada letra
`,
  hints: [
    "Puedes recorrer directamente el string",
    "La variable del bucle puede llamarse letra",
    "Imprime una letra en cada iteración",
  ],
};

window.EXERCISE_CATALOG["py_tema3_ej5"] = {
  id: "py_tema3_ej5",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 5 – Suma del 1 al 10",
  statement: "Suma los números del 1 al 10 usando un acumulador.",
  starterCode:
`# EJERCICIO: Suma del 1 al 10

suma = 0

# Recorre del 1 al 10
# y acumula el total en suma

print(suma)
`,
  hints: [
    "Inicializa suma antes del bucle",
    "Usa suma = suma + numero",
    "Imprime suma al final",
  ],
};

window.EXERCISE_CATALOG["py_tema3_ej6"] = {
  id: "py_tema3_ej6",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 6 – While del 1 al 5",
  statement: "Muestra del 1 al 5 usando while.",
  starterCode:
`# EJERCICIO: While del 1 al 5

contador = 1

# Usa while para imprimir
# del 1 al 5
`,
  hints: [
    "La condición puede ser contador <= 5",
    "No olvides actualizar contador dentro del bucle",
    "Si no actualizas, tendrás un bucle infinito",
  ],
};

window.EXERCISE_CATALOG["py_tema3_ej7"] = {
  id: "py_tema3_ej7",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 7 – Saltar pares",
  statement: "Muestra del 1 al 10 saltando los números pares.",
  starterCode:
`# EJERCICIO: Saltar pares

# Recorre del 1 al 10
# Si el número es par, sáltalo
# Si no, imprímelo
`,
  hints: [
    "Usa continue",
    "Puedes detectar pares con numero % 2 == 0",
    "Imprime solo los impares",
  ],
};

window.EXERCISE_CATALOG["py_tema3_reto1"] = {
  id: "py_tema3_reto1",
  language: "python",
  topic: "python/tema-3",
  title: "Reto final – Sumar hasta 0",
  statement: "Pide números al usuario, súmalos y termina cuando escriba 0.",
  starterCode:
`# RETO FINAL: Sumar hasta 0

suma = 0
numero = -1

# Mientras numero sea distinto de 0:
# 1. pide un número
# 2. conviértelo a entero
# 3. súmalo si no es 0
# Al final imprime la suma total
`,
  hints: [
    "Este ejercicio encaja bien con while",
    "El 0 es la condición de salida",
    "Piensa bien en el orden: leer, comprobar, sumar",
  ],
};
