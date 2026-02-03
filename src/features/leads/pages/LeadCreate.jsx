// src/features/leads/pages/LeadCreate.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createLead } from "@/api/modules/leads.api";
// import { useEffect } from "react";
// import { getUsers } from "@/api/modules/users.api";
/**
 * LeadCreate
 *
 * RESPONSIBILITIES:
 * - Render create lead form
 * - Validate required fields
 * - Submit data to backend
 *
 * NON-RESPONSIBILITIES:
 * - Permission checks (handled by route + UI gate)
 * - Business rules
 */

const LeadCreate = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    assigned_to: "",
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

    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await createLead({
        name: form.name,
        email: form.email || null,
        phone: form.phone || null,
        source: form.source || null,
        assigned_to: form.assigned_to || null,
      });

      // Redirect to leads list after success
      navigate("/leads");
    } catch (err) {
      setError(err?.message || "Failed to create lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "480px" }}>
      <h1>Create Lead</h1>

      {error && (
        <p style={{ color: "red", marginBottom: "12px" }}>{error}</p>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div style={{ marginBottom: "12px" }}>
          <label>Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: "12px" }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        {/* Phone */}
        <div style={{ marginBottom: "12px" }}>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        {/* Source */}
        <div style={{ marginBottom: "12px" }}>
          <label>Source</label>
          <input
            type="text"
            name="source"
            value={form.source}
            onChange={handleChange}
            placeholder="Website, Referral, Call..."
            style={{ width: "100%" }}
          />
        </div>

        {/* Assigned To (MVP: numeric input) */}
        <div style={{ marginBottom: "16px" }}>
          <label>Assigned To (User ID)</label>
          <input
            type="number"
            name="assigned_to"
            value={form.assigned_to}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </div>

        {/* Actions */}
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Lead"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/leads")}
            style={{ marginLeft: "8px" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadCreate;
