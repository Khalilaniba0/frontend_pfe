import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  Briefcase,
  Mail,
  Bookmark,
  User,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  Settings,
  Plus,
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
    label: "Messages",
    to: "#",
    icon: Mail,
    badge: 3,
    disabled: true,
  },
  {
    label: "Offres Enregistrées",
    to: "#",
    icon: Bookmark,
    disabled: true,
  },
  {
    label: "Profil",
    to: "/candidat/profil",
    icon: User,
  },
];

function SidebarLink({ item }) {
  if (item.disabled) {
    return (
      <span className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-400 cursor-not-allowed">
        <item.icon size={20} />
        <span className="flex-1">{item.label}</span>
        {item.badge && (
          <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-teal-500 px-1.5 text-[10px] font-bold text-white">
            {item.badge}
          </span>
        )}
      </span>
    );
  }

  return (
    <NavLink
      to={item.to}
      end
      className={function ({ isActive }) {
        return (
          "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-150 " +
          (isActive
            ? "bg-teal-50 text-teal-600"
            : "text-gray-600 hover:bg-gray-50 hover:text-teal-600")
        );
      }}
    >
      <item.icon size={20} />
      <span className="flex-1">{item.label}</span>
      {item.badge && (
        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-teal-500 px-1.5 text-[10px] font-bold text-white">
          {item.badge}
        </span>
      )}
    </NavLink>
  );
}

export default function CandidateLayout() {
  const { candidat, logout } = useCandidateAuth();
  const navigate = useNavigate();

  const initials = (candidat?.nom || "C")
    .split(" ")
    .map(function (w) {
      return w[0];
    })
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleLogout() {
    await logout();
    navigate("/candidat/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ── Sidebar ── */}
      <aside className="sticky top-0 flex h-screen w-[260px] shrink-0 flex-col border-r border-gray-200 bg-white">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-6 py-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 shadow-sm">
            <Briefcase size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">
            Talentia
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-1 px-3 py-2">
          {NAV_ITEMS.map(function (item) {
            return <SidebarLink key={item.label} item={item} />;
          })}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-gray-100 px-4 py-4">
          {/* User info */}
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-xs font-bold text-white">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-900">
                {candidat?.nom || "Candidat"}
              </p>
              <p className="truncate text-xs text-gray-400">
                {candidat?.email || ""}
              </p>
            </div>
          </div>

          {/* Aide / Déconnexion */}
          <div className="flex gap-2">
            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-50">
              <HelpCircle size={14} />
              Aide
            </button>
            <button
              onClick={handleLogout}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 hover:border-red-200"
            >
              <LogOut size={14} />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-gray-200 bg-white/80 backdrop-blur-md px-6 py-3">
          {/* Search */}
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un poste, une entreprise…"
              className="w-full border-none bg-transparent p-0 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-0"
            />
          </div>

          {/* Actions */}
          <button className="relative rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
            <Bell size={20} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-teal-500" />
          </button>

          <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
            <Settings size={20} />
          </button>

          <button
            onClick={function () {
              navigate("/offres");
            }}
            className="flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-600 hover:shadow-md"
          >
            <Plus size={16} />
            Nouvelle Recherche
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
