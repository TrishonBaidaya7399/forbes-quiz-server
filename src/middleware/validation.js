const { errorResponse } = require('../utils/responseHelper');

exports.validateSurveySubmission = (req, res, next) => {
  const { name, email, company, position, responses, averageScore } = req.body;

  // Required fields validation
  if (!name || !email || !company || !position || !responses || averageScore === undefined) {
    return errorResponse(res, 'All fields are required', 400);
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return errorResponse(res, 'Invalid email format', 400);
  }

  // Responses validation
  if (typeof responses !== 'object' || Object.keys(responses).length < 5) {
    return errorResponse(res, 'All survey questions must be answered', 400);
  }

  // Average score validation
  if (averageScore < 1 || averageScore > 5) {
    return errorResponse(res, 'Average score must be between 1 and 5', 400);
  }

  next();
};