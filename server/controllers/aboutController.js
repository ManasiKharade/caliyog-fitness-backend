const About = require("../models/About");

exports.getAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    if (!about) {
      about = await About.create({
        title: "Welcome to CaliYog",
        subtitle: "With Strength and Grace",
        description:
          "CaliYog Outdoor Fitness Club helps people build strength, improve fitness, and live a healthy lifestyle.",
        mission:
          "To inspire people to live healthier, stronger, and more confident lives through outdoor fitness.",
        vision: "",
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

exports.updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    const updatedData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      description: req.body.description,
      mission: req.body.mission,
      vision: req.body.vision,
    };

    if (req.files?.image1) {
      updatedData.image1 = `/uploads/about/${req.files.image1[0].filename}`;
    }

    if (req.files?.image2) {
      updatedData.image2 = `/uploads/about/${req.files.image2[0].filename}`;
    }

    if (!about) {
      about = await About.create(updatedData);
    } else {
      await About.findByIdAndUpdate(about._id, updatedData);
    }

    return res.status(200).json({
      success: true,
      message: "About updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update about data",
      error: error.message,
    });
  }
};