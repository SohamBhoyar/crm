// src/permissions/PermissionGate.jsx

import { Navigate } from "react-router-dom";
import { useAuth } from "@/auth/authStore";

/**
 * PermissionGate
 *
 * PURPOSE:
 * - Conditionally render UI or routes based on permissions
 *
 * USAGE:
 * - Wrap pages, components, or routes
 *
 * IMPORTANT:
 * - This is a UI/route guard, NOT backend security
 * - Backend must still enforce permissions
 */

const PermissionGate = ({
  permission,
  children,
  fallback = null,
  redirectTo = null,
}) => {
  const { initialized, can } = useAuth();

  // Wait until auth state is ready
  if (!initialized) {
    return null; // later: loader
  }

  // Permission denied
  if (!can(permission)) {
    // Route-level protection
    if (redirectTo) {
      return <Navigate to={redirectTo} replace />;
    }

    // UI-level protection
    return fallback;
  }

  return children;
};

export default PermissionGate;
