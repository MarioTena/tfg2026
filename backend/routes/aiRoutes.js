const express = require("express");
const { requireAuth } = require("../middleware/requireAuth");
const AiCredit = require("../models/AiCredit");
const { generateRealAiFeedback } = require("../services/aiFeedback");


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
      exerciseId,
      title,
      statement,
      hints,
      language,
      code,
      stdout,
      stderr,
      status,
      timeMs,
    } = req.body;

    if (!topic) {
      return res.status(400).json({
        ok: false,
        error: "Falta topic",
      });
    }

    if (!code || !code.trim()) {
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

    const attemptLikeObject = {
      language: language || "python",
      code,
      stdout: stdout || "",
      stderr: stderr || "",
      status: status || "unknown",
      timeMs: typeof timeMs === "number" ? timeMs : undefined,
    };

    const extraContext = {
      exerciseId: exerciseId || null,
      title: title || null,
      statement: statement || null,
      hints: Array.isArray(hints) ? hints : [],
    };

    const aiResult = await generateRealAiFeedback(attemptLikeObject, extraContext);

    creditDoc.remainingCredits -= 1;
    creditDoc.usedCount += 1;
    await creditDoc.save();

    return res.json({
      ok: true,
      hint: aiResult.message,
      level: aiResult.level,
      source: aiResult.source,
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