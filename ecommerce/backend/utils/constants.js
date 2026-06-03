const SHIPPING_METHODS = {
  standard: { label: 'Standard Shipping', days: '5-7 days', cost: 5 },
  express: { label: 'Express Shipping', days: '2-3 days', cost: 15 },
  overnight: { label: 'Overnight Shipping', days: '1 day', cost: 25 },
};

const ORDER_STATUSES = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const PAYMENT_STATUSES = ['pending', 'paid', 'failed'];

module.exports = {
  SHIPPING_METHODS,
  ORDER_STATUSES,
  PAYMENT_STATUSES,
};
