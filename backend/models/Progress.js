const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
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

  completedTopics: {
    type: [String],
    default: [],
  }

}, { timestamps: true });

module.exports = mongoose.model("Progress", ProgressSchema);
