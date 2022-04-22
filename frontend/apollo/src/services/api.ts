import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});
// api.interceptors.request.use(async (config) => {
// //   config.headers["Content-Type"] = "application/json;charset=utf-8";
// //   config.headers["Access-Control-Allow-Origin"] = "*";
// //   //   const token = getToken();

// //   //   if (token) config.headers.Authorization = `Bearer ${token}`;

// //   return config;
// // });

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.message);
    if (error.response.status === 403) {
      setTimeout(() => {
        window.location.pathname = "";
      }, 2000);
    }
    console.log(error.response);

    return Promise.reject(error);
  }
);

export default api;
