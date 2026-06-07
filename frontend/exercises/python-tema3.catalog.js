window.EXERCISE_CATALOG = window.EXERCISE_CATALOG || {};

window.EXERCISE_CATALOG["py_tema3_ej1"] = {
  id: "py_tema3_ej1",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 1 – Del 1 al 5",
  statement: "Muestra los números del 1 al 5 usando for.",
  difficulty: "Fácil",
  estimatedTime: "5 min",
  skill: "for",
  type: "Ejercicio",
  starterCode:
`# Muestra los números del 1 al 5 usando un bucle for
`,
  hints: [
    "Necesitas repetir una acción varias veces.",
    "Piensa qué rango de números quieres recorrer.",
    "Comprueba que aparecen el 1 y el 5."
  ],
  expectedOutput: "Debe mostrar los números del 1 al 5.",
  checks: [
    "Debe usar un bucle for.",
    "Debe empezar mostrando el número 1.",
    "Debe terminar mostrando el número 5.",
    "Debe mostrar todos los números intermedios."
  ]
};

window.EXERCISE_CATALOG["py_tema3_ej2"] = {
  id: "py_tema3_ej2",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 2 – Cuenta atrás",
  statement: "Muestra los números del 10 al 1 en orden descendente.",
  difficulty: "Fácil",
  estimatedTime: "6 min",
  skill: "range()",
  type: "Ejercicio",
  starterCode:
`# Muestra los números del 10 al 1 en orden descendente
`,
  hints: [
    "Necesitas recorrer números hacia atrás.",
    "Piensa en cómo indicar un salto descendente.",
    "Comprueba que el 10 aparece primero y el 1 aparece al final."
  ],
  expectedOutput: "Debe mostrar los números del 10 al 1 en orden descendente.",
  checks: [
    "Debe usar una repetición.",
    "Debe comenzar en 10.",
    "Debe terminar en 1.",
    "El orden debe ser descendente."
  ]
};

window.EXERCISE_CATALOG["py_tema3_ej3"] = {
  id: "py_tema3_ej3",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 3 – Números pares",
  statement: "Muestra los números pares del 2 al 20.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "range()",
  type: "Ejercicio",
  starterCode:
`# Muestra los números pares del 2 al 20
`,
  hints: [
    "Solo deben aparecer números pares.",
    "Piensa si puedes avanzar de dos en dos.",
    "Comprueba que el 20 también aparece."
  ],
  expectedOutput: "Debe mostrar los números pares desde 2 hasta 20 incluidos.",
  checks: [
    "Debe mostrar solo números pares.",
    "Debe empezar en 2.",
    "Debe incluir el 20.",
    "No debe mostrar números impares."
  ]
};

window.EXERCISE_CATALOG["py_tema3_ej4"] = {
  id: "py_tema3_ej4",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 4 – Recorrer palabra",
  statement: "Muestra una letra por línea de la palabra 'python'.",
  difficulty: "Media",
  estimatedTime: "6 min",
  skill: "Recorrido",
  type: "Ejercicio",
  starterCode:
`palabra = "python"

# Recorre la palabra y muestra una letra por línea
`,
  hints: [
    "Un string se puede recorrer carácter a carácter.",
    "Cada vuelta del bucle debe trabajar con una letra.",
    "La salida debe aparecer en varias líneas."
  ],
  expectedOutput: "Debe mostrar cada letra de la palabra python en una línea distinta.",
  checks: [
    "Debe recorrer la palabra.",
    "Debe mostrar una letra por iteración.",
    "Debe respetar el orden de las letras.",
    "Cada letra debe aparecer separada."
  ]
};

window.EXERCISE_CATALOG["py_tema3_ej5"] = {
  id: "py_tema3_ej5",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 5 – Suma del 1 al 10",
  statement: "Suma los números del 1 al 10 usando un acumulador.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Acumulador",
  type: "Ejercicio",
  starterCode:
`suma = 0

# Recorre los números necesarios
# y acumula el total en suma

print(suma)
`,
  hints: [
    "Necesitas una variable que guarde el total.",
    "En cada vuelta debes añadir el número actual.",
    "El resultado final debe salir después del bucle."
  ],
  expectedOutput: "Debe mostrar la suma total de los números del 1 al 10.",
  checks: [
    "Debe usar un acumulador.",
    "Debe recorrer los números del 1 al 10.",
    "Debe actualizar la suma durante el bucle.",
    "Debe mostrar el resultado final al terminar."
  ]
};

