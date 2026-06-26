const express = require("express");
const router = express.Router();
const Batch = require("../models/Batch");

router.get("/", async (req, res) => {
  const batches = await Batch.find().sort({ createdAt: -1 });
  res.json(batches);
});

router.post("/", async (req, res) => {
  const { title, icon, points } = req.body;

  const batch = await Batch.create({
    title,
    icon,
    points: Array.isArray(points) ? points : [],
  });

  res.status(201).json(batch);
});

router.put("/:id", async (req, res) => {
  const { title, icon, points } = req.body;

  const updatedBatch = await Batch.findByIdAndUpdate(
    req.params.id,
    {
      title,
      icon,
      points: Array.isArray(points) ? points : [],
    },
    { new: true }
  );

  res.json(updatedBatch);
});

router.delete("/:id", async (req, res) => {
  await Batch.findByIdAndDelete(req.params.id);
  res.json({ message: "Batch deleted successfully" });
});

module.exports = router;