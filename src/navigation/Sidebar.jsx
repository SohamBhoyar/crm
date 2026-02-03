// src/navigation/Sidebar.jsx

import { NavLink } from "react-router-dom";
import { useAuth } from "@/auth/authStore";
import menuConfig from "./menu.config";

/**
 * Sidebar component
 *
 * RESPONSIBILITIES:
 * - Render navigation
 * - Filter menu items based on permissions
 *
 * NON-RESPONSIBILITIES:
 * - Routing decisions
 * - API calls
 * - Auth logic
 */

const Sidebar = () => {
  const { can } = useAuth();

  return (
    <aside
      style={{
        width: "240px",
        backgroundColor: "#111827",
        color: "#ffffff",
        padding: "16px",
      }}
    >
      <h2 style={{ marginBottom: "24px" }}>Tecnovate CRM</h2>

      <nav>
        {menuConfig.map((section) => {
          // Hide entire section if parent permission missing
          if (section.permission && !can(section.permission)) {
            return null;
          }

          return (
            <div key={section.key} style={{ marginBottom: "16px" }}>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  marginBottom: "8px",
                  opacity: 0.8,
                }}
              >
                {section.label}
              </div>

              <ul style={{ listStyle: "none", paddingLeft: "12px" }}>
                {section.children.map((item) => {
                  if (item.permission && !can(item.permission)) {
                    return null;
                  }

                  return (
                    <li key={item.path} style={{ marginBottom: "6px" }}>
                      <NavLink
                        to={item.path}
                        style={({ isActive }) => ({
                          color: isActive ? "#38bdf8" : "#e5e7eb",
                          textDecoration: "none",
                          fontSize: "14px",
                        })}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
