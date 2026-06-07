window.EXERCISE_CATALOG = window.EXERCISE_CATALOG || {};

window.EXERCISE_CATALOG["py_tema9_ej1"] = {
  id: "py_tema9_ej1",
  language: "python",
  topic: "python/tema-9",
  title: "Ejercicio 1 – Crear un archivo nuevo",
  statement: "Escribe una frase en un archivo usando modo w.",
  difficulty: "Fácil",
  estimatedTime: "6 min",
  skill: "w",
  type: "Ejercicio",
  starterCode:
`# Crea un archivo llamado salida.txt
# y escribe una frase dentro
`,
  hints: [
    "Necesitas abrir un archivo para escribir.",
    "El modo elegido debe crear o reemplazar el contenido.",
    "Dentro del bloque debes escribir texto en el archivo."
  ],
  expectedOutput: "Debe crear o sobrescribir un archivo llamado salida.txt y escribir una frase dentro.",
  checks: [
    "Debe abrir un archivo en modo escritura.",
    "Debe usar el nombre salida.txt.",
    "Debe escribir una frase en el archivo.",
    "Debe cerrar el archivo correctamente o usar un bloque seguro."
  ]
};

window.EXERCISE_CATALOG["py_tema9_ej2"] = {
  id: "py_tema9_ej2",
  language: "python",
  topic: "python/tema-9",
  title: "Ejercicio 2 – Añadir contenido",
  statement: "Añade dos líneas nuevas a un archivo existente.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "a",
  type: "Ejercicio",
  starterCode:
`# Añade dos líneas nuevas a un archivo
# sin borrar lo que ya tenía antes
`,
  hints: [
    "Debes conservar el contenido anterior.",
    "Cada línea nueva debería quedar separada.",
    "Piensa qué modo permite añadir al final."
  ],
  expectedOutput: "Debe añadir dos líneas nuevas a un archivo sin borrar el contenido anterior.",
  checks: [
    "Debe abrir un archivo en modo de añadido.",
    "Debe escribir dos líneas nuevas.",
    "Debe conservar el contenido anterior.",
    "Debe cuidar los saltos de línea."
  ]
};

window.EXERCISE_CATALOG["py_tema9_ej3"] = {
  id: "py_tema9_ej3",
  language: "python",
  topic: "python/tema-9",
  title: "Ejercicio 3 – Leer archivo completo",
  statement: "Lee un archivo completo y muéstralo por pantalla.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "read()",
  type: "Ejercicio",
  starterCode:
`# Lee el contenido completo de un archivo
# y muéstralo por pantalla
`,
  hints: [
    "Necesitas abrir el archivo para lectura.",
    "El contenido debe guardarse o usarse antes de mostrarlo.",
    "La salida debe contener lo leído del archivo."
  ],
  expectedOutput: "Debe leer el contenido completo de un archivo y mostrarlo por pantalla.",
  checks: [
    "Debe abrir un archivo en modo lectura.",
    "Debe leer todo su contenido.",
    "Debe mostrar el contenido leído.",
    "Debe gestionar correctamente la apertura y cierre del archivo."
  ]
};

window.EXERCISE_CATALOG["py_tema9_ej4"] = {
  id: "py_tema9_ej4",
  language: "python",
  topic: "python/tema-9",
  title: "Ejercicio 4 – Leer línea a línea",
  statement: "Muestra cada línea de un archivo limpia con strip().",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Recorrido",
  type: "Ejercicio",
  starterCode:
`# Lee un archivo línea a línea
# y muestra cada línea sin espacios laterales
`,
  hints: [
    "Debes recorrer el archivo por partes.",
    "Cada línea puede traer saltos o espacios que no quieres mostrar.",
    "La limpieza debe aplicarse antes de imprimir."
  ],
  expectedOutput: "Debe mostrar cada línea del archivo limpia, sin espacios laterales ni saltos sobrantes.",
  checks: [
    "Debe abrir un archivo en modo lectura.",
    "Debe recorrer el archivo línea a línea.",
    "Debe limpiar cada línea antes de mostrarla.",
    "Debe imprimir dentro del recorrido."
  ]
};

window.EXERCISE_CATALOG["py_tema9_ej5"] = {
  id: "py_tema9_ej5",
  language: "python",
  topic: "python/tema-9",
  title: "Ejercicio 5 – Elegir modo correcto",
  statement: "Indica si usarías r, w o a en distintos casos prácticos.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Diseño",
  type: "Ejercicio",
  starterCode:
`# Escribe en comentarios qué modo usarías en estos casos:
# 1. leer un informe ya existente
# 2. crear un informe nuevo desde cero
# 3. añadir una línea a un historial
`,
  hints: [
    "Cada caso tiene una intención distinta.",
    "Piensa si quieres leer, reemplazar o conservar lo anterior.",
    "La respuesta debe justificar el modo elegido en cada situación."
  ],
  expectedOutput: "Debe indicar el modo correcto para leer, crear desde cero y añadir contenido.",
  checks: [
    "Debe elegir un modo para leer un archivo existente.",
    "Debe elegir un modo para crear o sobrescribir un archivo.",
    "Debe elegir un modo para añadir al final.",
    "Debe explicar o dejar claro el motivo de cada elección."
  ]
};

