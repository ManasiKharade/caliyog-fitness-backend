const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    icon: {
      type: String,
      default: "💪",
    },

    lottieIcon: {
      type: String,
      default: "",
    },

    points: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Batch", batchSchema);