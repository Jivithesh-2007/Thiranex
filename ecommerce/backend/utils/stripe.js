const Stripe = require('stripe');

const stripeSecret = process.env.STRIPE_SECRET_KEY || '';

const stripe = new Stripe(stripeSecret, {
  apiVersion: '2024-06-20',
});

module.exports = stripe;
