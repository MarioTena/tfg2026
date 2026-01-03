// ============================================================================
// SERVER.JS - Backend básico del TFG
// Servidor Express + MongoDB para gestionar ejecuciones y pruebas
// ============================================================================

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const Attempt = require("./models/Attempt");
const { runCodeInDocker } = require("./utils/dockerRunner"); // Python con Docker, C simulado
const { generateFeedbackForAttempt } = require("./services/aiFeedback");
const authRoutes = require("./routes/authRoutes");
const { requireAuth } = require("./middleware/requireAuth");


// ============================================================================
// Configuración inicial
// ============================================================================

// Cargo las variables del archivo .env (por ejemplo, MONGO_URI y PORT)
dotenv.config();

// Inicializo la aplicación Express
const app = express();

// Permito peticiones desde el frontend (CORS abierto por ahora)
app.use(cors());

// Habilito el uso de JSON en las peticiones
app.use(express.json());
// ============================================================================
// Rutas de autenticación
// ============================================================================
app.use("/api/auth", authRoutes);

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
// Parámetro opcional: ?limit=10 (máximo 50)
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
    const { language, code, exerciseId } = req.body || {};

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

    // 1) Ejecutar código
    const result = await runCodeInDocker(language, code);

    // 2) Crear intento asociado al usuario del token
    const attempt = new Attempt({
      userId: req.user.id,
      language,
      code,
      stdout: result.stdout,
      stderr: result.stderr,
      status: result.status,
      timeMs: result.timeMs,
    });

    // 3) Generar feedback automático (por ahora heurístico)
    const feedback = await generateFeedbackForAttempt(attempt, { exerciseId });

    // 4) Guardar feedback dentro del intento
    attempt.aiFeedback = {
      message: feedback.message,
      level: feedback.level,
      createdAt: new Date(),
      exerciseId: exerciseId || null,
    };

    // 5) Guardar en Mongo
    const saved = await attempt.save();

    // 6) Responder
    return res.json({
      ok: true,
      run: result,
      attemptId: saved._id,
      feedback,
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
// sArranque del servidor
// ============================================================================
app.listen(PORT, () => {
  console.log(`🚀 API escuchando en http://localhost:${PORT}`);
});
