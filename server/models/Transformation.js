const mongoose = require("mongoose");

const transformationSchema = new mongoose.Schema(
  {
    name: String,
    beforeImage: String,
    afterImage: String,
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transformation", transformationSchema);