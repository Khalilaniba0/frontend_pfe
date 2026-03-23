import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "components/layout/Sidebar";
import AdminNavbar from "components/layout/AdminNavbar";
import ProtectedRoute from "components/common/ProtectedRoute";

import Dashboard from "pages/Dashboard";
import Recruitment from "pages/Recruitment";
import Jobs from "pages/Jobs";
import Candidates from "pages/Candidates";
import Interviews from "pages/Interviews";
import Users from "pages/Users";
import Settings from "pages/Settings";

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-bg-page">
      {/* Sidebar gauche fixe */}
      <Sidebar />

      {/* Zone droite */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar haut fixe */}
        <AdminNavbar />

        {/* Contenu scrollable */}
        <main className="flex-1 overflow-y-auto bg-bg-page px-6 py-6">
          <div className="max-w-screen-2xl mx-auto">
            <Routes>
              {/* Routes accessibles à tous les rôles */}
              <Route index element={<Dashboard />} />
              <Route path="recruitment" element={<Recruitment />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="interviews" element={<Interviews />} />
              <Route path="candidates" element={<Candidates />} />

              {/* Routes admin uniquement */}
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

              {/* Redirection par défaut */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
