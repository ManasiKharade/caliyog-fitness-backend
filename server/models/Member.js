const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    contact: String,
    mobile: String,
    address: String,
    parentName: String,
    parentContact: String,
    batch: String,
    timingType: String,
    timing: String,
    membership: String,
    transactionType: String,
    joinRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JoinRequest",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);