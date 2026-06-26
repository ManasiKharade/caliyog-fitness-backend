const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Membership", membershipSchema);