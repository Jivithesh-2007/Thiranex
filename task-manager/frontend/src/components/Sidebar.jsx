import React from 'react';
import '../styles/App.css';

/**
 * Sidebar component with navigation links
 */
export const Sidebar = ({ activeLink = 'dashboard' }) => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="nav-list">
          <li className="nav-item">
            <a
              href="/dashboard"
              className={`nav-link ${activeLink === 'dashboard' ? 'active' : ''}`}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-text">Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#"
              className="nav-link disabled"
              title="Coming soon"
            >
              <span className="nav-icon">👤</span>
              <span className="nav-text">Profile</span>
            </a>
          </li>
          <li className="nav-item">
            <a
              href="#"
              className="nav-link disabled"
              title="Coming soon"
            >
              <span className="nav-icon">⚙️</span>
              <span className="nav-text">Settings</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="footer-text">Task Manager v1.0</div>
      </div>
    </aside>
  );
};

export default Sidebar;
