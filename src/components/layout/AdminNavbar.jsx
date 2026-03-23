import React from "react";
import { useAuth } from "context/AuthContext";

export default function AdminNavbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="h-16 bg-white border-b border-border flex items-center justify-end px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-display">
          {user?.name?.slice(0, 2).toUpperCase() || "JD"}
        </div>

        {/* Nom */}
        <span className="text-sm font-body text-text-primary">
          {user?.name || "Jane Doe"}
        </span>

        {/* Badge rôle */}
        <span
          className={`text-xs font-display font-medium px-2.5 py-1 rounded-full ${
            user?.role === "admin"
              ? "bg-primary text-white"
              : "bg-bg-soft text-text-secondary border border-border"
          }`}
        >
          {user?.role === "admin" ? "Admin" : "RH"}
        </span>

        {/* Notifications */}
        <button
          className="w-8 h-8 flex items-center justify-center text-text-secondary hover:bg-bg-soft rounded-lg"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined text-xl">
            notifications
          </span>
        </button>

        {/* Déconnexion */}
        <button
          onClick={logout}
          className="w-8 h-8 flex items-center justify-center text-text-secondary hover:bg-bg-soft rounded-lg"
          aria-label="Déconnexion"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
        </button>
      </div>
    </nav>
  );
}
