window.EXERCISE_CATALOG = window.EXERCISE_CATALOG || {};

window.EXERCISE_CATALOG["py_tema6_ej1"] = {
  id: "py_tema6_ej1",
  language: "python",
  topic: "python/tema-6",
  title: "Ejercicio 1 – Crear un diccionario",
  statement: "Crea un diccionario que represente una película.",
  difficulty: "Fácil",
  estimatedTime: "5 min",
  skill: "Crear",
  type: "Ejercicio",
  starterCode:
`# Crea un diccionario que represente una película
# y muéstralo por pantalla
`,
  hints: [
    "Necesitas una estructura con claves y valores.",
    "Piensa qué datos describen bien una película.",
    "La salida debe mostrar toda la información guardada."
  ],
  expectedOutput: "Debe mostrar un diccionario que represente una película.",
  checks: [
    "Debe crear un diccionario.",
    "Debe incluir varias claves relacionadas con una película.",
    "Debe asignar valores a esas claves.",
    "Debe mostrar el diccionario por pantalla."
  ]
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
  type: "Ejercicio",
  starterCode:
`pelicula = {
    "titulo": "Inception",
    "anio": 2010,
    "director": "Christopher Nolan"
}

# Muestra el valor de dos claves distintas
`,
  hints: [
    "Debes acceder a valores concretos, no imprimir todo el diccionario.",
    "Cada valor está asociado a una clave.",
    "Revisa que escribes las claves exactamente como aparecen."
  ],
  expectedOutput: "Debe mostrar el valor de dos claves distintas del diccionario.",
  checks: [
    "Debe usar el diccionario dado.",
    "Debe acceder a dos claves distintas.",
    "Debe mostrar los valores por pantalla.",
    "No debe modificar el diccionario."
  ]
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
  type: "Ejercicio",
  starterCode:
`usuario = {
    "nombre": "Ana",
    "activo": True
}

# Añade una nueva clave al diccionario
# y muestra el resultado final
`,
  hints: [
    "Debes modificar el diccionario existente.",
    "La clave nueva debe quedar asociada a un valor.",
    "Comprueba el diccionario después del cambio."
  ],
  expectedOutput: "Debe mostrar el diccionario con una nueva clave añadida.",
  checks: [
    "Debe partir del diccionario dado.",
    "Debe añadir una clave nueva.",
    "Debe asignar un valor a esa clave.",
    "Debe mostrar el diccionario actualizado."
  ]
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
  type: "Ejercicio",
  starterCode:
`producto = {
    "nombre": "Monitor",
    "precio": 200
}

# Actualiza el precio
# y muestra el diccionario final
`,
  hints: [
    "La clave que quieres cambiar ya existe.",
    "Debes sustituir el valor anterior por uno nuevo.",
    "Comprueba que el resto del diccionario se mantiene."
  ],
  expectedOutput: "Debe mostrar el diccionario con el precio actualizado.",
  checks: [
    "Debe usar el diccionario dado.",
    "Debe modificar el valor de la clave precio.",
    "Debe conservar el resto de claves.",
    "Debe mostrar el resultado final."
  ]
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
  type: "Ejercicio",
  starterCode:
`usuario = {
    "nombre": "Luis",
    "activo": True
}

# Comprueba si el usuario tiene email
# y muestra el resultado
`,
  hints: [
    "Debes comprobar la existencia de una clave.",
    "El resultado de la comprobación será verdadero o falso.",
    "No hace falta acceder al valor si la clave no existe."
  ],
  expectedOutput: "Debe mostrar si el diccionario usuario contiene la clave email.",
  checks: [
    "Debe trabajar con el diccionario dado.",
    "Debe comprobar si existe una clave concreta.",
    "Debe usar una comprobación de pertenencia.",
    "Debe mostrar el resultado."
  ]
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
  type: "Ejercicio",
  starterCode:
`alumno = {
    "nombre": "Lucía",
    "nota": 9,
    "activo": True
}

# Recorre el diccionario
# y muestra cada campo con su valor
`,
  hints: [
    "Necesitas recorrer pares de información.",
    "En cada vuelta deberías tener el nombre del campo y su contenido.",
    "La salida debe ser legible."
  ],
  expectedOutput: "Debe mostrar cada clave del diccionario junto con su valor.",
  checks: [
    "Debe recorrer el diccionario.",
    "Debe obtener claves y valores.",
    "Debe mostrar cada par de datos.",
    "La salida debe ser clara."
  ]
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
  type: "Ejercicio",
  starterCode:
`config = {
    "tema": "oscuro"
}

# Lee una clave opcional de forma segura
# usando un valor por defecto
`,
  hints: [
    "La clave que buscas puede no existir.",
    "Conviene evitar un error al acceder.",
    "Piensa qué valor debería usarse si falta la clave."
  ],
  expectedOutput: "Debe mostrar un valor por defecto cuando la clave opcional no existe.",
  checks: [
    "Debe usar el diccionario dado.",
    "Debe intentar leer una clave opcional.",
    "Debe evitar un KeyError.",
    "Debe usar un valor por defecto.",
    "Debe mostrar el resultado."
  ]
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
  type: "Ejercicio",
  starterCode:
`producto = {
    "nombre": "Teclado",
    "precio": 50,
    "stock": 12
}

# Elimina una clave del diccionario
# y muestra el resultado final
`,
  hints: [
    "Debes modificar el diccionario existente.",
    "La clave eliminada no debería aparecer al final.",
    "Comprueba el resultado imprimiendo el diccionario."
  ],
  expectedOutput: "Debe mostrar el diccionario después de eliminar la clave stock.",
  checks: [
    "Debe partir del diccionario dado.",
    "Debe eliminar una clave existente.",
    "La clave eliminada no debe aparecer en el resultado.",
    "Debe mostrar el diccionario final."
  ]
};

