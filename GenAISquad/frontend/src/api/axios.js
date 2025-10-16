// src/api/axios.js
import axios from "axios";

// ✅ Base Axios instance for all API calls
const api = axios.create({
  baseURL: "http://localhost:5000", // Change this if your backend URL differs
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach JWT token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Global error handling (optional, can expand later)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized — token may have expired.");
      // Optional: auto-logout or redirect logic
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default api;
