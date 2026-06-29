const Batch = require("../models/Batch");

exports.createBatch = async (req, res) => {
  try {
    const { icon, title, points } = req.body;

    const batch = await Batch.create({
      icon,
      title,
      points: Array.isArray(points) ? points : [],
    });

    res.status(201).json({
      success: true,
      message: "Batch added successfully",
      data: batch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add batch",
      error: error.message,
    });
  }
};

exports.getBatches = async (req, res) => {
  try {
const batches = await Batch.find()
      .sort({ _id: -1 })
      .limit(50);
    res.status(200).json({
      success: true,
      data: batches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load batches",
      error: error.message,
    });
  }
};

exports.updateBatch = async (req, res) => {
  try {
    const { icon, title, points } = req.body;

    const batch = await Batch.findByIdAndUpdate(
      req.params.id,
      {
        icon,
        title,
        points: Array.isArray(points) ? points : [],
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Batch updated successfully",
      data: batch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update batch",
      error: error.message,
    });
  }
};

exports.deleteBatch = async (req, res) => {
  try {
    const batch = await Batch.findByIdAndDelete(req.params.id);

    if (!batch) {
      return res.status(404).json({
        success: false,
        message: "Batch not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Batch deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete batch",
      error: error.message,
    });
  }
};