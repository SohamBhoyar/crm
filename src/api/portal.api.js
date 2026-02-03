import axios from "axios";

/**
 * Portal API (PUBLIC)
 * - No auth
 * - No X-Tenant
 * - Direct backend call
 */

const portalApi = axios.create({
  baseURL: "https://crm.tecnovate.in/CRM/backend/public",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const purchaseCompany = async (payload) => {
  const res = await portalApi.post("/api/v1/portal/purchase", payload);
  return res.data;
};
