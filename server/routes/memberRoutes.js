const express = require("express");
const router = express.Router();

const {
  getMembers,
  deleteMember,
} = require("../controllers/memberController");

const protectAdmin = require("../middleware/protectAdmin");

router.get("/", protectAdmin, getMembers);
router.delete("/:id", protectAdmin, deleteMember);

module.exports = router;