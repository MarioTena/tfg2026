// ============================================================================
// Registro, login y endpoint /me (requiere JWT)
// ============================================================================

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { requireAuth } = require("../middleware/requireAuth");
const crypto = require("crypto");
const { sendWelcomeEmail, sendResetPasswordEmail } = require("../services/emailService");

const router = express.Router();

// ----------------------------------------------------------------------------
// Helper: crear token JWT
// ----------------------------------------------------------------------------
function signToken(user) {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  if (!secret) {
    throw new Error("Falta JWT_SECRET en el .env");
  }

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

    try {
      await sendWelcomeEmail({
        to: user.email,
        name: user.name,
      });
    } catch (emailError) {
      console.error("Error enviando email de bienvenida:", emailError);
    }

    const token = signToken(user);

    return res.json({
      ok: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        theme: user.theme || "dark",
        onboardingCompleted: user.onboardingCompleted === true,
      },
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
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        theme: user.theme || "dark",
        onboardingCompleted: user.onboardingCompleted === true,
      },
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
});

// ----------------------------------------------------------------------------
// GET /api/auth/me
// ----------------------------------------------------------------------------
router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("_id name email role theme onboardingCompleted");

    if (!user) {
      return res.status(404).json({ ok: false, error: "Usuario no encontrado." });
    }

    return res.json({
      ok: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        theme: user.theme || "dark",
        onboardingCompleted: user.onboardingCompleted === true,
      },
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
});

// ----------------------------------------------------------------------------
// POST /api/auth/forgot-password
// ----------------------------------------------------------------------------
router.post("/forgot-password", async (req, res) => {
  try {
    const email = String(req.body?.email || "").toLowerCase().trim();

    if (!email) {
      return res.status(400).json({ ok: false, error: "Debes indicar un email." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        ok: true,
        message: "Si el email existe, recibirás instrucciones para cambiar la contraseña.",
      });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 30);

    user.resetPasswordToken = rawToken;
    user.resetPasswordExpires = expires;
    await user.save();

    const resetUrl = `${process.env.APP_BASE_URL}/reset-password.html?token=${encodeURIComponent(rawToken)}`;

    await sendResetPasswordEmail({
      to: user.email,
      name: user.name,
      resetUrl,
    });

    return res.json({
      ok: true,
      message: "Si el email existe, recibirás instrucciones para cambiar la contraseña.",
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
});

// ----------------------------------------------------------------------------
// POST /api/auth/reset-password
// ----------------------------------------------------------------------------
router.post("/reset-password", async (req, res) => {
  try {
    const token = String(req.body?.token || "").trim();
    const password = String(req.body?.password || "");

    if (!token || !password) {
      return res.status(400).json({ ok: false, error: "Faltan campos: token, password" });
    }

    if (password.length < 6) {
      return res.status(400).json({ ok: false, error: "La contraseña debe tener al menos 6 caracteres" });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ ok: false, error: "El enlace no es válido o ha caducado." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    user.passwordHash = passwordHash;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return res.json({
      ok: true,
      message: "Contraseña actualizada correctamente.",
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
});

// ----------------------------------------------------------------------------
// PUT /api/auth/profile
// ----------------------------------------------------------------------------
router.put("/profile", requireAuth, async (req, res) => {
  try {
    const { name, theme } = req.body || {};
    const updates = {};

    if (typeof name !== "undefined") {
      const trimmedName = String(name).trim();
      if (!trimmedName) {
        return res.status(400).json({ ok: false, error: "El nombre no puede estar vacío." });
      }
      updates.name = trimmedName;
    }

    if (typeof theme !== "undefined") {
      if (!["dark", "light"].includes(theme)) {
        return res.status(400).json({ ok: false, error: "Tema no válido." });
      }
      updates.theme = theme;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ ok: false, error: "Usuario no encontrado." });
    }

    return res.json({
      ok: true,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        theme: updatedUser.theme || "dark",
        onboardingCompleted: updatedUser.onboardingCompleted === true,
      },
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
});

// ----------------------------------------------------------------------------
// PUT /api/auth/onboarding
// ----------------------------------------------------------------------------
router.put("/onboarding", requireAuth, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { onboardingCompleted: true } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ ok: false, error: "Usuario no encontrado." });
    }

    return res.json({
      ok: true,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        theme: updatedUser.theme || "dark",
        onboardingCompleted: updatedUser.onboardingCompleted === true,
      },
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
});

module.exports = router;