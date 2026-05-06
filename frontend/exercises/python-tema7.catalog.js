window.EXERCISE_CATALOG = window.EXERCISE_CATALOG || {};

window.EXERCISE_CATALOG["py_tema7_ej1"] = {
  id: "py_tema7_ej1",
  language: "python",
  topic: "python/tema-7",
  title: "Ejercicio 1 – Primera y última letra",
  statement: "Muestra la primera y la última letra de una palabra.",
  difficulty: "Fácil",
  estimatedTime: "5 min",
  skill: "Índices",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Primera y última letra

palabra = "python"

# Imprime la primera letra
# Imprime la última letra
`,
  hints: [
    "La primera letra está en índice 0",
    "La última se puede sacar con -1",
    "Haz dos print distintos",
  ],
};

window.EXERCISE_CATALOG["py_tema7_ej2"] = {
  id: "py_tema7_ej2",
  language: "python",
  topic: "python/tema-7",
  title: "Ejercicio 2 – Tres primeras letras",
  statement: "Extrae las tres primeras letras de un texto.",
  difficulty: "Fácil",
  estimatedTime: "5 min",
  skill: "Slicing",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Tres primeras letras

texto = "programa"

# Usa slicing para extraer
# las tres primeras letras
`,
  hints: [
    "El slicing empieza en 0 si lo omites",
    "Piensa en texto[:3]",
    "El límite final no se incluye",
  ],
};

window.EXERCISE_CATALOG["py_tema7_ej3"] = {
  id: "py_tema7_ej3",
  language: "python",
  topic: "python/tema-7",
  title: "Ejercicio 3 – Invertir texto",
  statement: "Muestra un string al revés usando slicing.",
  difficulty: "Media",
  estimatedTime: "6 min",
  skill: "[::-1]",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Invertir texto

texto = "python"

# Imprime el texto al revés
`,
  hints: [
    "Puedes usar un slicing con paso negativo",
    "Piensa en [::-1]",
    "No necesitas un bucle para este caso",
  ],
};

window.EXERCISE_CATALOG["py_tema7_ej4"] = {
  id: "py_tema7_ej4",
  language: "python",
  topic: "python/tema-7",
  title: "Ejercicio 4 – Pasar a minúsculas",
  statement: "Convierte un texto a minúsculas y guarda el resultado correctamente.",
  difficulty: "Fácil",
  estimatedTime: "5 min",
  skill: "lower()",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Pasar a minúsculas

texto = "HoLa"

# Convierte el texto a minúsculas
# guarda el resultado correctamente
# e imprímelo
`,
  hints: [
    "Usa lower()",
    "Recuerda que devuelve un string nuevo",
    "Si no guardas el resultado, el texto original seguirá igual",
  ],
};

window.EXERCISE_CATALOG["py_tema7_ej5"] = {
  id: "py_tema7_ej5",
  language: "python",
  topic: "python/tema-7",
  title: "Ejercicio 5 – Limpiar espacios",
  statement: "Elimina espacios al principio y al final de un texto.",
  difficulty: "Fácil",
  estimatedTime: "5 min",
  skill: "strip()",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Limpiar espacios

texto = "   hola   "

# Elimina los espacios laterales
# e imprime el resultado
`,
  hints: [
    "Usa strip()",
    "No elimina espacios del medio",
    "Puedes guardar el resultado o imprimirlo directamente",
  ],
};

window.EXERCISE_CATALOG["py_tema7_ej6"] = {
  id: "py_tema7_ej6",
  language: "python",
  topic: "python/tema-7",
  title: "Ejercicio 6 – Contar una letra",
  statement: "Cuenta cuántas veces aparece una letra en un texto con un bucle.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Bucle",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Contar una letra

texto = "banana"
contador = 0

# Recorre el texto
# y cuenta cuántas veces aparece la letra "a"

print(contador)
`,
  hints: [
    "Usa un for para recorrer el string",
    "Cada vez que la letra sea 'a', suma 1",
    "Imprime contador al final",
  ],
};

