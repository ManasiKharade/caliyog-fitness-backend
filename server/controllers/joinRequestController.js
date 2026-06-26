const JoinRequest = require("../models/JoinRequest");
const Member = require("../models/Member");
const BatchMember = require("../models/BatchMember");

// USER: submit join form
const createJoinRequest = async (req, res) => {
  try {
    const contactNumber = req.body.contact || req.body.mobile || "";

    const joinRequest = await JoinRequest.create({
      name: req.body.name || "",
      email: req.body.email || "",
      contact: contactNumber,
      mobile: contactNumber,
      address: req.body.address || "",
      parentName: req.body.parentName || "",
      parentContact: req.body.parentContact || "",
      batch: req.body.batch || "",
      timingType: req.body.timingType || "",
      timing: req.body.timing || "",
      membership: req.body.membership || "",
      transactionType: req.body.transactionType || "",
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Join request submitted successfully",
      data: joinRequest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADMIN: get all join requests for Reports
const getJoinRequests = async (req, res) => {
  try {
    const joinRequests = await JoinRequest.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: joinRequests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADMIN: add join request user to member list
const addToMember = async (req, res) => {
  try {
    const joinRequest = await JoinRequest.findById(req.params.id);

    if (!joinRequest) {
      return res.status(404).json({
        success: false,
        message: "Join request not found",
      });
    }

    if (joinRequest.status === "Added to Member") {
      return res.status(400).json({
        success: false,
        message: "This user is already added",
      });
    }

    const contactNumber = joinRequest.contact || joinRequest.mobile || "";

    if (!contactNumber) {
      return res.status(400).json({
        success: false,
        message: "Contact number is missing in this join request",
      });
    }

    const isKidsBatch =
      joinRequest.batch &&
      joinRequest.batch.toLowerCase().includes("kids");

    if (isKidsBatch) {
      const existingBatchMember = await BatchMember.findOne({
        $or: [{ contact: contactNumber }, { mobile: contactNumber }],
      });

      if (existingBatchMember) {
        joinRequest.status = "Added to Member";
        await joinRequest.save();

        return res.status(400).json({
          success: false,
          message: "Kids batch member already exists",
        });
      }

      const batchMember = await BatchMember.create({
        name: joinRequest.name || "",
        email: joinRequest.email || "",
        contact: contactNumber,
        mobile: contactNumber,
        address: joinRequest.address || "",
        parentName: joinRequest.parentName || "",
        parentContact: joinRequest.parentContact || "",
        batch: joinRequest.batch || "",
        timingType: joinRequest.timingType || "",
        timing: joinRequest.timing || "",
        membership: joinRequest.membership || "",
        transactionType: joinRequest.transactionType || "",
        startDate: new Date(),
        joinRequestId: joinRequest._id,
      });

      joinRequest.status = "Added to Member";
      await joinRequest.save();

      return res.status(201).json({
        success: true,
        message: "Kids batch member added successfully",
        data: batchMember,
        type: "kids",
      });
    }

    const existingMember = await Member.findOne({
      $or: [{ contact: contactNumber }, { mobile: contactNumber }],
    });

    if (existingMember) {
      joinRequest.status = "Added to Member";
      await joinRequest.save();

      return res.status(400).json({
        success: false,
        message: "Member already exists",
      });
    }

    const member = await Member.create({
      name: joinRequest.name || "",
      email: joinRequest.email || "",
      contact: contactNumber,
      mobile: contactNumber,
      address: joinRequest.address || "",
      parentName: joinRequest.parentName || "",
      parentContact: joinRequest.parentContact || "",
      batch: joinRequest.batch || "",
      timingType: joinRequest.timingType || "",
      timing: joinRequest.timing || "",
      membership: joinRequest.membership || "",
      transactionType: joinRequest.transactionType || "",
      startDate: new Date(),
      joinRequestId: joinRequest._id,
    });

    joinRequest.status = "Added to Member";
    await joinRequest.save();

    res.status(201).json({
      success: true,
      message: "Member added successfully",
      data: member,
      type: "member",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add member",
      error: error.message,
    });
  }
};

// ADMIN: reject join request
const rejectJoinRequest = async (req, res) => {
  try {
    const joinRequest = await JoinRequest.findById(req.params.id);

    if (!joinRequest) {
      return res.status(404).json({
        success: false,
        message: "Join request not found",
      });
    }

    joinRequest.status = "Rejected";
    await joinRequest.save();

    res.status(200).json({
      success: true,
      message: "Join request rejected successfully",
      data: joinRequest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADMIN: delete join request
const deleteJoinRequest = async (req, res) => {
  try {
    const joinRequest = await JoinRequest.findByIdAndDelete(req.params.id);

    if (!joinRequest) {
      return res.status(404).json({
        success: false,
        message: "Join request not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Join request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createJoinRequest,
  getJoinRequests,
  addToMember,
  rejectJoinRequest,
  deleteJoinRequest,
};