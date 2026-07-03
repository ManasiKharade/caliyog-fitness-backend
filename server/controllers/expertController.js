const Expert = require("../models/Expert");

// Helper to save image as buffer in DB
const buildImageObject = (req) => {
  if (!req.file) return null;
  return {
    data: req.file.buffer,
    contentType: req.file.mimetype,
  };
};

// Helper to convert DB image to base64 URL for frontend
const attachImageUrl = (expert) => {
  if (!expert) return expert;
  const obj = expert.toObject ? expert.toObject() : expert;

  if (obj.image && obj.image.data) {
    const base64 = obj.image.data.toString("base64");
    obj.imageUrl = `data:${obj.image.contentType};base64,${base64}`;
  }
  return obj;
};

// GET ALL EXPERTS
const getExperts = async (req, res) => {
  try {
    const experts = await Expert.find().sort({ _id: -1 }).limit(100);

    const expertsWithUrl = experts.map(attachImageUrl);

    res.status(200).json({
      success: true,
      experts: expertsWithUrl,
      data: expertsWithUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADD EXPERT
const addExpert = async (req, res) => {
  try {
    const { name, specialization, experience } = req.body;

    const imageObj = buildImageObject(req);

    const expert = await Expert.create({
      name,
      specialization,
      experience,
      image: imageObj,
      img: imageObj,
    });

    const expertWithUrl = attachImageUrl(expert);

    res.status(201).json({
      success: true,
      message: "Expert added successfully",
      expert: expertWithUrl,
      data: expertWithUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE EXPERT
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

    const imageObj = req.file ? buildImageObject(req) : (oldExpert.image || oldExpert.img);

    const expert = await Expert.findByIdAndUpdate(
      req.params.id,
      {
        name: name || oldExpert.name,
        specialization: specialization || oldExpert.specialization,
        experience: experience || oldExpert.experience,
        image: imageObj,
        img: imageObj,
      },
      { new: true }
    );

    const expertWithUrl = attachImageUrl(expert);

    res.status(200).json({
      success: true,
      message: "Expert updated successfully",
      expert: expertWithUrl,
      data: expertWithUrl,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE EXPERT
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