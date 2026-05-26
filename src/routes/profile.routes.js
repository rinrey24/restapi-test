const express = require('express');
const router = express.Router();
const controller = require('../controllers/profile.controller');
const authenticate = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const validate = require('../middlewares/validator.middleware');
const { updateProfileSchema } = require('../validators/profile.validator');

router.get('/profile', authenticate, controller.getProfile);
router.put('/profile/update', authenticate, validate(updateProfileSchema), controller.updateProfile);
router.put('/profile/image', authenticate, upload.single('file'), controller.updateProfileImage);
router.get('/balance', authenticate, controller.getBalance);

module.exports = router;