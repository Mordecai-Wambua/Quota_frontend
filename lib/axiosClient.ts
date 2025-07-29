// lib/axiosClient.ts
import {api_url} from "@/components/constants";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: api_url,
  withCredentials: true, // Send cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor for 401 and retry
axiosClient.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axiosClient.post("/api/auth/refresh/");
        return axiosClient(originalRequest); // Retry original request
      } catch (refreshErr) {
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

export default axiosClient;
