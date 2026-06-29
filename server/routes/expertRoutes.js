const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  getExperts,
  addExpert,
  updateExpert,
  deleteExpert,
} = require("../controllers/expertController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.get("/", getExperts);
router.post("/", upload.single("image"), addExpert);
router.put("/:id", upload.single("image"), updateExpert);
router.delete("/:id", deleteExpert);

module.exports = router;