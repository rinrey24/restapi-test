const express = require('express');
const router = express.Router();
const controller = require('../controllers/transaction.controller');
const authenticate = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validator.middleware');
const { topUpSchema, paymentSchema } = require('../validators/transaction.validator');

router.post('/topup', authenticate, validate(topUpSchema), controller.topUp);
router.post('/transaction', authenticate, validate(paymentSchema), controller.payment);
router.get('/transaction/history', authenticate, controller.getHistory);

module.exports = router;