const { verifyToken } = require('../utils/jwt');
const { errorResponse } = require('../utils/response');

function authenticate(req, res, next) {
    
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return errorResponse(res, 401, 108, 'Token tidak valid atau kadaluwarsa');
  }

  const token = authHeader.split(' ')[1]; 

  try {
    const decoded = verifyToken(token);
    req.user = decoded; 
    next();
  } catch (err) {
    return errorResponse(res, 401, 108, 'Token tidak valid atau kadaluwarsa');
  }
}

module.exports = authenticate;