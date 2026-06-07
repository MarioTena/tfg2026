window.EXERCISE_CATALOG = window.EXERCISE_CATALOG || {};

window.EXERCISE_CATALOG["py_tema5_ej1"] = {
  id: "py_tema5_ej1",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 1 – Saludo simple",
  statement: "Crea una función que imprima un saludo fijo.",
  difficulty: "Fácil",
  estimatedTime: "5 min",
  skill: "print",
  type: "Ejercicio",
  starterCode:
`# Crea una función que muestre un saludo fijo
# y después llámala
`,
  hints: [
    "Necesitas definir una función antes de usarla.",
    "El mensaje debe mostrarse desde dentro de la función.",
    "No olvides ejecutar la función después de crearla."
  ],
  expectedOutput: "Debe mostrar un saludo fijo por pantalla al llamar a la función.",
  checks: [
    "Debe definir una función.",
    "La función debe mostrar un saludo.",
    "Debe llamar a la función.",
    "El programa debe producir una salida visible."
  ]
};

window.EXERCISE_CATALOG["py_tema5_ej2"] = {
  id: "py_tema5_ej2",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 2 – Saludo con nombre",
  statement: "Crea una función que reciba un nombre y lo salude.",
  difficulty: "Fácil",
  estimatedTime: "6 min",
  skill: "Parámetros",
  type: "Ejercicio",
  starterCode:
`# Crea una función que reciba un nombre
# y muestre un saludo personalizado

# Después llama a la función con un valor de prueba
`,
  hints: [
    "La función necesita recibir un dato externo.",
    "Ese dato debe usarse dentro del saludo.",
    "Comprueba que al cambiar el nombre también cambia la salida."
  ],
  expectedOutput: "Debe mostrar un saludo personalizado usando el nombre recibido por la función.",
  checks: [
    "Debe definir una función con un parámetro.",
    "Debe usar el parámetro dentro del saludo.",
    "Debe llamar a la función con un argumento.",
    "La salida debe incluir el nombre recibido."
  ]
};

window.EXERCISE_CATALOG["py_tema5_ej3"] = {
  id: "py_tema5_ej3",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 3 – Doble con return",
  statement: "Crea una función que devuelva el doble de un número.",
  difficulty: "Fácil",
  estimatedTime: "6 min",
  skill: "return",
  type: "Ejercicio",
  starterCode:
`# Crea una función que reciba un número
# y devuelva su doble

# Guarda el resultado y muéstralo
`,
  hints: [
    "Aquí interesa devolver un valor, no solo imprimirlo.",
    "La función debe recibir un número.",
    "Después de llamar a la función, usa el valor devuelto."
  ],
  expectedOutput: "Debe mostrar el doble del número calculado mediante una función.",
  checks: [
    "Debe definir una función.",
    "La función debe recibir un número.",
    "La función debe devolver el doble.",
    "Debe guardar o usar el valor devuelto.",
    "Debe mostrar el resultado final."
  ]
};

window.EXERCISE_CATALOG["py_tema5_ej4"] = {
  id: "py_tema5_ej4",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 4 – Suma de dos números",
  statement: "Crea una función que reciba dos números y devuelva su suma.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Argumentos",
  type: "Ejercicio",
  starterCode:
`# Crea una función que reciba dos números
# y devuelva el resultado de sumarlos

# Llama a la función y muestra el resultado
`,
  hints: [
    "La función necesita recibir dos valores.",
    "El cálculo debe hacerse dentro de la función.",
    "Muestra el resultado fuera, después de llamar a la función."
  ],
  expectedOutput: "Debe mostrar la suma de dos números calculada mediante una función.",
  checks: [
    "Debe definir una función con dos parámetros.",
    "Debe sumar los dos valores recibidos.",
    "Debe devolver el resultado.",
    "Debe llamar a la función.",
    "Debe mostrar el resultado final."
  ]
};

window.EXERCISE_CATALOG["py_tema5_ej5"] = {
  id: "py_tema5_ej5",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 5 – Mayor de edad",
  statement: "Devuelve True si la edad es 18 o más.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Booleanos",
  type: "Ejercicio",
  starterCode:
`# Crea una función que reciba una edad
# y devuelva si cumple la condición de mayoría de edad

# Prueba la función con varios valores
`,
  hints: [
    "La función debe devolver un valor booleano.",
    "Piensa qué comparación separa los dos casos.",
    "Prueba también el caso límite."
  ],
  expectedOutput: "Debe devolver True si la edad cumple la mayoría de edad y False en caso contrario.",
  checks: [
    "Debe definir una función con un parámetro.",
    "Debe evaluar la edad recibida.",
    "Debe devolver un booleano.",
    "Debe probar la función con más de un caso.",
    "Debe tratar correctamente el caso límite."
  ]
};

