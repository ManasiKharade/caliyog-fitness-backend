const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  getTransformations,
  createTransformation,
  updateTransformation,
  deleteTransformation,
} = require("../controllers/transformationController");

const router = express.Router();

const uploadDir = path.join(__dirname, "../../public_uploads/transformations");
// Fix if transformations is accidentally created as a file
if (fs.existsSync(uploadDir) && !fs.lstatSync(uploadDir).isDirectory()) {
  fs.unlinkSync(uploadDir);
}

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
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

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
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