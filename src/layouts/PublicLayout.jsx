// src/layouts/PublicLayout.jsx

import { Outlet, Link } from "react-router-dom";

/**
 * PublicLayout
 *
 * RESPONSIBILITIES:
 * - Layout for public-facing portal pages
 * - Header + footer
 * - Render child pages via <Outlet />
 *
 * NON-RESPONSIBILITIES:
 * - Auth logic
 * - API calls
 * - Tenant logic
 */

const PublicLayout = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* ================= HEADER ================= */}
      <header
        style={{
          height: "64px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            textDecoration: "none",
            color: "#111827",
          }}
        >
          Tecnovate CRM
        </Link>

        <nav style={{ display: "flex", gap: "16px" }}>
          <Link to="/about">About</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      {/* ================= PAGE CONTENT ================= */}
      <main style={{ flex: 1, padding: "32px" }}>
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer
        style={{
          borderTop: "1px solid #e5e7eb",
          padding: "16px",
          textAlign: "center",
          fontSize: "14px",
          color: "#6b7280",
        }}
      >
        © {new Date().getFullYear()} Tecnovate CRM. All rights reserved.
      </footer>
    </div>
  );
};

export default PublicLayout;
