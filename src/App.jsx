// src/App.jsx

import AppRouter from "./app/AppRouter";
import { AuthProvider } from "@/auth/authStore";

/**
 * Root App
 *
 * IMPORTANT RULE:
 * - AppRouter must ALWAYS render
 * - AuthProvider must NOT block public pages
 */

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
