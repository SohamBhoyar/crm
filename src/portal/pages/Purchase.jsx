// src/portal/pages/Purchase.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { purchaseCompany } from "@/api/portal.api";

/**
 * Purchase Page (Public Portal)
 *
 * FLOW:
 * - User enters company + admin details
 * - Calls backend to create tenant
 * - Saves tenant code
 * - Redirects to login
 */

const Purchase = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company_name: "",
    company_code: "",
    admin_name: "",
    admin_email: "",
    admin_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !form.company_name ||
      !form.company_code ||
      !form.admin_email ||
      !form.admin_password
    ) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 🔥 REAL BACKEND CALL
      const response = await purchaseCompany({
        company_name: form.company_name,
        company_code: form.company_code,
        admin_name: form.admin_name,
        admin_email: form.admin_email,
        admin_password: form.admin_password,
      });

      // Save tenant code for future API calls
      localStorage.setItem("tenant", response.tenant_code);

      // Redirect to login page
      navigate("/login");
    } catch (err) {
      setError(err?.message || "Failed to create company");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "520px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "16px" }}>Create Your Company</h1>

      <p style={{ color: "#6b7280", marginBottom: "24px" }}>
        Payment is bypassed for demo. Your CRM workspace will be created instantly.
      </p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Company Name */}
        <div style={{ marginBottom: "12px" }}>
          <label>Company Name *</label>
          <input
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>

        {/* Company Code */}
        <div style={{ marginBottom: "12px" }}>
          <label>Company Code *</label>
          <input
            name="company_code"
            value={form.company_code}
            onChange={handleChange}
            placeholder="example: acme"
            required
            style={{ width: "100%" }}
          />
          <small style={{ color: "#6b7280" }}>
            Used as tenant identifier (X-Tenant)
          </small>
        </div>

        {/* Admin Name */}
        <div style={{ marginBottom: "12px" }}>
          <label>Admin Name</label>
          <input
            name="admin_name"
            value={form.admin_name}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        {/* Admin Email */}
        <div style={{ marginBottom: "12px" }}>
          <label>Admin Email *</label>
          <input
            type="email"
            name="admin_email"
            value={form.admin_email}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>

        {/* Admin Password */}
        <div style={{ marginBottom: "20px" }}>
          <label>Admin Password *</label>
          <input
            type="password"
            name="admin_password"
            value={form.admin_password}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating Company..." : "Create Company"}
        </button>
      </form>
    </div>
  );
};

export default Purchase;
