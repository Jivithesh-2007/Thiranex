const express = require('express');
const { protect } = require('../middleware/auth');
const { getProfile, updateProfile, addAddress } = require('../controllers/userController');

const router = express.Router();

router.use(protect);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/address', addAddress);

module.exports = router;
