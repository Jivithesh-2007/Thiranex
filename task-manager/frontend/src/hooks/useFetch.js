import { useState, useCallback } from 'react';

/**
 * Custom hook for handling API calls
 */
export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (fn) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fn();
      return response;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, execute, setError };
};
