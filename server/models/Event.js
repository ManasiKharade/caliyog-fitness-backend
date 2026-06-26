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
    img: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);