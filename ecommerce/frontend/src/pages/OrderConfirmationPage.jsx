import { useLocation, Link } from 'react-router-dom';
import OrderConfirmation from '../components/OrderConfirmation';

export default function OrderConfirmationPage() {
  const { state } = useLocation();
  const order = state?.order;

  return (
    <main className="container section">
      {order ? <OrderConfirmation order={order} /> : <div className="empty-state">No order available. <Link to="/products">Continue shopping</Link></div>}
    </main>
  );
}
