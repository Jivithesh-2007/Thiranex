import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { authService } from '../services/authService';
import { orderService } from '../services/orderService';

export default function AccountPage() {
  const { user, token, setUser } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (token) {
      authService.profile().then((data) => setUser(data.user)).catch(() => undefined);
      orderService.list(token).then((data) => setOrders(data.orders)).catch(() => setOrders([]));
    }
  }, [token, setUser]);

  if (!user) return <main className="container section"><div className="empty-state">Loading account…</div></main>;

  return (
    <main className="container section">
      <div className="section-heading"><h1>Account</h1></div>
      <div className="account-grid">
        <section className="checkout-card">
          <h3>Profile</h3>
          <p>{user.firstName} {user.lastName}</p>
          <p>{user.email}</p>
          <p>{user.phone || 'No phone saved'}</p>
        </section>
        <section className="checkout-card">
          <h3>Saved Addresses</h3>
          {user.addresses?.length ? user.addresses.map((address, index) => <p key={index}>{address.street}, {address.city}, {address.state}</p>) : <p>No saved addresses.</p>}
        </section>
      </div>
      <section className="section">
        <h3>Recent Orders</h3>
        <div className="list-card">
          {orders.slice(0, 5).map((order) => <div key={order._id} className="list-row"><span>{order.orderNumber}</span><span>{order.orderStatus}</span><span>${order.total.toFixed(2)}</span></div>)}
        </div>
      </section>
    </main>
  );
}
