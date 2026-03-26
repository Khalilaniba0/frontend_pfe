import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "components/layout/Sidebar";
import AdminNavbar from "components/layout/AdminNavbar";
import ProtectedRoute from "components/common/ProtectedRoute";

import Dashboard from "pages/Dashboard";
import Recruitment from "pages/Recruitment";
import Jobs from "pages/Jobs";
import Interviews from "pages/Interviews";
import Users from "pages/Users";
import Settings from "pages/Settings";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-bg-page">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminNavbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-screen-2xl px-4 py-6 md:px-6 lg:px-8">
            <Routes>
              <Route index element={<Dashboard />} />
              <Route path="recruitment" element={<Recruitment />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="interviews" element={<Interviews />} />

              <Route
                path="users"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="settings"
                element={
                  <ProtectedRoute allowedRoles={["admin"]}>
                    <Settings />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
