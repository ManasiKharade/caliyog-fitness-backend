const jwt = require("jsonwebtoken");

const protectAdmin = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "No token, access denied",
      });
    }

    token = token.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can access this route",
      });
    }

    req.admin = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = protectAdmin;