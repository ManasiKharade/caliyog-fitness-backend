const express = require("express");
const protectAdmin = require("../middleware/authMiddleware");

const {
  getTransformations,
  addTransformation,
  updateTransformation,
  deleteTransformation,
} = require("../controllers/transformationController");

const router = express.Router();

router.get("/", getTransformations);
router.post("/", protectAdmin, addTransformation);
router.put("/:id", protectAdmin, updateTransformation);
router.delete("/:id", protectAdmin, deleteTransformation);

module.exports = router;