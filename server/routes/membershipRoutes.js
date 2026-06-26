const express = require("express");
const protectAdmin = require("../middleware/authMiddleware");

const {
  getMemberships,
  addMembership,
  updateMembership,
  deleteMembership,
} = require("../controllers/membershipController");

const router = express.Router();

router.get("/", getMemberships);
router.post("/", protectAdmin, addMembership);
router.put("/:id", protectAdmin, updateMembership);
router.delete("/:id", protectAdmin, deleteMembership);

module.exports = router;