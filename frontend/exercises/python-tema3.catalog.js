window.EXERCISE_CATALOG = window.EXERCISE_CATALOG || {};

window.EXERCISE_CATALOG["py_tema3_ej1"] = {
  id: "py_tema3_ej1",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 1 – Del 1 al 5",
  statement: "Muestra los números del 1 al 5 usando for.",
  difficulty: "Fácil",
  estimatedTime: "5 min",
  skill: "for",
  type: "Ejercicio",
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
  difficulty: "Fácil",
  estimatedTime: "6 min",
  skill: "range()",
  type: "Ejercicio",
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
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "range()",
  type: "Ejercicio",
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
  difficulty: "Media",
  estimatedTime: "6 min",
  skill: "Recorrido",
  type: "Ejercicio",
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
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Acumulador",
  type: "Ejercicio",
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
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "while",
  type: "Ejercicio",
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
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "continue",
  type: "Ejercicio",
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

window.EXERCISE_CATALOG["py_tema3_ej8"] = {
  id: "py_tema3_ej8",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 8 – Parar al encontrar",
  statement: "Recorre una palabra y detén el bucle cuando encuentres una letra concreta.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "break",
  type: "Ejercicio",
  starterCode:
`# EJERCICIO: Parar al encontrar

palabra = "programacion"

# Recorre la palabra
# Si encuentras la letra "g", detén el bucle
# Si no, imprime la letra
`,
  hints: [
    "Aquí necesitas usar break",
    "Piensa si el print va antes o después del break",
    "El bucle debe terminar cuando aparezca la letra indicada",
  ],
};

window.EXERCISE_CATALOG["py_tema3_ej9"] = {
  id: "py_tema3_ej9",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 9 – Validar con while",
  statement: "Pide una palabra al usuario hasta que escriba 'python'.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "input()",
  type: "Ejercicio",
  starterCode:
`texto = ""

# Escribe una solución que siga pidiendo una palabra
# hasta que el usuario escriba exactamente "python"

print("Correcto")
`,
  hints: [
    "Necesitas volver a pedir el dato mientras no sea correcto",
    "Piensa bien qué condición mantiene vivo el bucle"
  ],
};

window.EXERCISE_CATALOG["py_tema3_ej10"] = {
  id: "py_tema3_ej10",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 10 – Trazar una suma",
  statement: "Recorre del 1 al 4 y muestra cómo cambia una variable acumuladora en cada iteración.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Trazado",
  type: "Ejercicio",
  starterCode:
`suma = 0

# Recorre del 1 al 4
# Actualiza la suma en cada iteración
# y muestra el número actual junto con el valor acumulado
`,
  hints: [
    "Primero actualiza la variable y después muestra su estado",
    "La salida debe ayudarte a seguir el proceso paso a paso"
  ],
};

window.EXERCISE_CATALOG["py_tema3_ej11"] = {
  id: "py_tema3_ej11",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 11 – Detectar bucle infinito",
  statement: "Corrige un while que no termina porque la variable de control no cambia.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Depuración",
  type: "Ejercicio",
  starterCode:
`contador = 1

while contador <= 5:
    print(contador)

# Corrige el código para que termine bien
`,
  hints: [
    "La condición no es el problema principal",
    "Revisa qué debería cambiar dentro del bucle"
  ],
};

window.EXERCISE_CATALOG["py_tema3_ej12"] = {
  id: "py_tema3_ej12",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 12 – Contar impares",
  statement: "Cuenta cuántos números impares hay del 1 al 10 usando un acumulador.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Contador",
  type: "Ejercicio",
  starterCode:
`contador_impares = 0

# Escribe una solución para contar los números impares
# entre 1 y 10 e imprime el resultado final
`,
  hints: [
    "Necesitas recorrer varios números y usar un contador",
    "Piensa qué condición identifica a un número impar"
  ],
};

window.EXERCISE_CATALOG["py_tema3_reto1"] = {
  id: "py_tema3_reto1",
  language: "python",
  topic: "python/tema-3",
  title: "Mini reto – Input hasta número positivo",
  statement: "Pide números al usuario hasta que introduzca uno positivo.",
  difficulty: "Reto",
  estimatedTime: "10 min",
  skill: "while + input()",
  type: "Reto",
  starterCode:
`# MINI RETO: Input hasta número positivo

numero = -1

# Mientras numero sea menor o igual que 0:
# 1. pide un número
# 2. conviértelo a entero
# Al final imprime "Número válido"
`,
  hints: [
    "Este ejercicio encaja bien con while",
    "La condición debe mantener el bucle mientras el número no sea válido",
    "Recuerda convertir el input con int()",
  ],
};

window.EXERCISE_CATALOG["py_tema3_reto2"] = {
  id: "py_tema3_reto2",
  language: "python",
  topic: "python/tema-3",
  title: "Reto final – Sumar hasta 0",
  statement: "Pide números al usuario, súmalos y termina cuando escriba 0.",
  difficulty: "Reto Final",
  estimatedTime: "12 min",
  skill: "Integrador",
  type: "Reto final",
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