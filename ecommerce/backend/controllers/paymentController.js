const stripe = require('../utils/stripe');
const Order = require('../models/Order');
const { buildOrderItems, calcTotals } = require('./orderController');

const createIntent = async (req, res) => {
  const { items = [], shippingMethod = 'standard' } = req.body;
  const orderItems = await buildOrderItems(items);
  const totals = calcTotals(orderItems, shippingMethod);
  const amount = Math.round(totals.total * 100);

  const intent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
    metadata: {
      userId: req.user._id.toString(),
      shippingMethod,
    },
  });

  res.json({ clientSecret: intent.client_secret, amount: totals.total });
};

const webhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const intent = event.data.object;
    await Order.findOneAndUpdate(
      { paymentIntentId: intent.id },
      { paymentStatus: 'paid', orderStatus: 'processing' },
      { new: true }
    );
  }

  res.json({ received: true });
};

const verifyPayment = async (req, res) => {
  const { paymentIntentId } = req.body;
  const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
  const order = await Order.findOne({ paymentIntentId });
  if (!order) {
    res.status(404);
    throw new Error('Order not found for payment');
  }

  const paid = intent.status === 'succeeded';
  order.paymentStatus = paid ? 'paid' : 'failed';
  order.orderStatus = paid ? 'processing' : 'pending';
  await order.save();

  res.json({ paid, order });
};

module.exports = { createIntent, webhook, verifyPayment };
