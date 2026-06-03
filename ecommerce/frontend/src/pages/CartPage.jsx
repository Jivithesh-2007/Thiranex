import { Link } from 'react-router-dom';
import ShoppingCart from '../components/ShoppingCart';

export default function CartPage() {
  return (
    <main className="container section">
      <div className="section-heading">
        <h1>Your Cart</h1>
        <Link to="/products">Continue shopping</Link>
      </div>
      <ShoppingCart />
    </main>
  );
}
