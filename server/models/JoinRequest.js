const mongoose = require("mongoose");

const joinRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      trim: true,
      default: "",
    },

    batch: {
      type: String,
      trim: true,
      default: "",
    },

    timingType: {
      type: String,
      trim: true,
      default: "",
    },

    timing: {
      type: String,
      trim: true,
      default: "",
    },

    membership: {
      type: String,
      trim: true,
      default: "",
    },

    transactionType: {
      type: String,
      trim: true,
      default: "",
    },

    parentName: {
      type: String,
      trim: true,
      default: "",
    },

    parentEmail: {
      type: String,
      trim: true,
      default: "",
    },

    parentContact: {
      type: String,
      trim: true,
      default: "",
    },

    message: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "New",
        "Pending",
        "Added to Member",
        "Rejected",
      ],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "JoinRequest",
  joinRequestSchema,
  "joinrequest"
);