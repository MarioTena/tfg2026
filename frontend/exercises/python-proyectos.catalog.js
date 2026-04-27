window.EXERCISE_CATALOG = window.EXERCISE_CATALOG || {};

window.EXERCISE_CATALOG["py_proyecto1_gestor_tareas"] = {
  id: "py_proyecto1_gestor_tareas",
  language: "python",
  topic: "python/proyectos",
  title: "Proyecto integrador 1 · Gestor básico de tareas",
  statement:
    "Crea un programa en consola que permita ver tareas, añadir tareas, eliminar tareas, marcar tareas como completadas y salir mediante un menú. Debes usar listas, funciones, un bucle while y validación básica.",
  type: "Proyecto integrador",
  difficulty: "Media",
  estimatedTime: "30-45 min",
  skill: "Integración de conceptos",
  hints: [
    "Empieza creando solo el menú y la opción de salir.",
    "Guarda las tareas en una lista.",
    "Crea una función distinta para cada acción importante.",
    "Usa enumerate(tareas, start=1) para mostrar tareas numeradas.",
    "Valida que la tarea no esté vacía antes de añadirla.",
    "Comprueba que el número introducido para eliminar o completar esté dentro del rango.",
    "Puedes marcar una tarea como completada añadiendo '✅ ' al principio del texto."
  ],
  starterCode:
`def mostrar_menu():
    print("\\n--- GESTOR DE TAREAS ---")
    print("1. Ver tareas")
    print("2. Añadir tarea")
    print("3. Eliminar tarea")
    print("4. Marcar tarea como completada")
    print("5. Salir")


def ver_tareas(tareas):
    # TODO: mostrar las tareas numeradas
    pass


def anadir_tarea(tareas):
    # TODO: pedir una tarea y añadirla si no está vacía
    pass


def eliminar_tarea(tareas):
    # TODO: eliminar una tarea por su número
    pass


def completar_tarea(tareas):
    # TODO: marcar una tarea como completada
    pass


def main():
    tareas = []

    while True:
        mostrar_menu()
        opcion = input("Elige una opción: ").strip()

        if opcion == "1":
            ver_tareas(tareas)
        elif opcion == "2":
            anadir_tarea(tareas)
        elif opcion == "3":
            eliminar_tarea(tareas)
        elif opcion == "4":
            completar_tarea(tareas)
        elif opcion == "5":
            print("Saliendo del gestor de tareas...")
            break
        else:
            print("Opción no válida. Inténtalo de nuevo.")


main()
`
};

window.EXERCISE_CATALOG["py_proyecto2_registro_notas"] = {
  id: "py_proyecto2_registro_notas",
  language: "python",
  topic: "python/proyectos",
  title: "Proyecto integrador 2 · Registro de notas de alumnos",
  statement:
    "Crea un programa en consola que permita añadir alumnos con su nota, mostrarlos, buscar un alumno por nombre, calcular la media general y salir mediante un menú. Debes usar diccionarios, funciones, un bucle while y validación de rango.",
  type: "Proyecto integrador",
  difficulty: "Media",
  estimatedTime: "35-50 min",
  skill: "Datos estructurados",
  hints: [
    "Usa un diccionario para guardar nombre y nota.",
    "Valida que la nota esté entre 0 y 10.",
    "Crea una función para cada acción importante.",
    "Recorre el diccionario con .items() para mostrar los alumnos.",
    "Antes de calcular la media, comprueba que haya alumnos guardados.",
    "Para buscar, comprueba si el nombre existe como clave en el diccionario."
  ],
  starterCode:
`def mostrar_menu():
    print("\\n--- REGISTRO DE NOTAS ---")
    print("1. Ver alumnos")
    print("2. Añadir alumno y nota")
    print("3. Buscar alumno")
    print("4. Calcular media general")
    print("5. Salir")


def ver_alumnos(alumnos):
    # TODO: mostrar todos los alumnos con su nota
    pass


def anadir_alumno(alumnos):
    # TODO: pedir nombre y nota, validarlos y guardarlos
    pass


def buscar_alumno(alumnos):
    # TODO: pedir un nombre y mostrar su nota si existe
    pass


def calcular_media(alumnos):
    # TODO: calcular y mostrar la media general
    pass


def main():
    alumnos = {}

    while True:
        mostrar_menu()
        opcion = input("Elige una opción: ").strip()

        if opcion == "1":
            ver_alumnos(alumnos)
        elif opcion == "2":
            anadir_alumno(alumnos)
        elif opcion == "3":
            buscar_alumno(alumnos)
        elif opcion == "4":
            calcular_media(alumnos)
        elif opcion == "5":
            print("Saliendo del registro de notas...")
            break
        else:
            print("Opción no válida. Inténtalo de nuevo.")


main()
`
};

window.EXERCISE_CATALOG["py_proyecto3_gestor_archivo"] = {
  id: "py_proyecto3_gestor_archivo",
  language: "python",
  topic: "python/proyectos",
  title: "Proyecto integrador 3 · Gestor simple con archivo",
  statement:
    "Crea un programa en consola que permita leer registros guardados en un archivo, añadir nuevos registros, validar la entrada y gestionar errores básicos usando un menú. Debes usar archivos, funciones, validación y excepciones.",
  type: "Proyecto integrador",
  difficulty: "Media-Alta",
  estimatedTime: "40-60 min",
  skill: "Persistencia y robustez",
  hints: [
    "Usa with open(..., 'r') para leer el archivo.",
    "Usa with open(..., 'a') para añadir sin borrar lo anterior.",
    "Valida que el registro no esté vacío antes de guardarlo.",
    "Recuerda añadir \\n si quieres una línea nueva por cada registro.",
    "Captura FileNotFoundError al intentar leer si el archivo no existe.",
    "Puedes usar raise ValueError(...) si detectas una entrada inválida."
  ],
  starterCode:
`ARCHIVO = "registros.txt"


def mostrar_menu():
    print("\\n--- GESTOR CON ARCHIVO ---")
    print("1. Ver registros")
    print("2. Añadir registro")
    print("3. Salir")


def ver_registros():
    # TODO: leer y mostrar las líneas del archivo
    pass


def anadir_registro():
    # TODO: pedir un registro, validarlo y guardarlo
    pass


def main():
    while True:
        mostrar_menu()
        opcion = input("Elige una opción: ").strip()

        if opcion == "1":
            ver_registros()
        elif opcion == "2":
            anadir_registro()
        elif opcion == "3":
            print("Saliendo del gestor...")
            break
        else:
            print("Opción no válida. Inténtalo de nuevo.")


main()
`
};