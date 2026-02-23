// ============================================================================
// Registro, login y endpoint /me (requiere JWT)
// ============================================================================

const express = require("express"); //creamos rutas
const bcrypt = require("bcryptjs"); //ciframos contraseñas
const jwt = require("jsonwebtoken"); //creamos tokens de sesion
const User = require("../models/User"); //modelo de usuario en MongoDB
const { requireAuth } = require("../middleware/requireAuth");// protegemos rutas privadas

const router = express.Router(); //creamos un miniservidor se rutas

// ----------------------------------------------------------------------------
// Helper: crear token JWT
// Con JWT podemos identificar al usuario sin mantener sesiones en el servidor.
// ----------------------------------------------------------------------------
function signToken(user) {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  if (!secret) {
    throw new Error("Falta JWT_SECRET en el .env");
  }

  // Guardamos lo mínimo dentro del token
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    secret,
    { expiresIn }
  );
}

// ----------------------------------------------------------------------------
// POST /api/auth/register
// body: { name, email, password }
// ----------------------------------------------------------------------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({ ok: false, error: "Faltan campos: name, email, password" });
    }

    if (password.length < 6) {
      return res.status(400).json({ ok: false, error: "La contraseña debe tener al menos 6 caracteres" });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ ok: false, error: "Ya existe un usuario con ese email" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      role: "student",
    });

    const token = signToken(user);

    return res.json({
      ok: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
});

// ----------------------------------------------------------------------------
// POST /api/auth/login
// body: { email, password }
// ----------------------------------------------------------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ ok: false, error: "Faltan campos: email, password" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ ok: false, error: "Credenciales incorrectas" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ ok: false, error: "Credenciales incorrectas" });
    }

    const token = signToken(user);

    return res.json({
      ok: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
});

// ----------------------------------------------------------------------------
// GET /api/auth/me  (requiere token)
// mostramos info del usuario por pantalla y lo usamos para la validación del token en requireAuth.js
// ----------------------------------------------------------------------------
router.get("/me", requireAuth, async (req, res) => {
  // req.user viene del middleware
  return res.json({
    ok: true,
    user: req.user,
  });
});

module.exports = router;