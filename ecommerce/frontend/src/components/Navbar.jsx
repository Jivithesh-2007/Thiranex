import { NavLink } from 'react-router-dom';

export default function Navbar({ onNavigate }) {
  const linkClass = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`;
  return (
    <nav className="nav-links">
      <NavLink to="/" className={linkClass} onClick={onNavigate}>Home</NavLink>
      <NavLink to="/products" className={linkClass} onClick={onNavigate}>Products</NavLink>
      <a href="/#about" className="nav-link" onClick={onNavigate}>About</a>
      <a href="/#contact" className="nav-link" onClick={onNavigate}>Contact</a>
    </nav>
  );
}
