// src/App.jsx

// import AppRouter from "./app/AppRouter";
// import { AuthProvider } from "@/auth/authStore";

/**
 * Root App
 *
 * IMPORTANT RULE:
 * - AppRouter must ALWAYS render
 * - AuthProvider must NOT block public pages
 */

// function App() {
//   return (
//     <AuthProvider>
//       <AppRouter />
//     </AuthProvider>
//   );
// }

// export default App;

import AppRouter from "./app/AppRouter";
import { AuthProvider } from "@/auth/authStore";

function App() {
  return (
    <>
      <div style={{ color: "blue", textAlign: "center" }}>
        BEFORE AUTH
      </div>

      <AuthProvider>
        <div style={{ color: "green", textAlign: "center" }}>
          INSIDE AUTH
        </div>

        <AppRouter />
      </AuthProvider>

      <div style={{ color: "red", textAlign: "center" }}>
        AFTER AUTH
      </div>
    </>
  );
}

export default App;
