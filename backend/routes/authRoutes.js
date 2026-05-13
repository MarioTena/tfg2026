const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const User = require("../models/User");
const { requireAuth } = require("../middleware/requireAuth");
const {
  sendWelcomeEmail,
  sendResetPasswordEmail,
  sendVerifyEmail,
} = require("../services/emailService");

const router = express.Router();

const avatarsDir = path.join(__dirname, "..", "uploads", "avatars");

if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, avatarsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase() || ".jpg";
    const safeExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext) ? ext : ".jpg";
    cb(null, `avatar-${req.user.id}-${Date.now()}${safeExt}`);
  },
});

function avatarFileFilter(req, file, cb) {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error("Formato no válido. Usa JPG, PNG o WEBP."));
  }
  cb(null, true);
}

const uploadAvatar = multer({
  storage,
  fileFilter: avatarFileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

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

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getAppBaseUrl() {
  const baseUrl = process.env.APP_BASE_URL;
  if (!baseUrl) {
    throw new Error("Falta APP_BASE_URL en el .env");
  }
  return baseUrl.replace(/\/+$/, "");
}

function buildAvatarUrl(req, filename) {
  return `${req.protocol}://${req.get("host")}/uploads/avatars/${filename}`;
}

function deleteOldAvatarFile(avatarUrl) {
  if (!avatarUrl) return;

  try {
    const parsed = new URL(avatarUrl);
    const filename = path.basename(parsed.pathname);
    if (!filename) return;

    const absolutePath = path.join(avatarsDir, filename);

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }
  } catch {
    try {
      const filename = path.basename(String(avatarUrl));
      const absolutePath = path.join(avatarsDir, filename);

      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
      }
    } catch {}
  }
}

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({ ok: false, error: "Faltan campos: name, email, password" });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const trimmedName = String(name).trim();

    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({ ok: false, error: "Email no válido." });
    }

    if (password.length < 6) {
      return res.status(400).json({ ok: false, error: "La contraseña debe tener al menos 6 caracteres" });
    }

    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({ ok: false, error: "Ya existe un usuario con ese email" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");
    const emailVerificationExpires = new Date(Date.now() + 1000 * 60 * 60 * 24);

    const user = await User.create({
      name: trimmedName,
      email: normalizedEmail,
      passwordHash,
      role: "student",
      theme: "dark",
      avatarUrl: null,
      emailVerified: false,
      emailVerificationToken,
      emailVerificationExpires,
    });

    const appBaseUrl = getAppBaseUrl();
    const verifyUrl = `${appBaseUrl}/verify-email.html?token=${encodeURIComponent(emailVerificationToken)}`;

    await sendVerifyEmail({
      to: user.email,
      name: user.name,
      verifyUrl,
    });

    return res.json({
      ok: true,
      message: "Cuenta creada. Te hemos enviado un correo para verificar tu cuenta antes de iniciar sesión.",
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
});

// GET /api/auth/verify-email
router.get("/verify-email", async (req, res) => {
  try {
    const token = String(req.query?.token || "").trim();

    if (!token) {
      return res.status(400).json({ ok: false, error: "Falta token." });
    }

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ ok: false, error: "El enlace de verificación no es válido o ha caducado." });
    }

    user.emailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;

    await user.save();

    try {
      await sendWelcomeEmail({
        to: user.email,
        name: user.name,
      });
    } catch (emailError) {
      console.error("Error enviando email de bienvenida:", emailError);
    }

    return res.json({
      ok: true,
      message: "Correo verificado correctamente. Ya puedes iniciar sesión.",
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ ok: false, error: "Faltan campos: email, password" });
    }

    const normalizedEmail = String(email).toLowerCase().trim();

    if (!isValidEmail(normalizedEmail)) {
      return res.status(400).json({ ok: false, error: "Email no válido." });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ ok: false, error: "Credenciales incorrectas" });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ ok: false, error: "Credenciales incorrectas" });
    }

    if (user.emailVerified !== true) {
      return res.status(403).json({
        ok: false,
        error: "Debes verificar tu correo antes de iniciar sesión.",
        code: "EMAIL_NOT_VERIFIED",
      });
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
        avatarUrl: user.avatarUrl || null,
        onboardingCompleted: user.onboardingCompleted === true,
      },
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
});

// GET /api/auth/me
router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("_id name email role theme avatarUrl onboardingCompleted");

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
        avatarUrl: user.avatarUrl || null,
        onboardingCompleted: user.onboardingCompleted === true,
      },
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
});

// POST /api/auth/forgot-password
router.post("/forgot-password", async (req, res) => {
  try {
    const email = String(req.body?.email || "").toLowerCase().trim();

    if (!email) {
      return res.status(400).json({ ok: false, error: "Debes indicar un email." });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ ok: false, error: "Email no válido." });
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

    const resetUrl = `${getAppBaseUrl()}/reset-password.html?token=${encodeURIComponent(rawToken)}`;

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

// POST /api/auth/reset-password
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

// PUT /api/auth/profile
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

    if (!Object.keys(updates).length) {
      return res.status(400).json({ ok: false, error: "No hay cambios para guardar." });
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
        avatarUrl: updatedUser.avatarUrl || null,
        onboardingCompleted: updatedUser.onboardingCompleted === true,
      },
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
});

// POST /api/auth/avatar
router.post("/avatar", requireAuth, (req, res) => {
  uploadAvatar.single("avatar")(req, res, async (error) => {
    try {
      if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({ ok: false, error: "La imagen no puede superar 2 MB." });
        }
        return res.status(400).json({ ok: false, error: error.message || "No se pudo subir la imagen." });
      }

      if (error) {
        return res.status(400).json({ ok: false, error: error.message || "No se pudo subir la imagen." });
      }

      if (!req.file) {
        return res.status(400).json({ ok: false, error: "Debes seleccionar una imagen." });
      }

      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ ok: false, error: "Usuario no encontrado." });
      }

      const oldAvatarUrl = user.avatarUrl || null;
      const avatarUrl = buildAvatarUrl(req, req.file.filename);

      user.avatarUrl = avatarUrl;
      await user.save();

      if (oldAvatarUrl) {
        deleteOldAvatarFile(oldAvatarUrl);
      }

      return res.json({
        ok: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          theme: user.theme || "dark",
          avatarUrl: user.avatarUrl || null,
          onboardingCompleted: user.onboardingCompleted === true,
        },
      });
    } catch (e) {
      return res.status(500).json({ ok: false, error: e.message });
    }
  });
});

// PUT /api/auth/onboarding
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
        avatarUrl: updatedUser.avatarUrl || null,
        onboardingCompleted: updatedUser.onboardingCompleted === true,
      },
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: e.message });
  }
});

module.exports = router;