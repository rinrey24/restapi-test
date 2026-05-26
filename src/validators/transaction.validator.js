const Joi = require('joi');

const topUpSchema = Joi.object({
  top_up_amount: Joi.number().integer().min(1).required().messages({
    'number.base': 'Parameter amount hanya boleh angka',
    'number.min': 'Minimum Top Up adalah 1',
    'any.required': 'Parameter amount harus diisi',
  }),
});

const paymentSchema = Joi.object({
  service_code: Joi.string().required().messages({
    'any.required': 'Parameter service_code harus diisi',
  }),
});

module.exports = { topUpSchema, paymentSchema };