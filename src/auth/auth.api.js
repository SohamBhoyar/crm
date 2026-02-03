// src/auth/auth.api.js

import http from "@/api/http";

export const login = (payload) => {
  return http.post("/api/v1/auth/login", payload);
};

export const logout = () => {
  return http.post("/api/v1/auth/logout");
};

export const getMe = () => {
  return http.get("/api/v1/auth/me");
};
