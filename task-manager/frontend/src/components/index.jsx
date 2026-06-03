import React, { useState } from 'react';
import '../styles/App.css';

/**
 * Toast notification component
 */
export const Toast = ({ message, type = 'success', onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        {type === 'success' && <span className="toast-icon">✓</span>}
        {type === 'error' && <span className="toast-icon">✕</span>}
        {type === 'info' && <span className="toast-icon">ℹ</span>}
        <span className="toast-message">{message}</span>
      </div>
      <div className="toast-progress"></div>
    </div>
  );
};

/**
 * Confirmation modal component
 */
export const ConfirmModal = ({ title, message, onConfirm, onCancel, isLoading = false }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Loading spinner component
 */
export const Spinner = ({ size = 'medium' }) => {
  return <div className={`spinner spinner-${size}`}></div>;
};

/**
 * Badge component for priority and category
 */
export const Badge = ({ type, text }) => {
  return <span className={`badge badge-${type}`}>{text}</span>;
};

/**
 * Empty state component
 */
export const EmptyState = ({ title, description, icon = '📝' }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
    </div>
  );
};
