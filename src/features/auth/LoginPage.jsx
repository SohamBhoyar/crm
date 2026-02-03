// src/features/auth/LoginPage.jsx

import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/auth/authStore";

/**
 * LoginPage
 *
 * Custom login page for Tecnovate CRM
 * - Login is allowed ONLY if tenant exists
 * - Prevents tenant-less login attempts
 */

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  // 🔒 TENANT GUARD (CRITICAL)
  const tenant = localStorage.getItem("tenant");
  if (!tenant) {
    // User must come via portal purchase
    return <Navigate to="/" replace />;
  }

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(form);
      navigate("/leads");
    } catch (err) {
      setError(err?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: "360px", margin: "80px auto" }}>
      <h1>Login</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: "100%" }}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
