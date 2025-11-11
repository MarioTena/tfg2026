// Importamos mongoose, la librería que nos permite modelar y comunicar con MongoDB
const mongoose = require("mongoose");

// Creamos un nuevo esquema (estructura de datos) llamado AttemptSchema
// Cada campo define un tipo y posibles restricciones (required, enum, default, etc.)
const AttemptSchema = new mongoose.Schema({
  // Nombre o identificador del alumno que ejecuta el código
  user: { type: String, required: true },

  // Lenguaje del código enviado (solo se permiten “python” o “c”)
  language: { type: String, required: true, enum: ["python", "c"] },

  // El propio código fuente que escribió el alumno
  code: { type: String, required: true },

  // Salida normal del programa (lo que se muestra por consola)
  stdout: { type: String, default: "" },

  // Errores producidos en la ejecución o compilación
  stderr: { type: String, default: "" },

  // Estado del intento: “success”, “error” o “timeout”
  status: { type: String, enum: ["success", "error", "timeout"], default: "success" },

  // Tiempo de ejecución en milisegundos
  timeMs: { type: Number, default: 0 },

  // Fecha en la que se guardó el intento
  createdAt: { type: Date, default: Date.now },
});

// Exportamos el modelo para poder usarlo en otras partes del backend.
// “Attempt” será el nombre de la colección en MongoDB (pluraliza automáticamente a “attempts”)
module.exports = mongoose.model("Attempt", AttemptSchema);
