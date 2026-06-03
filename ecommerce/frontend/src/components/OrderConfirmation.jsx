import { Link } from 'react-router-dom';

export default function OrderConfirmation({ order }) {
  if (!order) return null;
  return (
    <div className="confirmation-card">
      <h2>Order Confirmed</h2>
      <p>Order Number: <strong>{order.orderNumber}</strong></p>
      <p>Total Paid: <strong>${order.total?.toFixed?.(2) ?? order.total}</strong></p>
      <p>Estimated Delivery: <strong>{order.estimatedDelivery ? new Date(order.estimatedDelivery).toLocaleDateString() : 'Soon'}</strong></p>
      <div className="confirmation-actions">
        <Link className="btn btn-primary" to="/products">Continue Shopping</Link>
        <Link className="btn btn-ghost" to="/orders">View My Orders</Link>
      </div>
    </div>
  );
}
