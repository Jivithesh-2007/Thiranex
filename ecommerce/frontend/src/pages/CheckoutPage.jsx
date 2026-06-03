import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from '../components/Checkout';
import CheckoutForm from '../components/CheckoutForm';
import OrderConfirmation from '../components/OrderConfirmation';
import PaymentForm from '../components/PaymentForm';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { orderService } from '../services/orderService';
import { stripeService } from '../services/stripeService';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const { cart, clearCart, subtotal, shipping, tax, total } = useCart();
  const [step, setStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState({});
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [clientSecret, setClientSecret] = useState('');
  const [busy, setBusy] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  if (!cart.items.length && !order) {
    return <main className="container section"><div className="empty-state">Your cart is empty. <button className="btn btn-primary" onClick={() => navigate('/products')}>Shop now</button></div></main>;
  }

  const normalizeItems = () => cart.items.map((item) => ({ productId: item.product?._id || item.productId || item._id, quantity: item.quantity }));

  const openPayment = async () => {
    const data = await stripeService.createIntent({ items: normalizeItems(), shippingMethod }, token);
    setClientSecret(data.clientSecret);
    setStep(3);
  };

  const placeOrder = async (paymentIntentId) => {
    setBusy(true);
    try {
      const payload = {
        items: normalizeItems(),
        shippingAddress: shippingAddress,
        shippingMethod,
        paymentIntentId,
      };
      const data = await orderService.create(payload, token);
      await clearCart();
      setOrder(data.order);
      window.dispatchEvent(new CustomEvent('shophub-toast', { detail: { type: 'success', message: 'Order placed successfully' } }));
      navigate('/order-confirmation', { state: { order: data.order } });
    } catch (error) {
      window.dispatchEvent(new CustomEvent('shophub-toast', { detail: { type: 'error', message: error.message } }));
      throw error;
    } finally {
      setBusy(false);
    }
  };

  return (
    <Checkout title="Checkout">
      <div className="checkout-grid">
        {step < 3 && <CheckoutForm step={step} shipping={shippingAddress} setShipping={setShippingAddress} shippingMethod={shippingMethod} setShippingMethod={setShippingMethod} onContinue={(nextStep) => (nextStep === 3 ? openPayment() : setStep(nextStep))} />}
        {step === 3 && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm clientSecret={clientSecret} onPay={placeOrder} busy={busy} total={total} />
          </Elements>
        )}
        <aside className="cart-summary checkout-summary">
          <h3>Review Order</h3>
          <div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
          <div><span>Shipping</span><strong>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</strong></div>
          <div><span>Tax</span><strong>${tax.toFixed(2)}</strong></div>
          <hr />
          <div className="total-row"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
          {order && <OrderConfirmation order={order} />}
        </aside>
      </div>
    </Checkout>
  );
}
