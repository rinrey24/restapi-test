const bannerService = require('../services/banner.service');
const { successResponse, errorResponse } = require('../utils/response');

async function getBanners(req, res, next) {
  try {
    const data = await bannerService.getBanners();
    return successResponse(res, 200, 0, 'Sukses', data);
  } catch (err) {
    next(err);
  }
}

module.exports = { getBanners };