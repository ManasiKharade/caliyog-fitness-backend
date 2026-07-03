const WhyChooseUs = require("../models/WhyChooseUs");
const { buildImageObject, attachBase64Images } = require("../utils/imageHelper");

/**
 * GET All Why Choose Us Items
 * Retrieves all items sorted by order, converting database buffer images to base64 URLs.
 */
exports.getWhyChooseUs = async (req, res) => {
  try {
    const items = await WhyChooseUs.find().sort({ order: 1 });
    const itemsWithImages = items.map(item => attachBase64Images(item, ["image"]));

    res.status(200).json({
      success: true,
      data: itemsWithImages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch why choose us data",
      error: error.message,
    });
  }
};

/**
 * CREATE Why Choose Us Item
 * Stores item information and image buffers in MongoDB.
 */
exports.createWhyChooseUs = async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      description: req.body.description,
      order: Number(req.body.order) || 1,
    };

    if (req.file) {
      data.image = buildImageObject(req.file);
    }

    const item = await WhyChooseUs.create(data);
    const itemWithImage = attachBase64Images(item, ["image"]);

    res.status(201).json({
      success: true,
      message: "Why Choose Us item added successfully",
      data: itemWithImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add item",
      error: error.message,
    });
  }
};

/**
 * UPDATE Why Choose Us Item
 * Updates textual attributes and replaces/retains the stored image buffer.
 */
exports.updateWhyChooseUs = async (req, res) => {
  try {
    const oldItem = await WhyChooseUs.findById(req.params.id);

    if (!oldItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    const data = {
      title: req.body.title || oldItem.title,
      description: req.body.description || oldItem.description,
      order: req.body.order !== undefined ? Number(req.body.order) : oldItem.order,
    };

    if (req.file) {
      data.image = buildImageObject(req.file);
    }

    const item = await WhyChooseUs.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    const itemWithImage = attachBase64Images(item, ["image"]);

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: itemWithImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update item",
      error: error.message,
    });
  }
};

/**
 * DELETE Why Choose Us Item
 * Deletes item from database.
 */
exports.deleteWhyChooseUs = async (req, res) => {
  try {
    const item = await WhyChooseUs.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete item",
      error: error.message,
    });
  }
};