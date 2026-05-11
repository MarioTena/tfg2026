const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [type, token] = header.split(" ");

    if (type !== "Bearer" || !token) {
      return res.status(401).json({
        ok: false,
        error: "Falta token (Authorization: Bearer <token>)"
      });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({
        ok: false,
        error: "Falta JWT_SECRET en el .env"
      });
    }

    const payload = jwt.verify(token, secret);

    const userId =
      payload.sub ||
      payload.id ||
      payload._id ||
      payload.userId ||
      null;

    if (!userId) {
      return res.status(401).json({
        ok: false,
        error: "Token válido pero sin identificador de usuario"
      });
    }

    const user = await User.findById(userId).select(
      "_id name email role createdAt theme"
    );

    if (!user) {
      return res.status(401).json({
        ok: false,
        error: "Token válido pero usuario no existe"
      });
    }

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      theme: user.theme
    };

    next();
  } catch (e) {
    console.error("JWT error:", e.message);
    return res.status(401).json({
      ok: false,
      error: "Token inválido o expirado"
    });
  }
}

module.exports = { requireAuth };