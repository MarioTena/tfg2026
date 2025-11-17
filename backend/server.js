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
// POST /api/attempts
// Guarda un intento de ejecución usando el modelo Attempt
// Este endpoint se usa para registrar intentos manuales o desde /api/run
// ============================================================================
app.post("/api/attempts", async (req, res) => {
  try {
    const attempt = new Attempt(req.body);
    const saved = await attempt.save();

    res.json({ ok: true, saved });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ============================================================================
// ✅ GET /api/attempts
// Devuelve los últimos N intentos guardados en la colección "attempts".
// Parámetros opcionales:
//   - ?limit=5  → número máximo de intentos (máx 50)
//   - ?user=alumno1 → filtrar por usuario
// ============================================================================
app.get("/api/attempts", async (req, res) => {
  try {
    const limit = Math.max(
      1,
      Math.min(parseInt(req.query.limit || "5", 10), 50)
    );

    const user = (req.query.user || "").trim();

    const filter = {};
    if (user) {
      filter.user = user;
    }

    const items = await Attempt.find(filter)
      .sort({ createdAt: -1 }) // más recientes primero
      .limit(limit)
      .lean();

    res.json({
      ok: true,
      count: items.length,
      items,
    });
  } catch (e) {
    console.error("Error en GET /api/attempts:", e);
    res.status(500).json({ ok: false, error: e.message });
  }
});


// ============================================================================
// POST /api/run  (Versión sin Docker real)
// Ejecuta el código recibido (por ahora simulado en dockerRunner.js)
// Flujo:
// 1. Valida user, language y code
// 2. Ejecuta con runCodeInDocker()
// 3. Guarda el intento en MongoDB
// 4. Devuelve el resultado al cliente
// ============================================================================
app.post("/api/run", async (req, res) => {
  try {
    const { user, language, code } = req.body || {};

    if (!user || !language || !code) {
      return res.status(400).json({
        ok: false,
        error: "Faltan campos obligatorios: user, language, code",
      });
    }

    const allowedLanguages = ["python", "c"];
    if (!allowedLanguages.includes(language)) {
      return res.status(400).json({
        ok: false,
        error: `Lenguaje no soportado. Usa: ${allowedLanguages.join(", ")}.`,
      });
    }

    // Ejecuto el código (simulado)
    const result = await runCodeInDocker(language, code);

    // Guardo el intento con el resultado obtenido
    const attempt = new Attempt({
      user,
      language,
      code,
      stdout: result.stdout,
      stderr: result.stderr,
      status: result.status,
      timeMs: result.timeMs,
    });

    const saved = await attempt.save();

    res.json({
      ok: true,
      run: result,
      attemptId: saved._id,
    });
  } catch (e) {
    console.error("Error en /api/run:", e);
    res.status(500).json({
      ok: false,
      error: "Error interno en /api/run",
    });
  }
});

// ============================================================================
// sArranque del servidor
// ============================================================================
app.listen(PORT, () => {
  console.log(`🚀 API escuchando en http://localhost:${PORT}`);
});
