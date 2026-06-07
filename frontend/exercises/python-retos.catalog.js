window.EXERCISE_CATALOG = window.EXERCISE_CATALOG || {};

window.EXERCISE_CATALOG["py_reto_acumulativo_1_numeros"] = {
  id: "py_reto_acumulativo_1_numeros",
  language: "python",
  topic: "python/retos",
  title: "Reto acumulativo 1 · Análisis de números",
  statement:
    "Pide números al usuario uno por uno hasta que escriba 'fin'. Guarda los números en una lista y al terminar muestra cuántos ha introducido, cuántos son pares, cuántos son impares, cuál es el mayor y cuál es el menor.",
  type: "Reto acumulativo",
  difficulty: "Media",
  estimatedTime: "20-30 min",
  skill: "Integración de entrada, listas y análisis",
  hints: [
    "Necesitas mantener la entrada activa hasta que aparezca una palabra de salida.",
    "Guarda solo los datos que realmente sean números válidos para el análisis.",
    "No conviertas la entrada antes de comprobar si es la señal de finalización.",
    "Al terminar, analiza la lista acumulada.",
    "Controla el caso en que no se haya introducido ningún número."
  ],
  expectedOutput: "Debe pedir números hasta escribir fin y mostrar un resumen con cantidad total, pares, impares, mayor y menor.",
  checks: [
    "Debe pedir números repetidamente.",
    "Debe terminar cuando el usuario escriba fin.",
    "Debe guardar los números en una lista.",
    "Debe contar cuántos números se han introducido.",
    "Debe contar pares e impares.",
    "Debe calcular el mayor y el menor.",
    "Debe controlar el caso de lista vacía.",
    "Debe mostrar un resumen final claro."
  ],
  starterCode:
`numeros = []

# Pide números hasta que el usuario escriba "fin".
# Guarda los números válidos.
# Al terminar, muestra un resumen con:
# cantidad total, pares, impares, mayor y menor.
`
};

window.EXERCISE_CATALOG["py_reto_acumulativo_2_palabras"] = {
  id: "py_reto_acumulativo_2_palabras",
  language: "python",
  topic: "python/retos",
  title: "Reto acumulativo 4 · Análisis de palabras",
  statement:
    "Pide palabras al usuario hasta que escriba 'salir'. Guárdalas en una lista y al terminar muestra cuántas ha introducido, cuál es la más larga, cuántas empiezan por vocal y cuántas están repetidas.",
  type: "Reto acumulativo",
  difficulty: "Media",
  estimatedTime: "20-30 min",
  skill: "Integración de strings, listas y funciones",
  hints: [
    "Necesitas acumular palabras hasta que aparezca la señal de salida.",
    "Antes de analizar, comprueba que haya palabras guardadas.",
    "Para la palabra más larga, compara tamaños.",
    "Para las vocales, revisa la primera letra con cuidado.",
    "Para las repetidas, piensa cuántas veces aparece cada palabra."
  ],
  expectedOutput: "Debe pedir palabras hasta escribir salir y mostrar cantidad total, palabra más larga, palabras que empiezan por vocal y palabras repetidas.",
  checks: [
    "Debe pedir palabras repetidamente.",
    "Debe terminar cuando el usuario escriba salir.",
    "Debe guardar las palabras en una lista.",
    "Debe contar cuántas palabras se han introducido.",
    "Debe encontrar la palabra más larga.",
    "Debe contar palabras que empiezan por vocal.",
    "Debe detectar palabras repetidas.",
    "Debe controlar el caso de lista vacía."
  ],
  starterCode:
`palabras = []

# Pide palabras hasta que el usuario escriba "salir".
# Guarda las palabras introducidas.
# Al terminar, muestra:
# cantidad total, palabra más larga,
# palabras que empiezan por vocal y repetidas.
`
};

window.EXERCISE_CATALOG["py_reto_acumulativo_3_notas"] = {
  id: "py_reto_acumulativo_3_notas",
  language: "python",
  topic: "python/retos",
  title: "Reto acumulativo 2 · Estadísticas de notas",
  statement:
    "Pide notas al usuario hasta que escriba 'fin'. Valida que cada nota esté entre 0 y 10, guárdala en una lista y al terminar muestra cuántas notas hay, la media, la más alta, la más baja, aprobados y suspensos.",
  type: "Reto acumulativo",
  difficulty: "Media",
  estimatedTime: "20-30 min",
  skill: "Integración de validación y análisis numérico",
  hints: [
    "La entrada termina con una palabra concreta.",
    "Cada nota debe convertirse y validarse antes de guardarse.",
    "No todas las entradas numéricas tienen por qué ser válidas.",
    "Antes de calcular estadísticas, comprueba que haya datos.",
    "Distingue entre notas aprobadas y suspensas con una condición clara."
  ],
  expectedOutput: "Debe pedir notas hasta escribir fin, validar el rango y mostrar cantidad, media, máxima, mínima, aprobados y suspensos.",
  checks: [
    "Debe pedir notas repetidamente.",
    "Debe terminar cuando el usuario escriba fin.",
    "Debe convertir las entradas numéricas.",
    "Debe validar que cada nota esté entre 0 y 10.",
    "Debe guardar solo notas válidas.",
    "Debe calcular media, nota máxima y nota mínima.",
    "Debe contar aprobados y suspensos.",
    "Debe controlar el caso de no tener notas."
  ],
  starterCode:
`notas = []

# Pide notas hasta que el usuario escriba "fin".
# Valida cada nota antes de guardarla.
# Al terminar, muestra:
# cantidad, media, máxima, mínima,
# aprobados y suspensos.
`
};

