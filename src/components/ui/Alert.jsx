import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const Alert = ({ 
  type = 'info', 
  title, 
  message, 
  isOpen = true, 
  onClose, 
  duration = 5000,
  position = 'top-right',
  className = '',
}) => {
  const Icon = icons[type] || icons.info;

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  };

  const typeStyles = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: 'text-green-500',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: 'text-red-500',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: 'text-yellow-500',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: 'text-blue-500',
    },
  };

  const styles = typeStyles[type] || typeStyles.info;

  React.useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ 
            opacity: 0, 
            y: position.includes('top') ? -20 : 20,
            scale: 0.95 
          }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: 1 
          }}
          exit={{ 
            opacity: 0, 
            y: position.includes('top') ? -20 : 20,
            scale: 0.95 
          }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
          className={`fixed z-50 max-w-sm w-full p-4 rounded-lg shadow-lg ${styles.bg} ${styles.border} ${positionClasses[position]} ${className}`}
        >
          <div className="flex items-start gap-3">
            <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${styles.icon}`} />
            <div className="flex-1">
              {title && (
                <h3 className={`text-sm font-medium ${styles.text}`}>
                  {title}
                </h3>
              )}
              {message && (
                <p className={`mt-1 text-sm ${styles.text}`}>
                  {message}
                </p>
              )}
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className={`flex-shrink-0 p-1 rounded-md hover:bg-opacity-10 hover:bg-black transition-colors ${styles.text}`}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Alert; 