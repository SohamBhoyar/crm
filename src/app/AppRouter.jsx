// src/app/AppRouter.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import PublicLayout from "@/layouts/PublicLayout";

// Auth pages
import LoginPage from "@/features/auth/LoginPage";



// Portal pages
import Home from "@/portal/pages/Home";
import Pricing from "@/portal/pages/Pricing";
import Purchase from "@/portal/pages/Purchase";

// Feature pages
import LeadsList from "@/features/leads/pages/LeadsList";
import LeadCreate from "@/features/leads/pages/LeadCreate";
import LeadEdit from "@/features/leads/pages/LeadEdit";

// import CustomersList from "@/features/customers/pages/CustomersList";
// import CustomerCreate from "@/features/customers/pages/CustomerCreate";

// import ProjectsList from "@/features/projects/pages/ProjectsList";
// import ProjectCreate from "@/features/projects/pages/ProjectCreate";

// import TasksList from "@/features/tasks/pages/TasksList";
// import TaskCreate from "@/features/tasks/pages/TaskCreate";

import { useAuth } from "@/auth/authStore";
import PermissionGate from "@/permissions/PermissionGate";

/**
 * Auth-only route guard
 */
const ProtectedRoute = ({ children }) => {
  const { initialized, isAuthenticated } = useAuth();

  if (!initialized) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC PORTAL ================= */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/purchase" element={<Purchase />} />
        </Route>

        {/* ================= AUTH ROUTES ================= */}
        <Route path="/login" element={<LoginPage />} />


        {/* ================= PROTECTED APP ================= */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Default */}
          <Route index element={<Navigate to="/leads" replace />} />

          {/* Leads */}
          <Route path="/leads" element={<LeadsList />} />

          <Route
            path="/leads/create"
            element={
              <PermissionGate permission="leads.create" redirectTo="/leads">
                <LeadCreate />
              </PermissionGate>
            }
          />

          <Route
            path="/leads/:id/edit"
            element={
              <PermissionGate permission="leads.update" redirectTo="/leads">
                <LeadEdit />
              </PermissionGate>
            }
          />

          {/* Customers */}
          {/* <Route path="/customers" element={<CustomersList />} />

          <Route
            path="/customers/create"
            element={
              <PermissionGate
                permission="customers.create"
                redirectTo="/customers"
              >
                <CustomerCreate />
              </PermissionGate>
            }
          /> */}

          {/* Projects */}
          {/* <Route path="/projects" element={<ProjectsList />} />

          <Route
            path="/projects/create"
            element={
              <PermissionGate
                permission="projects.create"
                redirectTo="/projects"
              >
                <ProjectCreate />
              </PermissionGate>
            }
          /> */}

          {/* Tasks */}
          {/* <Route path="/tasks" element={<TasksList />} />

          <Route
            path="/tasks/create"
            element={
              <PermissionGate permission="tasks.create" redirectTo="/tasks">
                <TaskCreate />
              </PermissionGate>
            }
          /> */}
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
