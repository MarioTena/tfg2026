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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Conversión segura

texto = input("Escribe un número: ")

# Intenta convertir texto a entero
# Si falla, muestra un mensaje de error
`,
  hints: [
    "Usa try y except ValueError",
    "La conversión puede hacerse con int(texto)",
    "Muestra un mensaje claro si falla",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: División segura

a = 10
b = 0

# Intenta dividir a entre b
# Si ocurre división por cero,
# muestra un mensaje
`,
  hints: [
    "Usa try / except ZeroDivisionError",
    "La operación es a / b",
    "No dejes que el programa se rompa",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Archivo ausente

# Intenta abrir un archivo llamado datos.txt
# en modo lectura
# Si no existe, muestra un mensaje
`,
  hints: [
    "Usa with open(..., \"r\")",
    "Captura FileNotFoundError",
    "Piensa en un mensaje útil para el usuario",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: else y finally

# Crea un bloque try / except / else / finally
# donde una conversión correcta ejecute else
# y finally se ejecute siempre
`,
  hints: [
    "Prueba con int(\"7\") para que no falle",
    "Else se ejecuta si no hay excepción",
    "Finally se ejecuta siempre",
  ],
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
  type: "Práctica guiada",
  starterCode:
`nota = 12

# Si la nota no está entre 0 y 10
# lanza una excepción adecuada con un mensaje útil
`,
  hints: [
    "Aquí no basta con imprimir un error",
    "Piensa qué tipo de excepción representa mejor una validación incorrecta"
  ],
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
  type: "Práctica guiada",
  starterCode:
`texto = "hola"

try:
    numero = int(texto)
except:
    print("Error")

# Reescribe el bloque para capturar
# la excepción adecuada
`,
  hints: [
    "Aquí el problema no es que falle cualquier cosa",
    "Piensa qué error concreto produce int(texto)"
  ],
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
  type: "Práctica guiada",
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
    "No todo lo que viene después de una conversión tiene por qué estar dentro del try",
    "Piensa qué línea es la que realmente puede lanzar esa excepción"
  ],
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
  type: "Práctica guiada",
  starterCode:
`texto = "abc"

try:
    numero = int(texto)
except ValueError:
    print("Error")

# Mejora el mensaje para que sea más útil y claro
`,
  hints: [
    "Un buen mensaje no solo dice que hay error",
    "Piensa qué le conviene saber al usuario para corregir la entrada"
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Prevenir o capturar

# Escribe en comentarios:
# 1. si una edad negativa conviene prevenirla con if o capturarla
# 2. si una conversión de texto a entero conviene capturarla
# 3. por qué no son exactamente el mismo tipo de problema
`,
  hints: [
    "Una cosa es una regla inválida y otra una excepción de ejecución",
    "Piensa en prevenir, capturar y lanzar",
    "Aquí importa mucho el criterio",
  ],
};

window.EXERCISE_CATALOG["py_tema10_ej10"] = {
  id: "py_tema10_ej10",
  language: "python",
  topic: "python/tema-10",
  title: "Ejercicio 10 – Varias excepciones",
  statement: "Captura dos tipos de fallo distintos en un mismo bloque de código.",
  difficulty: "Media",
  estimatedTime: "9 min",
  skill: "Multiples casos",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Varias excepciones

try:
    texto = "abc"
    numero = int(texto)
    print(10 / numero)
except ValueError:
    print("No era un número válido")
except ZeroDivisionError:
    print("No se puede dividir entre cero")
`,
  hints: [
    "Aquí ya tienes dos fallos posibles distintos",
    "Piensa qué ocurre primero",
    "Lee bien el flujo antes de ejecutar",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Función con validación

# Crea una función que reciba un precio
# y lance un ValueError si el precio es negativo.
# Si el precio es válido, devuelve el precio con IVA del 21%.
`,
  hints: [
    "Primero valida, luego calcula",
    "Usa raise ValueError(...)",
    "Piensa en una función más segura",
  ],
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
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Flujo completo

# Escribe en comentarios:
# 1. qué pondrías dentro de try
# 2. qué pondrías dentro de except
# 3. qué pondrías dentro de else
# 4. qué pondrías dentro de finally
#
# Caso: pedir un número, convertirlo, mostrarlo si todo va bien
# y enseñar un mensaje final pase lo que pase
`,
  hints: [
    "Piensa en recorrido normal, recorrido de error y cierre",
    "Else y finally no hacen lo mismo",
    "Aquí importa ordenar bien las ideas",
  ],
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
`# MINI RETO: Conversión y rango

texto = input("Escribe una edad: ")

# 1. Intenta convertir la entrada a entero
# 2. Si falla, muestra un mensaje
# 3. Si la edad es menor que 0 o mayor que 120,
#    lanza un ValueError
# 4. Si todo va bien, imprime la edad validada
`,
  hints: [
    "Combina try / except con raise",
    "Primero convierte, luego valida el rango",
    "Piensa qué parte puede fallar por conversión y qué parte por validación",
  ],
};

window.EXERCISE_CATALOG["py_tema10_reto2"] = {
  id: "py_tema10_reto2",
  language: "python",
  topic: "python/tema-10",
  title: "Reto final – Validación robusta completa",
  statement: "Pide un dato al usuario, conviértelo, valida sus reglas, distingue éxito y error y deja un cierre final claro.",
  difficulty: "Reto final",
  estimatedTime: "12-15 min",
  skill: "Integrador",
  type: "Reto final",
  starterCode:
`# RETO FINAL: Validación robusta completa

texto = input("Escribe una nota: ")

# 1. Intenta convertir la entrada a entero
# 2. Si falla, muestra un mensaje adecuado
# 3. Si la nota es menor que 0 o mayor que 10,
#    lanza un ValueError con un mensaje claro
# 4. Si todo es correcto, usa else para mostrar la nota validada
# 5. Usa finally para mostrar un mensaje final que aparezca siempre
`,
  hints: [
    "Aquí combinas try / except, raise, else y finally",
    "Primero piensa qué puede fallar y qué regla se incumple",
    "Distingue bien conversión inválida y validación de rango",
  ],
};