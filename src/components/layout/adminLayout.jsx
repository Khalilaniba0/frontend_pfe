import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "components/layout/Sidebar";
import AdminNavbar from "components/layout/AdminNavbar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-bg-page">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {sidebarOpen ? (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={function () {
            setSidebarOpen(false);
          }}
        />
      ) : null}

      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminNavbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-screen-2xl px-4 py-6 md:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
