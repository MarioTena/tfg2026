window.EXERCISE_CATALOG["py_tema2_ej1"] = {
  id: "py_tema2_ej1",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 1 – Mayor de edad",
  statement: "Si edad es 18 o más, imprime 'Mayor de edad'. Si no, imprime 'Menor de edad'.",
  difficulty: "Fácil",
  estimatedTime: "5 min",
  skill: "if/else",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Mayor de edad

edad = 0

# Si edad es 18 o más
# imprime "Mayor de edad"
# Si no
# imprime "Menor de edad"
`,
  hints: [
    "Usa if / else",
    "La condición es edad >= 18",
    "Prueba también el caso 18",
  ],
};

window.EXERCISE_CATALOG["py_tema2_ej2"] = {
  id: "py_tema2_ej2",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 2 – Nota (aprobado/suspenso)",
  statement: "Si nota es 5 o más, imprime 'Aprobado'. Si no, imprime 'Suspenso'.",
  difficulty: "Fácil",
  estimatedTime: "5 min",
  skill: "Comparación",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Nota (aprobado/suspenso)

nota = 0

# Si nota es 5 o más
# imprime "Aprobado"
# Si no
# imprime "Suspenso"
`,
  hints: [
    "Usa if / else",
    "La condición es nota >= 5",
    "No olvides probar el caso 5",
  ],
};

window.EXERCISE_CATALOG["py_tema2_ej3"] = {
  id: "py_tema2_ej3",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 3 – Clasificación con elif",
  statement: "Clasifica una nota: sobresaliente, notable, aprobado o suspenso.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "elif",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Clasificación con elif

nota = 0

# 9 o más -> "Sobresaliente"
# 7 o más -> "Notable"
# 5 o más -> "Aprobado"
# Si no -> "Suspenso"
`,
  hints: [
    "Usa if / elif / else",
    "Empieza por la nota más alta",
    "Prueba 4, 5, 7 y 9",
  ],
};

window.EXERCISE_CATALOG["py_tema2_ej4"] = {
  id: "py_tema2_ej4",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 4 – Número positivo, negativo o cero",
  statement: "Guarda un número e imprime si es positivo, negativo o cero.",
  difficulty: "Media",
  estimatedTime: "6 min",
  skill: "Condiciones",
  type: "Práctica guiada",
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
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Comparar",
  type: "Práctica guiada",
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
  difficulty: "Fácil",
  estimatedTime: "5 min",
  skill: "Strings",
  type: "Práctica guiada",  
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
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "or",
  type: "Práctica guiada",
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
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "and",
  type: "Práctica guiada",
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
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Rangos",
  type: "Práctica guiada",
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
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Módulo",
  type: "Práctica guiada",
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

window.EXERCISE_CATALOG["py_tema2_ej11"] = {
  id: "py_tema2_ej11",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 11 – Detectar cuenta inactiva con not",
  statement: "Si la cuenta no está activa, imprime 'Cuenta inactiva'. Si no, imprime 'Cuenta activa'.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "not",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Detectar cuenta inactiva con not

cuenta_activa = False

# Si la cuenta NO está activa
# imprime "Cuenta inactiva"
# Si no
# imprime "Cuenta activa"
`,
  hints: [
    "Aquí necesitas usar not",
    "not invierte un valor booleano",
    "Usa if / else",
  ],
};

window.EXERCISE_CATALOG["py_tema2_ej12"] = {
  id: "py_tema2_ej12",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 12 – Corregir lógica de clasificación",
  statement: "Reordena una clasificación con elif para que no tape los casos más altos.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Depuración",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Corregir lógica de clasificación

nota = 0

# Este planteamiento está mal ordenado.
# Reescríbelo bien para que funcione:

# if nota >= 5:
#     print("Aprobado")
# elif nota >= 7:
#     print("Notable")
# elif nota >= 9:
#     print("Sobresaliente")
# else:
#     print("Suspenso")
`,
  hints: [
    "El problema no es la sintaxis, sino el orden",
    "Empieza por los casos más exigentes",
    "Prueba 5, 7 y 9",
  ],
};

window.EXERCISE_CATALOG["py_tema2_ej13"] = {
  id: "py_tema2_ej13",
  language: "python",
  topic: "python/tema-2",
  title: "Ejercicio 13 – Input y mayor de edad",
  statement: "Pide una edad con input(), conviértela con int() y decide si la persona es mayor o menor de edad.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "input()",
  type: "Práctica guiada",
  starterCode:
`# EJERCICIO: Input y mayor de edad

edad = int(input("Introduce tu edad: "))

# Si edad es 18 o más
# imprime "Mayor de edad"
# Si no
# imprime "Menor de edad"
`,
  hints: [
    "Usa input() para pedir el dato",
    "Convierte el texto con int()",
    "La condición es edad >= 18",
  ],
};

window.EXERCISE_CATALOG["py_tema2_reto1"] = {
  id: "py_tema2_reto1",
  language: "python",
  topic: "python/tema-2",
  title: "Mini reto – Clasificador de acceso",
  statement: "Decide si una persona puede pasar según su edad y si tiene entrada.",
  difficulty: "Reto",
  estimatedTime: "10 min",
  skill: "and",
  type: "Reto",
  starterCode:
`# MINI RETO: Clasificador de acceso

edad = 0
tiene_entrada = False

# Si tiene 18 o más y además tiene entrada
# imprime "Puede pasar"
# Si no
# imprime "No puede pasar"
`,
  hints: [
    "Aquí necesitas usar and",
    "Deben cumplirse dos condiciones a la vez",
    "Prueba varios casos, no solo uno",
  ],
};

window.EXERCISE_CATALOG["py_tema2_reto2"] = {
  id: "py_tema2_reto2",
  language: "python",
  topic: "python/tema-2",
  title: "Reto final – Clasificación por edad",
  statement: "Clasifica una edad como niño, adolescente, adulto o senior.",
  difficulty: "Reto Final",
  estimatedTime: "12 min",
  skill: "Integrador",
  type: "Reto final",
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