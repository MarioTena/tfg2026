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
  type: "Ejercicio",
  starterCode:
`palabra = "python"

# Muestra la primera y la última letra
`,
  hints: [
    "Necesitas acceder a posiciones concretas del texto.",
    "La primera letra está al inicio de la palabra.",
    "Para la última, piensa en una forma cómoda de acceder desde el final."
  ],
  expectedOutput: "Debe mostrar la primera y la última letra de la palabra.",
  checks: [
    "Debe usar la variable palabra.",
    "Debe acceder a la primera letra.",
    "Debe acceder a la última letra.",
    "Debe mostrar ambos resultados por pantalla."
  ]
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
  type: "Ejercicio",
  starterCode:
`texto = "programa"

# Extrae las tres primeras letras
# y muestra el resultado
`,
  hints: [
    "Necesitas obtener solo una parte del texto.",
    "El fragmento empieza al principio.",
    "Recuerda que el límite final del corte no se incluye."
  ],
  expectedOutput: "Debe mostrar las tres primeras letras del texto.",
  checks: [
    "Debe usar slicing.",
    "Debe partir del texto dado.",
    "Debe obtener solo las tres primeras letras.",
    "Debe mostrar el resultado."
  ]
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
  type: "Ejercicio",
  starterCode:
`texto = "python"

# Muestra el texto al revés usando slicing
`,
  hints: [
    "Necesitas recorrer el texto en sentido inverso.",
    "Piensa en el papel del paso dentro de un slicing.",
    "No necesitas construir el texto manualmente con un bucle."
  ],
  expectedOutput: "Debe mostrar el texto invertido.",
  checks: [
    "Debe usar slicing.",
    "Debe invertir el texto original.",
    "Debe mostrar el resultado por pantalla.",
    "No debe cambiar el contenido original de forma innecesaria."
  ]
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
  type: "Ejercicio",
  starterCode:
`texto = "HoLa"

# Convierte el texto a minúsculas
# guarda el resultado y muéstralo
`,
  hints: [
    "Debes aplicar una transformación al texto.",
    "Recuerda que los strings no cambian por sí solos.",
    "El resultado transformado debe ser el que se muestre."
  ],
  expectedOutput: "Debe mostrar el texto convertido a minúsculas.",
  checks: [
    "Debe usar el texto dado.",
    "Debe convertirlo a minúsculas.",
    "Debe guardar o usar el resultado transformado.",
    "Debe mostrar el texto final en minúsculas."
  ]
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
  type: "Ejercicio",
  starterCode:
`texto = "   hola   "

# Elimina los espacios laterales
# y muestra el resultado
`,
  hints: [
    "El problema está en los espacios de los extremos.",
    "No necesitas eliminar espacios internos.",
    "Comprueba que la salida no conserva espacios al principio ni al final."
  ],
  expectedOutput: "Debe mostrar el texto sin espacios al principio ni al final.",
  checks: [
    "Debe usar el texto dado.",
    "Debe limpiar espacios laterales.",
    "Debe mostrar el resultado limpio.",
    "No debe eliminar contenido real del texto."
  ]
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
  type: "Ejercicio",
  starterCode:
`texto = "banana"
contador = 0

# Recorre el texto
# y cuenta cuántas veces aparece la letra indicada

print(contador)
`,
  hints: [
    "Debes revisar el texto carácter a carácter.",
    "Solo algunas letras deben aumentar el contador.",
    "El resultado final debe ser el número de apariciones."
  ],
  expectedOutput: "Debe mostrar cuántas veces aparece la letra a en el texto.",
  checks: [
    "Debe recorrer el texto.",
    "Debe comparar cada carácter con la letra buscada.",
    "Debe usar un contador.",
    "Debe mostrar el total final."
  ]
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
  type: "Ejercicio",
  starterCode:
`frase = "Python es muy util"

# Convierte la frase en una lista de palabras
# y muestra el resultado
`,
  hints: [
    "Debes pasar de un texto completo a varias partes.",
    "Las palabras están separadas por espacios.",
    "El resultado ya no debería ser un string único."
  ],
  expectedOutput: "Debe mostrar una lista con las palabras de la frase.",
  checks: [
    "Debe usar la frase dada.",
    "Debe separar la frase en palabras.",
    "Debe obtener una lista.",
    "Debe mostrar la lista resultante."
  ]
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
  type: "Ejercicio",
  starterCode:
