window.EXERCISE_CATALOG["py_tema9_ej1"] = {
  id: "py_tema9_ej1",
  language: "python",
  topic: "python/tema-9",
  title: "Ejercicio 1 – Crear un archivo nuevo",
  statement: "Escribe una frase en un archivo usando modo w.",
  difficulty: "Fácil",
  estimatedTime: "6 min",
  skill: "w",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Crear un archivo nuevo

# Abre un archivo llamado salida.txt en modo escritura
# Escribe una frase dentro
`,
  hints: [
    "Usa with open(..., \"w\")",
    "Dentro usa archivo.write()",
    "El modo w crea o sobrescribe",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Añadir contenido

# Abre un archivo en modo append
# Añade dos líneas nuevas
`,
  hints: [
    "Usa el modo a",
    "Añade \\n para salto de línea",
    "No borres el contenido anterior",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Leer archivo completo

# Abre un archivo en modo lectura
# Guarda su contenido en una variable
# Imprímelo
`,
  hints: [
    "Usa with open(..., \"r\")",
    "Lee con read()",
    "Imprime el contenido al final",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Leer línea a línea

# Abre un archivo en modo lectura
# Recorre cada línea
# Imprime la línea sin espacios laterales
`,
  hints: [
    "Puedes recorrer directamente el archivo con for",
    "Usa linea.strip()",
    "Imprime dentro del bucle",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Elegir modo correcto

# Escribe en comentarios qué modo usarías
# en estos casos:
# 1. leer un informe ya existente
# 2. crear un informe nuevo desde cero
# 3. añadir una línea a un historial
`,
  hints: [
    "r es para leer",
    "w sobrescribe o crea",
    "a añade al final",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Varias líneas con \\n

# Crea un archivo llamado tareas.txt
# Escribe tres tareas, cada una en una línea distinta
`,
  hints: [
    "Usa modo w",
    "write() no añade saltos por sí solo",
    "Necesitarás \\n para separar líneas",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# Imagina que un archivo ya tiene contenido.
# Escribe en comentarios:
# 1. qué ocurre si lo abres en modo "w"
# 2. por qué eso puede ser peligroso
# 3. en qué caso sí tendría sentido usar ese modo
`,
  hints: [
    "Aquí importa más el efecto real que la sintaxis",
    "Piensa qué pasa con el contenido anterior"
  ],
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
  type: "Práctica guiada",
  starterCode:
`# Escribe en comentarios qué esperas que devuelva read()
# si el archivo está vacío.
#
# Después, si quieres, escríbelo también como una pequeña prueba.
`,
  hints: [
    "No siempre leer significa obtener texto",
    "Piensa qué devuelve una lectura total cuando no hay contenido"
  ],
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
  type: "Práctica guiada",
  starterCode:
`palabra_buscada = "Python"

# Escribe una solución que:
# 1. abra un archivo en lectura
# 2. recorra sus líneas
# 3. muestre solo las que contienen la palabra buscada
`,
  hints: [
    "Aquí conviene recorrer el archivo línea a línea",
    "Piensa en una condición de pertenencia dentro del bucle"
  ],
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
  type: "Práctica guiada",
  starterCode:
`# Escribe una solución que:
# 1. cree un archivo y escriba una línea
# 2. lo abra otra vez en modo lectura
# 3. muestre el contenido
`,
  hints: [
    "Aquí necesitas dos aperturas distintas del mismo archivo",
    "Piensa qué modo corresponde a cada paso"
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Salida limpia

# Imagina este código:
#
# with open("datos.txt", "r") as archivo:
#     for linea in archivo:
#         print(linea)
#
# Reescríbelo para mostrar cada línea más limpia
`,
  hints: [
    "Piensa en strip()",
    "El problema no es leer, sino mostrar",
    "Reescribe el print dentro del bucle",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Comparar w y a

# Escribe en comentarios:
# 1. qué hace el modo w
# 2. qué hace el modo a
# 3. en qué caso usarías cada uno
`,
  hints: [
    "Uno reemplaza, el otro conserva y añade",
    "Piensa en contenido previo",
    "Usa ejemplos reales sencillos",
  ],
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
`# MINI RETO: Historial incremental

# 1. Añade dos líneas nuevas a un archivo de historial
# 2. Después ábrelo en modo lectura
# 3. Muestra cada línea limpia
`,
  hints: [
    "Primero conviene a y luego r",
    "Recuerda \\n en cada línea nueva",
    "Usa strip() al mostrar",
  ],
};

window.EXERCISE_CATALOG["py_tema9_reto2"] = {
  id: "py_tema9_reto2",
  language: "python",
  topic: "python/tema-9",
  title: "Reto final – Registro simple completo",
  statement: "Crea un pequeño registro: escribe varias líneas, añade otra, luego léelas y muéstralas limpias.",
  difficulty: "Reto final",
  estimatedTime: "12-15 min",
  skill: "Integrador",
  type: "Reto final",
  starterCode:
`# RETO FINAL: Registro simple completo

# 1. Crea un archivo nuevo y escribe tres líneas
# 2. Ábrelo en modo append y añade una cuarta línea
# 3. Ábrelo en modo lectura
# 4. Recorre sus líneas y muéstralas limpias
`,
  hints: [
    "Aquí combinas w, a y r",
    "Piensa en el efecto de cada paso sobre el archivo",
    "Usa strip() para una salida más clara",
  ],
};