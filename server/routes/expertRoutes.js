const express = require("express");

const {
  getExperts,
  addExpert,
  updateExpert,
  deleteExpert,
} = require("../controllers/expertController");

const router = express.Router();

router.get("/", getExperts);
router.post("/", addExpert);
router.put("/:id", updateExpert);
router.delete("/:id", deleteExpert);

module.exports = router;