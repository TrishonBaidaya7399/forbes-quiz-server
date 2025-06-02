const { connectToDatabase } = require("../config/database");
const { generateToken } = require("../middleware/auth");
const { successResponse, errorResponse } = require("../utils/responseHelper");
const log = require("../utils/logger");

// Admin login
exports.login = async (req, res) => {
  try {
    // Ensure database connection
    await connectToDatabase();

    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, "Email and password are required", 400);
    }

    // Import Admin model here to ensure it's loaded after mongoose connection
    const Admin = require("../models/Admin");

    // Find admin by email
    log.info(`Attempting login for admin: ${email}`);
    const admin = await Admin.findOne({ email: email.toLowerCase() });

    if (!admin) {
      log.warning(`Login failed: Admin not found for email ${email}`);
      return errorResponse(res, "Invalid credentials", 401);
    }

    // Check if admin is active
    if (!admin.isActive) {
      log.warning(`Login failed: Admin account is deactivated for ${email}`);
      return errorResponse(res, "Account is deactivated", 401);
    }

    // Simple password verification - direct comparison
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      log.warning(`Login failed: Invalid password for ${email}`);
      return errorResponse(res, "Invalid credentials", 401);
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate token
    const token = generateToken(admin._id);

    log.success(`Admin login successful: ${admin.email}`);

    return successResponse(res, {
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    log.error("Admin login error:", error);
    return errorResponse(res, "Login failed", 500);
  }
};

// Create admin (for initial setup) - no password hashing
exports.createAdmin = async (req, res) => {
  try {
    // Ensure database connection
    await connectToDatabase();

    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return errorResponse(res, "Email, password, and name are required", 400);
    }

    // Import Admin model here to ensure it's loaded after mongoose connection
    const Admin = require("../models/Admin");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return errorResponse(res, "Admin with this email already exists", 409);
    }

    // Create new admin with plain text password
    const admin = new Admin({
      email: email.toLowerCase(),
      password, // Store password as plain text
      name,
    });

    await admin.save();

    log.success(`Admin created successfully: ${admin.email}`);

    return successResponse(
      res,
      {
        message: "Admin created successfully",
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
      },
      201
    );
  } catch (error) {
    log.error("Create admin error:", error);
    return errorResponse(res, "Failed to create admin", 500);
  }
};

// Get admin profile
exports.getProfile = async (req, res) => {
  try {
    return successResponse(res, {
      admin: req.admin,
    });
  } catch (error) {
    log.error("Get profile error:", error);
    return errorResponse(res, "Failed to get profile", 500);
  }
};
