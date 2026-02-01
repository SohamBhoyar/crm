/**
 * Axios base instance
 *
 * - Uses session-based auth (cookies)
 * - Sends tenant header on every request
 * - Points to hosted backend
 */

// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://crm.tecnovate.in/backend/public",
//   withCredentials: true, // REQUIRED for PHP sessions
//   headers: {
//     "Content-Type": "application/json",
//     "X-Tenant": "tecnovate", // change this
//   },
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "https://crm.tecnovate.in/backend/public",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Tenant": "tecnovate",
  },
});

export default api;

