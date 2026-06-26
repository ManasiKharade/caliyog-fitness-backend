const Contact = require("../models/Contact");
const addContact = async (req, res) => {
  try {
    const newContact = await Contact.create({
      name: req.body.name,
      email: req.body.email,
      contact:
        req.body.contact ||
        req.body.phone ||
        req.body.mobile ||
        req.body.contactNumber ||
        "",
      message: req.body.message,
      status: "New",
    });

    res.status(201).json({
      success: true,
      message: "Contact enquiry submitted successfully",
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const markContactReplied = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: "Replied" },
      { new: true }
    );

    res.status(200).json({
      message: "Enquiry marked as replied",
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addContact,
  getContacts,
  markContactReplied,
  deleteContact,
};