`palabras = ["Hola", "mundo", "desde", "Python"]

# Construye una frase con espacios entre palabras
# y muéstrala
`,
  hints: [
    "Debes pasar de una lista de palabras a un único texto.",
    "Entre palabra y palabra debe quedar un espacio.",
    "No conviene unirlo todo manualmente palabra por palabra."
  ],
  expectedOutput: "Debe mostrar una frase construida a partir de la lista de palabras.",
  checks: [
    "Debe usar la lista dada.",
    "Debe unir las palabras en un string.",
    "Debe incluir espacios entre palabras.",
    "Debe mostrar la frase final."
  ]
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
  type: "Ejercicio",
  starterCode:
`texto = "programacion"
posicion = texto.find("xyz")

# Muestra la posición
# y detecta correctamente si la subcadena no aparece
`,
  hints: [
    "Primero guarda el resultado de la búsqueda.",
    "Debes distinguir entre encontrado y no encontrado.",
    "Piensa qué valor especial indica que no hubo coincidencia."
  ],
  expectedOutput: "Debe mostrar la posición obtenida y detectar correctamente que la subcadena no aparece.",
  checks: [
    "Debe usar el texto dado.",
    "Debe buscar una subcadena.",
    "Debe manejar el caso no encontrado.",
    "Debe mostrar un resultado claro."
  ]
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
  type: "Ejercicio",
  starterCode:
`archivo = "informe.csv"

# Escribe una comprobación útil para validar este texto
`,
  hints: [
    "Piensa qué característica del nombre del archivo quieres validar.",
    "En este caso puede interesar revisar cómo termina el texto.",
    "La validación debe producir un resultado claro."
  ],
  expectedOutput: "Debe validar el texto del archivo comprobando una condición de inicio o final.",
  checks: [
    "Debe usar la variable archivo.",
    "Debe comprobar una condición sobre el texto.",
    "Debe producir un resultado booleano o un mensaje claro.",
    "La comprobación debe estar relacionada con el nombre o extensión."
  ]
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
  type: "Ejercicio",
  starterCode:
`texto = "HOLA"
texto.lower()
print(texto)
`,
  hints: [
    "El método devuelve un texto nuevo.",
    "El texto original no cambia por sí solo.",
    "Debes usar el resultado de la transformación."
  ],
  expectedOutput: "Debe mostrar el texto transformado a minúsculas.",
  checks: [
    "Debe corregir el uso del método.",
    "Debe aprovechar el valor devuelto.",
    "Debe mostrar el texto en minúsculas.",
    "Debe reflejar la idea de que los strings son inmutables."
  ]
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
  type: "Ejercicio",
  starterCode:
`frase = "Python es muy util"

# Cuenta cuántas palabras tiene la frase
# y muestra el resultado
`,
  hints: [
    "Primero necesitas separar el texto en partes.",
    "Después debes analizar cuántos elementos has obtenido.",
    "El resultado final debe ser un número."
  ],
  expectedOutput: "Debe mostrar cuántas palabras tiene la frase.",
  checks: [
    "Debe usar la frase dada.",
    "Debe separar la frase en palabras.",
    "Debe contar las palabras.",
    "Debe mostrar el resultado final."
  ]
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
`nombre = "   ANA   "

# Limpia y normaliza el nombre
# antes de mostrarlo
`,
  hints: [
    "Primero elimina lo que sobra en los extremos.",
    "Después unifica el formato del texto.",
    "Recuerda usar el resultado transformado."
  ],
  expectedOutput: "Debe mostrar el nombre limpio y normalizado.",
  checks: [
    "Debe usar la variable nombre.",
    "Debe eliminar espacios laterales.",
    "Debe normalizar mayúsculas y minúsculas.",
    "Debe mostrar el resultado final."
  ]
};

window.EXERCISE_CATALOG["py_tema7_reto2"] = {
  id: "py_tema7_reto2",
  language: "python",
  topic: "python/tema-7",
  title: "Reto final – Analizar frase",
  statement: "Limpia una frase, pásala a minúsculas, cuenta vocales y cuenta palabras con una solución más completa.",
  difficulty: "Media",
  estimatedTime: "12-15 min",
  skill: "Integración",
  type: "Reto final",
  starterCode:
`frase = "   Python Es Muy Util Para Texto   "

# Limpia y normaliza la frase
# cuenta vocales
# cuenta palabras
# y muestra un resumen final
`,
  hints: [
    "Empieza preparando el texto antes de analizarlo.",
    "Para contar vocales, tendrás que revisar caracteres.",
    "Para contar palabras, primero necesitas separar la frase."
  ],
  expectedOutput: "Debe mostrar la frase limpia y normalizada, el número de vocales y el número de palabras.",
  checks: [
    "Debe limpiar espacios laterales.",
    "Debe pasar la frase a minúsculas.",
    "Debe contar vocales.",
    "Debe contar palabras.",
    "Debe mostrar un resumen final claro."
  ]
};