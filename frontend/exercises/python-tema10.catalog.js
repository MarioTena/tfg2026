window.EXERCISE_CATALOG = window.EXERCISE_CATALOG || {};

window.EXERCISE_CATALOG["py_tema10_ej1"] = {
  id: "py_tema10_ej1",
  language: "python",
  topic: "python/tema-10",
  title: "Ejercicio 1 – Conversión segura",
  statement: "Pide un número y controla el caso inválido con try / except.",
  difficulty: "Fácil",
  estimatedTime: "6 min",
  skill: "ValueError",
  type: "Ejercicio",
  starterCode:
`texto = input("Escribe un número: ")

# Intenta convertir la entrada a número
# y controla el caso en que no sea válida
`,
  hints: [
    "La conversión puede fallar si el texto no tiene formato numérico.",
    "Debes separar el intento principal de la reacción al error.",
    "El programa no debería romperse con una entrada inválida."
  ],
  expectedOutput: "Debe pedir un número, intentar convertirlo y mostrar un mensaje claro si la entrada no es válida.",
  checks: [
    "Debe pedir un dato al usuario.",
    "Debe intentar convertir el texto a número.",
    "Debe capturar el error de conversión adecuado.",
    "Debe mostrar un mensaje útil si la conversión falla.",
    "No debe romperse ante una entrada no numérica."
  ]
};

window.EXERCISE_CATALOG["py_tema10_ej2"] = {
  id: "py_tema10_ej2",
  language: "python",
  topic: "python/tema-10",
  title: "Ejercicio 2 – División segura",
  statement: "Captura el error de división por cero.",
  difficulty: "Fácil",
  estimatedTime: "6 min",
  skill: "ZeroDivisionError",
  type: "Ejercicio",
  starterCode:
`a = 10
b = 0

# Intenta dividir a entre b
# y controla el caso en que la división no sea posible
`,
  hints: [
    "Hay un caso concreto en el que una división no puede hacerse.",
    "Debes anticipar ese fallo durante la ejecución.",
    "La salida debe explicar el problema sin cortar el programa."
  ],
  expectedOutput: "Debe controlar una división entre cero sin que el programa se rompa.",
  checks: [
    "Debe intentar realizar una división.",
    "Debe capturar el error concreto de división por cero.",
    "Debe mostrar un mensaje claro si ocurre el error.",
    "No debe dejar que el programa termine con una excepción sin controlar."
  ]
};

window.EXERCISE_CATALOG["py_tema10_ej3"] = {
  id: "py_tema10_ej3",
  language: "python",
  topic: "python/tema-10",
  title: "Ejercicio 3 – Archivo ausente",
  statement: "Intenta leer un archivo y controla FileNotFoundError.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Excepciones",
  type: "Ejercicio",
  starterCode:
`# Intenta leer un archivo llamado datos.txt
# y controla el caso en que no exista
`,
  hints: [
    "El fallo posible está relacionado con el entorno, no con una operación matemática.",
    "Debes intentar abrir el archivo para lectura.",
    "Si el archivo no está, el usuario debería recibir un mensaje comprensible."
  ],
  expectedOutput: "Debe intentar leer datos.txt y mostrar un mensaje claro si el archivo no existe.",
  checks: [
    "Debe intentar abrir datos.txt en modo lectura.",
    "Debe capturar el error de archivo no encontrado.",
    "Debe mostrar un mensaje útil.",
    "No debe romperse si el archivo no existe."
  ]
};

window.EXERCISE_CATALOG["py_tema10_ej4"] = {
  id: "py_tema10_ej4",
  language: "python",
  topic: "python/tema-10",
  title: "Ejercicio 4 – else y finally",
  statement: "Haz un ejemplo donde se vean ambos bloques en acción.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Flujo",
  type: "Ejercicio",
  starterCode:
`# Crea un ejemplo con:
# intento principal
# reacción si hay error
# acción si todo sale bien
# y acción final que ocurra siempre
`,
  hints: [
    "Necesitas distinguir error, éxito y cierre.",
    "El bloque de éxito solo debe ejecutarse si no hubo excepción.",
    "El cierre debe ejecutarse pase lo que pase."
  ],
  expectedOutput: "Debe mostrar un ejemplo donde se diferencie el flujo de error, éxito y cierre.",
  checks: [
    "Debe usar try.",
    "Debe usar except.",
    "Debe usar else para el caso sin error.",
    "Debe usar finally para el cierre.",
    "Debe mostrar claramente qué bloque se ejecuta en cada caso."
  ]
};

