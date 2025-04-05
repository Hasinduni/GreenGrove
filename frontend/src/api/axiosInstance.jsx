import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8110/api", // Change if your backend uses a different port/path
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