window.EXERCISE_CATALOG["py_tema9_ej6"] = {
  id: "py_tema9_ej6",
  language: "python",
  topic: "python/tema-9",
  title: "Ejercicio 6 – Varias líneas con \\n",
  statement: "Escribe tres líneas en un archivo cuidando bien el formato final.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Formato",
  type: "Ejercicio",
  starterCode:
`# Crea un archivo llamado tareas.txt
# y escribe tres tareas, cada una en una línea distinta
`,
  hints: [
    "Debes escribir más de una línea.",
    "La escritura no separa líneas automáticamente.",
    "Comprueba que cada tarea quede visualmente separada."
  ],
  expectedOutput: "Debe crear tareas.txt con tres tareas, cada una en una línea distinta.",
  checks: [
    "Debe abrir tareas.txt para escritura.",
    "Debe escribir tres tareas.",
    "Debe separar correctamente las líneas.",
    "Debe cuidar el formato final del archivo."
  ]
};

window.EXERCISE_CATALOG["py_tema9_ej7"] = {
  id: "py_tema9_ej7",
  language: "python",
  topic: "python/tema-9",
  title: "Ejercicio 7 – Qué pasa con w",
  statement: "Explica en comentarios qué ocurrirá con el contenido previo al abrir en modo w.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Razonamiento",
  type: "Ejercicio",
  starterCode:
`# Imagina que un archivo ya tiene contenido.
# Explica:
# 1. qué ocurre si lo abres en modo escritura
# 2. por qué eso puede ser peligroso
# 3. cuándo sí tendría sentido usar ese modo
`,
  hints: [
    "Aquí importa más el efecto real que la sintaxis.",
    "Piensa qué pasa con el contenido anterior.",
    "Distingue entre crear desde cero y conservar información."
  ],
  expectedOutput: "Debe explicar que el modo de escritura puede reemplazar el contenido previo y cuándo tiene sentido usarlo.",
  checks: [
    "Debe explicar qué ocurre con el contenido previo.",
    "Debe mencionar el riesgo de perder información.",
    "Debe indicar un caso donde tenga sentido usar ese modo.",
    "Debe responder en comentarios o texto dentro del código."
  ]
};

window.EXERCISE_CATALOG["py_tema9_ej8"] = {
  id: "py_tema9_ej8",
  language: "python",
  topic: "python/tema-9",
  title: "Ejercicio 8 – Archivo vacío",
  statement: "Piensa y prueba qué devuelve la lectura de un archivo vacío.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Caso frontera",
  type: "Ejercicio",
  starterCode:
`# Explica qué esperas obtener al leer un archivo vacío.
# Después puedes escribir una pequeña prueba para comprobarlo.
`,
  hints: [
    "No siempre leer significa obtener texto visible.",
    "Piensa qué representa la ausencia de contenido.",
    "Puedes acompañarlo con una prueba simple."
  ],
  expectedOutput: "Debe explicar o comprobar qué ocurre al leer un archivo vacío.",
  checks: [
    "Debe razonar sobre un archivo sin contenido.",
    "Debe indicar qué devuelve una lectura sin datos.",
    "Puede incluir una pequeña prueba.",
    "Debe mostrar o comentar el resultado esperado."
  ]
};

window.EXERCISE_CATALOG["py_tema9_ej9"] = {
  id: "py_tema9_ej9",
  language: "python",
  topic: "python/tema-9",
  title: "Ejercicio 9 – Leer y buscar palabra",
  statement: "Lee un archivo línea a línea e imprime solo las líneas que contienen una palabra concreta.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Filtro",
  type: "Ejercicio",
  starterCode:
`palabra_buscada = "Python"

# Lee un archivo línea a línea
# y muestra solo las líneas que contienen la palabra buscada
`,
  hints: [
    "Conviene revisar el archivo por líneas.",
    "Cada línea debe evaluarse antes de mostrarla.",
    "Solo deben aparecer las líneas que cumplan la condición."
  ],
  expectedOutput: "Debe mostrar solo las líneas del archivo que contienen la palabra buscada.",
  checks: [
    "Debe abrir un archivo en modo lectura.",
    "Debe recorrer sus líneas.",
    "Debe comprobar si cada línea contiene la palabra buscada.",
    "Debe mostrar solo las líneas que coincidan."
  ]
};

window.EXERCISE_CATALOG["py_tema9_ej10"] = {
  id: "py_tema9_ej10",
  language: "python",
  topic: "python/tema-9",
  title: "Ejercicio 10 – Escribir y luego leer",
  statement: "Crea un archivo, escribe contenido y luego ábrelo otra vez para mostrarlo.",
  difficulty: "Media",
  estimatedTime: "9 min",
  skill: "Combinado",
  type: "Ejercicio",
  starterCode:
`# Crea un archivo y escribe una línea.
# Después vuelve a abrirlo para leer y mostrar su contenido.
`,
  hints: [
    "Necesitas dos operaciones distintas sobre el archivo.",
    "Primero debes escribir y después leer.",
    "Piensa qué modo corresponde a cada paso."
  ],
  expectedOutput: "Debe escribir contenido en un archivo y después leerlo para mostrarlo por pantalla.",
  checks: [
    "Debe crear o escribir en un archivo.",
    "Debe cerrar o finalizar la escritura antes de leer.",
    "Debe abrir el archivo otra vez en modo lectura.",
    "Debe mostrar el contenido leído."
  ]
};

