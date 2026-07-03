const mongoose = require("mongoose");

const whyChooseUsSchema = new mongoose.Schema(
  {
    image: {
      data: Buffer,
      contentType: String,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WhyChooseUs", whyChooseUsSchema);