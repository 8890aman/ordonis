import { useState, useCallback } from 'react';

const useAlert = () => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = useCallback((alert) => {
    const id = Math.random().toString(36).substr(2, 9);
    setAlerts((prev) => [...prev, { ...alert, id }]);
  }, []);

  const removeAlert = useCallback((id) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  const showSuccess = useCallback((message, title = 'Success', options = {}) => {
    addAlert({ type: 'success', message, title, ...options });
  }, [addAlert]);

  const showError = useCallback((message, title = 'Error', options = {}) => {
    addAlert({ type: 'error', message, title, ...options });
  }, [addAlert]);

  const showWarning = useCallback((message, title = 'Warning', options = {}) => {
    addAlert({ type: 'warning', message, title, ...options });
  }, [addAlert]);

  const showInfo = useCallback((message, title = 'Info', options = {}) => {
    addAlert({ type: 'info', message, title, ...options });
  }, [addAlert]);

  return {
    alerts,
    removeAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};

export default useAlert; 