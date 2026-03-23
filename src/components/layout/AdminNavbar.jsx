import React from "react";
import { useAuth } from "context/AuthContext";

export default function AdminNavbar() {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = React.useState(false);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map(function (n) {
          return n[0];
        })
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "JD";

  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-white/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors duration-150 hover:bg-bg-soft hover:text-text-primary md:hidden"
          aria-label="Menu"
        >
          <span className="material-symbols-outlined text-xl">menu</span>
        </button>
        <div className="hidden items-center gap-2 md:flex">
          <span className="font-body text-sm text-text-muted">Bienvenue,</span>
          <span className="font-body text-sm font-semibold text-text-primary">
            {user?.name?.split(" ")[0] || "Utilisateur"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={function () {
              setShowNotifications(!showNotifications);
            }}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-all duration-150 hover:bg-bg-soft hover:text-text-primary"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-xl">
              notifications
            </span>
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
          </button>
        </div>

        <div className="mx-2 h-6 w-px bg-border"></div>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary font-display text-xs font-bold text-white shadow-sm">
            {initials}
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="font-body text-sm font-medium text-text-primary">
              {user?.name || "Jane Doe"}
            </span>
            <span
              className={
                "font-body text-xs " +
                (user?.role === "admin" ? "text-primary" : "text-text-secondary")
              }
            >
              {user?.role === "admin" ? "Administrateur" : "Ressources Humaines"}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={logout}
          className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-all duration-150 hover:bg-red-50 hover:text-red-500"
          aria-label="Déconnexion"
          title="Se déconnecter"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
        </button>
      </div>
    </nav>
  );
}
