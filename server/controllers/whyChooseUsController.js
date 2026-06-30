const WhyChooseUs = require("../models/WhyChooseUs");

exports.getWhyChooseUs = async (req, res) => {
  try {
    const items = await WhyChooseUs.find().sort({ order: 1 });

    res.status(200).json({
      success: true,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch why choose us data",
      error: error.message,
    });
  }
};

exports.createWhyChooseUs = async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      description: req.body.description,
      order: Number(req.body.order) || 1,
    };

    if (req.file) {
      data.image = `/uploads/whychooseus/${req.file.filename}`;
    }

    const item = await WhyChooseUs.create(data);

    res.status(201).json({
      success: true,
      message: "Why Choose Us item added successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add item",
      error: error.message,
    });
  }
};

exports.updateWhyChooseUs = async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      description: req.body.description,
      order: Number(req.body.order) || 1,
    };

    if (req.file) {
      data.image = `/uploads/whychooseus/${req.file.filename}`;
    }

    const item = await WhyChooseUs.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update item",
      error: error.message,
    });
  }
};

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