const BatchMember = require("../models/BatchMember");
const JoinRequest = require("../models/JoinRequest");

const getBatchMembers = async (req, res) => {
  try {
    const batchMembers = await BatchMember.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: batchMembers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addBatchMemberFromJoinRequest = async (req, res) => {
  try {
    const joinRequest = await JoinRequest.findById(req.params.id);

    if (!joinRequest) {
      return res.status(404).json({
        success: false,
        message: "Join request not found",
      });
    }

    const existingBatchMember = await BatchMember.findOne({
      email: joinRequest.email,
      mobile: joinRequest.mobile,
      batch: joinRequest.batch,
    });

    if (existingBatchMember) {
      return res.status(400).json({
        success: false,
        message: "Batch member already added",
      });
    }

    const batchMember = await BatchMember.create({
      name: joinRequest.name,
      email: joinRequest.email,
      mobile: joinRequest.mobile,
      address: joinRequest.address,
      batch: joinRequest.batch,
      timingType: joinRequest.timingType,
      timing: joinRequest.timing,
      parentName: joinRequest.parentName,
      parentContact: joinRequest.parentContact,
    });

    joinRequest.batchAdded = true;
    await joinRequest.save();

    res.status(201).json({
      success: true,
      message: "Batch member added successfully",
      data: batchMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBatchMember = async (req, res) => {
  try {
    const batchMember = await BatchMember.findByIdAndDelete(req.params.id);

    if (!batchMember) {
      return res.status(404).json({
        success: false,
        message: "Batch member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Batch member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getBatchMembers,
  addBatchMemberFromJoinRequest,
  deleteBatchMember,
};