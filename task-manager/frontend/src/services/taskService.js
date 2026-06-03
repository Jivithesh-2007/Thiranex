import api from './api';

/**
 * Task service
 */
const taskService = {
  // Get all tasks
  getTasks: async (status, sort, search) => {
    const params = {};
    if (status) params.status = status;
    if (sort) params.sort = sort;
    if (search) params.search = search;

    const response = await api.get('/tasks', { params });
    return response.data;
  },

  // Get single task
  getTaskById: async (taskId) => {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  },

  // Create task
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  // Update task
  updateTask: async (taskId, taskData) => {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  },

  // Delete task
  deleteTask: async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  },

  // Toggle task completion
  toggleTask: async (taskId) => {
    const response = await api.put(`/tasks/${taskId}/toggle`);
    return response.data;
  }
};

export default taskService;
