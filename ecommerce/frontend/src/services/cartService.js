import { apiRequest } from './api';

export const cartService = {
  get: (token) => apiRequest('/cart', { token }),
  add: (payload, token) => apiRequest('/cart/add', { method: 'POST', body: payload, token }),
  update: (itemId, payload, token) => apiRequest(`/cart/item/${itemId}`, { method: 'PUT', body: payload, token }),
  remove: (itemId, token) => apiRequest(`/cart/item/${itemId}`, { method: 'DELETE', token }),
  clear: (token) => apiRequest('/cart', { method: 'DELETE', token }),
};
