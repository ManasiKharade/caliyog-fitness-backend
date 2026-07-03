const express = require("express");
const multer = require("multer");

const {
  getTransformations,
  createTransformation,
  updateTransformation,
  deleteTransformation,
} = require("../controllers/transformationController");

const router = express.Router();

// Memory Storage for transformation images
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

router.get("/", getTransformations);
router.post("/", upload.single("image"), createTransformation);
router.put("/:id", upload.single("image"), updateTransformation);
router.delete("/:id", deleteTransformation);

router.use((error, req, res, next) => {
  return res.status(400).json({
    success: false,
    message: error.message || "Image upload failed",
  });
});

module.exports = router;