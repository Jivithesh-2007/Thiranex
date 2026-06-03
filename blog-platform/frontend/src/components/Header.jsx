import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "../styles/Header.css";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="header sticky">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">✍️</span>
            TechBlog
          </Link>

          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/#about">About</Link>
            <Link to="/#contact">Contact</Link>
          </nav>

          <div className="search-bar">
            <input type="text" placeholder="Search posts..." />
            <button>🔍</button>
          </div>

          <div className="user-menu">
            {isAuthenticated ? (
              <>
                {user?.role === "writer" && (
                  <Link to="/write" className="btn btn-primary">
                    ✍️ Write
                  </Link>
                )}
                <div className="dropdown">
                  <button className="user-avatar">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      user?.name?.charAt(0).toUpperCase()
                    )}
                  </button>
                  <div className="dropdown-menu">
                    <Link to={`/profile/${user?.id}`}>👤 Profile</Link>
                    <Link to="/dashboard">📊 Dashboard</Link>
                    {user?.role === "writer" && (
                      <Link to="/my-posts">📝 My Posts</Link>
                    )}
                    <hr />
                    <button onClick={handleLogout} className="logout-btn">
                      🚪 Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link to="/blog" onClick={() => setMobileMenuOpen(false)}>
              Blog
            </Link>
            <Link to="/#about" onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/#contact" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
            {!isAuthenticated && (
              <>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
