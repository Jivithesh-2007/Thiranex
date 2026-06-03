import { Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import ProductGrid from '../components/ProductGrid';

const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Beauty', 'Sports'];

export default function HomePage() {
  const { products, loading } = useProduct();
  const featured = products.filter((product) => product.featured).slice(0, 6);

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Welcome to ShopHub</span>
            <h1>Upgrade your everyday shopping with premium products and fast checkout.</h1>
            <p>Discover best-selling electronics, stylish clothing, home essentials, and more.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/products">Shop Now</Link>
              <a className="btn btn-ghost" href="#featured">Browse Featured</a>
            </div>
          </div>
          <div className="hero-card">
            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80" alt="Shopping banner" />
          </div>
        </div>
      </section>

      <section className="container section" id="featured">
        <div className="section-heading">
          <h2>Featured Products</h2>
          <Link to="/products">View all</Link>
        </div>
        <ProductGrid products={featured} loading={loading} emptyMessage="Featured products will appear here." />
      </section>

      <section className="container section">
        <div className="section-heading">
          <h2>Popular Categories</h2>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link key={category} to={`/products?category=${encodeURIComponent(category)}`} className="category-card">
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="container section testimonials">
        <div className="testimonial-card">
          <p>“Smooth checkout and beautiful product pages. It feels like a real store.”</p>
          <strong>— Sarah M.</strong>
        </div>
        <div className="testimonial-card">
          <p>“The cart and payment flow are fast and easy to use.”</p>
          <strong>— Alex R.</strong>
        </div>
        <div className="testimonial-card">
          <p>“Great design, responsive layout, and clear product filtering.”</p>
          <strong>— Priya K.</strong>
        </div>
      </section>
    </main>
  );
}
