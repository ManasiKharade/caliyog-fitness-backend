const Transformation = require("../models/Transformation");

exports.getTransformations = async (req, res) => {
  try {
    const transformations = await Transformation.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: transformations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch transformations",
      error: error.message,
    });
  }
};

exports.createTransformation = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({
        success: false,
        message: "Transformation name is required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Transformation image is required",
      });
    }

    const transformation = await Transformation.create({
      name: req.body.name,
      image: `/uploads/transformations/${req.file.filename}`,
    });

    res.status(201).json({
      success: true,
      message: "Transformation added successfully",
      data: transformation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add transformation",
      error: error.message,
    });
  }
};

exports.updateTransformation = async (req, res) => {
  try {
    const updatedData = {};

    if (req.body.name) {
      updatedData.name = req.body.name;
    }

    if (req.file) {
      updatedData.image = `/uploads/transformations/${req.file.filename}`;
    }

    const transformation = await Transformation.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!transformation) {
      return res.status(404).json({
        success: false,
        message: "Transformation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transformation updated successfully",
      data: transformation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update transformation",
      error: error.message,
    });
  }
};

exports.deleteTransformation = async (req, res) => {
  try {
    const transformation = await Transformation.findByIdAndDelete(req.params.id);

    if (!transformation) {
      return res.status(404).json({
        success: false,
        message: "Transformation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Transformation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete transformation",
      error: error.message,
    });
  }
};