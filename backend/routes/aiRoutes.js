const express = require("express");
const { requireAuth } = require("../middleware/requireAuth");
const AiCredit = require("../models/aiCredit");
const Attempt = require("../models/Attempt");
const {
  generateRealAiFeedback,
  buildTechnicalFallback,
} = require("../services/aiFeedback");

const router = express.Router();

async function getOrCreateAiCredit(userId, topic) {
  let creditDoc = await AiCredit.findOne({ userId, topic });

  if (!creditDoc) {
    creditDoc = await AiCredit.create({
      userId,
      topic,
      remainingCredits: 2,
      usedCount: 0,
    });
  }

  return creditDoc;
}

// Obtener créditos disponibles de IA para un tema
router.get("/credits", requireAuth, async (req, res) => {
  try {
    const topic = req.query.topic;

    if (!topic) {
      return res.status(400).json({
        ok: false,
        error: "Falta el parámetro topic",
      });
    }

    const creditDoc = await getOrCreateAiCredit(req.user.id, topic);

    return res.json({
      ok: true,
      topic,
      remainingCredits: creditDoc.remainingCredits,
      usedCount: creditDoc.usedCount,
    });
  } catch (error) {
    console.error("Error obteniendo créditos IA:", error);
    return res.status(500).json({
      ok: false,
      error: "Error interno obteniendo créditos IA",
    });
  }
});

// Pedir pista con IA
router.post("/hint", requireAuth, async (req, res) => {
  try {
    const {
      topic,
      attemptId,
      exerciseId,
      title,
      statement,
      hints,
    } = req.body;

    if (!topic) {
      return res.status(400).json({
        ok: false,
        error: "Falta topic",
      });
    }

    if (!attemptId) {
      return res.status(400).json({
        ok: false,
        error: "Falta attemptId",
      });
    }

    const attempt = await Attempt.findOne({
      _id: attemptId,
      userId: req.user.id,
    });

    if (!attempt) {
      return res.status(404).json({
        ok: false,
        error: "No se encontró el intento indicado",
      });
    }

    if (!attempt.code || !attempt.code.trim()) {
      return res.status(400).json({
        ok: false,
        error: "No hay código para analizar",
      });
    }

    const creditDoc = await getOrCreateAiCredit(req.user.id, topic);

    if (creditDoc.remainingCredits <= 0) {
      return res.status(403).json({
        ok: false,
        error: "No te quedan créditos de IA en este tema",
        remainingCredits: 0,
      });
    }

    const extraContext = {
      exerciseId: exerciseId || attempt.exerciseId || null,
      title: title || null,
      statement: statement || null,
      hints: Array.isArray(hints) ? hints : [],
    };

    let hintResult;
    let source = "fallback";
    let creditsSpent = false;

    try {
      hintResult = await generateRealAiFeedback(attempt, extraContext);
      source = "openrouter";

      creditDoc.remainingCredits -= 1;
      creditDoc.usedCount += 1;
      await creditDoc.save();
      creditsSpent = true;
        } catch (error) {
      let fallbackNote = "";

      const msg = (error.message || "").toLowerCase();

      if (msg.includes("rate limit")) {
        fallbackNote = "La IA externa ha alcanzado su límite de uso temporal.";
      } else if (msg.includes("provider returned error")) {
        fallbackNote = "El proveedor de IA ha devuelto un error temporal.";
      } else if (msg.includes("no devolvió contenido") || msg.includes("empty_response")) {
        fallbackNote = "La IA no ha devuelto una respuesta útil.";
      } else if (msg.includes("too_unstructured")) {
        fallbackNote = "La IA ha respondido, pero el contenido no ha pasado la validación mínima.";
      } else if (msg.includes("contains_code_block")) {
        fallbackNote = "La IA ha respondido con demasiado código y se ha descartado.";
      }

      console.error("Fallo IA real, uso fallback técnico:", error.message);

      hintResult = buildTechnicalFallback(attempt, extraContext);

      if (fallbackNote) {
        hintResult.message =
          `${fallbackNote}\n\n` + hintResult.message;
      }

      source = "fallback";
    }

    attempt.aiFeedback = {
      message: hintResult.message,
      level: hintResult.level,
      createdAt: new Date(),
      exerciseId: extraContext.exerciseId,
      source,
    };

    await attempt.save();

    return res.json({
      ok: true,
      hint: hintResult.message,
      level: hintResult.level,
      source,
      creditsSpent,
      remainingCredits: creditDoc.remainingCredits,
    });
  } catch (error) {
    console.error("Error generando pista IA:", error);
    return res.status(500).json({
      ok: false,
      error: error.message || "Error generando pista IA",
    });
  }
});

module.exports = router;