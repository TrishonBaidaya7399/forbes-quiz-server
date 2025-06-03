const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const routes = require("./src/routes/index");
const { connectToDatabase } = require("./src/config/database");
const log = require("./src/utils/logger");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database on startup
connectToDatabase()
  .then(() => {
    log.success("Database connection established");
  })
  .catch((err) => {
    log.error("Failed to connect to database:", err);
    // Continue starting the server even if DB connection fails initially
  });

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/api", routes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Forbes Survey Backend API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      submissions: "/api/survey-submissions",
      stats: "/api/survey-stats",
      submit: "/api/survey-submission",
      email: "/api/send-email",
      admin: "/api/admin/login",
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  log.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// Start server
app.listen(PORT, () => {
  log.success(`Server running on port ${PORT}`);
  log.info(`API available at http://localhost:${PORT}/api`);
  log.info(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
