const mongoose = require("mongoose");

const batchMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: String },
    batch: { type: String, required: true },
    timingType: { type: String },
    timing: { type: String },
    parentName: { type: String },
    parentContact: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BatchMember", batchMemberSchema);