const { connectToDatabase, SurveySubmission } = require("../config/database");
const { successResponse, errorResponse } = require("../utils/responseHelper");
const log = require("../utils/logger");

// Submit survey
exports.submitSurvey = async (req, res) => {
  try {
    await connectToDatabase();

    const { name, email, company, position, responses, averageScore } =
      req.body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !company ||
      !position ||
      !responses ||
      averageScore === undefined
    ) {
      return errorResponse(res, "All fields are required", 400);
    }

    // Check if user has already submitted
    // const existingSubmission = await SurveySubmission.findOne({
    //   email: email.toLowerCase(),
    // });

    // if (existingSubmission) {
    //   return errorResponse(
    //     res,
    //     "Ezzel az e-mail címmel már kitöltötték a felmérést",
    //     409
    //   );
    // }

    // Create new submission
    const submission = new SurveySubmission({
      name: name?.trim(),
      email: email.toLowerCase()?.trim(),
      company: company?.trim(),
      position: position?.trim(),
      responses: responses,
      averageScore: Number.parseFloat(averageScore),
      submittedAt: new Date(),
    });

    const savedSubmission = await submission.save();
    log.success("Survey submission saved:", savedSubmission._id);

    return successResponse(
      res,
      {
        message: "Survey submitted successfully",
        id: savedSubmission._id.toString(),
      },
      201
    );
  } catch (error) {
    log.error("Survey submission error:", error);
    return errorResponse(res, "Failed to submit survey", 500);
  }
};

// Get all submissions (admin only)
exports.getAllSubmissions = async (req, res) => {
  try {
    log.info("Fetching all survey submissions...");
    await connectToDatabase();

    const limit = Number.parseInt(req.query.limit) || 100;
    const skip = Number.parseInt(req.query.skip) || 0;

    const submissions = await SurveySubmission.find({})
      .sort({ submittedAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    log.success(`Found ${submissions.length} submissions`);

    // Transform the data for frontend
    const transformedSubmissions = submissions.map((submission) => {
      // Handle responses field safely
      let responsesObj = {};

      if (submission.responses) {
        if (submission.responses instanceof Map) {
          // If it's a Map, convert to object
          responsesObj = Object.fromEntries(submission.responses);
        } else if (typeof submission.responses === "object") {
          // If it's already an object, use it directly
          responsesObj = submission.responses;
        } else {
          // If it's something else, try to parse it
          try {
            responsesObj = JSON.parse(submission.responses);
          } catch (e) {
            log.warning("Could not parse responses:", submission.responses);
            responsesObj = {};
          }
        }
      }

      return {
        name: submission.name,
        email: submission.email,
        company: submission.company,
        position: submission.position,
        responses: responsesObj,
        averageScore: submission.averageScore,
        submittedAt: submission.submittedAt,
      };
    });

    return successResponse(res, {
      data: transformedSubmissions,
      count: transformedSubmissions.length,
      total: await SurveySubmission.countDocuments(),
    });
  } catch (error) {
    log.error("Get submissions error:", error);
    return errorResponse(res, "Failed to fetch submissions", 500);
  }
};

// Get survey statistics (admin only)
exports.getSurveyStats = async (req, res) => {
  try {
    log.info("Calculating survey statistics...");
    await connectToDatabase();

    const totalSubmissions = await SurveySubmission.countDocuments();

    // Calculate average score
    const avgResult = await SurveySubmission.aggregate([
      {
        $group: {
          _id: null,
          averageScore: { $avg: "$averageScore" },
        },
      },
    ]);

    // Get submissions by company
    const companyStats = await SurveySubmission.aggregate([
      {
        $group: {
          _id: "$company",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          company: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);

    const stats = {
      totalSubmissions,
      averageScore: avgResult[0]?.averageScore || 0,
      submissionsByCompany: companyStats,
    };

    log.success("Stats calculated:", stats);

    return successResponse(res, {
      data: stats,
    });
  } catch (error) {
    log.error("Get stats error:", error);
    return errorResponse(res, "Failed to fetch statistics", 500);
  }
};
