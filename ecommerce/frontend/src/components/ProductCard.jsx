import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../hooks/useCart';

const stars = (rating = 0) => Array.from({ length: 5 }, (_, index) => <FaStar key={index} className={index < Math.round(rating) ? 'star filled' : 'star'} />);

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article className="product-card">
      <Link to={`/products/${product._id}`} className="product-image-wrap">
        <img src={product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'} alt={product.name} className="product-image" />
      </Link>
      <div className="product-body">
        <p className="product-brand">{product.brand || product.category}</p>
        <h3>{product.name}</h3>
        <div className="rating-row">{stars(product.rating)} <span>({product.ratingCount || 0})</span></div>
        <div className="price-row">
          <strong>${product.price.toFixed(2)}</strong>
          {product.originalPrice > product.price && <span className="old-price">${product.originalPrice.toFixed(2)}</span>}
        </div>
        <p className="stock-text">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>
        <div className="product-actions">
          <button className="btn btn-primary" onClick={() => addItem(product, 1)} disabled={product.stock <= 0}>Add to Cart</button>
          <Link className="btn btn-ghost" to={`/products/${product._id}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