window.EXERCISE_CATALOG["py_tema10_ej5"] = {
  id: "py_tema10_ej5",
  language: "python",
  topic: "python/tema-10",
  title: "Ejercicio 5 – Validación con raise",
  statement: "Lanza una excepción si la nota está fuera de rango y usa un mensaje claro.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "raise",
  type: "Ejercicio",
  starterCode:
`nota = 12

# Valida la nota
# y frena el programa si no cumple el rango esperado
`,
  hints: [
    "Aquí el dato existe, pero puede incumplir una regla.",
    "No se trata solo de imprimir un aviso.",
    "El mensaje debe explicar qué regla se ha roto."
  ],
  expectedOutput: "Debe lanzar una excepción clara si la nota está fuera del rango permitido.",
  checks: [
    "Debe comprobar si la nota está dentro del rango válido.",
    "Debe detectar una nota fuera de rango.",
    "Debe lanzar una excepción adecuada.",
    "Debe incluir un mensaje útil.",
    "No debe aceptar como válida una nota incorrecta."
  ]
};

window.EXERCISE_CATALOG["py_tema10_ej6"] = {
  id: "py_tema10_ej6",
  language: "python",
  topic: "python/tema-10",
  title: "Ejercicio 6 – Capturar error concreto",
  statement: "Reescribe este bloque para capturar la excepción correcta de forma más precisa.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Precisión",
  type: "Ejercicio",
  starterCode:
`texto = "hola"

try:
    numero = int(texto)
except:
    print("Error")

# Reescribe el bloque para capturar solo el error esperado
`,
  hints: [
    "El problema no es que pueda fallar cualquier cosa.",
    "Piensa qué operación concreta puede fallar.",
    "Capturar de forma precisa hace el código más claro."
  ],
  expectedOutput: "Debe capturar de forma específica el error producido por una conversión inválida.",
  checks: [
    "Debe mantener el intento de conversión.",
    "Debe evitar un except genérico.",
    "Debe capturar la excepción adecuada.",
    "Debe mostrar un mensaje si la conversión falla."
  ]
};

window.EXERCISE_CATALOG["py_tema10_ej7"] = {
  id: "py_tema10_ej7",
  language: "python",
  topic: "python/tema-10",
  title: "Ejercicio 7 – Qué poner en el try",
  statement: "Reescribe un bloque donde el try contiene más código del necesario para dejar más claro qué parte puede fallar.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Diseño",
  type: "Ejercicio",
  starterCode:
`texto = input("Escribe un número: ")

try:
    numero = int(texto)
    print("Número:", numero)
    print("El doble es:", numero * 2)
except ValueError:
    print("Entrada inválida")

# Reescribe este ejemplo para que el try
# contenga solo lo necesario
`,
  hints: [
    "No todo el código depende del fallo de conversión.",
    "El bloque de intento debería centrarse en la operación que puede fallar.",
    "Después del intento puedes continuar el flujo de forma más clara."
  ],
  expectedOutput: "Debe reorganizar el código para que el bloque try contenga solo la operación que puede fallar.",
  checks: [
    "Debe identificar qué línea puede lanzar la excepción.",
    "Debe reducir el contenido del try.",
    "Debe mantener la captura del error de conversión.",
    "Debe conservar la funcionalidad del programa.",
    "Debe mejorar la claridad del flujo."
  ]
};

