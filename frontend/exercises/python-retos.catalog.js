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
    "Usa un while para seguir pidiendo datos hasta que aparezca 'fin'.",
    "Guarda cada número válido en una lista.",
    "No conviertas la entrada a entero hasta comprobar que no es 'fin'.",
    "Cuenta pares e impares recorriendo la lista al final.",
    "Antes de calcular máximo y mínimo, comprueba que la lista no esté vacía."
  ],
  starterCode:
`numeros = []

while True:
    entrada = input("Escribe un número o 'fin': ").strip()

    # TODO: terminar si el usuario escribe "fin"

    # TODO: convertir la entrada a entero

    # TODO: guardar el número en la lista

# TODO: comprobar si se ha introducido algún número

# TODO: calcular cuántos son pares y cuántos impares

# TODO: mostrar cuántos números se han introducido

# TODO: mostrar el mayor y el menor
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
    "Usa una lista para guardar las palabras.",
    "Detén la entrada cuando el usuario escriba 'salir'.",
    "Para la palabra más larga, compara longitudes con len().",
    "Para las vocales, fíjate en la primera letra de cada palabra.",
    "Para las repetidas, piensa cuántas veces aparece cada una."
  ],
  starterCode:
`palabras = []

while True:
    entrada = input("Escribe una palabra o 'salir': ").strip()

    # TODO: terminar si el usuario escribe "salir"

    # TODO: guardar la palabra en la lista

# TODO: comprobar si se ha introducido alguna palabra

# TODO: mostrar cuántas palabras hay

# TODO: encontrar la palabra más larga

# TODO: contar cuántas empiezan por vocal

# TODO: contar cuántas están repetidas
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
    "Usa una lista para guardar las notas válidas.",
    "Detén la entrada cuando el usuario escriba 'fin'.",
    "Valida que cada nota esté entre 0 y 10.",
    "La media es suma total dividida entre cantidad.",
    "Una nota aprobada suele ser mayor o igual que 5."
  ],
  starterCode:
`notas = []

while True:
    entrada = input("Escribe una nota o 'fin': ").strip()

    # TODO: terminar si el usuario escribe "fin"

    # TODO: convertir la entrada a número

    # TODO: validar que la nota esté entre 0 y 10

    # TODO: guardar la nota en la lista

# TODO: comprobar si hay notas

# TODO: calcular media, máxima y mínima

# TODO: contar aprobados y suspensos
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
    "Usa split() para separar las palabras.",
    "Ignora los espacios al contar letras.",
    "Cuenta vocales recorriendo la frase.",
    "Compara longitudes para encontrar la palabra más larga."
  ],
  starterCode:
`frase = input("Escribe una frase: ").strip()

# TODO: separar la frase en palabras

# TODO: contar cuántas palabras tiene

# TODO: contar letras sin contar espacios

# TODO: contar vocales

# TODO: encontrar la palabra más larga
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
    "Usa with open(..., 'r') para leer.",
    "Recorre línea a línea con un for.",
    "Limpia cada línea con strip().",
    "Define una regla sencilla para decidir si una línea es válida.",
    "Guarda las válidas en una lista."
  ],
  starterCode:
`validas = []
invalidas = 0

# TODO: abrir un archivo en modo lectura

# TODO: recorrer sus líneas

# TODO: limpiar cada línea con strip()

# TODO: validar cada línea según una regla

# TODO: guardar las válidas y contar las inválidas

# TODO: mostrar el resumen final
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
    "Usa un while True para mantener el menú activo.",
    "Crea una función para mostrar el menú.",
    "Guarda los datos en una lista.",
    "Valida las opciones con if / elif / else.",
    "Empieza con una versión mínima y amplíala después."
  ],
  starterCode:
`def mostrar_menu():
    print("\\n--- MENÚ DE ANÁLISIS ---")
    print("1. Añadir dato")
    print("2. Ver datos")
    print("3. Mostrar resumen")
    print("4. Salir")


def ver_datos(datos):
    # TODO
    pass


def anadir_dato(datos):
    # TODO
    pass


def mostrar_resumen(datos):
    # TODO
    pass


def main():
    datos = []

    while True:
        mostrar_menu()
        opcion = input("Elige una opción: ").strip()

        if opcion == "1":
            anadir_dato(datos)
        elif opcion == "2":
            ver_datos(datos)
        elif opcion == "3":
            mostrar_resumen(datos)
        elif opcion == "4":
            print("Saliendo...")
            break
        else:
            print("Opción no válida")

main()
`
};