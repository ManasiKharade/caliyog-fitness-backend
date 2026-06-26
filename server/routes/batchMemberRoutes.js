const express = require("express");
const protectAdmin = require("../middleware/authMiddleware");

const {
  getBatchMembers,
  addBatchMemberFromJoinRequest,
  deleteBatchMember,
} = require("../controllers/batchMemberController");

const router = express.Router();

router.get("/", protectAdmin, getBatchMembers);
router.post("/add/:id", protectAdmin, addBatchMemberFromJoinRequest);
router.delete("/:id", protectAdmin, deleteBatchMember);

module.exports = router;