// src/navigation/menu.config.js

/**
 * Sidebar menu configuration for Tecnovate CRM
 *
 * RULES:
 * - This file is PURE CONFIG
 * - No React, no hooks, no state
 * - Permissions are strings from backend
 * - Sidebar decides visibility using `can()`
 */

const menuConfig = [
  {
    label: "Leads",
    key: "leads",
    permission: "leads.view",
    children: [
      {
        label: "Leads List",
        path: "/leads",
        permission: "leads.view",
      },
      {
        label: "Create Lead",
        path: "/leads/create",
        permission: "leads.create",
      },
    ],
  },

  {
    label: "Customers",
    key: "customers",
    permission: "customers.view",
    children: [
      {
        label: "Customers List",
        path: "/customers",
        permission: "customers.view",
      },
      {
        label: "Add Customer",
        path: "/customers/create",
        permission: "customers.create",
      },
    ],
  },

  {
    label: "Projects",
    key: "projects",
    permission: "projects.view",
    children: [
      {
        label: "Project List",
        path: "/projects",
        permission: "projects.view",
      },
      {
        label: "Create Project",
        path: "/projects/create",
        permission: "projects.create",
      },
    ],
  },

  {
    label: "Tasks",
    key: "tasks",
    permission: "tasks.view",
    children: [
      {
        label: "Task List",
        path: "/tasks",
        permission: "tasks.view",
      },
      {
        label: "Add Task",
        path: "/tasks/create",
        permission: "tasks.create",
      },
    ],
  },
];

export default menuConfig;
