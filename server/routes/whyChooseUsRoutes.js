const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  getWhyChooseUs,
  createWhyChooseUs,
  updateWhyChooseUs,
  deleteWhyChooseUs,
} = require("../controllers/whyChooseUsController");


const uploadDir = path.join(__dirname, "../../public_uploads/whychooseus");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const fileName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 6MB
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

// Error Handler
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