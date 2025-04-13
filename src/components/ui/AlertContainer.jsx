import React from 'react';
import Alert from './Alert';

const AlertContainer = ({ alerts, onClose }) => {
  return (
    <>
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          {...alert}
          onClose={() => onClose(alert.id)}
        />
      ))}
    </>
  );
};

export default AlertContainer; 