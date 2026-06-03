import React from 'react';
import { Spinner, EmptyState } from './index';
import TaskCard from './TaskCard';
import '../styles/App.css';

/**
 * Task list component that displays tasks
 */
export const TaskList = ({
  tasks,
  loading,
  onToggle,
  onEdit,
  onDelete,
  filter,
  taskCount
}) => {
  if (loading) {
    return (
      <div className="task-list-loading">
        <Spinner size="large" />
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    const emptyMessages = {
      all: {
        title: 'No tasks yet',
        description: 'Create your first task to get started!',
        icon: '📝'
      },
      pending: {
        title: 'All caught up!',
        description: 'You have no pending tasks.',
        icon: '✨'
      },
      completed: {
        title: 'No completed tasks',
        description: 'Complete some tasks to see them here.',
        icon: '🎉'
      }
    };

    const message = emptyMessages[filter] || emptyMessages.all;
    return <EmptyState {...message} />;
  }

  return (
    <div className="task-list">
      <div className="task-list-header">
        <p className="task-count">
          {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
        </p>
      </div>
      <div className="task-list-items">
        {tasks.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
