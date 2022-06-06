import { Alert, AlertColor, Snackbar } from '@mui/material';
import React, { useState } from 'react';

export type ShowNotificationType = (msg: string, severity: AlertColor) => void;

export const NotificationContext = React.createContext({
  showNotification: null as unknown as ShowNotificationType
});

export const NotificationProvider: React.FC<any> = ({ children }) => {
  const [notification, setNotification] = useState({
    show: false,
    msg: '',
    severity: 'success'
  } as { show: boolean; msg: string; severity: AlertColor });

  const showNotification = (msg: string, severity: AlertColor) => {
    setNotification({
      show: true,
      msg,
      severity
    });
  };

  const closeNotification = () => {
    setNotification({
      ...notification,
      show: false
    });
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={notification.show}
        autoHideDuration={3000}
        onClose={closeNotification}
      >
        <Alert
          onClose={closeNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {notification.msg}
        </Alert>
      </Snackbar>
      <NotificationContext.Provider value={{ showNotification }}>
        {children}
      </NotificationContext.Provider>
    </>
  );
};
