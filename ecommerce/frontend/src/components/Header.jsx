import { useMemo, useState } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useProduct } from '../hooks/useProduct';
import CartIcon from './CartIcon';
import Navbar from './Navbar';

export default function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { search } = useProduct();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const initials = useMemo(() => {
    if (!user) return 'G';
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await search(query);
    navigate(`/products?q=${encodeURIComponent(query)}`);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="header sticky">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">S</span>
          <span>ShopHub</span>
        </Link>

        <button className="mobile-toggle" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          <FaBars />
        </button>

        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Search products, brands, descriptions..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search products"
          />
        </form>

        <div className={`header-actions ${open ? 'open' : ''}`}>
          <Navbar onNavigate={() => setOpen(false)} />
          <CartIcon />
          <div className="user-menu">
            <button className="user-chip" type="button">
              <FaUserCircle /> {isAuthenticated ? initials : 'Guest'}
            </button>
            <div className="user-dropdown">
              {isAuthenticated ? (
                <>
                  <button onClick={() => navigate('/account')}>Account</button>
                  <button onClick={() => navigate('/orders')}>Orders</button>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <button onClick={() => navigate('/login')}>Login</button>
                  <button onClick={() => navigate('/signup')}>Create account</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
