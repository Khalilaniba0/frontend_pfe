import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "context/ContexteAuth";
import { NAV_ITEMS } from "constants/navigation";
import { ROUTES } from "constants/routes";
import BrandLogo from "components/commun/LogoMarque.jsx";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [activeNav, setActiveNav] = React.useState("Tableau de bord");
  const location = useLocation();
  const { user } = useAuth();

  const filteredNavItems = NAV_ITEMS.filter(function (item) {
    return item.roles.includes(user?.role);
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
    <nav className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 flex-shrink-0 flex-col overflow-y-auto border-r border-border bg-white ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:flex`}>
      <div className="flex items-center gap-3 px-5 py-5">
        {/* Close button for mobile */}
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors duration-150 hover:bg-bg-soft hover:text-text-primary lg:hidden"
          aria-label="Fermer le menu"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
        <BrandLogo
          to={ROUTES.LANDING}
          textClassName="font-display text-lg font-bold tracking-tight text-text-primary"
          iconClassName="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-md shadow-primary/20"
        />
      </div>

      <div className="mt-2 flex-1 px-3">
        <p className="mb-2 px-3 font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          Menu principal
        </p>
        <ul className="flex list-none flex-col gap-0.5">
          {filteredNavItems.map(function (item) {
            const isActive = activeNav === item.label;
            return (
              <React.Fragment key={item.label}>
                <li>
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
                      setSidebarOpen(false); // Close sidebar on mobile after navigation
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
                    <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
                      <span className="truncate">{item.label}</span>
                    </span>
                  </Link>
                </li>
              </React.Fragment>
            );
          })}
        </ul>
      </div>

      {user?.role === "admin" && (
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
