const Expert = require("../models/Expert");

const getExperts = async (req, res) => {
  try {
    const experts = await Expert.find().sort({ _id: -1 }).limit(100);

    res.status(200).json({
      success: true,
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

    if (!name || !specialization || !experience) {
      return res.status(400).json({
        success: false,
        message: "Name, specialization and experience are required",
      });
    }

const image = req.file ? `/uploads/${req.file.filename}` : "";
    const expert = await Expert.create({
      name,
      specialization,
      experience,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Expert added successfully",
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
    const updateData = {
      name: req.body.name,
      specialization: req.body.specialization,
      experience: req.body.experience,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const expert = await Expert.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!expert) {
      return res.status(404).json({
        success: false,
        message: "Expert not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expert updated successfully",
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