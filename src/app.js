const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

// Import routes
const surveyRoutes = require("./routes/survey");
const emailRoutes = require("./routes/email");
const adminRoutes = require("./routes/admin");
const errorHandler = require("./middleware/errorHandler");
const { connectToDatabase } = require("./config/database");
const log = require("./utils/logger");

const app = express();
// Connect to database on startup
connectToDatabase()
  .then(() => {
    log.success("Database connection established");
  })
  .catch((err) => {
    log.error("Failed to connect to database:", err);
    // Continue starting the server even if DB connection fails initially
  });


// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: [
      "https://forbes-business-quiz.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Logging
app.use(morgan("combined"));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

app.get('/', (req,res) =>{
  res.send({message:'Done'})
})

// API routes - make sure these are router functions
app.use("/api", surveyRoutes);
app.use("/api", emailRoutes);
app.use("/api", adminRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;
