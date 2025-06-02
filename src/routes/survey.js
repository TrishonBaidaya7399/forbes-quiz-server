const express = require("express")
const router = express.Router()
const surveyController = require("../controllers/surveyController")
const { authenticateAdmin } = require("../middleware/auth")

// POST /api/survey-submission (public)
router.post("/survey-submission", surveyController.submitSurvey)

// GET /api/survey-submissions (admin only)
router.get("/survey-submissions", authenticateAdmin, surveyController.getAllSubmissions)

// GET /api/survey-stats (admin only)
router.get("/survey-stats", authenticateAdmin, surveyController.getSurveyStats)

module.exports = router
