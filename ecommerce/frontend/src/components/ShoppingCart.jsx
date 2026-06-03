import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

export default function ShoppingCart() {
  const { cart, updateItem, removeItem, subtotal, shipping, tax, total, clearCart } = useCart();

  if (!cart.items.length) {
    return <div className="empty-state">Your cart is empty. <Link to="/products">Start shopping</Link></div>;
  }

  return (
    <div className="cart-layout">
      <div className="cart-items">
        {cart.items.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.product?.image || item.product?.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80'} alt={item.product?.name} />
            <div>
              <h4>{item.product?.name}</h4>
              <p>${(item.price || item.product?.price || 0).toFixed(2)} each</p>
            </div>
            <input type="number" min="1" max="10" value={item.quantity} onChange={(e) => updateItem(item._id, Number(e.target.value))} />
            <strong>${((item.price || item.product?.price || 0) * item.quantity).toFixed(2)}</strong>
            <button className="btn btn-ghost" onClick={() => removeItem(item._id)}>Remove</button>
          </div>
        ))}
      </div>
      <aside className="cart-summary">
        <h3>Order Summary</h3>
        <div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
        <div><span>Shipping</span><strong>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</strong></div>
        <div><span>Tax</span><strong>${tax.toFixed(2)}</strong></div>
        <hr />
        <div className="total-row"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
        <Link className="btn btn-primary full" to="/checkout">Proceed to Checkout</Link>
        <div className="cart-actions">
          <Link className="btn btn-ghost" to="/products">Continue Shopping</Link>
          <button className="btn btn-danger" onClick={clearCart}>Clear Cart</button>
        </div>
      </aside>
    </div>
  );
}
