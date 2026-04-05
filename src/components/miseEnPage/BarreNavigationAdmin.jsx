import React, { useEffect, useState } from "react";
import { useAuth } from "context/ContexteAuth";
import {
  getMyEntreprise,
  resolveEntrepriseMediaUrl,
} from "service/restApiEntreprise";

export default function AdminNavbar({ sidebarOpen, setSidebarOpen }) {
  const { user, logout } = useAuth();
  const [entrepriseLogo, setEntrepriseLogo] = useState("");

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

  const companyLogoFromUser = resolveEntrepriseMediaUrl(
    user?.entreprise?.logo ||
      user?.company?.logo ||
      user?.logoEntreprise ||
      user?.entrepriseLogo ||
      user?.logo ||
      ""
  );
  const companyLogo = companyLogoFromUser || entrepriseLogo;
  const [logoLoadError, setLogoLoadError] = useState(false);

  useEffect(function () {
    var cancelled = false;

    async function fetchEntrepriseLogo() {
      try {
        var response = await getMyEntreprise();
        var data = response?.data?.data || response?.data;
        if (!cancelled && data?.logo) {
          setEntrepriseLogo(resolveEntrepriseMediaUrl(data.logo));
        }
      } catch {
        if (!cancelled) {
          setEntrepriseLogo("");
        }
      }
    }

    if (!companyLogoFromUser) {
      fetchEntrepriseLogo();
    }

    return function () {
      cancelled = true;
    };
  }, [companyLogoFromUser]);

  useEffect(
    function () {
      setLogoLoadError(false);
    },
    [companyLogo]
  );

  const shouldShowCompanyLogo = Boolean(companyLogo) && !logoLoadError;

  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-white/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={function () {
            setSidebarOpen(!sidebarOpen);
          }}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors duration-150 hover:bg-bg-soft hover:text-text-primary lg:hidden"
          aria-label="Menu"
        >
          <span className="material-symbols-outlined text-xl">menu</span>
        </button>
        <div className="hidden items-center gap-2 lg:flex">
          <span className="font-body text-sm text-text-muted">Bienvenue,</span>
          <span className="font-body text-sm font-semibold text-text-primary">
            {user?.name?.split(" ")[0] || "Utilisateur"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">

        <div className="mx-2 h-6 w-px bg-border"></div>

        <div className="flex items-center gap-3">
          <div
            className={
              "flex h-9 w-9 items-center justify-center rounded-xl shadow-sm " +
              (shouldShowCompanyLogo
                ? "overflow-hidden border border-border bg-white"
                : "bg-gradient-to-br from-primary to-secondary font-display text-xs font-bold text-white")
            }
          >
            {shouldShowCompanyLogo ? (
              <img
                src={companyLogo}
                alt="Logo entreprise"
                className="h-full w-full object-cover"
                onError={function () {
                  setLogoLoadError(true);
                }}
              />
            ) : (
              initials
            )}
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