window.EXERCISE_CATALOG["py_tema3_ej6"] = {
  id: "py_tema3_ej6",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 6 – While del 1 al 5",
  statement: "Muestra del 1 al 5 usando while.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "while",
  type: "Ejercicio",
  starterCode:
`contador = 1

# Usa while para mostrar del 1 al 5
`,
  hints: [
    "El bucle debe repetirse mientras no hayas llegado al final.",
    "Necesitas cambiar la variable de control dentro del bucle.",
    "Comprueba que el programa termina."
  ],
  expectedOutput: "Debe mostrar los números del 1 al 5 usando un bucle while.",
  checks: [
    "Debe usar while.",
    "Debe usar una variable de control.",
    "Debe actualizar la variable de control.",
    "Debe terminar después de mostrar el 5."
  ]
};

window.EXERCISE_CATALOG["py_tema3_ej7"] = {
  id: "py_tema3_ej7",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 7 – Saltar pares",
  statement: "Muestra del 1 al 10 saltando los números pares.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "continue",
  type: "Ejercicio",
  starterCode:
`# Recorre los números del 1 al 10
# y muestra solo los que no sean pares
`,
  hints: [
    "Debes decidir cuándo no interesa ejecutar el resto de la vuelta.",
    "Piensa qué condición identifica los números que quieres saltar.",
    "La salida final debe contener solo impares."
  ],
  expectedOutput: "Debe mostrar los números impares del 1 al 10.",
  checks: [
    "Debe recorrer del 1 al 10.",
    "Debe detectar los números pares.",
    "Debe saltar o evitar mostrar los pares.",
    "Debe mostrar solo números impares."
  ]
};

window.EXERCISE_CATALOG["py_tema3_ej8"] = {
  id: "py_tema3_ej8",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 8 – Parar al encontrar",
  statement: "Recorre una palabra y detén el bucle cuando encuentres una letra concreta.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "break",
  type: "Ejercicio",
  starterCode:
`palabra = "programacion"

# Recorre la palabra
# y detén el bucle al encontrar la letra indicada en el enunciado
`,
  hints: [
    "Debes recorrer la palabra letra a letra.",
    "Cuando aparezca la letra buscada, el bucle debe terminar.",
    "Piensa si quieres mostrar la letra antes o después de comprobarla."
  ],
  expectedOutput: "Debe recorrer la palabra y detenerse cuando encuentre la letra indicada.",
  checks: [
    "Debe recorrer la palabra.",
    "Debe comprobar cada letra.",
    "Debe detener el bucle al encontrar la letra objetivo.",
    "No debe seguir recorriendo después de encontrarla."
  ]
};

window.EXERCISE_CATALOG["py_tema3_ej9"] = {
  id: "py_tema3_ej9",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 9 – Validar con while",
  statement: "Pide una palabra al usuario hasta que escriba 'python'.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "input()",
  type: "Ejercicio",
  starterCode:
`texto = ""

# Sigue pidiendo una palabra
# hasta que el usuario escriba la palabra correcta

print("Correcto")
`,
  hints: [
    "Necesitas repetir la petición mientras la entrada no sea válida.",
    "La condición del bucle debe depender del texto introducido.",
    "El mensaje final solo debe aparecer cuando el dato ya sea correcto."
  ],
  expectedOutput: "Debe pedir palabras hasta que el usuario escriba python y después mostrar Correcto.",
  checks: [
    "Debe usar un bucle while.",
    "Debe pedir datos al usuario.",
    "Debe repetir mientras el texto no sea el esperado.",
    "Debe terminar cuando se introduzca la palabra correcta."
  ]
};

window.EXERCISE_CATALOG["py_tema3_ej10"] = {
  id: "py_tema3_ej10",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 10 – Trazar una suma",
  statement: "Recorre del 1 al 4 y muestra cómo cambia una variable acumuladora en cada iteración.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Trazado",
  type: "Ejercicio",
  starterCode:
`suma = 0

# Recorre del 1 al 4
# actualiza la suma
# y muestra el número actual junto con el valor acumulado
`,
  hints: [
    "La salida debe ayudarte a seguir el proceso.",
    "En cada vuelta debe verse el número usado y el acumulado.",
    "Comprueba que el acumulador cambia en cada iteración."
  ],
  expectedOutput: "Debe mostrar cómo evoluciona la suma acumulada al recorrer los números del 1 al 4.",
  checks: [
    "Debe usar un acumulador.",
    "Debe recorrer del 1 al 4.",
    "Debe actualizar la suma en cada vuelta.",
    "Debe mostrar el número actual y el acumulado."
  ]
};

