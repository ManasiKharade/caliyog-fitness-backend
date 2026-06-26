const Transformation = require("../models/Transformation");

const getTransformations = async (req, res) => {
  try {
    const transformations = await Transformation.find().sort({ createdAt: -1 });
    res.status(200).json(transformations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTransformation = async (req, res) => {
  try {
    const transformation = await Transformation.create(req.body);

    res.status(201).json({
      message: "Transformation added successfully",
      transformation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTransformation = async (req, res) => {
  try {
    const transformation = await Transformation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Transformation updated successfully",
      transformation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTransformation = async (req, res) => {
  try {
    await Transformation.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Transformation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTransformations,
  addTransformation,
  updateTransformation,
  deleteTransformation,
};