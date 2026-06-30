const Expert = require("../models/Expert");

const createImageUrl = (req) => {
  if (!req.file) return "";
  return `/uploads/${req.file.filename}`;
};

const getExperts = async (req, res) => {
  try {
    const experts = await Expert.find().sort({ _id: -1 }).limit(100);

    res.status(200).json({
      success: true,
      experts,
      data: experts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addExpert = async (req, res) => {
  try {
    const { name, specialization, experience } = req.body;
    const imageUrl = createImageUrl(req);

    const expert = await Expert.create({
      name,
      specialization,
      experience,
      image: imageUrl,
      img: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Expert added successfully",
      expert,
      data: expert,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateExpert = async (req, res) => {
  try {
    const { name, specialization, experience } = req.body;

    const oldExpert = await Expert.findById(req.params.id);

    if (!oldExpert) {
      return res.status(404).json({
        success: false,
        message: "Expert not found",
      });
    }

    const imageUrl = req.file
      ? createImageUrl(req)
      : oldExpert.image || oldExpert.img || "";

    const expert = await Expert.findByIdAndUpdate(
      req.params.id,
      {
        name: name || oldExpert.name,
        specialization: specialization || oldExpert.specialization,
        experience: experience || oldExpert.experience,
        image: imageUrl,
        img: imageUrl,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Expert updated successfully",
      expert,
      data: expert,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteExpert = async (req, res) => {
  try {
    const expert = await Expert.findByIdAndDelete(req.params.id);

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: "Expert not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expert deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getExperts,
  addExpert,
  updateExpert,
  deleteExpert,
};