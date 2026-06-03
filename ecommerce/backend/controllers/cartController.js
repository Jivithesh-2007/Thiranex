const Cart = require('../models/Cart');
const Product = require('../models/Product');

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ userId }).populate('items.productId');
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }
  return cart;
};

const formatCart = async (cart) => {
  await cart.populate('items.productId');
  const items = cart.items.map((item) => ({
    _id: item._id,
    product: item.productId,
    quantity: item.quantity,
    price: item.price,
    subtotal: item.quantity * item.price,
  }));
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  return { _id: cart._id, items, subtotal };
};

const getCart = async (req, res) => {
  const cart = await getOrCreateCart(req.user._id);
  res.json({ cart: await formatCart(cart) });
};

const addItem = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (product.stock < quantity) {
    res.status(400);
    throw new Error('Insufficient stock');
  }

  const cart = await Cart.findOne({ userId: req.user._id });
  const existing = cart?.items.find((item) => item.productId.toString() === productId);

  if (existing) {
    existing.quantity += quantity;
    existing.price = product.price;
  } else {
    if (cart) {
      cart.items.push({ productId, quantity, price: product.price });
    } else {
      await Cart.create({ userId: req.user._id, items: [{ productId, quantity, price: product.price }] });
      const fresh = await Cart.findOne({ userId: req.user._id });
      return res.status(201).json({ cart: await formatCart(fresh) });
    }
  }

  await cart.save();
  const updated = await Cart.findOne({ userId: req.user._id });
  res.status(201).json({ cart: await formatCart(updated) });
};

const updateItemQuantity = async (req, res) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }

  const item = cart.items.id(req.params.itemId);
  if (!item) {
    res.status(404);
    throw new Error('Cart item not found');
  }

  if (quantity <= 0) {
    item.deleteOne();
  } else {
    const product = await Product.findById(item.productId);
    if (product.stock < quantity) {
      res.status(400);
      throw new Error('Insufficient stock');
    }
    item.quantity = quantity;
    item.price = product.price;
  }

  await cart.save();
  const updated = await Cart.findOne({ userId: req.user._id });
  res.json({ cart: await formatCart(updated) });
};

const removeItem = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });
  if (!cart) {
    res.status(404);
    throw new Error('Cart not found');
  }
  cart.items = cart.items.filter((item) => item._id.toString() !== req.params.itemId);
  await cart.save();
  const updated = await Cart.findOne({ userId: req.user._id });
  res.json({ cart: await formatCart(updated) });
};

const clearCart = async (req, res) => {
  await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [] }, { upsert: true, new: true });
  res.json({ message: 'Cart cleared' });
};

module.exports = { getCart, addItem, updateItemQuantity, removeItem, clearCart, formatCart };
