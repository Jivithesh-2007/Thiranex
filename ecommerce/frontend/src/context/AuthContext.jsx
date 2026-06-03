import { createContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

const getStoredUser = () => {
  const user = localStorage.getItem('shophub-user');
  return user ? JSON.parse(user) : null;
};

const getStoredToken = () => localStorage.getItem('shophub-token') || '';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const [token, setToken] = useState(getStoredToken);
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) return;
    authService
      .profile()
      .then((data) => setUser(data.user))
      .catch(() => {
        setUser(null);
        setToken('');
        localStorage.removeItem('shophub-token');
        localStorage.removeItem('shophub-user');
      })
      .finally(() => setLoading(false));
  }, [token]);

  const login = async (payload) => {
    const data = await authService.login(payload);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('shophub-user', JSON.stringify(data.user));
    localStorage.setItem('shophub-token', data.token);
    return data;
  };

  const register = async (payload) => {
    const data = await authService.register(payload);
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('shophub-user', JSON.stringify(data.user));
    localStorage.setItem('shophub-token', data.token);
    return data;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setToken('');
      localStorage.removeItem('shophub-user');
      localStorage.removeItem('shophub-token');
    }
  };

  const value = useMemo(
    () => ({ user, token, loading, isAuthenticated: Boolean(token && user), login, register, logout, setUser }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
