import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Bell, Briefcase, LayoutGrid, LogOut, Search, User } from "lucide-react";

import { ROUTES } from "constants/routes";
import { useCandidateAuth } from "context/CandidateAuthContext";
import BrandLogo from "components/common/BrandLogo";
import NotificationPanel from "components/Candidate/NotificationPanel";
import useNotifications from "hooks/useNotifications";

const NAV_ITEMS = [
  {
    label: "Tableau de bord",
    to: ROUTES.CANDIDATE.DASHBOARD,
    icon: LayoutGrid,
  },
  {
    label: "Mes Candidatures",
    to: ROUTES.CANDIDATE.MES_CANDIDATURES,
    icon: Briefcase,
  },
  {
    label: "Parcourir les offres",
    to: ROUTES.CANDIDATE.SPACE_OFFRES,
    icon: Search,
  },
  {
    label: "Mon Profil",
    to: ROUTES.CANDIDATE.PROFILE,
    icon: User,
  },
];

export default function CandidateLayout() {
  const { candidat, logout } = useCandidateAuth();
  const navigate = useNavigate();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { unreadCount } = useNotifications();

  async function handleLogout() {
    await logout();
    navigate(ROUTES.CANDIDATE.OFFRES);
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-bg-page">
      <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-border bg-white">
        <div className="border-b border-border px-5 py-5">
          <BrandLogo
            to={ROUTES.LANDING}
            textClassName="font-display text-lg font-bold tracking-tight text-text-primary"
            iconClassName="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-md shadow-primary/20"
          />
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map(function (item) {
            return (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === ROUTES.CANDIDATE.DASHBOARD}
                className={function ({ isActive }) {
                  return isActive
                    ? "group relative flex items-center gap-3 rounded-xl bg-primary-light px-3 py-2.5 font-body text-sm font-medium text-primary transition-all duration-200"
                    : "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 font-body text-sm text-text-secondary transition-all duration-200 hover:bg-bg-soft hover:text-text-primary";
                }}
              >
                {function ({ isActive }) {
                  return (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary"></span>
                      )}
                      <item.icon size={20} className={isActive ? "text-primary transition-transform duration-200 group-hover:scale-110" : "transition-transform duration-200 group-hover:scale-110"} />
                      <span>{item.label}</span>
                    </>
                  );
                }}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-border px-5 py-4">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary font-display text-xs font-bold text-white shadow-sm">
              {candidat?.nom?.[0]?.toUpperCase() || "C"}
            </div>
            <div className="flex flex-col">
              <span className="max-w-[130px] truncate font-body text-sm font-medium text-text-primary">
                {candidat?.nom}
              </span>
              <span className="font-body text-xs text-text-secondary">
                Candidat
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 font-body text-sm font-medium text-text-secondary transition-all duration-150 hover:bg-red-50 hover:text-red-500"
          >
            <LogOut className="h-4 w-4" /> Déconnexion
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex justify-end px-6 pt-4 md:px-8">
          <button
            type="button"
            onClick={function () {
              setIsNotificationOpen(true);
            }}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-text-secondary shadow-sm transition-colors hover:text-text-primary"
            aria-label="Ouvrir le centre de notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
        </div>

        <main className="w-full flex-1 overflow-y-auto px-6 pb-10 pt-8 md:px-8">
          <Outlet />
        </main>
      </div>

      <NotificationPanel
        isOpen={isNotificationOpen}
        onClose={function () {
          setIsNotificationOpen(false);
        }}
      />
    </div>
  );
}
