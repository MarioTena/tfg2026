const mongoose = require("mongoose");

const aiCreditSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    topic: {
      type: String,
      required: true,
      index: true,
    },
    remainingCredits: {
      type: Number,
      default: 2,
      min: 0,
    },
    usedCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

aiCreditSchema.index({ userId: 1, topic: 1 }, { unique: true });

module.exports = mongoose.model("AiCredit", aiCreditSchema);