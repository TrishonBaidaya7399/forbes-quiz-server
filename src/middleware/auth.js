const jwt = require("jsonwebtoken");
const { connectToDatabase } = require("../config/database");
const log = require("../utils/logger");

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "your-super-secret-jwt-key-change-this-in-production";

// Generate JWT token
const generateToken = (adminId) => {
  return jwt.sign({ adminId }, JWT_SECRET, { expiresIn: "24h" });
};

// Verify JWT token middleware
const authenticateAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    const decoded = jwt.verify(token, JWT_SECRET);

    // Ensure database connection
    await connectToDatabase();

    // Import Admin model here to ensure it's loaded after mongoose connection
    const Admin = require("../models/Admin");

    const admin = await Admin.findById(decoded.adminId);

    if (!admin || !admin.isActive) {
      return res.status(401).json({
        success: false,
        message: "Invalid token or admin not found.",
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    log.error("Auth middleware error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

module.exports = {
  generateToken,
  authenticateAdmin,
};