window.EXERCISE_CATALOG["py_tema5_ej6"] = {
  id: "py_tema5_ej6",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 6 – Clasificar número",
  statement: "Devuelve 'positivo', 'negativo' o 'cero'.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Condiciones",
  type: "Ejercicio",
  starterCode:
`# Crea una función que reciba un número
# y devuelva una clasificación:
# positivo, negativo o cero
`,
  hints: [
    "Necesitas distinguir tres casos.",
    "Cada caso debe devolver un resultado claro.",
    "Piensa qué ocurre cuando el número no es mayor ni menor que cero."
  ],
  expectedOutput: "Debe devolver una clasificación correcta del número: positivo, negativo o cero.",
  checks: [
    "Debe definir una función con un parámetro.",
    "Debe usar condiciones.",
    "Debe contemplar números positivos.",
    "Debe contemplar números negativos.",
    "Debe contemplar el cero.",
    "Debe devolver un texto de clasificación."
  ]
};

window.EXERCISE_CATALOG["py_tema5_ej7"] = {
  id: "py_tema5_ej7",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 7 – print o return",
  statement: "Corrige una función para que devuelva un valor útil en lugar de solo imprimirlo.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Diseño",
  type: "Ejercicio",
  starterCode:
`def triple(numero):
    print(numero * 3)

resultado = triple(4)
print(resultado)

# Corrige la función para que resultado
# tenga un valor útil
`,
  hints: [
    "El problema está en lo que entrega la función.",
    "Imprimir algo dentro no siempre permite reutilizar el resultado.",
    "Piensa qué debería recibir la variable resultado."
  ],
  expectedOutput: "Debe mostrar un resultado útil y evitar que la variable resultado valga None.",
  checks: [
    "Debe corregir la función.",
    "La función debe devolver un valor.",
    "La variable resultado debe recibir el valor devuelto.",
    "Debe mostrar el resultado final.",
    "Debe quedar clara la diferencia entre imprimir y devolver."
  ]
};

window.EXERCISE_CATALOG["py_tema5_ej8"] = {
  id: "py_tema5_ej8",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 8 – Varias llamadas",
  statement: "Usa una misma función para calcular el cuadrado de varios números y muestra los resultados.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Reutilización",
  type: "Ejercicio",
  starterCode:
`def cuadrado(numero):
    return numero * numero

# Usa la función con varios valores
# y muestra los resultados de forma clara
`,
  hints: [
    "La función ya está creada.",
    "La clave es reutilizarla varias veces.",
    "Muestra los resultados de forma que se entienda qué valor corresponde a cada llamada."
  ],
  expectedOutput: "Debe mostrar varios cuadrados calculados reutilizando la misma función.",
  checks: [
    "Debe reutilizar la función cuadrado.",
    "Debe llamar a la función más de una vez.",
    "Debe mostrar varios resultados.",
    "La salida debe ser clara para el usuario."
  ]
};

window.EXERCISE_CATALOG["py_tema5_ej9"] = {
  id: "py_tema5_ej9",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 9 – Error de argumentos",
  statement: "Corrige una llamada a función que no respeta los argumentos necesarios.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Depuración",
  type: "Ejercicio",
  starterCode:
`def presentar(nombre, edad):
    print("Me llamo", nombre)
    print("Tengo", edad, "años")

presentar("Ana")
`,
  hints: [
    "Revisa qué datos necesita la función para ejecutarse.",
    "La definición y la llamada deben encajar.",
    "No cambies la función si el problema está en cómo la estás usando."
  ],
  expectedOutput: "Debe ejecutar la función presentar sin error y mostrar nombre y edad.",
  checks: [
    "Debe respetar los parámetros definidos por la función.",
    "Debe corregir la llamada.",
    "Debe proporcionar todos los argumentos necesarios.",
    "El programa debe ejecutarse sin TypeError."
  ]
};

window.EXERCISE_CATALOG["py_tema5_ej10"] = {
  id: "py_tema5_ej10",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 10 – Variable local",
  statement: "Haz que este código funcione con un diseño correcto, sin usar fuera una variable local.",
  difficulty: "Media",
  estimatedTime: "8 min",
  skill: "Ámbito",
  type: "Ejercicio",
  starterCode:
`def crear_mensaje():
    mensaje = "Hola"

print(mensaje)
`,
  hints: [
    "El problema está en dónde existe la variable.",
    "Una variable creada dentro de una función no está disponible en cualquier parte.",
    "Puedes resolverlo haciendo que la función muestre o devuelva el dato."
  ],
  expectedOutput: "Debe mostrar el mensaje sin intentar usar fuera una variable local inaccesible.",
  checks: [
    "Debe respetar el ámbito de las variables.",
    "Debe corregir el uso de la variable local.",
    "Debe mostrar el mensaje de forma válida.",
    "El programa debe ejecutarse sin NameError."
  ]
};

