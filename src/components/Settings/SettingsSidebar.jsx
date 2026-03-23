import React from "react";
import PropTypes from "prop-types";

const SETTINGS_TABS = [
  {
    id: "entreprise",
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
    id: "apparence",
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
    id: "securite",
    label: "Sécurité",
    icon: "shield",
    description: "Accès et permissions",
  },
];

export default function SettingsSidebar({ activeTab, onTabChange }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
      <h3 className="mb-4 px-2 font-display text-sm font-semibold uppercase tracking-wider text-text-muted">
        Configuration
      </h3>
      <nav className="flex flex-col gap-1">
        {SETTINGS_TABS.map(function (tab) {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={function () {
                onTabChange(tab.id);
              }}
              className={
                "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left font-body text-sm transition-all duration-150 " +
                (isActive
                  ? "bg-primary-light text-primary"
                  : "text-text-secondary hover:bg-bg-soft hover:text-text-primary")
              }
            >
              <span
                className={
                  "material-symbols-outlined flex-shrink-0 text-lg transition-colors " +
                  (isActive
                    ? "text-primary"
                    : "text-text-muted group-hover:text-text-secondary")
                }
              >
                {tab.icon}
              </span>
              <div className="flex min-w-0 flex-col items-start">
                <span
                  className={
                    "font-medium leading-tight " +
                    (isActive ? "text-primary" : "")
                  }
                >
                  {tab.label}
                </span>
                <span className="w-full truncate text-xs leading-tight text-text-muted">
                  {tab.description}
                </span>
              </div>
              <span
                className={
                  "material-symbols-outlined ml-auto flex-shrink-0 text-base transition-all " +
                  (isActive
                    ? "text-primary"
                    : "text-transparent group-hover:text-text-muted")
                }
              >
                chevron_right
              </span>
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
