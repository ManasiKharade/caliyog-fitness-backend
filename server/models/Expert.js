const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema(
  {
    name: String,
    specialization: String,
    experience: String,
    image: {
      data: Buffer,
      contentType: String,
    },
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expert", expertSchema);