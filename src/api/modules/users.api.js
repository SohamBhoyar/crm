// src/api/modules/users.api.js

import http from "@/api/http";

/**
 * Users API (read-only for MVP)
 *
 * PURPOSE:
 * - Fetch users for assignment dropdowns
 * - No user creation / editing here
 */

/**
 * Get users list (minimal fields)
 */
export const getUsers = () => {
  return http.get("/api/v1/users");
};
