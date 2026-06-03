import React from 'react';

// Context for task management
export const TaskContext = React.createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [filter, setFilter] = React.useState('all'); // 'all', 'pending', 'completed'
  const [sort, setSort] = React.useState('date'); // 'date', 'priority', 'title'
  const [search, setSearch] = React.useState('');

  const addTask = (task) => {
    setTasks([task, ...tasks]);
  };

  const updateTaskInList = (updatedTask) => {
    setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };

  const setAllTasks = (newTasks) => {
    setTasks(newTasks);
  };

  const setTaskLoading = (isLoading) => {
    setLoading(isLoading);
  };

  const setTaskError = (errorMsg) => {
    setError(errorMsg);
  };

  const getFilteredAndSortedTasks = () => {
    let filtered = [...tasks];

    // Filter by completion status
    if (filter === 'pending') {
      filtered = filtered.filter(t => !t.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(t => t.completed);
    }

    // Search by title
    if (search) {
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sort === 'priority') {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sort === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Default: date (newest first)
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return filtered;
  };

  const value = {
    tasks,
    loading,
    error,
    filter,
    sort,
    search,
    setFilter,
    setSort,
    setSearch,
    addTask,
    updateTaskInList,
    removeTask,
    setAllTasks,
    setTaskLoading,
    setTaskError,
    getFilteredAndSortedTasks
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
