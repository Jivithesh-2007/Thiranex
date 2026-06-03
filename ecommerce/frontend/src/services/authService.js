import { apiRequest } from './api';

export const authService = {
  register: (payload) => apiRequest('/auth/register', { method: 'POST', body: payload }),
  login: (payload) => apiRequest('/auth/login', { method: 'POST', body: payload }),
  logout: () => apiRequest('/auth/logout', { method: 'POST' }),
  profile: () => apiRequest('/auth/profile'),
  updateProfile: (payload, token) => apiRequest('/users/profile', { method: 'PUT', body: payload, token }),
  addAddress: (payload, token) => apiRequest('/users/address', { method: 'POST', body: payload, token }),
};
