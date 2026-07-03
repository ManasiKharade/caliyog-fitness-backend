const express = require("express");
const multer = require("multer");

const {
  getExperts,
  addExpert,
  updateExpert,
  deleteExpert,
} = require("../controllers/expertController");

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

router.get("/", getExperts);
router.post("/", upload.single("image"), addExpert);
router.put("/:id", upload.single("image"), updateExpert);
router.delete("/:id", deleteExpert);

module.exports = router;