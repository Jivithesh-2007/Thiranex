import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

/**
 * Custom hook to use task context
 */
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within TaskProvider');
  }
  return context;
};
