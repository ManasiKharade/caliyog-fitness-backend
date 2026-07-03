const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      enum: ["gallery", "organized"],
      required: true,
      default: "gallery",
    },
    title: String,
    location: String,
    date: String,
    description: String,
    img: {
      data: Buffer,
      contentType: String,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);