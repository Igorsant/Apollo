import React from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';
interface AlertProps {
  open: boolean;
  message: string;
  severity: AlertColor | undefined;
  handleClose: () => void;
}

export const ApolloAlert: React.FC<AlertProps> = ({ open, message, severity, handleClose }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};
