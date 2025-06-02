const express = require("express")
const router = express.Router()

// Import route modules
const surveyRoutes = require("./survey")
const emailRoutes = require("./email")
const adminRoutes = require("./admin")

// Health check endpoint
router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "Forbes Survey Backend",
  })
})

// Mount routes
router.use("/", surveyRoutes)
router.use("/", emailRoutes)
router.use("/admin", adminRoutes)

module.exports = router
