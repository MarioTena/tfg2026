const mongoose = require("mongoose");

const AttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  language: {
    type: String,
    enum: ["python", "c"],
    required: true,
  },

  topic: {
    type: String,
    default: null,
  },

  exerciseId: {
    type: String,
    default: null,
  },

  code: {
    type: String,
    required: true,
  },

  stdout: {
    type: String,
    default: "",
  },

  stderr: {
    type: String,
    default: "",
  },

  status: {
    type: String,
    enum: ["success", "error", "timeout"],
    default: "success",
  },

  timeMs: {
    type: Number,
    default: 0,
  },

  aiFeedback: {
    message: { type: String, default: "" },
    level: { type: String, default: "ok" },
    createdAt: { type: Date },
    exerciseId: { type: String, default: null },
    source: { type: String, default: "" },
  },

  stdin: {
    type: String,
    default: "",
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Attempt", AttemptSchema);