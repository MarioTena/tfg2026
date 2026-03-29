window.EXERCISE_CATALOG["py_tema5_ej1"] = {
  id: "py_tema5_ej1",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 1 – Saludo simple",
  statement: "Crea una función que imprima un saludo fijo.",
  starterCode:
`# EJERCICIO: Saludo simple

# Crea una función llamada saludo
# que imprima "Hola"

# Después llámala
`,
  hints: [
    "Empieza con def saludo():",
    "El print va dentro de la función",
    "Recuerda llamar a la función al final",
  ],
};

window.EXERCISE_CATALOG["py_tema5_ej2"] = {
  id: "py_tema5_ej2",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 2 – Saludo con nombre",
  statement: "Crea una función que reciba un nombre y lo salude.",
  starterCode:
`# EJERCICIO: Saludo con nombre

# Crea una función que reciba nombre
# e imprima "Hola" seguido del nombre

# Después llama a la función
`,
  hints: [
    "Necesitas un parámetro",
    "Ese parámetro puede llamarse nombre",
    "Llama a la función con un argumento real",
  ],
};

window.EXERCISE_CATALOG["py_tema5_ej3"] = {
  id: "py_tema5_ej3",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 3 – Doble con return",
  statement: "Crea una función que devuelva el doble de un número.",
  starterCode:
`# EJERCICIO: Doble con return

# Crea una función doble(numero)
# que devuelva el doble del número

# Guarda el resultado en una variable
# e imprímelo
`,
  hints: [
    "Aquí debes usar return, no print dentro de la función",
    "La operación puede ser numero * 2",
    "Guarda el valor devuelto en una variable",
  ],
};

window.EXERCISE_CATALOG["py_tema5_ej4"] = {
  id: "py_tema5_ej4",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 4 – Suma de dos números",
  statement: "Crea una función que reciba dos números y devuelva su suma.",
  starterCode:
`# EJERCICIO: Suma de dos números

# Crea una función sumar(a, b)
# que devuelva la suma

# Llama a la función e imprime el resultado
`,
  hints: [
    "Necesitas dos parámetros",
    "La función debe devolver a + b",
    "Imprime el resultado fuera de la función",
  ],
};

window.EXERCISE_CATALOG["py_tema5_ej5"] = {
  id: "py_tema5_ej5",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 5 – Mayor de edad",
  statement: "Devuelve True si la edad es 18 o más.",
  starterCode:
`# EJERCICIO: Mayor de edad

# Crea una función es_mayor_de_edad(edad)
# que devuelva True o False

# Prueba la función con dos edades distintas
`,
  hints: [
    "La comparación puede ser edad >= 18",
    "El resultado de esa comparación ya es booleano",
    "Haz dos llamadas para probar casos distintos",
  ],
};

window.EXERCISE_CATALOG["py_tema5_ej6"] = {
  id: "py_tema5_ej6",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 6 – Clasificar número",
  statement: "Devuelve 'positivo', 'negativo' o 'cero'.",
  starterCode:
`# EJERCICIO: Clasificar número

# Crea una función clasificar_numero(numero)
# que devuelva:
# "positivo", "negativo" o "cero"
`,
  hints: [
    "Usa if / elif / else dentro de la función",
    "Cada camino debe hacer return",
    "Piensa en el caso número = 0",
  ],
};

window.EXERCISE_CATALOG["py_tema5_reto1"] = {
  id: "py_tema5_reto1",
  language: "python",
  topic: "python/tema-5",
  title: "Reto final – Precio final",
  statement: "Crea funciones para calcular IVA, aplicar descuento y devolver el precio final.",
  starterCode:
`# RETO FINAL: Precio final

# 1. Crea una función calcular_iva(precio)
# 2. Crea una función aplicar_descuento(precio, porcentaje)
# 3. Usa ambas para calcular el precio final

precio = 100
porcentaje = 10
`,
  hints: [
    "Divide el problema en varias funciones pequeñas",
    "Cada función debe tener una responsabilidad clara",
    "Usa return para encadenar resultados",
  ],
};
