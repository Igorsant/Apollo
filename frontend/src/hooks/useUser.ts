import { getToken } from '../services/auth';
import jwtDecode from 'jwt-decode';

export const useUser = () => {
  return getToken() ? jwtDecode(getToken()!) : null;
};
