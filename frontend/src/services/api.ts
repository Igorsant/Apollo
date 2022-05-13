import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/'
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
    console.error(error.message);

    if (error.response.status === 403) {
      setTimeout(() => {
        window.location.pathname = '';
      }, 2000);
    }

    console.error(error.response);

    return Promise.reject(error);
  }
);

export default api;
