import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../services/auth';

export const LoggedIn = ({ children }: { children: ReactElement }) => {
  if (isAuthenticated()) {
    return <Navigate to="/" />;
  }
  return children;
};
