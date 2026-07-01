const express = require("express");

const {
  registerAdmin,
  loginAdmin,
  updateAdminProfile,
  changeAdminPassword,
} = require("../controllers/adminController");

const protectAdmin = require("../middleware/authMiddleware");

const router = express.Router();

/* ================= PUBLIC ================= */

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

/* ================= PROTECTED ================= */

router.get("/dashboard", protectAdmin, (req, res) => {
  res.status(200).json({
    message: "Welcome to CaliYog Admin Dashboard",
    admin: req.admin,
  });
});

/* Update Profile */

router.put("/profile", protectAdmin, updateAdminProfile);

/* Change Password */

router.put("/change-password", protectAdmin, changeAdminPassword);

module.exports = router;