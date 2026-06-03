import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

export default function CartIcon() {
  const { itemCount } = useCart();
  return (
    <Link to="/cart" className="cart-icon" aria-label="Cart">
      <FaShoppingCart />
      <span className="cart-badge">{itemCount}</span>
    </Link>
  );
}
