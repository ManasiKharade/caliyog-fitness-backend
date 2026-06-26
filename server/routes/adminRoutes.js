const express = require("express");
const {
  registerAdmin,
  loginAdmin,
} = require("../controllers/adminController");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

router.get("/dashboard", protectAdmin, (req, res) => {
  res.status(200).json({
    message: "Welcome to CaliYog Admin Dashboard",
    admin: req.admin,
  });
});

module.exports = router;