window.EXERCISE_CATALOG["py_tema6_ej9"] = {
  id: "py_tema6_ej9",
  language: "python",
  topic: "python/tema-6",
  title: "Ejercicio 9 – Contar claves",
  statement: "Calcula cuántas claves tiene un diccionario y muestra el resultado.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "len()",
  type: "Ejercicio",
  starterCode:
`usuario = {
    "nombre": "Ana",
    "email": "ana@email.com",
    "activo": True
}

# Muestra cuántas claves tiene este diccionario
`,
  hints: [
    "No necesitas contar manualmente una a una.",
    "El resultado debe ser un número.",
    "Piensa qué función mide la cantidad de elementos."
  ],
  expectedOutput: "Debe mostrar cuántas claves tiene el diccionario usuario.",
  checks: [
    "Debe usar el diccionario dado.",
    "Debe calcular la cantidad de claves.",
    "Debe mostrar un número.",
    "No debe modificar el diccionario."
  ]
};

window.EXERCISE_CATALOG["py_tema6_ej10"] = {
  id: "py_tema6_ej10",
  language: "python",
  topic: "python/tema-6",
  title: "Ejercicio 10 – Resumen de un diccionario",
  statement: "Muestra un pequeño resumen legible usando varios datos de un diccionario.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Resumen",
  type: "Ejercicio",
  starterCode:
`persona = {
    "nombre": "Luis",
    "edad": 30,
    "ciudad": "Madrid"
}

# Crea una salida legible con la información principal
`,
  hints: [
    "No se trata solo de imprimir el diccionario completo.",
    "Debes seleccionar varios valores concretos.",
    "La salida debería entenderse como una frase o resumen."
  ],
  expectedOutput: "Debe mostrar un resumen legible usando nombre, edad y ciudad.",
  checks: [
    "Debe acceder a varios valores del diccionario.",
    "Debe construir una salida legible.",
    "Debe incluir la información principal.",
    "No debe limitarse necesariamente a imprimir el diccionario entero."
  ]
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
  type: "Ejercicio",
  starterCode:
`# Quieres guardar:
# nombre, precio y stock de un producto

# Crea la estructura que tenga más sentido
# y después muéstrala
`,
  hints: [
    "Aquí importa cómo representar cada dato.",
    "Piensa si necesitas acceder por posición o por nombre.",
    "La estructura elegida debe explicar bien el producto."
  ],
  expectedOutput: "Debe representar un producto con una estructura adecuada y mostrarlo.",
  checks: [
    "Debe elegir una estructura adecuada para datos con nombre.",
    "Debe representar nombre, precio y stock.",
    "Debe mostrar la estructura creada.",
    "Debe justificar implícitamente una representación clara del problema."
  ]
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
  type: "Ejercicio",
  starterCode:
`config = {}

# Añade una clave principal
# lee una clave opcional con valor por defecto
# y muestra el resultado
`,
  hints: [
    "Empiezas con un diccionario sin datos.",
    "Primero puedes completar una clave.",
    "Después piensa cómo leer una clave que puede no existir."
  ],
  expectedOutput: "Debe mostrar el diccionario actualizado y un valor seguro para una clave opcional.",
  checks: [
    "Debe partir de un diccionario vacío.",
    "Debe añadir una clave nueva.",
    "Debe leer una clave opcional sin error.",
    "Debe usar un valor por defecto.",
    "Debe mostrar el resultado final."
  ]
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
`usuario = {
    "nombre": "Ana",
    "edad": 30,
    "email": "ana@email.com",
    "activo": True
}

# Recorre la ficha
# y muestra cada campo con formato claro
`,
  hints: [
    "Debes mostrar tanto el nombre del campo como su contenido.",
    "La salida debe ser más clara que imprimir el diccionario entero.",
    "Piensa en un recorrido que te dé clave y valor."
  ],
  expectedOutput: "Debe mostrar todos los campos de la ficha de usuario con formato claro.",
  checks: [
    "Debe recorrer el diccionario.",
    "Debe mostrar cada clave.",
    "Debe mostrar cada valor.",
    "La salida debe ser legible.",
    "Debe incluir todos los campos."
  ]
};

window.EXERCISE_CATALOG["py_tema6_reto2"] = {
  id: "py_tema6_reto2",
  language: "python",
  topic: "python/tema-6",
  title: "Reto final – Gestión básica de producto",
  statement: "Crea, modifica, comprueba y recorre un diccionario de producto usando varios métodos del tema.",
  difficulty: "Reto final",
  estimatedTime: "12-15 min",
  skill: "Integración",
  type: "Reto final",
  starterCode:
`producto = {
    "nombre": "Teclado",
    "precio": 50
}

# Completa y gestiona el producto:
# añade información, actualiza datos,
# comprueba claves opcionales
# y muestra todos sus campos
`,
  hints: [
    "Combina varias operaciones del tema.",
    "Piensa cuándo estás añadiendo, modificando, comprobando o recorriendo.",
    "Comprueba el estado final del diccionario."
  ],
  expectedOutput: "Debe mostrar un diccionario de producto actualizado y recorrido de forma clara.",
  checks: [
    "Debe añadir una nueva clave al producto.",
    "Debe actualizar un valor existente.",
    "Debe comprobar una clave opcional.",
    "Debe leer una clave con valor por defecto.",
    "Debe recorrer el diccionario mostrando claves y valores."
  ]
};