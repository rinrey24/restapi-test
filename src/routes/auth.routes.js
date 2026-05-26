const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validator.middleware');
const { registerSchema, loginSchema } = require('../validators/auth.validator');

router.post('/registration', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

module.exports = router;