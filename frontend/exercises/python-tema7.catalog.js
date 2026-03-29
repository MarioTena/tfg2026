window.EXERCISE_CATALOG["py_tema7_ej1"] = {
  id: "py_tema7_ej1",
  language: "python",
  topic: "python/tema-7",
  title: "Ejercicio 1 – Primera y última letra",
  statement: "Muestra la primera y la última letra de una palabra.",
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
  statement: "Convierte un texto a minúsculas.",
  starterCode:
`# EJERCICIO: Pasar a minúsculas

texto = "HoLa"

# Convierte el texto a minúsculas
# e imprímelo
`,
  hints: [
    "Usa lower()",
    "Recuerda que devuelve un string nuevo",
    "Puedes imprimir directamente el resultado",
  ],
};

window.EXERCISE_CATALOG["py_tema7_ej5"] = {
  id: "py_tema7_ej5",
  language: "python",
  topic: "python/tema-7",
  title: "Ejercicio 5 – Limpiar espacios",
  statement: "Elimina espacios al principio y al final de un texto.",
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
  statement: "Cuenta cuántas veces aparece una letra en un texto.",
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
  starterCode:
`# EJERCICIO: Separar palabras

frase = "Python es muy util"

# Usa split() para convertir
# la frase en una lista de palabras
`,
  hints: [
    "split() separa por espacios si no le pasas nada",
    "El resultado es una lista",
    "Imprime el resultado para verlo",
  ],
};

window.EXERCISE_CATALOG["py_tema7_reto1"] = {
  id: "py_tema7_reto1",
  language: "python",
  topic: "python/tema-7",
  title: "Reto final – Analizar frase",
  statement: "Limpia una frase, pásala a minúsculas, cuenta vocales y cuenta palabras.",
  starterCode:
`# RETO FINAL: Analizar frase

frase = "   Python es MUY util   "

# 1. Limpia espacios laterales
# 2. Pasa la frase a minúsculas
# 3. Cuenta cuántas vocales hay
# 4. Cuenta cuántas palabras hay
`,
  hints: [
    "Puedes empezar con strip() y lower()",
    "Para contar vocales recorre la frase carácter a carácter",
    "Para contar palabras usa split() y len()",
  ],
};
