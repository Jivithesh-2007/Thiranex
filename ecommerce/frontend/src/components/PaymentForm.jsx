import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function PaymentForm({ clientSecret, onPay, busy, total }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    setError('');
    const card = elements.getElement(CardElement);
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: { name: 'ShopHub Customer' },
      },
    });
    if (result.error) {
      setError(result.error.message || 'Payment failed');
      return;
    }
    await onPay(result.paymentIntent.id);
  };

  return (
    <form className="checkout-card" onSubmit={handleSubmit}>
      <h3>Payment Information</h3>
      <div className="stripe-box"><CardElement options={{ hidePostalCode: true }} /></div>
      <p className="muted">Use test card 4242 4242 4242 4242 for success.</p>
      {error && <div className="error-box">{error}</div>}
      <div className="total-review">Pay ${total.toFixed(2)}</div>
      <button className="btn btn-primary" disabled={!stripe || busy}>{busy ? 'Processing…' : 'Place Order'}</button>
    </form>
  );
}
