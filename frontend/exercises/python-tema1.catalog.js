// Catálogo de ejercicios (Tema 1 - Python)
window.EXERCISE_CATALOG = window.EXERCISE_CATALOG || {};

window.EXERCISE_CATALOG["py_tema1_ej1"] = {
  id: "py_tema1_ej1",
  language: "python",
  topic: "python/tema-1",
  title: 'Ejercicio 1 – "Hola mundo"',
  statement: 'Imprime exactamente: "Hola mundo desde TFG".',
  starterCode:
`# EJERCICIO: Hola mundo
# Objetivo: imprimir exactamente:
# Hola mundo desde TFG

print("...")`,
  hints: [
    "Usa print(...)",
    "Ojo con mayúsculas, espacios y comillas."
  ],
};

window.EXERCISE_CATALOG["py_tema1_ej2"] = {
  id: "py_tema1_ej2",
  language: "python",
  topic: "python/tema-1",
  title: "Ejercicio 2 – Operaciones básicas",
  statement: "Crea variables a=7 y b=4. Muestra suma, resta y producto en líneas separadas.",
  starterCode:
`# EJERCICIO: Operaciones básicas
# Crea dos variables a y b con valores 7 y 4
# y muestra:
# - suma
# - resta
# - producto

a = ___
b = ___

# Escribe aquí los prints`,
  hints: [
    "Suma: a + b",
    "Resta: a - b",
    "Producto: a * b",
  ],
};

window.EXERCISE_CATALOG["py_tema1_ej3"] = {
  id: "py_tema1_ej3",
  language: "python",
  topic: "python/tema-1",
  title: "Ejercicio 3 – Nombre del alumno",
  statement: 'Define nombre y muestra: "Me llamo X".',
  starterCode:
`# EJERCICIO: Nombre del alumno
# Define una variable 'nombre' con tu nombre
# y muestra: Me llamo Mario

nombre = ___
print("Me llamo", nombre)`,
  hints: [
    "Las cadenas van entre comillas: \"Mario\"",
    "Si quieres, prueba con otro nombre.",
  ],
};

window.EXERCISE_CATALOG["py_tema1_ej4"] = {
  id: "py_tema1_ej4",
  language: "python",
  topic: "python/tema-1",
  title: "Ejercicio 4 – Error intencional",
  statement: "Ejecuta el código, lee el error, y explica qué variable falta.",
  starterCode:
`# EJERCICIO: Error intencional
# Ejecuta este código y observa el error

x = 5
y = z + 1
print(x + y)`,
  hints: [
    "Python ejecuta de arriba a abajo.",
    "Si una variable no existe, aparece NameError.",
  ],
};



