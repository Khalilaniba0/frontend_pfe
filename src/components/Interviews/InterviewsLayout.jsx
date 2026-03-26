import React from "react";
import PropTypes from "prop-types";

const INTERVIEWS_TABS = [
  {
    id: "calendrier",
    label: "Calendrier",
    icon: "calendar_month",
    subtitle: "Vue mensuelle",
  },
  {
    id: "en-ligne",
    label: "Entretiens en ligne",
    icon: "videocam",
    subtitle: "Sessions visio",
  },
];

export default function InterviewsLayout({
  activeTab,
  onTabChange,
  children,
}) {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 rounded-2xl border border-border bg-white shadow-sm">
      {/* Colonne gauche - Navigation sticky */}
      <div className="w-full lg:sticky lg:top-6 lg:w-64 flex-shrink-0 lg:self-start bg-bg-soft/30 p-4">
        <p className="mb-4 px-3 font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          Entretiens
        </p>
        <nav className="flex flex-col gap-1">
          {INTERVIEWS_TABS.map(function (tab) {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={function () {
                  onTabChange(tab.id);
                }}
                className={
                  "group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 " +
                  (isActive
                    ? "bg-white shadow-sm"
                    : "text-text-secondary hover:bg-white/50")
                }
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-primary"></span>
                )}
                <div
                  className={
                    "flex h-9 w-9 items-center justify-center rounded-lg transition-colors " +
                    (isActive
                      ? "bg-primary-light text-primary"
                      : "bg-bg-soft text-text-muted group-hover:text-text-primary")
                  }
                >
                  <span className="material-symbols-outlined text-xl">
                    {tab.icon}
                  </span>
                </div>
                <div>
                  <p
                    className={
                      "font-body text-sm font-semibold " +
                      (isActive ? "text-text-primary" : "")
                    }
                  >
                    {tab.label}
                  </p>
                  <p
                    className={
                      "font-body text-xs " +
                      (isActive ? "text-primary" : "text-text-muted")
                    }
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
      <div className="min-w-0 flex-1 border-t lg:border-t-0 lg:border-l border-border p-6">{children}</div>
    </div>
  );
}

InterviewsLayout.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
