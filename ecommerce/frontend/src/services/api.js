const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const buildHeaders = (headers = {}, json = true, token = null) => {
  const result = { ...headers };
  if (json) result['Content-Type'] = 'application/json';
  if (token) result.Authorization = `Bearer ${token}`;
  return result;
};

export async function apiRequest(path, options = {}) {
  const { method = 'GET', body, headers, token, raw = false } = options;
  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: buildHeaders(headers, !raw, token),
    credentials: 'include',
    body: raw ? body : body ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : await response.text();
  if (!response.ok) {
    throw new Error(data?.message || data || 'Request failed');
  }
  return data;
}

export { API_URL };
