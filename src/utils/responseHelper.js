const successResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    ...data,
  });
};

const errorResponse = (res, message, statusCode = 500) => {
  console.error(`❌ Error Response (${statusCode}):`, message);
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
