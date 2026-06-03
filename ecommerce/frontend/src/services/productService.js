import { apiRequest } from './api';

export const productService = {
  list: (params = '') => apiRequest(`/products${params}`),
  getById: (id) => apiRequest(`/products/${id}`),
  search: (query) => apiRequest(`/products/search?q=${encodeURIComponent(query)}`),
  categories: () => apiRequest('/products/categories'),
  related: (id) => apiRequest(`/products/${id}/related`),
  create: (payload, token) => apiRequest('/products', { method: 'POST', body: payload, token }),
  update: (id, payload, token) => apiRequest(`/products/${id}`, { method: 'PUT', body: payload, token }),
  remove: (id, token) => apiRequest(`/products/${id}`, { method: 'DELETE', token }),
};
