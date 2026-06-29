const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const Event = require("../models/Event");
const protectAdmin = require("../middleware/protectAdmin");

const createImageUrl = (req) => {
  if (!req.file) return "";

  return `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
};

// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ _id: -1 })
      .limit(100);

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

// ADD event
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
      image: imageUrl,
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

// UPDATE event
router.put("/:id", protectAdmin, upload.single("image"), async (req, res) => {
  try {
    const { eventType, title, description, location, date, img, image } =
      req.body;

    const oldEvent = await Event.findById(req.params.id);

    if (!oldEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    const imageUrl = req.file
      ? createImageUrl(req)
      : image || img || oldEvent.image || oldEvent.img || "";

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        eventType: eventType || oldEvent.eventType || "gallery",
        title: title || oldEvent.title,
        description: description || oldEvent.description,
        location: location || oldEvent.location,
        date: date || oldEvent.date,
        img: imageUrl,
        image: imageUrl,
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
    res.status(500).json({
      success: false,
      message: "Failed to delete event",
      error: error.message,
    });
  }
});

module.exports = router;