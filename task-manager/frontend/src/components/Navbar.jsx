import React from 'react';
import '../styles/App.css';

/**
 * Navbar component with user info and logout
 */
export const Navbar = ({ userName, onLogout }) => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="navbar-logo">
            <span className="logo-icon">✓</span>
            <span className="logo-text">TaskManager</span>
          </div>
        </div>

        <div className="navbar-right">
          <div className="user-section">
            <div className="user-avatar">{userName?.charAt(0).toUpperCase()}</div>
            <div className="user-dropdown">
              <button
                className="user-name-btn"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {userName}
                <span className="dropdown-arrow">▼</span>
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <button className="dropdown-item" disabled>
                    <span className="icon">👤</span>
                    Profile
                  </button>
                  <button className="dropdown-item" disabled>
                    <span className="icon">⚙️</span>
                    Settings
                  </button>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item text-danger" onClick={onLogout}>
                    <span className="icon">🚪</span>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
