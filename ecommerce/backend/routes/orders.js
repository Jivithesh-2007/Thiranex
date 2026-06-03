const express = require('express');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
const { createOrder, getOrders, getOrderById, getAllOrders, updateOrderStatus } = require('../controllers/orderController');

const router = express.Router();

router.use(protect);
router.post('/', createOrder);
router.get('/', getOrders);
router.get('/admin/all', admin, getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id/status', admin, updateOrderStatus);

module.exports = router;
