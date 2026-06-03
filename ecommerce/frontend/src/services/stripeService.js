import { apiRequest } from './api';

export const stripeService = {
  createIntent: (payload, token) => apiRequest('/payment/create-intent', { method: 'POST', body: payload, token }),
  verify: (payload, token) => apiRequest('/payment/verify', { method: 'POST', body: payload, token }),
};