window.EXERCISE_CATALOG["py_tema10_ej8"] = {
  id: "py_tema10_ej8",
  language: "python",
  topic: "python/tema-10",
  title: "Ejercicio 8 – Mensaje útil",
  statement: "Mejora un mensaje de error para que ayude más al usuario a entender qué ha pasado.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Claridad",
  type: "Ejercicio",
  starterCode:
`texto = "abc"

try:
    numero = int(texto)
except ValueError:
    print("Error")

# Mejora el mensaje para que sea más útil y claro
`,
  hints: [
    "Un mensaje útil explica algo más que la palabra error.",
    "Piensa qué necesita saber el usuario para corregir la entrada.",
    "La lógica puede ser correcta aunque la comunicación sea pobre."
  ],
  expectedOutput: "Debe mostrar un mensaje de error más claro cuando la conversión no sea posible.",
  checks: [
    "Debe mantener la captura de ValueError.",
    "Debe mejorar el mensaje mostrado.",
    "El mensaje debe explicar el problema.",
    "No debe limitarse a una palabra genérica como Error."
  ]
};

window.EXERCISE_CATALOG["py_tema10_ej9"] = {
  id: "py_tema10_ej9",
  language: "python",
  topic: "python/tema-10",
  title: "Ejercicio 9 – Prevenir o capturar",
  statement: "Decide si un caso conviene resolverlo con una condición previa o con una excepción.",
  difficulty: "Media",
  estimatedTime: "9 min",
  skill: "Criterio",
  type: "Ejercicio",
  starterCode:
`# Escribe en comentarios:
# 1. si una edad negativa conviene prevenirla con una validación
# 2. si una conversión de texto a entero conviene capturarla
# 3. por qué no son exactamente el mismo tipo de problema
`,
  hints: [
    "Una regla inválida y una excepción de ejecución no son lo mismo.",
    "Piensa si el problema se puede comprobar antes de que falle.",
    "Aquí importa más el criterio que escribir mucho código."
  ],
  expectedOutput: "Debe explicar cuándo conviene prevenir con validación y cuándo capturar una excepción.",
  checks: [
    "Debe analizar el caso de una edad negativa.",
    "Debe analizar el caso de una conversión de texto.",
    "Debe diferenciar regla de negocio y fallo de ejecución.",
    "Debe justificar el enfoque elegido."
  ]
};

window.EXERCISE_CATALOG["py_tema10_ej10"] = {
  id: "py_tema10_ej10",
  language: "python",
  topic: "python/tema-10",
  title: "Ejercicio 10 – Varias excepciones",
  statement: "Captura dos tipos de fallo distintos en un mismo bloque de código.",
  difficulty: "Media",
  estimatedTime: "9 min",
  skill: "Múltiples casos",
  type: "Ejercicio",
  starterCode:
`try:
    texto = "abc"
    numero = int(texto)
    print(10 / numero)
except ValueError:
    print("No era un número válido")
except ZeroDivisionError:
    print("No se puede dividir entre cero")

# Lee el flujo y comprueba qué excepción aparece primero
`,
  hints: [
    "Hay más de un fallo posible, pero no todos ocurren a la vez.",
    "El orden de ejecución determina qué excepción aparece primero.",
    "Cada excepción debe tener una respuesta específica."
  ],
  expectedOutput: "Debe capturar errores distintos con bloques específicos y permitir razonar cuál ocurre primero.",
  checks: [
    "Debe incluir más de un except específico.",
    "Debe diferenciar conversión inválida y división por cero.",
    "Debe mostrar mensajes distintos según el error.",
    "Debe respetar el flujo real de ejecución."
  ]
};

window.EXERCISE_CATALOG["py_tema10_ej11"] = {
  id: "py_tema10_ej11",
  language: "python",
  topic: "python/tema-10",
  title: "Ejercicio 11 – Función con validación",
  statement: "Crea una función que valide un dato antes de calcular algo con él.",
  difficulty: "Media",
  estimatedTime: "9 min",
  skill: "Funciones",
  type: "Ejercicio",
  starterCode:
`# Crea una función que reciba un precio.
# Si el precio no es válido, debe lanzar una excepción.
# Si es válido, debe devolver el precio con IVA.
`,
  hints: [
    "Primero debes comprobar si el dato cumple la regla.",
    "Solo tiene sentido calcular si el dato es válido.",
    "La función debe comunicar claramente el caso inválido."
  ],
  expectedOutput: "Debe crear una función que valide un precio y devuelva el precio con IVA si es válido.",
  checks: [
    "Debe definir una función.",
    "Debe recibir un precio como parámetro.",
    "Debe validar que el precio sea válido.",
    "Debe lanzar una excepción si no lo es.",
    "Debe devolver el precio calculado si todo es correcto."
  ]
};

