window.EXERCISE_CATALOG["py_tema5_ej1"] = {
  id: "py_tema5_ej1",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 1 – Saludo simple",
  statement: "Crea una función que imprima un saludo fijo.",
  difficulty: "Fácil",
  estimatedTime: "5 min",
  skill: "print",
  type: "Práctica guiada",
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
  difficulty: "Fácil",
  estimatedTime: "6 min",
  skill: "Parámetros",
  type: "Práctica guiada",
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
  difficulty: "Fácil",
  estimatedTime: "6 min",
  skill: "return",
  type: "Práctica guiada",
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
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Argumentos",
  type: "Práctica guiada",
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
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Booleanos",
  type: "Práctica guiada",
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
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Condiciones",
  type: "Práctica guiada",
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

window.EXERCISE_CATALOG["py_tema5_ej7"] = {
  id: "py_tema5_ej7",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 7 – print o return",
  statement: "Corrige una función para que devuelva un valor útil en lugar de solo imprimirlo.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Diseño",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: print o return

def triple(numero):
    print(numero * 3)

resultado = triple(4)
print(resultado)

# Corrige la función para que resultado
# valga el triple de 4 y no None
`,
  hints: [
    "El problema no está en la llamada, sino en el diseño de la función",
    "Usa return dentro de la función",
    "Piensa qué debería valer resultado",
  ],
};

window.EXERCISE_CATALOG["py_tema5_ej8"] = {
  id: "py_tema5_ej8",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 8 – Varias llamadas",
  statement: "Usa una misma función para calcular el cuadrado de varios números y muestra los resultados.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Reutilización",
  type: "Práctica guiada",
  starterCode:
`def cuadrado(numero):
    return numero * numero

# Usa la función con varios valores
# y muestra los resultados de forma clara
`,
  hints: [
    "La misma función puede reutilizarse varias veces",
    "Decide tú cuántas llamadas haces y cómo muestras el resultado"
  ],
};

window.EXERCISE_CATALOG["py_tema5_ej9"] = {
  id: "py_tema5_ej9",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 9 – Error de argumentos",
  statement: "Corrige una llamada a función que no respeta los argumentos necesarios.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Depuración",
  type: "Práctica guiada",
  starterCode:
`def presentar(nombre, edad):
    print("Me llamo", nombre)
    print("Tengo", edad, "años")

presentar("Ana")
`,
  hints: [
    "Revisa cuántos argumentos necesita realmente la función",
    "No cambies la definición si no hace falta"
  ],
};

window.EXERCISE_CATALOG["py_tema5_ej10"] = {
  id: "py_tema5_ej10",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 10 – Variable local",
  statement: "Haz que este código funcione con un diseño correcto, sin usar fuera una variable local.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Ámbito",
  type: "Práctica guiada",
  starterCode:
`def crear_mensaje():
    mensaje = "Hola"

print(mensaje)
`,
  hints: [
    "El problema está en el alcance de la variable",
    "Puedes resolverlo imprimiendo dentro o devolviendo el valor"
  ],
};

window.EXERCISE_CATALOG["py_tema5_ej11"] = {
  id: "py_tema5_ej11",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 11 – Función booleana",
  statement: "Crea una función que indique si un número es par y pruébala con varios casos.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Booleanos",
  type: "Práctica guiada",
  starterCode:
`# Crea aquí una función es_par(numero)

# Después pruébala con varios números
`,
  hints: [
    "La función debe devolver True o False",
    "Piensa en una comprobación simple con el resto"
  ],
};

window.EXERCISE_CATALOG["py_tema5_ej12"] = {
  id: "py_tema5_ej12",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 12 – Función limpia",
  statement: "Reescribe esta idea para que el nombre sea claro, el cálculo esté separado de la presentación y el diseño sea reutilizable.",
  difficulty: "Media",
  estimatedTime: "9 min",
  skill: "Buenas prácticas",
  type: "Práctica guiada",
  starterCode:
`def hacer_cosa(x):
    print("Resultado:", x * 1.21)
`,
  hints: [
    "El nombre actual no explica qué hace la función",
    "Piensa si aquí conviene print o return"
  ],
};

window.EXERCISE_CATALOG["py_tema5_reto1"] = {
  id: "py_tema5_reto1",
  language: "python",
  topic: "python/tema-5",
  title: "Mini reto – Saludo reutilizable",
  statement: "Crea una función que construya un saludo y devuelva el texto para reutilizarlo varias veces.",
  difficulty: "Reto",
  estimatedTime: "10 min",
  skill: "Text + return",
  type: "Reto",
  starterCode:
`# MINI RETO: Saludo reutilizable

# Crea una función crear_saludo(nombre)
# que devuelva un texto como "Hola Ana"

# Llama a la función con varios nombres
# y muestra los resultados
`,
  hints: [
    "Aquí interesa devolver texto, no imprimirlo dentro",
    "Puedes concatenar o usar comas si luego imprimes fuera",
    "Haz varias llamadas para demostrar reutilización",
  ],
};

window.EXERCISE_CATALOG["py_tema5_reto2"] = {
  id: "py_tema5_reto2",
  language: "python",
  topic: "python/tema-5",
  title: "Reto final – Precio final",
  statement: "Crea funciones para calcular IVA, aplicar descuento y devolver el precio final con diseño limpio.",
  difficulty: "Reto Final",
  estimatedTime: "12-15 min",
  skill: "Combinado",
  type: "Reto final",
  starterCode:
`# RETO FINAL: Precio final

# 1. Crea una función calcular_iva(precio)
#    que devuelva el IVA (21% del precio)
#
# 2. Crea una función aplicar_descuento(precio, porcentaje)
#    que devuelva el precio con descuento
#
# 3. Usa ambas para calcular un precio final limpio
#    a partir de:
precio = 100
porcentaje = 10

# 4. Imprime el resultado final fuera de las funciones
`,
  hints: [
    "Divide el problema en varias funciones pequeñas",
    "Cada función debe tener una responsabilidad clara",
    "Usa return para encadenar resultados",
  ],
};