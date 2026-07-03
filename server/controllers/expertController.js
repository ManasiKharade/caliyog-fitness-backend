const Expert = require("../models/Expert");
const { buildImageObject, attachBase64Images } = require("../utils/imageHelper");

/**
 * GET All Experts
 * Retrieves list of fitness experts, converting DB image buffers to base64 URLs.
 */
const getExperts = async (req, res) => {
  try {
    const experts = await Expert.find().sort({ _id: -1 }).limit(100);
    const expertsWithImages = experts.map(expert => attachBase64Images(expert, ["image", "img"]));

    res.status(200).json({
      success: true,
      experts: expertsWithImages,
      data: expertsWithImages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ADD Fitness Expert
 * Creates fitness expert record in database, saving file uploads as buffer objects.
 */
const addExpert = async (req, res) => {
  try {
    const { name, specialization, experience } = req.body;
    const imageObj = buildImageObject(req.file);

    const expert = await Expert.create({
      name,
      specialization,
      experience,
      image: imageObj,
      img: imageObj,
    });

    const expertWithImage = attachBase64Images(expert, ["image", "img"]);

    res.status(201).json({
      success: true,
      message: "Expert added successfully",
      expert: expertWithImage,
      data: expertWithImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * UPDATE Fitness Expert
 * Updates expert fields and replaces/retains the stored image buffer.
 */
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

    const imageObj = req.file ? buildImageObject(req.file) : (oldExpert.image || oldExpert.img);

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

    const expertWithImage = attachBase64Images(expert, ["image", "img"]);

    res.status(200).json({
      success: true,
      message: "Expert updated successfully",
      expert: expertWithImage,
      data: expertWithImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * DELETE Fitness Expert
 * Removes expert entry from database.
 */
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