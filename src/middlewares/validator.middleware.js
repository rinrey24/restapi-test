const { errorResponse } = require('../utils/response');

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: true });
    if (error) {
      return errorResponse(res, 400, 102, error.details[0].message);
    }
    next();
  };
}

module.exports = validate;