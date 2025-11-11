

// Importamos Express, el framework para crear APIs HTTP
const express = require("express");

// Importamos Mongoose, que nos facilita trabajar con MongoDB desde Node.js
const mongoose = require("mongoose");

// CORS permite que tu frontend (en otro origen/puerto) pueda llamar a este backend
const cors = require("cors");

// Dotenv carga las variables del archivo .env (por ejemplo MONGO_URI, PORT)
const dotenv = require("dotenv");

// Importamos el modelo Attempt, que representa los intentos de ejecución de los alumnos
// (definido en /models/Attempt.js)
const Attempt = require("./models/Attempt");

// Cargamos las variables de entorno definidas en .env
dotenv.config();

// Creamos la aplicación Express
const app = express();

// Habilitamos CORS para permitir peticiones desde el frontend
app.use(cors());

// Habilitamos el parseo automático de JSON en el body de las peticiones
app.use(express.json());

// Puerto donde escuchará la API.
// Si no hay PORT en el .env, usa 3000 por defecto.
const PORT = process.env.PORT || 3000;

// URL de conexión a MongoDB. Si no hay MONGO_URI en .env, usa localhost.
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/tfgdb";

// ============================================================================
// Conexión a MongoDB
// ============================================================================
// Nos conectamos a Mongo usando Mongoose.
// dbName indica el nombre de la base de datos (tfgdb). Si no existe, se crea.
mongoose.connect(MONGO_URI, { dbName: "tfgdb" })
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => {
    console.error("❌ Error conectando a Mongo:", err.message);
    // Si no podemos conectar con la base de datos, cerramos el servidor.
    process.exit(1);
  });

// ============================================================================
// ✅ GET /api/health
// Comprueba que:
//  la API está viva
//  la base de datos responde correctamente
// ============================================================================
app.get("/api/health", async (req, res) => {
  try {
    // Usamos el "admin" de la BD para hacer un ping
    const admin = mongoose.connection.db.admin();
    const ping = await admin.ping();

    res.json({
      api: "ok",                                   // La API está levantada
      mongo: ping?.ok === 1 ? "ok" : "fail",      // Mongo responde o no
    });
  } catch (e) {
    // Si algo falla con Mongo, lo indicamos pero confirmamos que la API responde
    res.status(500).json({ api: "ok", mongo: "fail", error: e.message });
  }
});

// ============================================================================
// ✅ POST /api/test-insert
// Inserta un documento de prueba en la colección "tests".
// Sirve para comprobar que podemos ESCRIBIR en MongoDB.
// ============================================================================
app.post("/api/test-insert", async (req, res) => {
  try {
    // Leemos "note" y "meta" del body. Si no vienen, usamos valores por defecto.
    const { note = "Hola TFG", meta = {} } = req.body || {};

    // Construimos el documento a guardar
    const doc = {
      note,
      meta,
      at: new Date(), // Marca temporal del momento del guardado
    };

    // Insertamos el documento en la colección "tests"
    const result = await mongoose.connection.db
      .collection("tests")
      .insertOne(doc);

    // Devolvemos el id insertado y ok = true
    res.json({ insertedId: result.insertedId, ok: true });
  } catch (e) {
    // Si hay error (por ejemplo, conexión caída), lo devolvemos
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ============================================================================
// ✅ GET /api/test-list
// Lista los últimos N documentos de la colección "tests".
// Sirve para comprobar que podemos LEER de MongoDB.
// ============================================================================
app.get("/api/test-list", async (req, res) => {
  try {
    // Obtenemos el límite desde query (?limit=), con valores seguros
    const limit = Math.max(
      1,
      Math.min(parseInt(req.query.limit || "5", 10), 50)
    );

    // Buscamos documentos en "tests", ordenados por fecha (más recientes primero)
    const items = await mongoose.connection.db
      .collection("tests")
      .find({})
      .sort({ at: -1 })
      .limit(limit)
      .toArray();

    // Devolvemos los resultados
    res.json({ ok: true, count: items.length, items });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ============================================================================
// ✅ POST /api/attempts
// Guarda un intento de ejecución real usando el modelo Attempt.
// Más adelante lo usaremos desde /api/run para registrar ejecuciones de código.
// ============================================================================
app.post("/api/attempts", async (req, res) => {
  try {
    // Creamos una nueva instancia del modelo Attempt con los datos del body
    // Esperamos campos como:
    // user, language, code, stdout, stderr, status, timeMs
    const attempt = new Attempt(req.body);

    // Guardamos el intento en la base de datos
    const saved = await attempt.save();

    // Devolvemos el documento guardado al cliente
    res.json({ ok: true, saved });
  } catch (e) {
    // Si falta algún campo requerido o hay error de validación/conexión,
    // devolvemos un 500 con el mensaje
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ============================================================================
// ✅ POST /api/run  (VERSIÓN 0 - SIMULADA)

// ============================================================================

app.post("/api/run", async (req, res) => {
  try {
    // 1) Extraemos los datos del body de la petición
    const { user, language, code } = req.body || {};

    // 2) Validamos campos obligatorios
    if (!user || !language || !code) {
      // 400 = Bad Request (el cliente ha enviado algo incompleto)
      return res.status(400).json({
        ok: false,
        error: "Faltan campos obligatorios: 'user', 'language', 'code'."
      });
    }

    // 3) Validamos que el lenguaje sea uno de los permitidos
    const allowedLanguages = ["python", "c"];
    if (!allowedLanguages.includes(language)) {
      return res.status(400).json({
        ok: false,
        error: `Lenguaje no soportado. Usa: ${allowedLanguages.join(", ")}.`
      });
    }

    // 4) (VERSIÓN SIMPLIFICADA) Simulamos la ejecución
    // ------------------------------------------------
    // En lugar de ejecutar código real, devolvemos un comportamiento de prueba.
    
    let stdout = "";
    let stderr = "";
    let status = "success";
    const timeMs = Math.floor(Math.random() * 50) + 10; // tiempo simulado (10-60 ms)

    // Regla de simulación muy simple:
    // - Si el código contiene la palabra "error", simulamos fallo.
    // - Si no, simulamos ejecución correcta.
    if (code.toLowerCase().includes("error")) {
      status = "error";
      stdout = "";
      stderr = "Simulación: se ha detectado un error en el código.";
    } else {
      status = "success";
      stdout = "Simulación: el código se ha ejecutado correctamente.";
      stderr = "";
    }

    // 5) Creamos y guardamos el Attempt en la base de datos
    const attempt = new Attempt({
      user,
      language,
      code,
      stdout,
      stderr,
      status,
      timeMs,
    });

    const saved = await attempt.save();

    // 6) Devolvemos al cliente el resultado de la "ejecución" y el intento guardado
    return res.json({
      ok: true,
      run: {
        stdout,
        stderr,
        status,
        timeMs,
      },
      attemptId: saved._id,
    });

  } catch (e) {
    // Si algo sale mal (error inesperado en el servidor o en Mongo)
    console.error("❌ Error en /api/run:", e);
    return res.status(500).json({
      ok: false,
      error: "Error interno en /api/run.",
      details: e.message,
    });
  }
});


// ============================================================================
// 🚀 Arrancamos el servidor HTTP
// ============================================================================
app.listen(PORT, () => {
  console.log(`🚀 API escuchando en http://localhost:${PORT}`);
});
