const express = require("express");
const { requireAuth } = require("../middleware/requireAuth");
const Progress = require("../models/Progress");

const router = express.Router();

const ALLOWED_LANGUAGES = ["python", "c"];

function isValidLanguage(language) {
  return ALLOWED_LANGUAGES.includes(language);
}

router.get("/:language", requireAuth, async (req, res) => {
  try {
    const { language } = req.params;

    if (!isValidLanguage(language)) {
      return res.status(400).json({
        ok: false,
        error: "Lenguaje no válido.",
      });
    }

    const progress = await Progress.findOneAndUpdate(
      {
        userId: req.user.id,
        language,
      },
      {
        $setOnInsert: {
          userId: req.user.id,
          language,
          completedTopics: [],
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    return res.json({ ok: true, progress });
  } catch (error) {
    console.error("Error obteniendo progreso:", error);
    return res.status(500).json({
      ok: false,
      error: "Error interno obteniendo progreso.",
    });
  }
});

router.post("/:language/complete", requireAuth, async (req, res) => {
  try {
    const { language } = req.params;
    const topic = String(req.body?.topic || "").trim();

    if (!isValidLanguage(language)) {
      return res.status(400).json({
        ok: false,
        error: "Lenguaje no válido.",
      });
    }

    if (!topic) {
      return res.status(400).json({
        ok: false,
        error: "Falta topic.",
      });
    }

    const progress = await Progress.findOneAndUpdate(
      {
        userId: req.user.id,
        language,
      },
      {
        $setOnInsert: {
          userId: req.user.id,
          language,
        },
        $addToSet: {
          completedTopics: topic,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );

    return res.json({ ok: true, progress });
  } catch (error) {
    console.error("Error guardando progreso:", error);
    return res.status(500).json({
      ok: false,
      error: "Error interno guardando progreso.",
    });
  }
});

module.exports = router;