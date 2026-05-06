window.EXERCISE_CATALOG["py_tema6_ej1"] = {
  id: "py_tema6_ej1",
  language: "python",
  topic: "python/tema-6",
  title: "Ejercicio 1 – Crear un diccionario",
  statement: "Crea un diccionario que represente una película.",
  difficulty: "Fácil",
  estimatedTime: "5 min",
  skill: "Crear",
  type: "Práctica guiada",
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
  difficulty: "Fácil",
  estimatedTime: "6 min",
  skill: "Acceso",
  type: "Práctica guiada",
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
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Añadir",
  type: "Práctica guiada",
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
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Modificar",
  type: "Práctica guiada",
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
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "in",
  type: "Práctica guiada",
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
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "items()",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Recorrer claves y valores

alumno = {
    "nombre": "Lucía",
    "nota": 9,
    "activo": True
}

# Recorre el diccionario
# e imprime cada clave con su valor
`,
  hints: [
    "La forma más cómoda suele ser items()",
    "Usa dos variables en el for",
    "Piensa en una salida clara",
  ],
};

window.EXERCISE_CATALOG["py_tema6_ej7"] = {
  id: "py_tema6_ej7",
  language: "python",
  topic: "python/tema-6",
  title: "Ejercicio 7 – get() con valor por defecto",
  statement: "Accede a una clave opcional sin provocar error y muestra el resultado adecuado.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "get()",
  type: "Práctica guiada",
  starterCode:
`config = {
    "tema": "oscuro"
}

# Lee la clave "idioma"
# usando un valor por defecto "es"
# y muestra el resultado
`,
  hints: [
    "Aquí conviene usar un acceso seguro",
    "Piensa qué debería ocurrir si la clave no existe"
  ],
};

window.EXERCISE_CATALOG["py_tema6_ej8"] = {
  id: "py_tema6_ej8",
  language: "python",
  topic: "python/tema-6",
  title: "Ejercicio 8 – Eliminar una clave",
  statement: "Elimina una clave de un diccionario y comprueba el resultado final.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "pop()",
  type: "Práctica guiada",
  starterCode:
`producto = {
    "nombre": "Teclado",
    "precio": 50,
    "stock": 12
}

# Elimina la clave "stock"
# y muestra el diccionario final
`,
  hints: [
    "Debes modificar el diccionario existente",
    "Comprueba el resultado imprimiéndolo al final"
  ],
};

window.EXERCISE_CATALOG["py_tema6_ej9"] = {
  id: "py_tema6_ej9",
  language: "python",
  topic: "python/tema-6",
  title: "Ejercicio 9 – Contar claves",
  statement: "Calcula cuántas claves tiene un diccionario y muestra el resultado.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "update()",
  type: "Práctica guiada",
  starterCode:
`usuario = {
    "nombre": "Ana",
    "email": "ana@email.com",
    "activo": True
}

# Escribe una solución para mostrar
# cuántas claves tiene este diccionario
`,
  hints: [
    "No necesitas recorrer una a una si conoces una función útil",
    "La respuesta debe ser un número"
  ],
};

window.EXERCISE_CATALOG["py_tema6_ej10"] = {
  id: "py_tema6_ej10",
  language: "python",
  topic: "python/tema-6",
  title: "Ejercicio 10 – Resumen de un diccionario",
  statement: "Muestra un pequeño resumen legible usando varios datos de un diccionario.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Depuración",
  type: "Práctica guiada",
  starterCode:
`persona = {
    "nombre": "Luis",
    "edad": 30,
    "ciudad": "Madrid"
}

# Escribe una salida legible que resuma
# la información principal de esta persona
`,
  hints: [
    "No se trata solo de imprimir el diccionario completo",
    "Piensa en una frase o varias líneas claras para el usuario"
  ],
};

window.EXERCISE_CATALOG["py_tema6_ej11"] = {
  id: "py_tema6_ej11",
  language: "python",
  topic: "python/tema-6",
  title: "Ejercicio 11 – Lista o diccionario",
  statement: "Representa correctamente un problema decidiendo si conviene más una lista o un diccionario.",
  difficulty: "Media",
  estimatedTime: "9 min",
  skill: "Diseño",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Lista o diccionario

# Quieres guardar:
# nombre, precio y stock de un producto

# Crea la estructura que tenga más sentido
# y después imprímela
`,
  hints: [
    "Aquí no importa la posición, sino el nombre de cada dato",
    "Piensa qué estructura permite pedir luego producto[\"precio\"]",
    "La clave es elegir la estructura correcta",
  ],
};

window.EXERCISE_CATALOG["py_tema6_ej12"] = {
  id: "py_tema6_ej12",
  language: "python",
  topic: "python/tema-6",
  title: "Ejercicio 12 – Diccionario vacío y clave opcional",
  statement: "Trabaja con un diccionario que puede empezar vacío y completa datos con seguridad.",
  difficulty: "Media",
  estimatedTime: "9 min",
  skill: "Casos frontera",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Diccionario vacío y clave opcional

config = {}

# Añade una clave "tema"
# Después usa get() para leer "idioma"
# con valor por defecto "es"
# Imprime el diccionario y el idioma
`,
  hints: [
    "Empiezas con {}",
    "Primero puedes añadir una clave con asignación",
    "Luego usa get() para la clave opcional",
  ],
};

window.EXERCISE_CATALOG["py_tema6_reto1"] = {
  id: "py_tema6_reto1",
  language: "python",
  topic: "python/tema-6",
  title: "Mini reto – Ficha completa",
  statement: "Crea una ficha de usuario y recórrela mostrando todos sus campos con formato claro.",
  difficulty: "Reto",
  estimatedTime: "10 min",
  skill: "items()",
  type: "Reto",
  starterCode:
`# MINI RETO: Ficha completa

usuario = {
    "nombre": "Ana",
    "edad": 30,
    "email": "ana@email.com",
    "activo": True
}

# Recorre el diccionario
# y muestra cada clave junto con su valor
`,
  hints: [
    "Aquí conviene items()",
    "Piensa en una salida legible",
    "Recuerda que quieres mostrar el nombre del campo y su contenido",
  ],
};

window.EXERCISE_CATALOG["py_tema6_reto2"] = {
  id: "py_tema6_reto2",
  language: "python",
  topic: "python/tema-6",
  title: "Reto final – Gestión básica de producto",
  statement: "Crea, modifica, comprueba y recorre un diccionario de producto usando varios métodos del tema.",
  difficulty: "Reto final",
  estimatedTime: "12-15 min",
  skill: "Integrador",
  type: "Reto final",
  starterCode:
`# RETO FINAL: Gestión básica de producto

producto = {
    "nombre": "Teclado",
    "precio": 50
}

# 1. Añade la clave "stock" con valor 10
# 2. Actualiza el precio a 45
# 3. Comprueba si existe la clave "categoria"
# 4. Usa get() para leer "categoria" con valor por defecto "Sin categoría"
# 5. Recorre el diccionario mostrando clave y valor
`,
  hints: [
    "Combina varias cosas del tema en orden",
    "Piensa cuándo usas asignación, in, get() e items()",
    "Comprueba el diccionario final después de cada paso si lo necesitas",
  ],
};