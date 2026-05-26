const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Parameter email tidak sesuai format',
    'any.required': 'Parameter email harus diisi',
  }),
  first_name: Joi.string().required().messages({
    'any.required': 'Parameter first_name harus diisi',
  }),
  last_name: Joi.string().required().messages({
    'any.required': 'Parameter last_name harus diisi',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password minimal 8 karakter',
    'any.required': 'Parameter password harus diisi',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Paramter email tidak sesuai format',
  }),
  password: Joi.string().min(8).required(),
});

module.exports = { registerSchema, loginSchema };