window.EXERCISE_CATALOG["py_reto_acumulativo_4_frases"] = {
  id: "py_reto_acumulativo_4_frases",
  language: "python",
  topic: "python/retos",
  title: "Reto acumulativo 5 · Análisis de frases",
  statement:
    "Pide una frase al usuario y muestra cuántas palabras tiene, cuántas letras contiene sin contar espacios, cuántas vocales hay y cuál es la palabra más larga.",
  type: "Reto acumulativo",
  difficulty: "Media",
  estimatedTime: "15-25 min",
  skill: "Análisis de strings con funciones",
  hints: [
    "Primero prepara la frase antes de analizarla.",
    "Para contar palabras, piensa cómo separar el texto.",
    "Para contar letras, no deberías contar los espacios.",
    "Para contar vocales, recorre los caracteres.",
    "Para la palabra más larga, compara tamaños."
  ],
  expectedOutput: "Debe analizar una frase y mostrar cantidad de palabras, letras sin espacios, vocales y palabra más larga.",
  checks: [
    "Debe pedir una frase al usuario.",
    "Debe contar cuántas palabras tiene.",
    "Debe contar letras sin incluir espacios.",
    "Debe contar vocales.",
    "Debe encontrar la palabra más larga.",
    "Debe mostrar un resumen final claro."
  ],
  starterCode:
`frase = input("Escribe una frase: ").strip()

# Analiza la frase y muestra:
# número de palabras,
# letras sin espacios,
# vocales
# y palabra más larga.
`
};

window.EXERCISE_CATALOG["py_reto_acumulativo_5_archivo"] = {
  id: "py_reto_acumulativo_5_archivo",
  language: "python",
  topic: "python/retos",
  title: "Reto acumulativo 6 · Lectura y validación desde archivo",
  statement:
    "Lee un archivo línea a línea, limpia cada línea con strip(), valida cuáles son correctas y muestra un resumen final con cuántas líneas eran válidas y cuántas no.",
  type: "Reto acumulativo",
  difficulty: "Media-Alta",
  estimatedTime: "25-35 min",
  skill: "Archivos, limpieza y validación",
  hints: [
    "Debes leer el archivo por partes, no como un bloque único.",
    "Cada línea debe limpiarse antes de validarse.",
    "Define una regla sencilla para decidir si una línea es válida.",
    "Guarda o cuenta los datos según el resultado de la validación.",
    "El resumen final debe distinguir válidas e inválidas."
  ],
  expectedOutput: "Debe leer un archivo línea a línea, limpiar cada línea, validar su contenido y mostrar cuántas líneas son válidas e inválidas.",
  checks: [
    "Debe abrir un archivo en modo lectura.",
    "Debe recorrer el archivo línea a línea.",
    "Debe limpiar cada línea.",
    "Debe aplicar una regla de validación.",
    "Debe contar o guardar líneas válidas.",
    "Debe contar líneas inválidas.",
    "Debe mostrar un resumen final."
  ],
  starterCode:
`validas = []
invalidas = 0

# Lee un archivo línea a línea.
# Limpia cada línea.
# Valida cada contenido según una regla.
# Muestra un resumen final con válidas e inválidas.
`
};

window.EXERCISE_CATALOG["py_reto_acumulativo_6_menu"] = {
  id: "py_reto_acumulativo_6_menu",
  language: "python",
  topic: "python/retos",
  title: "Reto acumulativo 3 · Menú de análisis simple",
  statement:
    "Crea un programa con menú que permita añadir datos a una lista, mostrarlos, enseñar un resumen simple y salir. Debes usar while, funciones y validación de opciones.",
  type: "Reto acumulativo",
  difficulty: "Media-Alta",
  estimatedTime: "25-35 min",
  skill: "Menú, funciones y flujo completo",
  hints: [
    "Empieza definiendo qué opciones tendrá el menú.",
    "Guarda los datos en una estructura que puedas ir ampliando.",
    "Separa las acciones importantes en funciones.",
    "Valida las opciones que no existan.",
    "Antes de mostrar resúmenes, piensa qué ocurre si no hay datos."
  ],
  expectedOutput: "Debe funcionar como un menú que permita añadir datos, verlos, mostrar un resumen simple y salir.",
  checks: [
    "Debe mostrar un menú.",
    "Debe mantener el programa activo hasta elegir salir.",
    "Debe permitir añadir datos.",
    "Debe permitir ver los datos guardados.",
    "Debe mostrar un resumen simple.",
    "Debe validar opciones incorrectas.",
    "Debe usar funciones para separar acciones.",
    "Debe usar una lista para almacenar datos."
  ],
  starterCode:
`def mostrar_menu():
    print("\\n--- MENÚ DE ANÁLISIS ---")
    print("1. Añadir dato")
    print("2. Ver datos")
    print("3. Mostrar resumen")
    print("4. Salir")


def ver_datos(datos):
    pass


def anadir_dato(datos):
    pass


def mostrar_resumen(datos):
    pass


def main():
    datos = []

    while True:
        mostrar_menu()
        opcion = input("Elige una opción: ").strip()

        # Completa el flujo del menú

main()
`
};