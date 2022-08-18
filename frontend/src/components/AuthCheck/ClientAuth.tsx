import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { getUserType, isAuthenticated } from '../../services/auth';

export const ClientAuth = ({ children }: { children: ReactElement }) => {
  const userType: string = getUserType();
  if (!(isAuthenticated() && userType === 'CUSTOMER')) {
    return <Navigate to="/" />;
  }
  return children;
};
