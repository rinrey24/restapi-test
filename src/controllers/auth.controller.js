const authService = require('../services/auth.service');
const { successResponse, errorResponse } = require('../utils/response');

async function register(req, res, next) {
  try {
    await authService.register(req.body);
    return successResponse(res, 200, 0, 'Registrasi berhasil silahkan login', null);
  } catch (err) {
    if (err.isOperational) {
      return errorResponse(res, err.statusCode, err.status, err.message);
    }
    next(err); 
  }
}

async function login(req, res, next) {
  try {
    const token = await authService.login(req.body);
    return successResponse(res, 200, 0, 'Login Sukses', { token });
  } catch (err) {
    if (err.isOperational) {
      return errorResponse(res, err.statusCode, err.status, err.message);
    }
    next(err);
  }
}

module.exports = { register, login };