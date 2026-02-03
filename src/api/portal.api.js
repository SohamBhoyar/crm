// src/api/portal.api.js

import http from "@/api/http";

/**
 * Portal Purchase API
 *
 * PURPOSE:
 * - Create new company (tenant)
 * - Create admin user
 * - Payment bypassed (MVP)
 *
 * BACKEND:
 * POST /api/v1/portal/purchase
 */
export const purchaseCompany = (payload) => {
  return http.post("/api/v1/portal/purchase", payload);
};
