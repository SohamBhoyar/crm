// src/App.jsx

import AppRouter from "./app/AppRouter";
import { AuthProvider } from "@/auth/authStore";

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
