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
    "Empieza con una versión mínima del menú y la opción de salir.",
    "Piensa qué estructura te permite guardar varias tareas.",
    "Separa las acciones importantes en funciones.",
    "Al mostrar tareas, conviene que el usuario pueda identificarlas fácilmente.",
    "Valida que los datos introducidos tengan sentido antes de modificar la lista.",
    "Comprueba los casos en los que la lista está vacía.",
    "Antes de eliminar o completar una tarea, revisa que la posición elegida exista."
  ],
  expectedOutput: "Debe funcionar como un gestor de tareas en consola con menú, listado, alta, eliminación, marcado de completadas y salida.",
  checks: [
    "Debe mostrar un menú con varias opciones.",
    "Debe guardar las tareas en una lista.",
    "Debe permitir ver las tareas guardadas.",
    "Debe permitir añadir nuevas tareas.",
    "Debe permitir eliminar tareas existentes.",
    "Debe permitir marcar tareas como completadas.",
    "Debe validar opciones incorrectas del menú.",
    "Debe usar funciones para separar responsabilidades.",
    "Debe mantener el programa activo hasta que el usuario elija salir."
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
    pass


def anadir_tarea(tareas):
    pass


def eliminar_tarea(tareas):
    pass


def completar_tarea(tareas):
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
    "Piensa qué estructura permite asociar cada alumno con su nota.",
    "Separa cada acción del menú en una función.",
    "Antes de guardar una nota, comprueba que esté dentro del rango válido.",
    "Antes de calcular la media, revisa si hay datos guardados.",
    "Para buscar un alumno, piensa si el nombre existe en la estructura.",
    "La salida debe ser clara para que el usuario entienda qué alumnos y notas hay.",
    "Controla opciones incorrectas del menú para que el programa no se corte."
  ],
  expectedOutput: "Debe funcionar como un registro de notas con menú, alta de alumnos, listado, búsqueda, cálculo de media y salida.",
  checks: [
    "Debe mostrar un menú con varias opciones.",
    "Debe guardar alumnos y notas en una estructura adecuada.",
    "Debe permitir añadir alumnos con nota.",
    "Debe validar que la nota esté en un rango correcto.",
    "Debe permitir mostrar los alumnos guardados.",
    "Debe permitir buscar un alumno por nombre.",
    "Debe calcular la media general cuando haya datos.",
    "Debe controlar el caso de no tener alumnos.",
    "Debe usar funciones para separar responsabilidades.",
    "Debe mantener el programa activo hasta elegir salir."
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
    pass


def anadir_alumno(alumnos):
    pass


def buscar_alumno(alumnos):
    pass


def calcular_media(alumnos):
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
    "Piensa qué acciones debe tener el menú antes de escribir todo el código.",
    "Para ver registros, debes leer el archivo y mostrar su contenido de forma clara.",
    "Para añadir registros, debes conservar los datos anteriores.",
    "Valida la entrada antes de guardarla.",
    "Controla el caso en que el archivo todavía no exista.",
    "Separa lectura, escritura y menú en funciones diferentes.",
    "El programa debe responder con mensajes claros en los casos de error."
  ],
  expectedOutput: "Debe funcionar como un gestor de registros con archivo, permitiendo leer registros, añadir nuevos, validar entradas, controlar errores básicos y salir.",
  checks: [
    "Debe mostrar un menú con varias opciones.",
    "Debe usar una constante o variable para el nombre del archivo.",
    "Debe permitir ver registros guardados.",
    "Debe permitir añadir registros nuevos sin borrar los anteriores.",
    "Debe validar que un registro no esté vacío.",
    "Debe gestionar el caso de archivo inexistente.",
    "Debe usar excepciones cuando corresponda.",
    "Debe usar funciones para separar responsabilidades.",
    "Debe mantener el programa activo hasta elegir salir."
  ],
  starterCode:
`ARCHIVO = "registros.txt"


def mostrar_menu():
    print("\\n--- GESTOR CON ARCHIVO ---")
    print("1. Ver registros")
    print("2. Añadir registro")
    print("3. Salir")


def ver_registros():
    pass


def anadir_registro():
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