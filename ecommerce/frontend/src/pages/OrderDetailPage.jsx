import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { orderService } from '../services/orderService';

export default function OrderDetailPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    orderService.detail(id, token).then((data) => setOrder(data.order)).catch(() => setOrder(null));
  }, [id, token]);

  if (!order) return <main className="container section"><div className="loading-grid">Loading order…</div></main>;

  return (
    <main className="container section">
      <div className="section-heading"><h1>{order.orderNumber}</h1></div>
      <div className="checkout-card">
        <p>Status: <strong>{order.orderStatus}</strong></p>
        <p>Total: <strong>${order.total.toFixed(2)}</strong></p>
        <p>Estimated delivery: <strong>{order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString() : 'N/A'}</strong></p>
        <div className="list-card">
          {order.items.map((item) => <div key={item.productId} className="list-row"><span>{item.name}</span><span>x{item.quantity}</span><span>${item.subtotal.toFixed(2)}</span></div>)}
        </div>
      </div>
    </main>
  );
}
