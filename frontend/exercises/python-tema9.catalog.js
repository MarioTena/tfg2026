window.EXERCISE_CATALOG["py_tema9_ej1"] = {
  id: "py_tema9_ej1",
  language: "python",
  topic: "python/tema-9",
  title: "Ejercicio 1 – Crear un archivo nuevo",
  statement: "Escribe una frase en un archivo usando modo w.",
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
  starterCode:
`# EJERCICIO: Añadir contenido

# Abre un archivo en modo append
# Añade dos líneas nuevas
`,
  hints: [
    "Usa el modo a",
    "Añade \n para salto de línea",
    "No borres el contenido anterior",
  ],
};

window.EXERCISE_CATALOG["py_tema9_ej3"] = {
  id: "py_tema9_ej3",
  language: "python",
  topic: "python/tema-9",
  title: "Ejercicio 3 – Leer archivo completo",
  statement: "Lee un archivo completo y muéstralo por pantalla.",
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

window.EXERCISE_CATALOG["py_tema9_reto1"] = {
  id: "py_tema9_reto1",
  language: "python",
  topic: "python/tema-9",
  title: "Reto final – Registro simple",
  statement: "Crea un pequeño registro de texto: escribe varias líneas, luego léelas y muéstralas limpias.",
  starterCode:
`# RETO FINAL: Registro simple

# 1. Crea o sobrescribe un archivo
# 2. Escribe varias líneas
# 3. Ábrelo en lectura
# 4. Recorre el archivo línea a línea
# 5. Imprime cada línea limpia con strip()
`,
  hints: [
    "Puedes hacerlo en dos bloques with",
    "Primero escribe, luego lee",
    "Usa strip() al mostrar cada línea",
  ],
};