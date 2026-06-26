const express = require("express");
const protectAdmin = require("../middleware/authMiddleware");

const {
  getFeedbacks,
  addFeedback,
  updateFeedback,
  deleteFeedback,
} = require("../controllers/feedbackController");

const router = express.Router();

router.get("/", getFeedbacks);
router.post("/", protectAdmin, addFeedback);
router.put("/:id", protectAdmin, updateFeedback);
router.delete("/:id", protectAdmin, deleteFeedback);

module.exports = router;