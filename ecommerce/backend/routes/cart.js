const express = require('express');
const { protect } = require('../middleware/auth');
const { getCart, addItem, updateItemQuantity, removeItem, clearCart } = require('../controllers/cartController');

const router = express.Router();

router.use(protect);
router.get('/', getCart);
router.post('/add', addItem);
router.put('/item/:itemId', updateItemQuantity);
router.delete('/item/:itemId', removeItem);
router.delete('/', clearCart);

module.exports = router;
