const Transformation = require("../models/Transformation");
const { buildImageObject, attachBase64Images } = require("../utils/imageHelper");

/**
 * GET All Transformations
 * Retrieves list of transformations with base64 encoded images.
 */
exports.getTransformations = async (req, res) => {
  try {
    const transformations = await Transformation.find().sort({ createdAt: -1 });
    const transformationsWithImages = transformations.map(item => attachBase64Images(item, ["image"]));

    res.status(200).json({
      success: true,
      data: transformationsWithImages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch transformations",
      error: error.message,
    });
  }
};

/**
 * CREATE New Transformation
 * Creates transformation item storing memory upload buffer directly in MongoDB.
 */
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

    const imageObj = buildImageObject(req.file);

    const transformation = await Transformation.create({
      name: req.body.name,
      image: imageObj,
    });

    const transformationWithImage = attachBase64Images(transformation, ["image"]);

    res.status(201).json({
      success: true,
      message: "Transformation added successfully",
      data: transformationWithImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add transformation",
      error: error.message,
    });
  }
};

/**
 * UPDATE Transformation
 * Updates name or replaces transformation image in MongoDB.
 */
exports.updateTransformation = async (req, res) => {
  try {
    const oldTransformation = await Transformation.findById(req.params.id);

    if (!oldTransformation) {
      return res.status(404).json({
        success: false,
        message: "Transformation not found",
      });
    }

    const updatedData = {};

    if (req.body.name) {
      updatedData.name = req.body.name;
    }

    if (req.file) {
      updatedData.image = buildImageObject(req.file);
    }

    const transformation = await Transformation.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    const transformationWithImage = attachBase64Images(transformation, ["image"]);

    res.status(200).json({
      success: true,
      message: "Transformation updated successfully",
      data: transformationWithImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update transformation",
      error: error.message,
    });
  }
};

/**
 * DELETE Transformation
 * Removes transformation entry.
 */
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