const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema(
  {
    name: String,
    specialization: String,
    experience: String,
    image: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expert", expertSchema);