window.EXERCISE_CATALOG["py_tema10_ej12"] = {
  id: "py_tema10_ej12",
  language: "python",
  topic: "python/tema-10",
  title: "Ejercicio 12 – Flujo completo",
  statement: "Explica con comentarios qué partes de un ejemplo irían en try, except, else y finally.",
  difficulty: "Media",
  estimatedTime: "9 min",
  skill: "Flujo completo",
  type: "Ejercicio",
  starterCode:
`# Caso:
# pedir un número, convertirlo,
# mostrarlo si todo va bien
# y enseñar un mensaje final pase lo que pase.

# Explica qué pondrías en:
# try
# except
# else
# finally
`,
  hints: [
    "Piensa en recorrido normal, recorrido de error y cierre.",
    "El bloque de éxito y el bloque final no cumplen la misma función.",
    "La explicación debe dejar claro el papel de cada parte."
  ],
  expectedOutput: "Debe explicar correctamente qué responsabilidad tendría try, except, else y finally en el caso planteado.",
  checks: [
    "Debe explicar qué iría dentro de try.",
    "Debe explicar qué iría dentro de except.",
    "Debe explicar qué iría dentro de else.",
    "Debe explicar qué iría dentro de finally.",
    "Debe diferenciar éxito, error y cierre."
  ]
};

window.EXERCISE_CATALOG["py_tema10_reto1"] = {
  id: "py_tema10_reto1",
  language: "python",
  topic: "python/tema-10",
  title: "Mini reto – Conversión y rango",
  statement: "Convierte una entrada de texto, captura el fallo de conversión y después valida el rango con raise.",
  difficulty: "Reto",
  estimatedTime: "10 min",
  skill: "Combinado",
  type: "Reto",
  starterCode:
`texto = input("Escribe una edad: ")

# Convierte la entrada, controla el fallo de conversión
# y valida que la edad esté dentro de un rango razonable
`,
  hints: [
    "Combinas una excepción de conversión con una regla propia.",
    "Primero debes obtener un número válido.",
    "Después debes comprobar si ese número cumple el rango esperado."
  ],
  expectedOutput: "Debe convertir una edad, capturar una conversión inválida y lanzar una excepción si la edad está fuera de rango.",
  checks: [
    "Debe pedir una edad al usuario.",
    "Debe intentar convertir la entrada a número.",
    "Debe capturar el fallo de conversión.",
    "Debe validar el rango de edad.",
    "Debe lanzar una excepción si la edad no es válida.",
    "Debe mostrar la edad si todo es correcto."
  ]
};

window.EXERCISE_CATALOG["py_tema10_reto2"] = {
  id: "py_tema10_reto2",
  language: "python",
  topic: "python/tema-10",
  title: "Reto final – Validación robusta completa",
  statement: "Pide un dato al usuario, conviértelo, valida sus reglas, distingue éxito y error y deja un cierre final claro.",
  difficulty: "Reto final",
  estimatedTime: "12-15 min",
  skill: "Integración",
  type: "Reto final",
  starterCode:
`texto = input("Escribe una nota: ")

# Convierte la entrada, valida la nota,
# distingue el caso correcto del caso de error
# y muestra un mensaje final siempre
`,
  hints: [
    "Aquí combinas conversión, validación, éxito y cierre.",
    "Primero piensa qué puede fallar técnicamente.",
    "Después piensa qué regla debe cumplir el dato convertido."
  ],
  expectedOutput: "Debe pedir una nota, convertirla, validar su rango, distinguir éxito y error y mostrar un cierre final.",
  checks: [
    "Debe pedir una nota al usuario.",
    "Debe intentar convertir la entrada a número.",
    "Debe capturar una conversión inválida.",
    "Debe validar que la nota esté en un rango permitido.",
    "Debe lanzar una excepción o controlar el caso inválido.",
    "Debe usar un flujo de éxito claro.",
    "Debe mostrar un mensaje final siempre."
  ]
};