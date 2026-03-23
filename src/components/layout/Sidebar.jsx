import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { NAV_ITEMS } from "constants/navigation";

export default function Sidebar() {
  const [activeNav, setActiveNav] = React.useState("Tableau de bord");
  const location = useLocation();
  const { user } = useAuth();

  const filteredNavItems = NAV_ITEMS.filter(function (item) {
    return item.roles.includes(user.role);
  });

  React.useEffect(
    function () {
      const path = location.pathname;
      const found = filteredNavItems
        .filter(function (item) {
          return path === item.path || path.startsWith(item.path + "/");
        })
        .sort(function (a, b) {
          return b.path.length - a.path.length;
        })[0];
      if (found) setActiveNav(found.label);
    },
    [location.pathname, filteredNavItems]
  );

  return (
    <nav className="hidden flex-shrink-0 flex-col overflow-y-auto border-r border-border bg-white md:flex md:w-60">
      <div className="flex items-center gap-3 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-md shadow-primary/20">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="font-display text-lg font-bold tracking-tight text-text-primary">
          Talen<span className="text-primary">tia</span>
        </span>
      </div>

      <div className="mt-2 flex-1 px-3">
        <p className="mb-2 px-3 font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          Menu principal
        </p>
        <ul className="flex list-none flex-col gap-0.5">
          {filteredNavItems.map(function (item) {
            const isActive = activeNav === item.label;
            return (
              <li key={item.label}>
                <Link
                  className={
                    "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 font-body text-sm transition-all duration-200 " +
                    (isActive
                      ? "bg-primary-light font-medium text-primary"
                      : "text-text-secondary hover:bg-bg-soft hover:text-text-primary")
                  }
                  to={item.path}
                  onClick={function () {
                    setActiveNav(item.label);
                  }}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary"></span>
                  )}
                  <span
                    className={
                      "material-symbols-outlined flex w-5 items-center justify-center text-lg transition-transform duration-200 group-hover:scale-110 " +
                      (isActive ? "text-primary" : "")
                    }
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {user.role === "admin" && (
        <div className="mx-3 mb-4 rounded-xl border border-primary/20 bg-gradient-to-r from-primary-light to-secondary-light p-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base text-primary">
              verified_user
            </span>
            <div>
              <p className="font-body text-xs font-semibold text-primary">
                Mode Admin
              </p>
              <p className="font-body text-[10px] text-text-secondary">
                Accès complet activé
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
