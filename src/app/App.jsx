// src/app/App.jsx

import { AuthProvider } from "@/auth/authStore";
import AppRouter from "./AppRouter";

/**
 * Root application component
 *
 * RESPONSIBILITIES:
 * - Wrap global providers
 * - Mount router
 *
 * NON-RESPONSIBILITIES:
 * - Auth logic
 * - Route definitions
 * - Layout decisions
 */

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
