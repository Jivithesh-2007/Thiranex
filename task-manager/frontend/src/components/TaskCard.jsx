import React from 'react';
import { Badge } from './index';
import '../styles/App.css';

/**
 * Individual task card component
 */
export const TaskCard = ({
  task,
  onToggle,
  onEdit,
  onDelete,
  isLoading = false
}) => {
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-card-header">
        <div className="task-checkbox-wrapper">
          <input
            type="checkbox"
            className="task-checkbox"
            checked={task.completed}
            onChange={() => onToggle(task._id)}
            disabled={isLoading}
          />
        </div>

        <div className="task-title-section">
          <h3 className={`task-title ${task.completed ? 'strike' : ''}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="task-description">{task.description.substring(0, 100)}...</p>
          )}
        </div>

        <div className="task-badges">
          <Badge type={`priority-${task.priority}`} text={task.priority} />
          <Badge type={`category-${task.category}`} text={task.category} />
        </div>
      </div>

      <div className="task-card-footer">
        <div className="task-meta">
          {task.dueDate && (
            <span className={`task-date ${isOverdue ? 'overdue-text' : ''}`}>
              <span className="date-icon">📅</span>
              {formatDate(task.dueDate)}
              {isOverdue && <span className="overdue-badge">Overdue</span>}
            </span>
          )}
        </div>

        <div className="task-actions">
          <button
            className="task-btn edit-btn"
            onClick={() => onEdit(task)}
            title="Edit task"
            disabled={isLoading}
          >
            ✏️
          </button>
          <button
            className="task-btn delete-btn"
            onClick={() => onDelete(task._id)}
            title="Delete task"
            disabled={isLoading}
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
