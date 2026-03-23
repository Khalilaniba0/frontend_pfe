import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { NAV_ITEMS } from "constants/navigation";

export default function Sidebar() {
  const [activeNav, setActiveNav] = React.useState("Tableau de bord");
  const location = useLocation();
  const { user } = useAuth();

  // Filtrer les items de navigation en fonction du rôle
  const filteredNavItems = NAV_ITEMS.filter((item) =>
    item.roles.includes(user.role)
  );

  React.useEffect(function () {
    const path = location.pathname;
    const found = filteredNavItems
      .filter(function (item) {
        return path === item.path || path.startsWith(item.path + "/");
      })
      .sort(function (a, b) {
        return b.path.length - a.path.length;
      })[0];
    if (found) setActiveNav(found.label);
  }, [location.pathname, filteredNavItems]);

  return (
    <nav className="hidden md:flex md:flex-col md:w-56 bg-white border-r border-border overflow-y-auto flex-shrink-0">
      {/* Logo */}
      <div className="flex items-center px-5 py-6 gap-2.5">
        <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
            <path
              d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <span className="font-display font-bold text-text-primary text-sm tracking-tight">
          Talen<span className="text-primary">tia</span>
        </span>
      </div>

      {/* Nav items */}
      <div className="flex-1 px-3">
        <ul className="flex flex-col list-none">
          {filteredNavItems.map(function (item) {
            const isActive = activeNav === item.label;
            return (
              <li key={item.label}>
                <Link
                  className={
                    "flex items-center font-body text-sm py-2.5 px-3 rounded-lg mb-0.5 gap-3 transition-colors " +
                    (isActive
                      ? "bg-indigo-50 text-primary font-medium"
                      : "text-text-secondary hover:bg-gray-50 hover:text-text-primary")
                  }
                  to={item.path}
                  onClick={function () {
                    setActiveNav(item.label);
                  }}
                >
                  <span
                    className="material-symbols-outlined text-lg"
                    style={{ width: "20px", textAlign: "center" }}
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

      {/* Badge Admin en bas de sidebar */}
      {user.role === "admin" && (
        <div className="px-5 py-4 border-t border-border">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm text-primary">
              verified_user
            </span>
            <span className="font-body text-xs font-semibold text-primary">
              Mode Administrateur
            </span>
          </div>
        </div>
      )}
    </nav>
  );
}
