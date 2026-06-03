const { v4: uuidv4 } = require('uuid');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const stripe = require('../utils/stripe');
const { SHIPPING_METHODS } = require('../utils/constants');

const TAX_RATE = 0.1;

const normalizeShippingAddress = (address = {}) => ({
  firstName: address.firstName || '',
  lastName: address.lastName || '',
  street: address.street || '',
  city: address.city || '',
  state: address.state || '',
  postalCode: address.postalCode || '',
  country: address.country || '',
  phone: address.phone || '',
  email: address.email || '',
});

const calcTotals = (items, shippingMethod = 'standard') => {
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const shippingCost = subtotal > 50 ? 0 : SHIPPING_METHODS[shippingMethod]?.cost ?? 5;
  const tax = Number((subtotal * TAX_RATE).toFixed(2));
  const total = Number((subtotal + shippingCost + tax).toFixed(2));
  return { subtotal, shippingCost, tax, total };
};

const buildOrderItems = async (items = []) => {
  const orderItems = [];
  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product) {
      throw new Error(`Product not found: ${item.productId}`);
    }
    if (product.stock < item.quantity) {
      throw new Error(`Insufficient stock for ${product.name}`);
    }
    const price = product.price;
    orderItems.push({
      productId: product._id,
      name: product.name,
      price,
      quantity: item.quantity,
      subtotal: Number((price * item.quantity).toFixed(2)),
    });
  }
  return orderItems;
};

const createOrder = async (req, res) => {
  const { items = [], shippingAddress, shippingMethod = 'standard', paymentIntentId } = req.body;
  if (!items.length) {
    res.status(400);
    throw new Error('Cart is empty');
  }

  const existingOrder = paymentIntentId ? await Order.findOne({ paymentIntentId }) : null;
  if (existingOrder) {
    return res.status(200).json({ order: existingOrder, message: 'Order already exists' });
  }

  const orderItems = await buildOrderItems(items);
  const totals = calcTotals(orderItems, shippingMethod);
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + (shippingMethod === 'overnight' ? 1 : shippingMethod === 'express' ? 3 : 7));

  if (paymentIntentId) {
    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (intent.status !== 'succeeded') {
      res.status(400);
      throw new Error('Payment not completed');
    }
  }

  const orderNumber = `SH-${Date.now()}-${uuidv4().split('-')[0].toUpperCase()}`;
  const order = await Order.create({
    userId: req.user._id,
    orderNumber,
    items: orderItems,
    shippingAddress: normalizeShippingAddress(shippingAddress),
    shippingMethod,
    shippingCost: totals.shippingCost,
    subtotal: totals.subtotal,
    tax: totals.tax,
    total: totals.total,
    paymentMethod: 'card',
    paymentIntentId,
    paymentStatus: 'paid',
    orderStatus: 'processing',
    estimatedDelivery,
  });

  await Promise.all(
    orderItems.map((item) => Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } }))
  );
  await Cart.findOneAndUpdate({ userId: req.user._id }, { items: [] });

  res.status(201).json({ order });
};

const getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json({ orders });
};

const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Access denied');
  }
  res.json({ order });
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json({ orders });
};

const updateOrderStatus = async (req, res) => {
  const { orderStatus, trackingNumber } = req.body;
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { orderStatus, trackingNumber: trackingNumber || undefined },
    { new: true, runValidators: true }
  );
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  res.json({ order });
};

module.exports = { createOrder, getOrders, getOrderById, getAllOrders, updateOrderStatus, calcTotals, buildOrderItems };
