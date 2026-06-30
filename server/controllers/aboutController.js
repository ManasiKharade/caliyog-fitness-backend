const About = require("../models/About");

// GET about data
exports.getAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    if (!about) {
      about = await About.create({
        title: "About CaliYog",
        subtitle: "Outdoor Fitness Club",
        description:
          "CaliYog Outdoor Fitness Club helps people build strength, improve fitness, and live a healthy lifestyle.",
        mission: "To make fitness simple, affordable, and accessible.",
        vision: "To build a strong and healthy fitness community.",
        image1: "",
        image2: "",
      });
    }

    res.status(200).json({
      success: true,
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch about data",
      error: error.message,
    });
  }
};

// UPDATE about data
exports.updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    if (!about) {
      about = await About.create(req.body);
    } else {
      about = await About.findByIdAndUpdate(about._id, req.body, {
        new: true,
        runValidators: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "About section updated successfully",
      data: about,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update about data",
      error: error.message,
    });
  }
};