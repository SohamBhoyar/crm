// src/features/leads/pages/LeadEdit.jsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getLeadById, updateLead } from "@/api/modules/leads.api";

/**
 * LeadEdit
 *
 * RESPONSIBILITIES:
 * - Fetch lead by ID
 * - Render edit form
 * - Submit updated data
 *
 * NON-RESPONSIBILITIES:
 * - Permission checks (route + backend handle this)
 * - Business rules
 */

const LeadEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    status: "new",
    assigned_to: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch lead on load
  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await getLeadById(id);

        setForm({
          name: response.name,
          status: response.status,
          assigned_to: response.assigned_to || "",
        });
      } catch (err) {
        setError(err?.message || "Failed to load lead");
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id]);

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

    setSaving(true);
    setError(null);

    try {
      await updateLead(id, {
        name: form.name,
        status: form.status,
        assigned_to: form.assigned_to || null,
      });

      navigate("/leads");
    } catch (err) {
      setError(err?.message || "Failed to update lead");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading lead...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div style={{ maxWidth: "480px" }}>
      <h1>Edit Lead</h1>

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

        {/* Status */}
        <div style={{ marginBottom: "12px" }}>
          <label>Status</label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        {/* Assigned To */}
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
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Update Lead"}
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

export default LeadEdit;
