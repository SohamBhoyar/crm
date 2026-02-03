// src/api/modules/leads.api.js

import http from "@/api/http";

/**
 * Leads API
 *
 * RULES:
 * - Only backend communication
 * - No UI logic
 * - No permission checks here
 * - Backend enforces security
 */

/**
 * Get all leads
 */
export const getLeads = (params = {}) => {
  return http.get("/api/v1/leads", { params });
};

/**
 * Get single lead by ID
 */
export const getLeadById = (id) => {
  return http.get(`/api/v1/leads/${id}`);
};

/**
 * Create a new lead
 */
export const createLead = (payload) => {
  return http.post("/api/v1/leads", payload);
};

/**
 * Update lead
 */
export const updateLead = (id, payload) => {
  return http.put(`/api/v1/leads/${id}`, payload);
};

/**
 * Delete lead
 */
export const deleteLead = (id) => {
  return http.delete(`/api/v1/leads/${id}`);
};
