// src/portal/pages/Home.jsx

import { Link } from "react-router-dom";

/**
 * Home (Public Portal)
 *
 * PURPOSE:
 * - First impression of Tecnovate CRM
 * - Explain value clearly
 * - Drive users to Pricing / Purchase
 */

const Home = () => {
  return (
    <div>
      {/* ================= HERO SECTION ================= */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto 64px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "40px", marginBottom: "16px" }}>
          One CRM for Your Entire Company
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#6b7280",
            marginBottom: "32px",
          }}
        >
          Manage leads, customers, projects, and tasks in one simple,
          permission-based CRM built for growing teams.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          <Link to="/pricing">
            <button style={{ padding: "12px 24px", fontSize: "16px" }}>
              View Pricing
            </button>
          </Link>

          <Link to="/login">
            <button
              style={{
                padding: "12px 24px",
                fontSize: "16px",
                background: "#111827",
                color: "#ffffff",
              }}
            >
              Login
            </button>
          </Link>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
        }}
      >
        <Feature
          title="Lead Management"
          description="Capture, track, and manage leads efficiently with full visibility."
        />

        <Feature
          title="Customer Management"
          description="Keep all customer information organized and accessible."
        />

        <Feature
          title="Project Tracking"
          description="Manage projects and monitor progress across teams."
        />

        <Feature
          title="Task Assignment"
          description="Assign tasks, track ownership, and improve accountability."
        />
      </section>

      {/* ================= CTA ================= */}
      <section
        style={{
          marginTop: "80px",
          padding: "48px",
          background: "#f9fafb",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "16px" }}>
          Ready to Get Started?
        </h2>

        <p style={{ color: "#6b7280", marginBottom: "24px" }}>
          Create your company workspace and start managing leads in minutes.
        </p>

        <Link to="/pricing">
          <button style={{ padding: "12px 32px", fontSize: "16px" }}>
            Get Started
          </button>
        </Link>
      </section>
    </div>
  );
};

/**
 * Feature card component
 */
const Feature = ({ title, description }) => {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        padding: "24px",
        borderRadius: "8px",
      }}
    >
      <h3 style={{ marginBottom: "8px" }}>{title}</h3>
      <p style={{ color: "#6b7280" }}>{description}</p>
    </div>
  );
};

export default Home;
