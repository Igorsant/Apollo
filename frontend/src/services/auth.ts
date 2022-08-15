import jwt from 'jwt-decode';

export const TOKEN_KEY = 'TokenUsuarioLogado';
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
  if (getToken()) {
    const exp = jwt<number>(getToken() || '');
    if (exp) {
      if (Date.now() >= exp * 1000) {
        logout();
        return false;
      }
    }
    return true;
  }
};

export const getUserType = () => {
  if (getToken()) {
    const value = jwt<any>(getToken() || '');
    if (value) {
      return value.type;
    }
    return '';
  }
};
