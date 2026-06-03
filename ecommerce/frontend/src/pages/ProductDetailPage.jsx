import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { useCart } from '../hooks/useCart';
import { productService } from '../services/productService';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    productService.getById(id).then((data) => setProduct(data.product)).catch(() => setProduct(null));
    productService.related(id).then((data) => setRelated(data.products)).catch(() => setRelated([]));
  }, [id]);

  if (!product) return <main className="container section"><div className="loading-grid">Loading product…</div></main>;

  return (
    <main className="container section">
      <div className="product-detail">
        <div className="product-gallery">
          <img className="detail-image" src={product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80'} alt={product.name} />
          <div className="thumb-row">
            {[product.image, ...(product.images || [])].filter(Boolean).slice(0, 4).map((image, index) => <img key={index} src={image} alt={`${product.name} ${index + 1}`} />)}
          </div>
        </div>
        <div className="product-info">
          <p className="product-brand">{product.brand || product.category}</p>
          <h1>{product.name}</h1>
          <div className="price-row"><strong>${product.price.toFixed(2)}</strong>{product.originalPrice > product.price && <span className="old-price">${product.originalPrice.toFixed(2)}</span>}</div>
          <p>{product.description}</p>
          <p><strong>Availability:</strong> {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>
          <label>
            Quantity
            <input type="number" min="1" max="10" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
          </label>
          <div className="product-actions">
            <button className="btn btn-primary" disabled={product.stock <= 0} onClick={() => addItem(product, quantity)}>Add to Cart</button>
            <Link className="btn btn-ghost" to="/products">Back to Products</Link>
          </div>
          <div className="specs-card">
            <h3>Specifications</h3>
            <p>Color: {product.specifications?.color || 'N/A'}</p>
            <p>Size: {product.specifications?.size || 'N/A'}</p>
            <p>Weight: {product.specifications?.weight || 'N/A'}</p>
            <p>Dimensions: {product.specifications?.dimensions || 'N/A'}</p>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="section-heading"><h2>Related Products</h2></div>
        <ProductGrid products={related} loading={!related.length} emptyMessage="No related products yet." />
      </section>
    </main>
  );
}
