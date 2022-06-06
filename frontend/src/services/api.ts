import axios from 'axios';
import { errorHandler } from './errorHandler';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});
// api.interceptors.request.use(async (config) => {
// //   config.headers["Content-Type"] = "application/json;charset=utf-8";
// //   config.headers["Access-Control-Allow-Origin"] = "*";
// //   //   const token = getToken();

// //   //   if (token) config.headers.Authorization = `Bearer ${token}`;

// //   return config;
// // });

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      setTimeout(() => {
        window.location.pathname = '';
      }, 2000);
    }

    const errMessage = errorHandler(error);

    return Promise.reject(errMessage);
  }
);

export default api;
