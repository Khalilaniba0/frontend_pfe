import React from "react";
import PropTypes from "prop-types";
 
const SETTINGS_TABS = [
  {
    id: "company",
    label: "Entreprise",
    icon: "business",
    description: "Informations générales",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "notifications",
    description: "Alertes et emails",
  },
  {
    id: "appearance",
    label: "Apparence",
    icon: "palette",
    description: "Thème et affichage",
  },
  {
    id: "integrations",
    label: "Intégrations",
    icon: "extension",
    description: "Outils connectés",
  },
  {
    id: "security",
    label: "Sécurité",
    icon: "shield",
    description: "Accès et permissions",
  },
];
 
export default function SettingsSidebar({ activeTab, onTabChange }) {
  return (
    <div className="bg-white rounded-2xl border border-border p-4">
      <h3 className="font-display font-semibold text-text-primary mb-4 px-2">
        Paramètres
      </h3>
      <nav className="space-y-1">
        {SETTINGS_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm transition-colors text-left ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-text-secondary hover:bg-bg-soft hover:text-text-primary"
              }`}
            >
              <span
                className={`material-symbols-outlined text-lg flex-shrink-0 ${
                  isActive ? "text-primary" : "text-text-muted"
                }`}
              >
                {tab.icon}
              </span>
              <div className="flex flex-col items-start min-w-0">
                <span className={`font-medium leading-tight ${isActive ? "text-primary" : ""}`}>
                  {tab.label}
                </span>
                <span className="text-xs text-text-muted leading-tight truncate w-full">
                  {tab.description}
                </span>
              </div>
              {isActive && (
                <span className="ml-auto material-symbols-outlined text-base text-primary flex-shrink-0">
                  chevron_right
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
 
SettingsSidebar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
};