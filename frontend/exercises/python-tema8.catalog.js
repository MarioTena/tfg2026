window.EXERCISE_CATALOG["py_tema8_ej1"] = {
  id: "py_tema8_ej1",
  language: "python",
  topic: "python/tema-8",
  title: "Ejercicio 1 – Crear una tupla",
  statement: "Crea una tupla con tres colores y muestra el segundo.",
  starterCode:
`# EJERCICIO: Crear una tupla

# Crea una tupla con tres colores
# Después imprime el segundo elemento
`,
  hints: [
    "Usa paréntesis ()",
    "El segundo elemento tiene índice 1",
    "Recuerda que una tupla es inmutable",
  ],
};

window.EXERCISE_CATALOG["py_tema8_ej2"] = {
  id: "py_tema8_ej2",
  language: "python",
  topic: "python/tema-8",
  title: "Ejercicio 2 – Tupla de un elemento",
  statement: "Crea correctamente una tupla con un solo número.",
  starterCode:
`# EJERCICIO: Tupla de un elemento

# Crea una tupla con un solo elemento: 7
# Después imprímela
`,
  hints: [
    "Necesitas una coma: (7,)",
    "Sin coma, Python lo interpreta como un valor normal entre paréntesis",
    "Imprime la variable para comprobarlo",
  ],
};

window.EXERCISE_CATALOG["py_tema8_ej3"] = {
  id: "py_tema8_ej3",
  language: "python",
  topic: "python/tema-8",
  title: "Ejercicio 3 – Crear un set",
  statement: "Crea un set con números repetidos y observa el resultado.",
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

window.EXERCISE_CATALOG["py_tema8_ej4"] = {
  id: "py_tema8_ej4",
  language: "python",
  topic: "python/tema-8",
  title: "Ejercicio 4 – Añadir y eliminar en un set",
  statement: "Añade un elemento y elimina otro de un set.",
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

window.EXERCISE_CATALOG["py_tema8_ej5"] = {
  id: "py_tema8_ej5",
  language: "python",
  topic: "python/tema-8",
  title: "Ejercicio 5 – Unión e intersección",
  statement: "Calcula la unión y la intersección entre dos sets.",
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

window.EXERCISE_CATALOG["py_tema8_reto1"] = {
  id: "py_tema8_reto1",
  language: "python",
  topic: "python/tema-8",
  title: "Reto final – Elegir estructura",
  statement: "Decide si usarías lista, tupla o set según varios casos y justifica tu elección en comentarios.",
  starterCode:
`# RETO FINAL: Elegir estructura

# Indica en comentarios si usarías lista, tupla o set para:
# 1. productos de un carrito
# 2. coordenadas de un punto
# 3. etiquetas únicas de un artículo
# 4. pasos ordenados de una receta

# Justifica brevemente cada decisión
`,
  hints: [
    "Piensa en orden, duplicados y mutabilidad",
    "Lista: orden y cambios",
    "Tupla: datos fijos",
    "Set: elementos únicos",
  ],
};
