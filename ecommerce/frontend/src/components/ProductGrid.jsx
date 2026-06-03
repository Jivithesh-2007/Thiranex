import ProductCard from './ProductCard';

export default function ProductGrid({ products, loading, emptyMessage = 'No products found.' }) {
  if (loading) return <div className="loading-grid">Loading products…</div>;
  if (!products.length) return <div className="empty-state">{emptyMessage}</div>;
  return <div className="product-grid">{products.map((product) => <ProductCard key={product._id} product={product} />)}</div>;
}
