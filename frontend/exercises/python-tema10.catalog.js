window.EXERCISE_CATALOG["py_tema10_ej1"] = {
  id: "py_tema10_ej1",
  language: "python",
  topic: "python/tema-10",
  title: "Ejercicio 1 – Conversión segura",
  statement: "Pide un número y controla el caso inválido con try / except.",
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
  statement: "Lanza una excepción si la nota está fuera de rango.",
  starterCode:
`# EJERCICIO: Validación con raise

nota = 12

# Si nota es menor que 0 o mayor que 10
# lanza un ValueError con un mensaje claro
`,
  hints: [
    "Usa raise ValueError(...)",
    "Piensa en la condición nota < 0 or nota > 10",
    "El mensaje debe explicar el problema",
  ],
};

window.EXERCISE_CATALOG["py_tema10_reto1"] = {
  id: "py_tema10_reto1",
  language: "python",
  topic: "python/tema-10",
  title: "Reto final – Validar entrada numérica",
  statement: "Pide un número al usuario, conviértelo de forma segura y lanza un error si está fuera de un rango permitido.",
  starterCode:
`# RETO FINAL: Validar entrada numérica

texto = input("Escribe una edad: ")

# 1. Intenta convertir la entrada a entero
# 2. Si falla, muestra un mensaje
# 3. Si la edad es menor que 0 o mayor que 120,
#    lanza un ValueError
# 4. Si todo es correcto, imprime la edad validada
`,
  hints: [
    "Combina try / except con raise",
    "Primero convierte, luego valida el rango",
    "Piensa bien qué parte puede fallar por conversión y qué parte por validación",
  ],
};
