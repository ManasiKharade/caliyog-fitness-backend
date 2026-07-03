const Event = require("../models/Event");
const {
  buildImageObject,
  attachBase64Images,
} = require("../utils/imageHelper");

// GET all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ _id: -1 }).limit(100);
    const eventsWithImages = events.map((event) =>
      attachBase64Images(event, ["image", "img"])
    );

    res.status(200).json({ success: true, data: eventsWithImages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ADD event
const addEvent = async (req, res) => {
  try {
    const { eventType, title, description, location, date } = req.body;
    const imageObj = buildImageObject(req.file);

    const event = await Event.create({
      eventType: eventType || "gallery",
      title,
      description,
      location,
      date,
      img: imageObj,
      image: imageObj,
    });

    const eventWithImage = attachBase64Images(event, ["image", "img"]);

    res.status(201).json({
      success: true,
      message: "Event added successfully",
      data: eventWithImage,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE event
const updateEvent = async (req, res) => {
  try {
    const { eventType, title, description, location, date } = req.body;
    const oldEvent = await Event.findById(req.params.id);

    if (!oldEvent) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    const imageObj = req.file
      ? buildImageObject(req.file)
      : oldEvent.image || oldEvent.img;

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        eventType: eventType || oldEvent.eventType || "gallery",
        title: title || oldEvent.title,
        description: description || oldEvent.description,
        location: location || oldEvent.location,
        date: date || oldEvent.date,
        img: imageObj,
        image: imageObj,
      },
      { new: true }
    );

    const eventWithImage = attachBase64Images(updatedEvent, ["image", "img"]);

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: eventWithImage,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getEvents, addEvent, updateEvent, deleteEvent };