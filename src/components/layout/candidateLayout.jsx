import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Briefcase, LayoutGrid, LogOut, Search, User } from "lucide-react";

import { ROUTES } from "constants/routes";
import { useCandidateAuth } from "context/CandidateAuthContext";

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

  async function handleLogout() {
    await logout();
    navigate(ROUTES.CANDIDATE.OFFRES);
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="sticky top-0 flex h-screen w-60 flex-col border-r border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-5 py-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-sm">
              <Briefcase size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900">
              Talentia
            </span>
          </div>
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
                    ? "flex items-center gap-3 rounded-lg bg-teal-50 px-3 py-2.5 text-sm font-medium text-teal-600"
                    : "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-teal-600";
                }}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-gray-100 px-5 py-4">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-sm font-medium text-white">
              {candidat?.nom?.[0]?.toUpperCase() || "C"}
            </div>
            <div>
              <p className="max-w-[130px] truncate text-sm font-medium text-gray-900">
                {candidat?.nom}
              </p>
              <p className="text-xs text-gray-500">Candidat</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-gray-500 transition-colors hover:text-red-500"
          >
            <LogOut className="h-3.5 w-3.5" /> Déconnexion
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
