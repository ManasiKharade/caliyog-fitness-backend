const express = require("express");
const router = express.Router();

const {
  createJoinRequest,
  getJoinRequests,
  addToMember,
  rejectJoinRequest,
  deleteJoinRequest,
} = require("../controllers/joinRequestController");

const protectAdmin = require("../middleware/protectAdmin");

// PUBLIC - Join Form
router.post("/", createJoinRequest);

// ADMIN - Reports
router.get("/", protectAdmin, getJoinRequests);

// ADMIN - Add to Member
router.post("/add-to-member/:id", protectAdmin, addToMember);

// ADMIN - Reject Request
router.put("/reject/:id", protectAdmin, rejectJoinRequest);

// ADMIN - Delete Request
router.delete("/:id", protectAdmin, deleteJoinRequest);

module.exports = router;