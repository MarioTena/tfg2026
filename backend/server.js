const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const path = require("path");
const fs = require("fs");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

const Attempt = require("./models/Attempt");
const { runCodeInDocker } = require("./utils/dockerRunner");
const authRoutes = require("./routes/authRoutes");
const { requireAuth } = require("./middleware/requireAuth");
const progressRoutes = require("./routes/progressRoutes");
const aiRoutes = require("./routes/aiRoutes");
const {
  startInteractivePythonSession,
  sendInputToSession,
  stopSession,
  stopAllUserSessions
} = require("./utils/interactiveRunner");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/tfgdb";
const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL;

if (!JWT_SECRET) {
  console.error("❌ Falta JWT_SECRET en el archivo .env");
  process.exit(1);
}

if (!FRONTEND_URL) {
  console.error("❌ Falta FRONTEND_URL en el archivo .env");
  process.exit(1);
}

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://tfg2026-frontend.onrender.com",
].filter(Boolean).map((url) => url.replace(/\/+$/, ""));

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origen no permitido por CORS: ${origin}`));
  },
  credentials: true
}));

/*app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}));*/

app.use(express.json({ limit: "1mb" }));

const uploadsRoot = path.join(__dirname, "uploads");
const avatarsDir = path.join(uploadsRoot, "avatars");

if (!fs.existsSync(uploadsRoot)) {
  fs.mkdirSync(uploadsRoot);
}

if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

app.use("/uploads", express.static(uploadsRoot));

app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/ai", aiRoutes);

mongoose
  .connect(MONGO_URI, { dbName: "tfgdb" })
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => {
    console.error("❌ Error conectando a MongoDB:", err.message);
    process.exit(1);
  });

function parseSafeLimit(value, defaultValue = 5, max = 20) {
  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed) || parsed <= 0) {
    return defaultValue;
  }

  return Math.min(parsed, max);
}

app.get("/api/health", async (req, res) => {
  try {
    const db = mongoose.connection?.db;

    if (!db) {
      return res.status(500).json({
        api: "ok",
        mongo: "fail",
        error: "MongoDB no está inicializado"
      });
    }

    const admin = db.admin();
    const ping = await admin.ping();

    return res.json({
      api: "ok",
      mongo: ping?.ok === 1 ? "ok" : "fail"
    });
  } catch (error) {
    return res.status(500).json({
      api: "ok",
      mongo: "fail",
      error: error.message
    });
  }
});

app.get("/api/attempts", requireAuth, async (req, res) => {
  try {
    const limit = parseSafeLimit(req.query.limit, 5, 20);

    const attempts = await Attempt.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(limit);

    return res.json({
      ok: true,
      items: attempts
    });
  } catch (error) {
    return res.status(500).json({ ok: false, error: "Error interno obteniendo intentos." });
  }
});

app.post("/api/run", requireAuth, async (req, res) => {
  try {
    const { language, code, stdin = "", exerciseId, topic } = req.body || {};

    if (!language || !code) {
      return res.status(400).json({
        ok: false,
        error: "Faltan campos: language, code"
      });
    }

    const allowedLanguages = ["python", "c"];
    if (!allowedLanguages.includes(language)) {
      return res.status(400).json({
        ok: false,
        error: `Lenguaje no soportado. Usa: ${allowedLanguages.join(", ")}.`
      });
    }

    const result = await runCodeInDocker(language, code, stdin);

    const attempt = new Attempt({
      userId: req.user.id,
      language,
      topic: topic || null,
      exerciseId: exerciseId || null,
      code,
      stdin: stdin || "",
      stdout: result.stdout,
      stderr: result.stderr,
      status: result.status,
      timeMs: result.timeMs
    });

    const saved = await attempt.save();

    return res.json({
      ok: true,
      run: result,
      attemptId: saved._id
    });
  } catch (error) {
    console.error("❌ Error en /api/run:", error);
    return res.status(500).json({
      ok: false,
      error: "Error interno en /api/run"
    });
  }
});


const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origen no permitido por Socket.IO CORS: ${origin}`));
    },
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ["polling"]
});

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Token no proporcionado"));
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const normalizedUserId =
      decoded.id ||
      decoded._id ||
      decoded.userId ||
      decoded.sub ||
      decoded.user?._id ||
      decoded.user?.id ||
      null;

    if (!normalizedUserId) {
      return next(new Error("Token válido pero sin identificador de usuario"));
    }

    socket.user = {
      ...decoded,
      id: normalizedUserId
    };

    return next();
  } catch (error) {
    return next(new Error("Token inválido"));
  }
});

io.on("connection", (socket) => {
  socket.on("console:start", async ({ language, code, exerciseId, topic }) => {
    try {
      if (language !== "python") {
        socket.emit("console:error", {
          message: "La consola interactiva solo está disponible para Python."
        });
        return;
      }

      if (!code || !String(code).trim()) {
        socket.emit("console:error", {
          message: "No hay código para ejecutar."
        });
        return;
      }

      const result = await startInteractivePythonSession({
        code,
        language,
        exerciseId: exerciseId || null,
        topic: topic || null,
        userId: socket.user.id,
        socket,
        io
      });

      socket.emit("console:started", result);
    } catch (error) {
      socket.emit("console:error", {
        message: error.message || "No se pudo iniciar la consola interactiva."
      });
    }
  });

  socket.on("console:input", ({ sessionId, input }) => {
    try {
      if (!sessionId) {
        socket.emit("console:error", {
          message: "Falta sessionId."
        });
        return;
      }

      sendInputToSession({
        sessionId,
        input,
        userId: socket.user.id
      });
    } catch (error) {
      socket.emit("console:error", {
        sessionId,
        message: error.message || "No se pudo enviar la entrada."
      });
    }
  });

  socket.on("console:stop", async ({ sessionId }) => {
    try {
      if (!sessionId) return;

      await stopSession({
        sessionId,
        userId: socket.user.id
      });
    } catch (error) {
      socket.emit("console:error", {
        sessionId,
        message: error.message || "No se pudo detener la sesión."
      });
    }
  });

  socket.on("disconnect", async () => {
    try {
      await stopAllUserSessions(socket.user.id);
    } catch (error) {
      console.error("❌ Error al cerrar sesiones del usuario:", error.message);
    }
  });
});

app.use((err, req, res, next) => {
  console.error("❌ Error no controlado:", err);
  res.status(500).json({
    ok: false,
    error: "Error interno del servidor"
  });
});

server.listen(PORT, () => {
  console.log(`🚀 API escuchando en puerto ${PORT}`);
});

async function shutdown(signal) {
  console.log(`\n⚠️ Recibido ${signal}. Cerrando servidor...`);

  try {
    await mongoose.connection.close();
    server.close(() => {
      console.log("✅ Servidor cerrado correctamente");
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Error cerrando la aplicación:", error.message);
    process.exit(1);
  }
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));