const express = require("express");
const { requireAuth } = require("../middleware/requireAuth");
const Progress = require("../models/Progress");

const router = express.Router();

/* Obtener progreso */
router.get("/:language", requireAuth, async (req, res) => {
  const { language } = req.params;

  let progress = await Progress.findOne({
    userId: req.user.id,
    language
  });

  if (!progress) {
    progress = await Progress.create({
      userId: req.user.id,
      language,
      completedTopics: []
    });
  }

  res.json({ ok: true, progress });
});

/* Marcar tema como completado */
router.post("/:language/complete", requireAuth, async (req, res) => {
  const { language } = req.params;
  const { topic } = req.body;

  let progress = await Progress.findOne({
    userId: req.user.id,
    language
  });

  if (!progress) {
    progress = await Progress.create({
      userId: req.user.id,
      language,
      completedTopics: [topic]
    });
  } else {
    if (!progress.completedTopics.includes(topic)) {
      progress.completedTopics.push(topic);
      await progress.save();
    }
  }

  res.json({ ok: true, progress });
});

module.exports = router;
