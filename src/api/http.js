// src/api/http.js

import axios from "axios";

/**
 * Global Axios instance
 * - Session-based auth (cookies)
 * - Tenant via X-Tenant
 * - Emits auth-expired event on 401
 */

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach tenant header dynamically
http.interceptors.request.use((config) => {
  const tenant = localStorage.getItem("tenant");
  if (tenant) {
    config.headers["X-Tenant"] = tenant;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (!error.response) {
      return Promise.reject({ message: "Network error" });
    }

    const { status } = error.response;

    // 🔥 SESSION EXPIRED / UNAUTHORIZED
    if (status === 401) {
      // Notify auth store without tight coupling
      window.dispatchEvent(new Event("auth:expired"));
    }

    return Promise.reject(error.response.data);
  }
);

export default http;
