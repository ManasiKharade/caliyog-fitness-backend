const Membership = require("../models/Membership");

const getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find().sort({ createdAt: -1 });
    res.status(200).json(memberships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMembership = async (req, res) => {
  try {
    const membership = await Membership.create(req.body);
    res.status(201).json({
      message: "Membership added successfully",
      membership,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMembership = async (req, res) => {
  try {
    const membership = await Membership.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Membership updated successfully",
      membership,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMembership = async (req, res) => {
  try {
    await Membership.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Membership deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMemberships,
  addMembership,
  updateMembership,
  deleteMembership,
};