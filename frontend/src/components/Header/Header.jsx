import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdNotifications, MdDarkMode, MdLightMode } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import { notificationAPI } from '../../services/api';
import { getSocket } from '../../services/socket';
import styles from './Header.module.css';

const Header = ({ title, subtitle }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchNotifications();

    const socket = getSocket();
    if (socket) {
      socket.on('notification', () => {
        fetchNotifications();
      });
    }

    return () => {
      if (socket) {
        socket.off('notification');
      }
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await notificationAPI.getNotifications();
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleNotificationClick = () => {
    const basePath = user?.role === 'student' ? '/student-dashboard' : 
                     user?.role === 'teacher' ? '/teacher-dashboard' : '/admin-dashboard';
    navigate(`${basePath}/notifications`);
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className={styles.header}>
      <div className={styles.greeting}>
        <h1 className={styles.greetingText}>{title || `Welcome back, ${user?.fullName?.split(' ')[0] || 'User'}!`}</h1>
        {subtitle && <p className={styles.greetingSubtext}>{subtitle}</p>}
      </div>

      <div className={styles.actions}>
        <button className={styles.iconBtn} onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? <MdLightMode className={styles.icon} /> : <MdDarkMode className={styles.icon} />}
        </button>

        <button className={styles.iconBtn} onClick={handleNotificationClick}>
          <MdNotifications className={styles.icon} />
          {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
        </button>

        <div className={styles.profile}>
          <div className={styles.avatar}>
            {getInitials(user?.fullName)}
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.profileName}>{user?.fullName || 'User'}</div>
            <div className={styles.profileRole}>{user?.role || 'Student'}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
