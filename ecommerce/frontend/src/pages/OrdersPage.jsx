import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { orderService } from '../services/orderService';

export default function OrdersPage() {
  const { token, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      orderService.list(token).then((data) => setOrders(data.orders)).catch(() => setOrders([]));
    }
  }, [isAuthenticated, token]);

  if (!isAuthenticated) return <main className="container section"><div className="empty-state">Please log in to view your orders.</div></main>;

  return (
    <main className="container section">
      <div className="section-heading"><h1>Order History</h1></div>
      <div className="list-card">
        {orders.map((order) => <Link key={order._id} to={`/orders/${order._id}`} className="list-row"><strong>{order.orderNumber}</strong><span>{new Date(order.createdAt).toLocaleDateString()}</span><span>${order.total.toFixed(2)}</span><span>{order.orderStatus}</span></Link>)}
        {!orders.length && <div className="empty-state">No orders found.</div>}
      </div>
    </main>
  );
}
