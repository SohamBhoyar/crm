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
    <h1 style={{ color: "green", textAlign: "center" }}>
      APP RENDERING
    </h1>
  );
}

export default App;
