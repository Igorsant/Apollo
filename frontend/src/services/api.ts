import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from './auth';
import { errorHandler } from './errorHandler';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getToken();

  if (token) {
    if (config.headers === undefined) config.headers = {};
    config.headers.Authorization = 'Bearer ' + token;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403 || error.response?.status === 401) {
      setTimeout(() => {
        window.location.pathname = '/';
      }, 2000);
    }

    const errMessage = errorHandler(error);

    return Promise.reject(errMessage);
  }
);

export default api;
