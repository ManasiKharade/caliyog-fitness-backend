const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Admin Register
const registerAdmin = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name: name || "Admin",
      email,
      mobile: mobile || "",
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        mobile: admin.mobile,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: "admin",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        mobile: admin.mobile,
        role: "admin",
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Update Admin Profile
const updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.admin?.id || req.user?.id;

    const { name, email, mobile } = req.body;

    if (!adminId) {
      return res.status(401).json({
        message: "Unauthorized admin",
      });
    }

    if (!name || !email || !mobile) {
      return res.status(400).json({
        message: "Please fill all profile fields",
      });
    }

    const emailExists = await Admin.findOne({
      email,
      _id: { $ne: adminId },
    });

    if (emailExists) {
      return res.status(400).json({
        message: "Email already used by another admin",
      });
    }

    const admin = await Admin.findByIdAndUpdate(
      adminId,
      {
        name,
        email,
        mobile,
      },
      {
        new: true,
      }
    ).select("-password");

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        mobile: admin.mobile,
        role: "admin",
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Profile update failed",
      error: error.message,
    });
  }
};

// Change Admin Password
const changeAdminPassword = async (req, res) => {
  try {
    const adminId = req.admin?.id || req.user?.id;

    const { currentPassword, newPassword } = req.body;

    if (!adminId) {
      return res.status(401).json({
        message: "Unauthorized admin",
      });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Please enter current and new password",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "New password must be at least 6 characters",
      });
    }

    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Password update failed",
      error: error.message,
    });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  updateAdminProfile,
  changeAdminPassword,
};