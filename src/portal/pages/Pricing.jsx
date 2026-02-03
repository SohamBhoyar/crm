// src/portal/pages/Pricing.jsx

import { Link } from "react-router-dom";

/**
 * Pricing Page (Public Portal)
 *
 * PURPOSE:
 * - Show SaaS pricing
 * - Drive users to Purchase page
 * - No backend dependency (MVP demo)
 */

const Pricing = () => {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      {/* ================= HEADER ================= */}
      <section style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ fontSize: "36px", marginBottom: "12px" }}>
          Simple, Transparent Pricing
        </h1>
        <p style={{ color: "#6b7280", fontSize: "18px" }}>
          Choose a plan that fits your business. Upgrade anytime.
        </p>
      </section>

      {/* ================= PRICING CARDS ================= */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        <PricingCard
          title="Starter"
          price="₹0"
          subtitle="Perfect for testing"
          features={[
            "Lead Management",
            "Single Company",
            "Up to 2 Users",
            "Basic Support",
          ]}
          ctaLabel="Get Started"
          ctaLink="/purchase"
        />

        <PricingCard
          title="Business"
          price="₹999 / month"
          subtitle="For growing teams"
          highlight
          features={[
            "Leads & Customers",
            "Projects & Tasks",
            "Role-based Access",
            "Email Support",
          ]}
          ctaLabel="Buy Now"
          ctaLink="/purchase"
        />

        <PricingCard
          title="Enterprise"
          price="Custom"
          subtitle="For large organizations"
          features={[
            "Unlimited Users",
            "Advanced Permissions",
            "Priority Support",
            "Custom Integrations",
          ]}
          ctaLabel="Contact Sales"
          ctaLink="/purchase"
        />
      </section>

      {/* ================= NOTE ================= */}
      <section style={{ textAlign: "center", marginTop: "48px" }}>
        <p style={{ color: "#6b7280" }}>
          * Payment is bypassed in demo mode. You can create a company instantly.
        </p>
      </section>
    </div>
  );
};

/**
 * PricingCard Component
 */
const PricingCard = ({
  title,
  price,
  subtitle,
  features,
  ctaLabel,
  ctaLink,
  highlight = false,
}) => {
  return (
    <div
      style={{
        border: highlight ? "2px solid #111827" : "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "24px",
        textAlign: "center",
        background: highlight ? "#f9fafb" : "#ffffff",
      }}
    >
      <h3 style={{ fontSize: "22px", marginBottom: "8px" }}>{title}</h3>
      <p style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "4px" }}>
        {price}
      </p>
      <p style={{ color: "#6b7280", marginBottom: "16px" }}>{subtitle}</p>

      <ul style={{ listStyle: "none", padding: 0, marginBottom: "24px" }}>
        {features.map((f) => (
          <li key={f} style={{ marginBottom: "8px" }}>
            ✓ {f}
          </li>
        ))}
      </ul>

      <Link to={ctaLink}>
        <button
          style={{
            padding: "10px 24px",
            fontSize: "16px",
            background: highlight ? "#111827" : "#ffffff",
            color: highlight ? "#ffffff" : "#111827",
            border: "1px solid #111827",
            cursor: "pointer",
          }}
        >
          {ctaLabel}
        </button>
      </Link>
    </div>
  );
};

export default Pricing;
