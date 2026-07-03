const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  getWhyChooseUs,
  createWhyChooseUs,
  updateWhyChooseUs,
  deleteWhyChooseUs,
} = require("../controllers/whyChooseUsController");

// Memory storage for holding uploaded images in memory as buffers
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

// Routes
router.get("/", getWhyChooseUs);
router.post("/", upload.single("image"), createWhyChooseUs);
router.put("/:id", upload.single("image"), updateWhyChooseUs);
router.delete("/:id", deleteWhyChooseUs);

// Error Handler for Multer / Upload Issues
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(400).json({
    success: false,
    message: err.message || "Image upload failed",
  });
});

module.exports = router;