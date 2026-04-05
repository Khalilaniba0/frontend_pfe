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
    <div className="flex flex-col lg:flex-row items-start gap-6 rounded-xl border border-border bg-white shadow-sm">
      {/* Colonne gauche - Navigation sticky / scrollable on mobile */}
      <div className="w-full overflow-x-auto lg:sticky lg:top-6 lg:w-64 flex-shrink-0 lg:self-start p-3 lg:p-4 lg:overflow-x-visible">
        <p className="text-xs font-display font-semibold text-text-muted uppercase tracking-wider mb-3 px-2 hidden lg:block lg:mb-4">
          Paramètres
        </p>
        <nav className="flex gap-2 whitespace-nowrap lg:flex-col lg:space-y-1 lg:gap-0 lg:whitespace-normal">
          {SETTINGS_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-shrink-0 items-center gap-2 px-3 py-2.5 rounded-lg text-left transition-colors lg:w-full lg:gap-3 ${
                  isActive
                    ? "bg-primary-light border-l-0 lg:border-l-2 border-primary"
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
                    className={`text-xs hidden lg:block ${
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

      {/* Colonne droite - Contenu scrollable */}
      <div className="min-w-0 flex-1 border-t lg:border-t-0 lg:border-l border-border p-4 md:p-6 lg:p-8">{children}</div>
    </div>
  );
}

SettingsLayout.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