window.EXERCISE_CATALOG["py_tema9_ej11"] = {
  id: "py_tema9_ej11",
  language: "python",
  topic: "python/tema-9",
  title: "Ejercicio 11 – Salida limpia",
  statement: "Corrige un código que imprime líneas con formato poco limpio.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Depuración",
  type: "Ejercicio",
  starterCode:
`# Imagina este código:
#
# with open("datos.txt", "r") as archivo:
#     for linea in archivo:
#         print(linea)
#
# Reescríbelo para mostrar cada línea de forma más limpia
`,
  hints: [
    "El problema no es leer, sino mostrar.",
    "Cada línea puede traer caracteres sobrantes al final.",
    "La limpieza debe hacerse antes de imprimir."
  ],
  expectedOutput: "Debe reescribir el ejemplo para mostrar líneas limpias, sin saltos o espacios sobrantes.",
  checks: [
    "Debe mantener la lectura línea a línea.",
    "Debe limpiar cada línea antes de mostrarla.",
    "Debe imprimir la versión limpia.",
    "Debe mejorar el formato de salida."
  ]
};

window.EXERCISE_CATALOG["py_tema9_ej12"] = {
  id: "py_tema9_ej12",
  language: "python",
  topic: "python/tema-9",
  title: "Ejercicio 12 – Comparar w y a",
  statement: "Explica en comentarios en qué se diferencian ambos modos en un caso práctico.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Comparación",
  type: "Ejercicio",
  starterCode:
`# Explica en comentarios:
# 1. qué ocurre al escribir desde cero
# 2. qué ocurre al añadir al final
# 3. cuándo usarías cada enfoque
`,
  hints: [
    "Uno puede reemplazar el contenido anterior.",
    "El otro conserva lo existente y añade después.",
    "Usa ejemplos sencillos para justificar la diferencia."
  ],
  expectedOutput: "Debe explicar la diferencia entre escribir desde cero y añadir al final de un archivo.",
  checks: [
    "Debe explicar el comportamiento de w.",
    "Debe explicar el comportamiento de a.",
    "Debe comparar ambos modos.",
    "Debe indicar un caso de uso para cada uno."
  ]
};

window.EXERCISE_CATALOG["py_tema9_reto1"] = {
  id: "py_tema9_reto1",
  language: "python",
  topic: "python/tema-9",
  title: "Mini reto – Historial incremental",
  statement: "Añade varias entradas a un archivo de historial sin borrar lo que ya había y luego revísalo.",
  difficulty: "Reto",
  estimatedTime: "10 min",
  skill: "a + r",
  type: "Reto",
  starterCode:
`# Añade dos líneas nuevas a un archivo de historial.
# Después léelo y muestra cada línea limpia.
`,
  hints: [
    "Primero debes conservar lo que ya existía.",
    "Después necesitas revisar el contenido guardado.",
    "Cuida el formato de las nuevas líneas y de la salida."
  ],
  expectedOutput: "Debe añadir entradas a un historial sin borrar lo anterior y luego mostrar el contenido limpio.",
  checks: [
    "Debe añadir contenido sin sobrescribir.",
    "Debe escribir al menos dos líneas nuevas.",
    "Debe abrir después el archivo para lectura.",
    "Debe mostrar cada línea de forma limpia."
  ]
};

window.EXERCISE_CATALOG["py_tema9_reto2"] = {
  id: "py_tema9_reto2",
  language: "python",
  topic: "python/tema-9",
  title: "Reto final – Registro simple completo",
  statement: "Crea un pequeño registro: escribe varias líneas, añade otra, luego léelas y muéstralas limpias.",
  difficulty: "Reto final",
  estimatedTime: "12-15 min",
  skill: "Integración",
  type: "Reto final",
  starterCode:
`# Crea un registro simple:
# 1. escribe varias líneas iniciales
# 2. añade una línea nueva después
# 3. lee el archivo
# 4. muestra sus líneas limpias
`,
  hints: [
    "Combinas crear, añadir y leer.",
    "Piensa en el efecto de cada modo sobre el archivo.",
    "La salida final debe quedar limpia y legible."
  ],
  expectedOutput: "Debe crear un registro, añadir una línea adicional y mostrar todas las líneas limpias.",
  checks: [
    "Debe escribir varias líneas iniciales.",
    "Debe añadir una línea nueva sin borrar las anteriores.",
    "Debe leer el archivo resultante.",
    "Debe limpiar las líneas al mostrarlas.",
    "Debe usar correctamente los modos de archivo."
  ]
};