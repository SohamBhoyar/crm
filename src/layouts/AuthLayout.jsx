// src/layouts/AuthLayout.jsx

import { Outlet } from "react-router-dom";

/**
 * AuthLayout
 *
 * PURPOSE:
 * - Wrap login / auth-related pages
 * - Keep them separate from dashboard & portal
 */

const AuthLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f9fafb",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "32px",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
