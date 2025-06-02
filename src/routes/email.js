const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

// POST /api/send-email
router.post("/send-email", emailController.sendResultEmail);

module.exports = router;
