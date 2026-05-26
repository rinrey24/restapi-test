const profileService = require('../services/profile.service');
const { successResponse, errorResponse } = require('../utils/response');

async function getProfile(req, res, next) {
  try {
    const profile = await profileService.getProfile(req.user.userId);
    return successResponse(res, 200, 0, 'Sukses', profile);
  } catch (err) {
    if (err.isOperational) return errorResponse(res, err.statusCode, err.status, err.message);
    next(err);
  }
}

async function updateProfile(req, res, next) {
  try {
    const profile = await profileService.updateProfile(req.user.userId, req.body);
    return successResponse(res, 200, 0, 'Update Profile berhasil', profile);
  } catch (err) {
    if (err.isOperational) return errorResponse(res, err.statusCode, err.status, err.message);
    next(err);
  }
}

async function updateProfileImage(req, res, next) {
  try {
    const profile = await profileService.updateProfileImage(req.user.userId, req.file);
    return successResponse(res, 200, 0, 'Update Profile Image berhasil', profile);
  } catch (err) {
    if (err.isOperational) return errorResponse(res, err.statusCode, err.status, err.message);
    next(err);
  }
}

async function getBalance(req, res, next) {
  try {
    const data = await profileService.getBalance(req.user.userId);
    return successResponse(res, 200, 0, 'Get Balance Berhasil', data);
  } catch (err) {
    if (err.isOperational) return errorResponse(res, err.statusCode, err.status, err.message);
    next(err);
  }
}

module.exports = { getProfile, updateProfile, updateProfileImage, getBalance };