const express = require("express");
const router = express.Router();
const Member = require("../models/Member"); // adjust path to your model

// ✅ GET all members (you probably already have this)
router.get("/", async (req, res) => {
  try {
    const members = await Member.find();
    res.json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ ADD THIS - POST route to create a new member
router.post("/", async (req, res) => {
  try {
    console.log("📥 Received member data:", req.body);
    
    const memberData = req.body;
    
    // Validate required fields (adjust based on your schema)
    if (!memberData.name || !memberData.email) {
      return res.status(400).json({
        success: false,
        error: "Name and email are required"
      });
    }
    
    // Create new member
    const newMember = new Member(memberData);
    const savedMember = await newMember.save();
    
    console.log("✅ Member created:", savedMember);
    
    res.status(201).json({
      success: true,
      message: "Member added successfully",
      data: savedMember
    });
  } catch (error) {
    console.error("❌ Error creating member:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ✅ PUT route (update member)
router.put("/:id", async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, data: updatedMember });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ DELETE route
router.delete("/:id", async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Member deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;