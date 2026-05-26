const Joi = require('joi');

const updateProfileSchema = Joi.object({
  first_name: Joi.string().required().messages({
    'any.required': 'Parameter first_name harus diisi',
  }),
  last_name: Joi.string().required().messages({
    'any.required': 'Parameter last_name harus diisi',
  }),
});

module.exports = { updateProfileSchema };