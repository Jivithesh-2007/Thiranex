const express = require('express');
const { protect } = require('../middleware/auth');
const { createIntent, webhook, verifyPayment } = require('../controllers/paymentController');

const router = express.Router();

router.post('/create-intent', protect, createIntent);
router.post('/webhook', webhook);
router.post('/verify', protect, verifyPayment);

module.exports = router;
