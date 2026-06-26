const Member = require("../models/Member");

exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load members",
      error: error.message,
    });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({
        success: false,
        message: "Member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete member",
      error: error.message,
    });
  }
};