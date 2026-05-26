const serviceService = require('../services/service.service');
const { successResponse, errorResponse } = require('../utils/response');


async function getServices(req, res, next) {
  try {
    const data = await serviceService.getServices();
    return successResponse(res, 200, 0, 'Sukses', data);
  } catch (err) {
    next(err);
  }
}

module.exports = { getServices };