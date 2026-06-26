const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const Event = require("../models/Event");
const protectAdmin = require("../middleware/protectAdmin");

// Helper: create full image URL
const createImageUrl = (req) => {
  if (!req.file) return "";

  return `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
};

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load events",
      error: error.message,
    });
  }
});

// ADD event with image upload
router.post("/", protectAdmin, upload.single("image"), async (req, res) => {
  try {
    const { eventType, title, description, location, date } = req.body;

    const imageUrl = createImageUrl(req);

    const event = await Event.create({
      eventType: eventType || "gallery",
      title,
      description,
      location,
      date,
      img: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Event added successfully",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add event",
      error: error.message,
    });
  }
});

// UPDATE event with optional image upload
router.put("/:id", protectAdmin, upload.single("image"), async (req, res) => {
  try {
    const { eventType, title, description, location, date, img } = req.body;

    const oldEvent = await Event.findById(req.params.id);

    if (!oldEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const imageUrl = req.file
      ? createImageUrl(req)
      : img || oldEvent.img;

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        eventType: eventType || oldEvent.eventType || "gallery",
        title,
        description,
        location,
        date,
        img: imageUrl,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update event",
      error: error.message,
    });
  }
});

// DELETE event
router.delete("/:id", protectAdmin, async (req, res) => {
  console.log("DELETE EVENT HIT:", req.params.id);

  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete event",
      error: error.message,
    });
  }
});

module.exports = router;