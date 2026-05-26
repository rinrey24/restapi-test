function successResponse(res, statusCode, status, message, data = null) {
  return res.status(statusCode).json({
    status,
    message,
    data,
  });
}

function errorResponse(res, statusCode, status, message) {
  return res.status(statusCode).json({
    status,
    message,
    data: null,
  });
}

module.exports = { successResponse, errorResponse };