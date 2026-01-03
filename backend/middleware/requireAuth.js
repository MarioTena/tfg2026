// ============================================================================
// Middleware para validar JWT y exponer req.user
// ============================================================================

const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({ ok: false, error: "Falta token (Authorization: Bearer <token>)" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ ok: false, error: "Falta JWT_SECRET en el .env" });
    }

    const payload = jwt.verify(token, secret);
    const userId = payload.sub;

    const user = await User.findById(userId).select("_id name email role createdAt");
    if (!user) {
      return res.status(401).json({ ok: false, error: "Token válido pero usuario no existe" });
    }

    // Dejamos el usuario listo para usar en endpoints
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };

    next();
  } catch (e) {
    console.error("JWT error:", e.message);
    return res.status(401).json({ ok: false, error: "Token inválido o expirado" });
  }
}

module.exports = { requireAuth };
