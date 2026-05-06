// ============================================================================
// Middleware para validar JWT y exponer req.user y que solo usuarios reales puedan acceder
// ============================================================================

const jwt = require("jsonwebtoken"); //comprueba verficiación, caducidad y manipulacion de tokens
const User = require("../models/User"); //saber si el user sigue existiendo

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

    const payload = jwt.verify(token, secret); //comrpobamos firma, caducicad y se decodifica el contenido
    //el payload contiene lo que metimos al crear el token (nombre, rol etc)
    const userId = payload.sub;

    // confirmamos con la bbdd que el user existe 
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
      theme: user.theme,
    };

    next();
  } catch (e) {
    console.error("JWT error:", e.message);
    return res.status(401).json({ ok: false, error: "Token inválido o expirado" });
  }
}

module.exports = { requireAuth };
