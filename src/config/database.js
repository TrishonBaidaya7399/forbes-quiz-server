const mongoose = require("mongoose");
const log = require("../utils/logger");

// MongoDB connection string
const MONGODB_URI =
  process.env.MONGODB_URI ||
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.2ltpfdm.mongodb.net/forbes-survey?retryWrites=true&w=majority`;

// Connection options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  socketTimeoutMS: 45000,
  family: 4, // Use IPv4, skip trying IPv6
};

// Connection state
let isConnected = false;
let connectionPromise = null;

// Connect to database
const connectToDatabase = async () => {
  if (isConnected) {
    log.info("Using existing database connection");
    return mongoose.connection;
  }

  // If there's already a connection attempt in progress, return that promise
  if (connectionPromise) {
    log.info("Connection attempt already in progress, waiting...");
    return connectionPromise;
  }

  try {
    log.info("Connecting to MongoDB...");
    log.info(
      `Connection string: ${MONGODB_URI.replace(
        /\/\/([^:]+):([^@]+)@/,
        "//***:***@"
      )}`
    ); // Log sanitized URI

    // Create a new connection promise
    connectionPromise = mongoose.connect(MONGODB_URI, mongooseOptions);

    // Wait for connection
    await connectionPromise;

    isConnected = true;
    log.success(`Connected to MongoDB: ${mongoose.connection.host}`);

    // Set up connection event handlers
    mongoose.connection.on("error", (err) => {
      log.error("MongoDB connection error:", err);
      isConnected = false;
    });

    mongoose.connection.on("disconnected", () => {
      log.warning("MongoDB disconnected");
      isConnected = false;
      connectionPromise = null;
    });

    mongoose.connection.on("reconnected", () => {
      log.success("MongoDB reconnected");
      isConnected = true;
    });

    return mongoose.connection;
  } catch (error) {
    log.error("MongoDB connection error:", error);
    connectionPromise = null;
    isConnected = false;
    throw error;
  }
};

// Survey Submission Schema
const surveySubmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    responses: {
      type: mongoose.Schema.Types.Mixed, // Changed from Map to Mixed for better compatibility
      required: true,
    },
    averageScore: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for better performance
surveySubmissionSchema.index({ email: 1 });
surveySubmissionSchema.index({ submittedAt: -1 });
surveySubmissionSchema.index({ company: 1 });

// Create model
const SurveySubmission =
  mongoose.models.SurveySubmission ||
  mongoose.model("SurveySubmission", surveySubmissionSchema);

module.exports = {
  connectToDatabase,
  SurveySubmission,
  mongoose,
};
