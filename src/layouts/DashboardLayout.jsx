// src/layouts/DashboardLayout.jsx
import "@/styles/index.scss";

import { Outlet } from "react-router-dom";
import { useAuth } from "@/auth/authStore";
import Sidebar from "@/navigation/Sidebar";
/**
 * DashboardLayout
 *
 * RESPONSIBILITIES:
 * - Render app shell (sidebar + header)
 * - Show authenticated user info
 * - Provide logout action
 * - Render child routes via <Outlet />
 *
 * NON-RESPONSIBILITIES:
 * - Routing logic
 * - Permission checks (handled elsewhere)
 * - API calls
 */

const DashboardLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="app-layout" style={{ display: "flex", height: "100vh" }}>
      {/* ================= SIDEBAR ================= */}
      <Sidebar
        style={{
          width: "240px",
          backgroundColor: "#111827",
          color: "#ffffff",
          padding: "16px",
        }}
      >
        <h2 style={{ marginBottom: "24px" }}>Tecnovate CRM</h2>

        {/* Sidebar will be replaced by real navigation later */}
        <nav>
          <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
            <li>Leads</li>
            <li>Customers</li>
            <li>Projects</li>
            <li>Tasks</li>
          </ul>
        </nav>
      </Sidebar>

      {/* ================= MAIN CONTENT ================= */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <header
          style={{
            height: "60px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
          }}
        >
          <div>
            <strong>{user?.name || "User"}</strong>
          </div>

          <button
            onClick={logout}
            style={{
              background: "transparent",
              border: "1px solid #e5e7eb",
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: "16px", overflow: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