window.EXERCISE_CATALOG["py_tema5_ej11"] = {
  id: "py_tema5_ej11",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 11 – Función booleana",
  statement: "Crea una función que indique si un número es par y pruébala con varios casos.",
  difficulty: "Media",
  estimatedTime: "7 min",
  skill: "Booleanos",
  type: "Ejercicio",
  starterCode:
`# Crea una función que indique si un número es par

# Después pruébala con varios números
`,
  hints: [
    "La función debe devolver verdadero o falso.",
    "Piensa qué propiedad distingue a un número par.",
    "Prueba al menos un caso par y uno impar."
  ],
  expectedOutput: "Debe devolver si un número es par y demostrarlo con varios casos.",
  checks: [
    "Debe definir una función.",
    "La función debe recibir un número.",
    "Debe devolver un booleano.",
    "Debe probar varios valores.",
    "Debe diferenciar pares e impares."
  ]
};

window.EXERCISE_CATALOG["py_tema5_ej12"] = {
  id: "py_tema5_ej12",
  language: "python",
  topic: "python/tema-5",
  title: "Ejercicio 12 – Función limpia",
  statement: "Reescribe esta idea para que el nombre sea claro, el cálculo esté separado de la presentación y el diseño sea reutilizable.",
  difficulty: "Media",
  estimatedTime: "9 min",
  skill: "Buenas prácticas",
  type: "Ejercicio",
  starterCode:
`def hacer_cosa(x):
    print("Resultado:", x * 1.21)
`,
  hints: [
    "El nombre actual no explica bien la intención.",
    "Piensa qué parte calcula y qué parte muestra.",
    "Una función reutilizable suele devolver un valor útil."
  ],
  expectedOutput: "Debe quedar una función con nombre claro, cálculo separado y diseño reutilizable.",
  checks: [
    "Debe mejorar el nombre de la función.",
    "Debe separar cálculo y presentación.",
    "Debe usar return si el resultado debe reutilizarse.",
    "Debe mantener el cálculo principal.",
    "La solución debe ser más clara que la inicial."
  ]
};

window.EXERCISE_CATALOG["py_tema5_reto1"] = {
  id: "py_tema5_reto1",
  language: "python",
  topic: "python/tema-5",
  title: "Mini reto – Saludo reutilizable",
  statement: "Crea una función que construya un saludo y devuelva el texto para reutilizarlo varias veces.",
  difficulty: "Reto",
  estimatedTime: "10 min",
  skill: "Texto + return",
  type: "Reto",
  starterCode:
`# Crea una función que construya un saludo reutilizable

# Llama a la función con varios nombres
# y muestra los resultados
`,
  hints: [
    "Aquí interesa construir texto y devolverlo.",
    "La función debe poder usarse con distintos nombres.",
    "Demuestra la reutilización con varias llamadas."
  ],
  expectedOutput: "Debe mostrar varios saludos creados mediante una función reutilizable.",
  checks: [
    "Debe definir una función con un parámetro.",
    "La función debe devolver un saludo.",
    "Debe llamar a la función varias veces.",
    "Debe mostrar los resultados.",
    "Debe demostrar reutilización."
  ]
};

window.EXERCISE_CATALOG["py_tema5_reto2"] = {
  id: "py_tema5_reto2",
  language: "python",
  topic: "python/tema-5",
  title: "Reto final – Precio final",
  statement: "Crea funciones para calcular IVA, aplicar descuento y devolver el precio final con diseño limpio.",
  difficulty: "Reto final",
  estimatedTime: "12-15 min",
  skill: "Integración",
  type: "Reto final",
  starterCode:
`precio = 100
porcentaje = 10

# Crea funciones para calcular IVA,
# aplicar descuento
# y obtener un precio final limpio
`,
  hints: [
    "Divide el problema en varias funciones pequeñas.",
    "Cada función debe tener una responsabilidad clara.",
    "Usa los valores devueltos para construir el cálculo final."
  ],
  expectedOutput: "Debe calcular y mostrar un precio final usando funciones separadas para IVA y descuento.",
  checks: [
    "Debe crear una función relacionada con el IVA.",
    "Debe crear una función relacionada con el descuento.",
    "Debe usar return para reutilizar resultados.",
    "Debe combinar las funciones para obtener el precio final.",
    "Debe mostrar el resultado final."
  ]
};