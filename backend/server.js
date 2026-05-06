// ============================================================================
// SERVER.JS - Backend básico del TFG
// Servidor Express + MongoDB para gestionar ejecuciones y pruebas
// ============================================================================

//Infrestructura de API
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");


const mongoose = require("mongoose"); //conexion mongodb

const Attempt = require("./models/Attempt"); //guardar intentos
const { runCodeInDocker } = require("./utils/dockerRunner"); //ejecutar codigo en Docker
const authRoutes = require("./routes/authRoutes"); //rutas de registro/login
const { requireAuth } = require("./middleware/requireAuth"); //middleware para proteger endpoints
const progressRoutes = require("./routes/progressRoutes");
const aiRoutes = require("./routes/aiRoutes");



// ============================================================================
// Configuración inicial
// ============================================================================

// Cargo las variables del archivo .env (por ejemplo MONGO_URI y PORT)
dotenv.config();

// Inicializo la aplicación Express
const app = express();

// Permito peticiones desde el frontend al backend
app.use(cors());

// Habilito el uso de JSON en las peticiones
app.use(express.json());
// ============================================================================
// Rutas de autenticación
// ============================================================================
app.use("/api/auth", authRoutes);

app.use("/api/progress", progressRoutes);

app.use("/api/ai", aiRoutes);

// Puerto donde escuchará la API (por defecto 3000)
const PORT = process.env.PORT || 3000;

// URL de conexión a MongoDB (si no hay variable, usa la local)
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/tfgdb";

// ============================================================================
// Conexión a MongoDB
// ============================================================================
mongoose
  .connect(MONGO_URI, { dbName: "tfgdb" })
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => {
    console.error("❌ Error conectando a Mongo:", err.message);
    process.exit(1);
  });

// ============================================================================
// GET /api/health
// Comprueba que la API responde y que MongoDB está accesible
// ============================================================================
app.get("/api/health", async (req, res) => {
  try {
    const admin = mongoose.connection.db.admin();
    const ping = await admin.ping();

    res.json({
      api: "ok",
      mongo: ping?.ok === 1 ? "ok" : "fail",
    });
  } catch (e) {
    res.status(500).json({
      api: "ok",
      mongo: "fail",
      error: e.message,
    });
  }
});

// ============================================================================
// POST /api/test-insert
// Inserta un documento de prueba en la colección "tests"
// Sirve para probar que se puede escribir en MongoDB
// ============================================================================
app.post("/api/test-insert", async (req, res) => {
  try {
    const { note = "Hola TFG", meta = {} } = req.body || {};

    const doc = {
      note,
      meta,
      at: new Date(),
    };

    const result = await mongoose.connection.db
      .collection("tests")
      .insertOne(doc);

    res.json({ ok: true, insertedId: result.insertedId });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ============================================================================
// GET /api/test-list
// Devuelve los últimos N documentos de la colección "tests"
// ============================================================================
app.get("/api/test-list", async (req, res) => {
  try {
    const limit = Math.max(
      1,
      Math.min(parseInt(req.query.limit || "5", 10), 50)
    );

    const items = await mongoose.connection.db
      .collection("tests")
      .find({})
      .sort({ at: -1 })
      .limit(limit)
      .toArray();

    res.json({
      ok: true,
      count: items.length,
      items,
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});


//Aqui empezamos con los endpoints reales

// ============================================================================
// ✅ GET /api/attempts
// Devuelve los últimos N intentos guardados en la colección "attempts".
// ============================================================================
app.get("/api/attempts", requireAuth, async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || "5", 10), 20);

    const attempts = await Attempt.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json({
      ok: true,
      items: attempts,
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});



// ============================================================================
// ✅ POST /api/run
// ============================================================================
app.post("/api/run", requireAuth, async (req, res) => {
  try {
    const { language, code, stdin = "", exerciseId, topic } = req.body || {};

    if (!language || !code) {
      return res.status(400).json({
        ok: false,
        error: "Faltan campos: language, code",
      });
    }

    const allowedLanguages = ["python", "c"];
    if (!allowedLanguages.includes(language)) {
      return res.status(400).json({
        ok: false,
        error: `Lenguaje no soportado. Usa: ${allowedLanguages.join(", ")}.`,
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
      timeMs: result.timeMs,
    });

    const saved = await attempt.save();

    return res.json({
      ok: true,
      run: result,
      attemptId: saved._id,
    });
  } catch (e) {
    console.error("❌ Error en /api/run:", e);
    return res.status(500).json({
      ok: false,
      error: "Error interno en /api/run",
      details: e.message,
    });
  }
});

// ============================================================================
// Arranque del servidor
// ============================================================================
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const {
  startInteractivePythonSession,
  sendInputToSession,
  stopSession,
  stopAllUserSessions
} = require("./utils/interactiveRunner");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.use((socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Token no proporcionado"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

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
      id: normalizedUserId,
    };

    next();
  } catch (error) {
    next(new Error("Token inválido"));
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

      if (!code || !code.trim()) {
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
    await stopSession({
      sessionId,
      userId: socket.user.id
    });
  });

  socket.on("disconnect", async () => {
    await stopAllUserSessions(socket.user.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 API escuchando en http://localhost:${PORT}`);
});