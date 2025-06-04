// src/models/SurveySubmission.js
const mongoose = require("mongoose");

const surveySubmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    company: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
      maxlength: [100, "Position cannot exceed 100 characters"],
    },
    termAndCondition: {
      type: Boolean,
      required: [true, "Terms and conditions acceptance is required"],
      validate: {
        validator: function (value) {
          return value === true;
        },
        message: "Terms and conditions must be accepted",
      },
    },
    responses: {
      type: Map,
      of: String,
      required: [true, "Survey responses are required"],
      validate: {
        validator: function (responses) {
          return responses.size >= 5; // Ensure all 5 questions are answered
        },
        message: "All survey questions must be answered",
      },
    },
    averageScore: {
      type: Number,
      required: [true, "Average score is required"],
      min: [1, "Average score must be at least 1"],
      max: [5, "Average score cannot exceed 5"],
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SurveySubmission", surveySubmissionSchema);
