window.EXERCISE_CATALOG["py_tema2_ej4"] = {
  id: "py_tema2_ej4",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 4 – Número positivo, negativo o cero",
  statement: "Guarda un número e imprime si es positivo, negativo o cero.",
  starterCode:
`# EJERCICIO: Positivo, negativo o cero

numero = 0

# Si numero > 0 imprime "Positivo"
# Si numero < 0 imprime "Negativo"
# En cualquier otro caso imprime "Cero"
`,
  hints: [
    "Usa if / elif / else",
    "La primera condición puede ser numero > 0",
    "No olvides contemplar el caso cero",
  ],
};

window.EXERCISE_CATALOG["py_tema2_ej5"] = {
  id: "py_tema2_ej5",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 5 – Comparar dos números",
  statement: "Guarda dos números e imprime cuál es mayor o si son iguales.",
  starterCode:
`# EJERCICIO: Comparar dos números

a = 0
b = 0

# Si a > b imprime "a es mayor"
# Si a < b imprime "b es mayor"
# Si no, imprime "Son iguales"
`,
  hints: [
    "Necesitas comparar dos variables",
    "Usa elif para el segundo caso",
    "El else cubre la igualdad",
  ],
};

window.EXERCISE_CATALOG["py_tema2_ej6"] = {
  id: "py_tema2_ej6",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 6 – Usuario administrador",
  statement: "Si usuario es 'admin', imprime 'Acceso total'. Si no, 'Acceso limitado'.",
  starterCode:
`# EJERCICIO: Usuario administrador

usuario = ""

# Si usuario es "admin"
# imprime "Acceso total"
# Si no
# imprime "Acceso limitado"
`,
  hints: [
    "Compara texto con ==",
    "Recuerda usar comillas alrededor de admin",
    "Python diferencia mayúsculas y minúsculas",
  ],
};

window.EXERCISE_CATALOG["py_tema2_ej7"] = {
  id: "py_tema2_ej7",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 7 – Descuento",
  statement: "Un cliente tiene descuento si es estudiante o si tiene menos de 25 años.",
  starterCode:
`# EJERCICIO: Descuento

es_estudiante = False
edad = 0

# Si es_estudiante o edad < 25
# imprime "Tiene descuento"
# Si no
# imprime "No tiene descuento"
`,
  hints: [
    "Aquí necesitas usar or",
    "Una sola condición verdadera basta",
    "Usa if / else",
  ],
};

window.EXERCISE_CATALOG["py_tema2_ej8"] = {
  id: "py_tema2_ej8",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 8 – Acceso seguro",
  statement: "Un usuario puede entrar si la contraseña es correcta y la cuenta está activa.",
  starterCode:
`# EJERCICIO: Acceso seguro

password_correcta = False
cuenta_activa = False

# Si password_correcta y cuenta_activa
# imprime "Acceso permitido"
# Si no
# imprime "Acceso denegado"
`,
  hints: [
    "Aquí necesitas usar and",
    "Las dos condiciones deben ser True",
    "Usa if / else",
  ],
};

window.EXERCISE_CATALOG["py_tema2_ej9"] = {
  id: "py_tema2_ej9",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 9 – Rango numérico",
  statement: "Comprueba si un número está entre 10 y 20, ambos inclusive.",
  starterCode:
`# EJERCICIO: Rango numérico

numero = 0

# Si numero está entre 10 y 20
# imprime "Dentro del rango"
# Si no
# imprime "Fuera del rango"
`,
  hints: [
    "Puedes usar 10 <= numero <= 20",
    "También se puede resolver con and",
    "Recuerda incluir ambos extremos",
  ],
};

window.EXERCISE_CATALOG["py_tema2_ej10"] = {
  id: "py_tema2_ej10",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 10 – Par o impar",
  statement: "Usa el operador % para comprobar si un número es par o impar.",
  starterCode:
`# EJERCICIO: Par o impar

numero = 0

# Si numero % 2 == 0
# imprime "Par"
# Si no
# imprime "Impar"
`,
  hints: [
    "El resto de dividir entre 2 indica si es par",
    "Si el resto es 0, es par",
    "Usa if / else",
  ],
};

window.EXERCISE_CATALOG["py_tema2_reto2"] = {
  id: "py_tema2_reto2",
  language: "python",
  topic: "python/tema-2",
  title: "Reto final – Clasificación por edad",
  statement: "Clasifica una edad como niño, adolescente, adulto o senior.",
  starterCode:
`# RETO FINAL: Clasificación por edad

edad = 0

# menor de 13 -> Niño
# de 13 a 17  -> Adolescente
# de 18 a 64  -> Adulto
# 65 o más    -> Senior
`,
  hints: [
    "Empieza por los rangos más bajos o diseña bien el orden",
    "Usa if / elif / else",
    "Piensa en los casos límite: 13, 18 y 65",
  ],
};