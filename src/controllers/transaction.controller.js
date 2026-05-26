const transactionService = require('../services/transaction.service');
const { successResponse, errorResponse } = require('../utils/response');

async function topUp(req, res, next) {
  try {
    const data = await transactionService.topUp(req.user.userId, req.body.top_up_amount);
    return successResponse(res, 200, 0, 'Top Up Balance berhasil', data);
  } catch (err) {
    if (err.isOperational) return errorResponse(res, err.statusCode, err.status, err.message);
    next(err);
  }
}

async function payment(req, res, next) {
  try {
    const data = await transactionService.payment(req.user.userId, req.body.service_code);
    return successResponse(res, 200, 0, 'Transaksi berhasil', data);
  } catch (err) {
    if (err.isOperational) return errorResponse(res, err.statusCode, err.status, err.message);
    next(err);
  }
}

async function getHistory(req, res, next) {
  try {
    const offset = parseInt(req.query.offset) || 0;
    const limit  = parseInt(req.query.limit)  || 0;
    const data = await transactionService.getHistory(req.user.userId, offset, limit);
    return successResponse(res, 200, 0, 'Get History Berhasil', data);
  } catch (err) {
    if (err.isOperational) return errorResponse(res, err.statusCode, err.status, err.message);
    next(err);
  }
}

module.exports = { topUp, payment, getHistory };