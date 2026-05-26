const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const bannerController = require('../controllers/banner.controller');
const authenticate = require('../middlewares/auth.middleware');

router.get('/banner', bannerController.getBanners);
router.get('/services', authenticate, serviceController.getServices);

module.exports = router;