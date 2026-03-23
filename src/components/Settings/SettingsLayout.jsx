import React from "react";
import PropTypes from "prop-types";

const SETTINGS_TABS = [
  {
    id: "entreprise",
    label: "Entreprise",
    icon: "business",
    subtitle: "Informations générales",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "notifications",
    subtitle: "Alertes et emails",
  },
  {
    id: "apparence",
    label: "Apparence",
    icon: "palette",
    subtitle: "Thème et affichage",
  },
  {
    id: "integrations",
    label: "Intégrations",
    icon: "extension",
    subtitle: "Outils connectés",
  },
  {
    id: "securite",
    label: "Sécurité",
    icon: "security",
    subtitle: "Accès et permissions",
  },
];

export default function SettingsLayout({ activeTab, onTabChange, children }) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm flex min-h-[600px]">
      {/* Colonne gauche - Navigation */}
      <div className="w-64 border-r border-border p-4 flex-shrink-0">
        <p className="text-xs font-display font-semibold text-text-muted uppercase tracking-wider mb-4 px-2">
          Paramètres
        </p>
        <nav className="space-y-1">
          {SETTINGS_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                  isActive
                    ? "bg-primary-light border-l-2 border-primary"
                    : "text-text-secondary hover:bg-bg-soft"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    isActive ? "text-primary" : ""
                  }`}
                >
                  {tab.icon}
                </span>
                <div>
                  <p
                    className={`text-sm font-display font-medium ${
                      isActive ? "text-primary" : ""
                    }`}
                  >
                    {tab.label}
                  </p>
                  <p
                    className={`text-xs ${
                      isActive ? "text-primary/70" : "text-text-muted"
                    }`}
                  >
                    {tab.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Colonne droite - Contenu */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}

SettingsLayout.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
