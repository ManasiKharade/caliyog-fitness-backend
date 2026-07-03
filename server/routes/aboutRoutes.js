const express = require("express");
const multer = require("multer");

const {
  getAbout,
  updateAbout,
} = require("../controllers/aboutController");

const router = express.Router();

// Use Memory Storage for holding uploaded images in memory as buffers
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

router.get("/", getAbout);

router.put(
  "/",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
  ]),
  updateAbout
);

// Error Handler for Multer / Upload Issues
router.use((error, req, res, next) => {
  return res.status(400).json({
    success: false,
    message: error.message || "Image upload failed",
  });
});

module.exports = router;