window.EXERCISE_CATALOG["py_tema3_ej11"] = {
  id: "py_tema3_ej11",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 11 – Detectar bucle infinito",
  statement: "Corrige un while que no termina porque la variable de control no cambia.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Depuración",
  type: "Ejercicio",
  starterCode:
`contador = 1

while contador <= 5:
    print(contador)

# Corrige el código para que termine bien
`,
  hints: [
    "La condición no es el problema principal.",
    "Revisa qué debería cambiar dentro del bucle.",
    "El programa debe mostrar una secuencia finita."
  ],
  expectedOutput: "Debe mostrar los números esperados y terminar sin quedarse en un bucle infinito.",
  checks: [
    "Debe mantener una condición de salida coherente.",
    "Debe modificar la variable de control.",
    "Debe evitar el bucle infinito.",
    "Debe terminar correctamente."
  ]
};

window.EXERCISE_CATALOG["py_tema3_ej12"] = {
  id: "py_tema3_ej12",
  language: "python",
  topic: "python/tema-3",
  title: "Ejercicio 12 – Contar impares",
  statement: "Cuenta cuántos números impares hay del 1 al 10 usando un acumulador.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Contador",
  type: "Ejercicio",
  starterCode:
`contador_impares = 0

# Cuenta cuántos números impares hay entre 1 y 10
# y muestra el resultado final
`,
  hints: [
    "Necesitas recorrer varios números.",
    "Usa una variable para contar los casos que cumplen la condición.",
    "Piensa qué propiedad identifica a un número impar."
  ],
  expectedOutput: "Debe mostrar cuántos números impares hay entre 1 y 10.",
  checks: [
    "Debe recorrer los números del 1 al 10.",
    "Debe identificar los números impares.",
    "Debe usar un contador.",
    "Debe mostrar el total final."
  ]
};

window.EXERCISE_CATALOG["py_tema3_reto1"] = {
  id: "py_tema3_reto1",
  language: "python",
  topic: "python/tema-3",
  title: "Mini reto – Input hasta número positivo",
  statement: "Pide números al usuario hasta que introduzca uno positivo.",
  difficulty: "Reto",
  estimatedTime: "10 min",
  skill: "while + input()",
  type: "Reto",
  starterCode:
`numero = -1

# Pide números hasta obtener uno válido
# y al final muestra un mensaje de confirmación
`,
  hints: [
    "Este ejercicio encaja bien con una repetición.",
    "El bucle debe mantenerse mientras el número no sea válido.",
    "Recuerda que la entrada del usuario llega como texto."
  ],
  expectedOutput: "Debe pedir números hasta que el usuario introduzca un número positivo y después mostrar un mensaje de confirmación.",
  checks: [
    "Debe pedir datos al usuario.",
    "Debe convertir la entrada a número.",
    "Debe repetir mientras el número no sea positivo.",
    "Debe terminar cuando el número sea válido."
  ]
};

window.EXERCISE_CATALOG["py_tema3_reto2"] = {
  id: "py_tema3_reto2",
  language: "python",
  topic: "python/tema-3",
  title: "Reto final – Sumar hasta 0",
  statement: "Pide números al usuario, súmalos y termina cuando escriba 0.",
  difficulty: "Reto final",
  estimatedTime: "12 min",
  skill: "Integrador",
  type: "Reto final",
  starterCode:
`suma = 0

# Pide números al usuario
# súmalos mientras no aparezca la condición de salida
# y muestra la suma total al final
`,
  hints: [
    "Necesitas una condición clara para terminar.",
    "Piensa en el orden: pedir, comprobar y sumar.",
    "El valor de salida no debería alterar el total final."
  ],
  expectedOutput: "Debe pedir números, acumularlos y terminar al introducir 0 mostrando la suma total.",
  checks: [
    "Debe usar un bucle.",
    "Debe pedir números al usuario.",
    "Debe acumular los valores introducidos.",
    "Debe terminar cuando el usuario escriba 0.",
    "Debe mostrar la suma final."
  ]
};