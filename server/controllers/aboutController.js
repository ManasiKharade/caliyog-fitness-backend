const About = require("../models/About");
const { buildImageObject, attachBase64Images } = require("../utils/imageHelper");

/**
 * GET About Details
 * Retrieves the "About" information and converts stored image buffers to base64 URLs for frontend display.
 */
exports.getAbout = async (req, res) => {
  try {
    let about = await About.findOne();

    // Create default about data if none exists
    if (!about) {
      about = await About.create({
        title: "Welcome to CaliYog",
        subtitle: "With Strength and Grace",
        description:
          "CaliYog Outdoor Fitness Club helps people build strength, improve fitness, and live a healthy lifestyle.",
        mission:
          "To inspire people to live healthier, stronger, and more confident lives through outdoor fitness.",
        vision: "",
        image1: null,
        image2: null,
      });
    }

    // Convert image buffers to base64 Data URLs
    const aboutWithImages = attachBase64Images(about, ["image1", "image2"]);

    res.status(200).json({
      success: true,
      data: aboutWithImages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch about data",
      error: error.message,
    });
  }
};

/**
 * UPDATE About Details
 * Receives text fields and memory-buffered images, saving them directly into MongoDB.
 */
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

    // Extract image buffers using the imageHelper utility
    if (req.files?.image1) {
      updatedData.image1 = buildImageObject(req.files.image1[0]);
    }

    if (req.files?.image2) {
      updatedData.image2 = buildImageObject(req.files.image2[0]);
    }

    // Save or update in MongoDB
    if (!about) {
      about = await About.create(updatedData);
    } else {
      about = await About.findByIdAndUpdate(about._id, updatedData, { new: true });
    }

    // Convert image buffers to base64 Data URLs for updated document
    const aboutWithImages = attachBase64Images(about, ["image1", "image2"]);

    return res.status(200).json({
      success: true,
      message: "About updated successfully",
      data: aboutWithImages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update about data",
      error: error.message,
    });
  }
};