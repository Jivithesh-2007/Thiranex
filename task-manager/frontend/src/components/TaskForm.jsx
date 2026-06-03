import React, { useState } from 'react';
import { Spinner } from './index';
import '../styles/App.css';

/**
 * Task form component for creating and editing tasks
 */
export const TaskForm = ({ initialTask = null, onSubmit, onCancel, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: initialTask?.title || '',
    description: initialTask?.description || '',
    dueDate: initialTask?.dueDate ? initialTask.dueDate.split('T')[0] : '',
    priority: initialTask?.priority || 'medium',
    category: initialTask?.category || 'other'
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    if (formData.description && formData.description.length > 1000) {
      newErrors.description = 'Description must be less than 1000 characters';
    }

    if (formData.dueDate && new Date(formData.dueDate) < new Date()) {
      newErrors.dueDate = 'Due date must be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit({
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Task Title <span className="required">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={`form-input ${errors.title ? 'input-error' : ''}`}
          placeholder="Enter task title"
          value={formData.title}
          onChange={handleChange}
          disabled={isLoading}
          maxLength={100}
        />
        {errors.title && <span className="error-message">{errors.title}</span>}
        <div className="char-count">{formData.title.length}/100</div>
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className={`form-textarea ${errors.description ? 'input-error' : ''}`}
          placeholder="Enter task description (optional)"
          value={formData.description}
          onChange={handleChange}
          disabled={isLoading}
          maxLength={1000}
          rows={4}
        />
        {errors.description && <span className="error-message">{errors.description}</span>}
        <div className="char-count">{formData.description.length}/1000</div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dueDate" className="form-label">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            className={`form-input ${errors.dueDate ? 'input-error' : ''}`}
            value={formData.dueDate}
            onChange={handleChange}
            disabled={isLoading}
          />
          {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            className="form-select"
            value={formData.priority}
            onChange={handleChange}
            disabled={isLoading}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select
          id="category"
          name="category"
          className="form-select"
          value={formData.category}
          onChange={handleChange}
          disabled={isLoading}
        >
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="urgent">Urgent</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner size="small" />
              {initialTask ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            initialTask ? 'Update Task' : 'Create Task'
          )}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
