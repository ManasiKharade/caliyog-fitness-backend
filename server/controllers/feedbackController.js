const Feedback = require("../models/Feedback");

const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);

    res.status(201).json({
      message: "Feedback added successfully",
      feedback,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Feedback updated successfully",
      feedback,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFeedbacks,
  addFeedback,
  updateFeedback,
  deleteFeedback,
};