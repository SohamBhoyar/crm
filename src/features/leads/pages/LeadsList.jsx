// src/features/leads/pages/LeadsList.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getLeads, deleteLead } from "@/api/modules/leads.api";
import { useAuth } from "@/auth/authStore";
import PermissionGate from "@/permissions/PermissionGate";

/**
 * LeadsList
 *
 * RESPONSIBILITIES:
 * - Fetch leads list
 * - Render table
 * - Show actions based on permissions
 *
 * NON-RESPONSIBILITIES:
 * - Business logic
 * - Permission decisions beyond UI
 */

const LeadsList = () => {
  const { can } = useAuth();

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await getLeads();
      // assuming response = { data: [...] }
      setLeads(response.data || []);
    } catch (err) {
      setError(err?.message || "Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) {
      return;
    }

    try {
      await deleteLead(id);
      fetchLeads(); // refresh list
    } catch (err) {
      alert(err?.message || "Delete failed");
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  if (loading) {
    return <p>Loading leads...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <h1>Leads</h1>

        <PermissionGate permission="leads.create">
          <Link to="/leads/create">
            <button>Create Lead</button>
          </Link>
        </PermissionGate>
      </div>

      {/* Table */}
      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Source</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads.length === 0 && (
            <tr>
              <td colSpan="7" align="center">
                No leads found
              </td>
            </tr>
          )}

          {leads.map((lead) => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.email || "-"}</td>
              <td>{lead.phone || "-"}</td>
              <td>{lead.source || "-"}</td>
              <td>{lead.status}</td>
              <td>{new Date(lead.created_at).toLocaleDateString()}</td>
              <td>
                <PermissionGate permission="leads.update">
                  <Link to={`/leads/${lead.id}/edit`}>Edit</Link>
                </PermissionGate>

                {" "}

                <PermissionGate permission="leads.delete">
                  <button
                    onClick={() => handleDelete(lead.id)}
                    style={{ marginLeft: "8px" }}
                  >
                    Delete
                  </button>
                </PermissionGate>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsList;
