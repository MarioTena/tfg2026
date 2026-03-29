window.EXERCISE_CATALOG["py_tema6_ej1"] = {
  id: "py_tema6_ej1",
  language: "python",
  topic: "python/tema-6",
  title: "Ejercicio 1 – Crear un diccionario",
  statement: "Crea un diccionario que represente una película.",
  starterCode:
`# EJERCICIO: Crear un diccionario

# Crea un diccionario con claves:
# titulo, anio, director

# Después imprímelo
`,
  hints: [
    "Usa llaves {}",
    "Cada elemento es clave: valor",
    "Las claves de texto van entre comillas",
  ],
};

window.EXERCISE_CATALOG["py_tema6_ej2"] = {
  id: "py_tema6_ej2",
  language: "python",
  topic: "python/tema-6",
  title: "Ejercicio 2 – Acceder por clave",
  statement: "Muestra el valor de dos claves distintas de un diccionario.",
  starterCode:
`# EJERCICIO: Acceder por clave

pelicula = {
    "titulo": "Inception",
    "anio": 2010,
    "director": "Christopher Nolan"
}

# Imprime el titulo
# Imprime el anio
`,
  hints: [
    "Usa diccionario[\"clave\"]",
    "Recuerda escribir bien el nombre de la clave",
    "Haz dos print distintos",
  ],
};

window.EXERCISE_CATALOG["py_tema6_ej3"] = {
  id: "py_tema6_ej3",
  language: "python",
  topic: "python/tema-6",
  title: "Ejercicio 3 – Añadir una clave",
  statement: "Añade una clave nueva a un diccionario existente.",
  starterCode:
`# EJERCICIO: Añadir una clave

usuario = {
    "nombre": "Ana",
    "activo": True
}

# Añade una clave email
# Después imprime el diccionario
`,
  hints: [
    "Puedes usar usuario[\"email\"] = ...",
    "Si la clave no existe, se crea",
    "Imprime el diccionario al final",
  ],
};

window.EXERCISE_CATALOG["py_tema6_ej4"] = {
  id: "py_tema6_ej4",
  language: "python",
  topic: "python/tema-6",
  title: "Ejercicio 4 – Actualizar valor",
  statement: "Cambia el precio de un producto en un diccionario.",
  starterCode:
`# EJERCICIO: Actualizar valor

producto = {
    "nombre": "Monitor",
    "precio": 200
}

# Cambia el precio a 180
# Imprime el diccionario final
`,
  hints: [
    "La clave ya existe, así que se actualiza",
    "Usa producto[\"precio\"] = 180",
    "Imprime el resultado",
  ],
};

window.EXERCISE_CATALOG["py_tema6_ej5"] = {
  id: "py_tema6_ej5",
  language: "python",
  topic: "python/tema-6",
  title: "Ejercicio 5 – Comprobar si existe una clave",
  statement: "Usa in para comprobar si un usuario tiene email.",
  starterCode:
`# EJERCICIO: Comprobar si existe una clave

usuario = {
    "nombre": "Luis",
    "activo": True
}

# Comprueba si existe la clave "email"
# e imprime el resultado
`,
  hints: [
    "Usa \"email\" in usuario",
    "El resultado será True o False",
    "Puedes imprimir directamente la expresión",
  ],
};

window.EXERCISE_CATALOG["py_tema6_ej6"] = {
  id: "py_tema6_ej6",
  language: "python",
  topic: "python/tema-6",
  title: "Ejercicio 6 – Recorrer claves y valores",
  statement: "Muestra cada clave junto con su valor.",
  starterCode:
`# EJERCICIO: Recorrer claves y valores

alumno = {
    "nombre": "Lucía",
    "nota": 9,
    "activo": True
}

# Recorre el diccionario
# e imprime cada clave junto con su valor
`,
  hints: [
    "La forma más cómoda es usar items()",
    "Puedes usar for clave, valor in alumno.items()",
    "Imprime ambas variables en cada iteración",
  ],
};

window.EXERCISE_CATALOG["py_tema6_reto1"] = {
  id: "py_tema6_reto1",
  language: "python",
  topic: "python/tema-6",
  title: "Reto final – Ficha de producto",
  statement: "Crea un diccionario de producto, actualiza datos, añade una clave y recórrelo completo.",
  starterCode:
`# RETO FINAL: Ficha de producto

producto = {
    "nombre": "Teclado",
    "precio": 50,
    "stock": 10
}

# 1. Actualiza el precio
# 2. Añade una clave categoria
# 3. Recorre el diccionario mostrando clave y valor
`,
  hints: [
    "Combina modificación, añadido y recorrido",
    "Usa items() para el recorrido final",
    "Imprime el resultado de forma clara",
  ],
};
