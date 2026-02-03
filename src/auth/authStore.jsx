// src/auth/authStore.js

import { createContext, useContext, useEffect, useState } from "react";
import { getMe, login as loginApi, logout as logoutApi } from "./auth.api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Bootstrap auth state from backend
   */
  const bootstrap = async () => {
    try {
      const data = await getMe();
      setUser(data.user);
      setPermissions(data.permissions || []);
    } catch {
      setUser(null);
      setPermissions([]);
    } finally {
      setInitialized(true);
    }
  };

  /**
   * Login
   */
  const login = async (credentials) => {
    setLoading(true);
    try {
      await loginApi(credentials);
      await bootstrap();
      return true;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout (manual or forced)
   */
  const logout = async (forced = false) => {
    try {
      if (!forced) {
        await logoutApi();
      }
    } finally {
      setUser(null);
      setPermissions([]);
      setInitialized(true);
    }
  };

  /**
   * Permission helper
   */
  const can = (permission) => permissions.includes(permission);

  // Initial bootstrap
  useEffect(() => {
    bootstrap();
  }, []);

  // 🔥 Listen for session expiry from Axios
  useEffect(() => {
    const handleSessionExpired = () => {
      logout(true);
    };

    window.addEventListener("auth:expired", handleSessionExpired);

    return () => {
      window.removeEventListener("auth:expired", handleSessionExpired);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        permissions,
        initialized,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        can,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