window.EXERCISE_CATALOG["py_tema7_ej7"] = {
  id: "py_tema7_ej7",
  language: "python",
  topic: "python/tema-7",
  title: "Ejercicio 7 – Separar palabras",
  statement: "Convierte una frase en una lista de palabras usando split().",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "split()",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Separar palabras

frase = "Python es muy util"

# Usa split() para convertir
# la frase en una lista de palabras
# e imprime el resultado
`,
  hints: [
    "split() separa por espacios si no le pasas nada",
    "El resultado ya no es un string",
    "Imprime la lista resultante",
  ],
};

window.EXERCISE_CATALOG["py_tema7_ej8"] = {
  id: "py_tema7_ej8",
  language: "python",
  topic: "python/tema-7",
  title: "Ejercicio 8 – Unir palabras",
  statement: "Reconstruye una frase a partir de una lista de palabras usando el método adecuado.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "join()",
  type: "Práctica guiada",
  starterCode:
`palabras = ["Hola", "mundo", "desde", "Python"]

# Construye una frase con espacios entre palabras
# y muéstrala
`,
  hints: [
    "Aquí no conviene concatenar una a una",
    "Piensa desde qué objeto se usa join()"
  ],
};

window.EXERCISE_CATALOG["py_tema7_ej9"] = {
  id: "py_tema7_ej9",
  language: "python",
  topic: "python/tema-7",
  title: "Ejercicio 9 – Buscar con find()",
  statement: "Busca una subcadena y maneja correctamente el caso en que no aparezca.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "find()",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Buscar con find()

texto = "programacion"
posicion = texto.find("xyz")

# Imprime posicion
# y después escribe una condición
# para detectar el caso en que no aparezca
`,
  hints: [
    "find() devuelve -1 si no encuentra la subcadena",
    "Guarda primero el resultado",
    "Luego compara si vale -1 o no",
  ],
};

window.EXERCISE_CATALOG["py_tema7_ej10"] = {
  id: "py_tema7_ej10",
  language: "python",
  topic: "python/tema-7",
  title: "Ejercicio 10 – Comprobar prefijo o final",
  statement: "Valida un texto comprobando si cumple una condición de inicio o de final.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Validación",
  type: "Práctica guiada",
  starterCode:
`archivo = "informe.csv"

# Escribe una comprobación útil para validar este texto
`,
  hints: [
    "En este caso conviene pensar en cómo termina el texto",
    "La validación debe dar un resultado claro"
  ],
};

window.EXERCISE_CATALOG["py_tema7_ej11"] = {
  id: "py_tema7_ej11",
  language: "python",
  topic: "python/tema-7",
  title: "Ejercicio 11 – Inmutabilidad en práctica",
  statement: "Corrige este código para que el cambio de texto se vea realmente en la salida.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Depuración",
  type: "Práctica guiada",
  starterCode:
`texto = "HOLA"
texto.lower()
print(texto)
`,
  hints: [
    "El método devuelve un string nuevo",
    "El texto original no cambia por sí solo"
  ],
};

window.EXERCISE_CATALOG["py_tema7_ej12"] = {
  id: "py_tema7_ej12",
  language: "python",
  topic: "python/tema-7",
  title: "Ejercicio 12 – Contar palabras",
  statement: "Cuenta cuántas palabras hay en una frase separándola correctamente antes de analizarla.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Análisis",
  type: "Práctica guiada",
  starterCode:
`frase = "Python es muy util"

# Escribe una solución para contar cuántas palabras hay
# y muestra el resultado
`,
  hints: [
    "Primero necesitas pasar de frase a lista",
    "Después analiza la cantidad de elementos"
  ],
};

window.EXERCISE_CATALOG["py_tema7_reto1"] = {
  id: "py_tema7_reto1",
  language: "python",
  topic: "python/tema-7",
  title: "Mini reto – Normalizar nombre",
  statement: "Limpia espacios y normaliza un texto antes de compararlo o mostrarlo.",
  difficulty: "Reto",
  estimatedTime: "10 min",
  skill: "Limpieza",
  type: "Reto",
  starterCode:
`# MINI RETO: Normalizar nombre

nombre = "   ANA   "

# Elimina espacios laterales
# pásalo a minúsculas
# e imprime el resultado final
`,
  hints: [
    "Combina strip() y lower()",
    "Puedes encadenarlos o hacerlo en dos pasos",
    "Recuerda guardar el resultado",
  ],
};

window.EXERCISE_CATALOG["py_tema7_reto2"] = {
  id: "py_tema7_reto2",
  language: "python",
  topic: "python/tema-7",
  title: "Reto final – Analizar frase",
  statement: "Limpia una frase, pásala a minúsculas, cuenta vocales y cuenta palabras con una solución más completa.",
  difficulty: "Media",
  estimatedTime: "12-15 min",
  skill: "Integrador",
  type: "Reto final",
  starterCode:
`# RETO FINAL: Analizar frase

frase = "   Python Es Muy Util Para Texto   "

# 1. Limpia espacios laterales
# 2. Pasa todo a minúsculas
# 3. Cuenta cuántas vocales hay
# 4. Cuenta cuántas palabras hay
# 5. Imprime la frase final limpia, el número de vocales y el número de palabras
`,
  hints: [
    "Empieza limpiando y normalizando el texto",
    "Para vocales, recorre carácter a carácter",
    "Para palabras, usa split()",
  ],
};