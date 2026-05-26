const express = require('express');
const router = express.Router();

router.use('/', require('./auth.routes'));
router.use('/', require('./profile.routes'));
router.use('/', require('./information.routes'));
router.use('/', require('./transaction.routes'));

module.exports = router;