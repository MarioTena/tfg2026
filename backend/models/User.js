// ============================================================================
// Modelo de usuario para login (registro + autenticación con JWT)
// ============================================================================

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // Nombre visible del usuario/alumno
    name: { type: String, required: true, trim: true },

    // Email único para login
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },

    // Contraseña cifrada (NUNCA guardamos la contraseña en claro)
    passwordHash: { type: String, required: true },

    // Rol simple (por si luego quieres admin/profesor/alumno)
    role: { type: String, enum: ["student", "admin"], default: "student" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
