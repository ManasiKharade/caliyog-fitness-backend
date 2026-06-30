const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: "About CaliYog",
    },
    subtitle: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    mission: {
      type: String,
      default: "",
    },
    vision: {
      type: String,
      default: "",
    },
    image1: {
      type: String,
      default: "",
    },
    image2: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);