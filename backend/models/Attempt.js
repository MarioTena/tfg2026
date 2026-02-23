// ============================================================================
// models/Attempt.js
// Representa un intento de ejecución de código de un usuario
// ============================================================================

const mongoose = require("mongoose");

const AttemptSchema = new mongoose.Schema({
  // Usuario autenticado que ejecuta el código
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Lenguaje usado
  language: {
    type: String,
    enum: ["python", "c"],
    required: true,
  },

  // Código fuente enviado por el alumno
  code: {
    type: String,
    required: true,
  },

  // Salida estándar
  stdout: {
    type: String,
    default: "",
  },

  // Errores
  stderr: {
    type: String,
    default: "",
  },

  // Resultado final
  status: {
    type: String,
    enum: ["success", "error", "timeout"],
    default: "success",
  },

  // Tiempo de ejecución
  timeMs: {
    type: Number,
    default: 0,
  },

  aiFeedback: {
    message: { type: String, default: "" },
    level: { type: String, default: "ok" },
    createdAt: { type: Date },
    exerciseId: { type: String, default: null },
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Attempt", AttemptSchema);
