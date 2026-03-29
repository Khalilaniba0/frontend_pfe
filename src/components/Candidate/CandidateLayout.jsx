import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Briefcase,
  Search,
  User,
  LogOut,
} from "lucide-react";
import { useCandidateAuth } from "context/CandidateAuthContext";

const NAV_ITEMS = [
  {
    label: "Tableau de bord",
    to: "/candidat/dashboard",
    icon: LayoutGrid,
  },
  {
    label: "Mes Candidatures",
    to: "/candidat/mes-candidatures",
    icon: Briefcase,
  },
  {
    label: "Parcourir les offres",
    to: "/candidat/offres",
    icon: Search,
  },
  {
    label: "Mon Profil",
    to: "/candidat/profil",
    icon: User,
  },
];

export default function CandidateLayout() {
  const { candidat, logout } = useCandidateAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/offres");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ── Sidebar ── */}
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-sm">
              <Briefcase size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900">
              Talentia
            </span>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.to === "/candidat/dashboard"}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-teal-50 text-teal-600 font-medium text-sm"
                  : "flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-teal-600 transition-colors text-sm"
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom section — user info + logout */}
        <div className="mt-auto px-5 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-medium">
              {candidat?.nom?.[0]?.toUpperCase() || "C"}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 truncate max-w-[130px]">
                {candidat?.nom}
              </p>
              <p className="text-xs text-gray-500">Candidat</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Déconnexion
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
