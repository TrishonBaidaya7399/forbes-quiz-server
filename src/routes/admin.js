const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticateAdmin } = require("../middleware/auth");

// POST /api/admin/login
router.post("/login", adminController.login);

// POST /api/admin/create (for initial setup)
router.post("/create", adminController.createAdmin);

// GET /api/admin/profile
router.get("/profile", authenticateAdmin, adminController.getProfile);

module.exports = router;
