import axios from "axios";
import Cookies from "js-cookie";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 60000,
  timeoutErrorMessage: "server timeout...",
  responseType: "json",
  headers: {
    "Content-type": "application/json",
  },
});

//! interceptor

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("auth_key");
  if (token) {
    config.headers.Authorization = "Bearer " + token; // to access the all pravate endpoints
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (exception) => {
    if (exception.status === 400 || exception.status === 422) {
      throw exception?.response?.data;
    } else {
      throw exception?.response;
    }
  },
);

export default axiosInstance;
