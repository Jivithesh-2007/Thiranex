import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTask } from '../hooks/useTask';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import FilterBar from '../components/FilterBar';
import { Toast, ConfirmModal } from '../components/index';
import taskService from '../services/taskService';
import '../styles/App.css';

/**
 * Dashboard page - main task management interface
 */
export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const {
    tasks,
    loading: tasksLoading,
    error: taskError,
    filter,
    setFilter,
    sort,
    setSort,
    search,
    setSearch,
    addTask,
    updateTaskInList,
    removeTask,
    setAllTasks,
    setTaskLoading,
    setTaskError,
    getFilteredAndSortedTasks
  } = useTask();

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [toast, setToast] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const formRef = useRef(null);

  // Load tasks on mount
  useEffect(() => {
    loadTasks();
  }, [filter, sort, search]);

  const loadTasks = async () => {
    setTaskLoading(true);
    try {
      const response = await taskService.getTasks(
        filter === 'all' ? null : filter,
        sort,
        search
      );
      if (response.success) {
        setAllTasks(response.tasks);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to load tasks';
      setTaskError(errorMessage);
      setToast({ message: errorMessage, type: 'error' });
    } finally {
      setTaskLoading(false);
    }
  };

  const handleTaskSubmit = async (formData) => {
    setFormLoading(true);
    try {
      if (editingTask) {
        // Update task
        const response = await taskService.updateTask(editingTask._id, formData);
        if (response.success) {
          updateTaskInList(response.task);
          setToast({ message: 'Task updated successfully!', type: 'success' });
          setEditingTask(null);
        }
      } else {
        // Create new task
        const response = await taskService.createTask(formData);
        if (response.success) {
          addTask(response.task);
          setToast({ message: 'Task created successfully!', type: 'success' });
        }
      }
      setShowTaskForm(false);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to save task';
      setToast({ message: errorMessage, type: 'error' });
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const response = await taskService.toggleTask(taskId);
      if (response.success) {
        updateTaskInList(response.task);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update task';
      setToast({ message: errorMessage, type: 'error' });
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDeleteTask = (taskId) => {
    setDeleteModal({ taskId, isConfirmed: false });
  };

  const confirmDelete = async () => {
    setDeleteLoading(true);
    try {
      const response = await taskService.deleteTask(deleteModal.taskId);
      if (response.success) {
        removeTask(deleteModal.taskId);
        setToast({ message: 'Task deleted successfully!', type: 'success' });
        setDeleteModal(null);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete task';
      setToast({ message: errorMessage, type: 'error' });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setToast({ message: 'Logged out successfully!', type: 'success' });
    setTimeout(() => navigate('/login'), 500);
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const filteredTasks = getFilteredAndSortedTasks();

  return (
    <div className="dashboard">
      <Navbar userName={user?.name} onLogout={handleLogout} />

      <div className="dashboard-container">
        <Sidebar activeLink="dashboard" />

        <main className="dashboard-main">
          <div className="dashboard-content">
            {/* Header Section */}
            <div className="dashboard-header">
              <div>
                <h1 className="dashboard-title">My Tasks</h1>
                <p className="dashboard-subtitle">
                  You have {tasks.filter(t => !t.completed).length} pending tasks
                </p>
              </div>
              <button
                className="btn btn-primary btn-large"
                onClick={() => setShowTaskForm(!showTaskForm)}
              >
                {showTaskForm ? '✕ Cancel' : '+ New Task'}
              </button>
            </div>

            {/* Task Form */}
            {showTaskForm && (
              <div className="task-form-section" ref={formRef}>
                <h2 className="form-section-title">
                  {editingTask ? 'Edit Task' : 'Create New Task'}
                </h2>
                <TaskForm
                  initialTask={editingTask}
                  onSubmit={handleTaskSubmit}
                  onCancel={handleCloseForm}
                  isLoading={formLoading}
                />
              </div>
            )}

            {/* Filter and Sort */}
            <FilterBar
              filter={filter}
              onFilterChange={setFilter}
              sort={sort}
              onSortChange={setSort}
              search={search}
              onSearchChange={setSearch}
            />

            {/* Task List */}
            <TaskList
              tasks={filteredTasks}
              loading={tasksLoading}
              onToggle={handleToggleTask}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              filter={filter}
              taskCount={filteredTasks.length}
            />
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <ConfirmModal
          title="Delete Task"
          message="Are you sure you want to delete this task? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setDeleteModal(null)}
          isLoading={deleteLoading}
        />
      )}

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
