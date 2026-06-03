import { apiRequest } from './api';

export const orderService = {
  create: (payload, token) => apiRequest('/orders', { method: 'POST', body: payload, token }),
  list: (token) => apiRequest('/orders', { token }),
  detail: (id, token) => apiRequest(`/orders/${id}`, { token }),
  adminAll: (token) => apiRequest('/orders/admin/all', { token }),
  updateStatus: (id, payload, token) => apiRequest(`/orders/${id}/status`, { method: 'PUT', body: payload, token }),
};
