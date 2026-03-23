import React from "react";

export default function RecentActivity() {
  const activities = [
    {
      text: "a demandé un congé (15-18 juin)",
      person: "Léa Martin",
      time: "Il y a 2 min",
      icon: "fas fa-calendar-check",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      text: "Nouvelle offre créée",
      person: "Data Analyst",
      time: "Il y a 1h",
      icon: "fas fa-plus-circle",
      iconBg: "bg-secondary-light",
      iconColor: "text-secondary",
    },
    {
      text: "Évaluation terminée",
      person: "Youssef Benali",
      time: "Il y a 3h",
      icon: "fas fa-check-circle",
      iconBg: "bg-primary-light",
      iconColor: "text-primary",
    },
    {
      text: "Candidature reçue pour",
      person: "UX Designer",
      time: "Il y a 5h",
      icon: "fas fa-user-plus",
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-500",
    },
  ];

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-sm">
      <header className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold tracking-tight text-text-primary">
          Activité récente
        </h3>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 font-body text-xs font-semibold text-primary">
          {activities.length}
        </span>
      </header>

      <div className="relative flex flex-1 flex-col">
        <div className="absolute bottom-4 left-4 top-4 w-px bg-border"></div>

        <ul className="flex flex-col gap-4">
          {activities.map(function (item, index) {
            return (
              <li
                key={index}
                className="group relative flex cursor-default items-start gap-3 rounded-lg p-1 pl-0 transition-colors duration-150 hover:bg-bg-soft"
              >
                <div
                  className={
                    "relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-transform duration-150 group-hover:scale-105 " +
                    item.iconBg +
                    " " +
                    item.iconColor
                  }
                >
                  <i className={item.icon + " text-xs"}></i>
                </div>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="font-body text-sm leading-snug text-text-secondary">
                    <span className="font-semibold text-text-primary">
                      {item.person}
                    </span>{" "}
                    {item.text}
                  </p>
                  <p className="mt-1 font-body text-xs text-text-muted">
                    {item.time}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <footer className="mt-4 border-t border-border pt-4">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg py-2 font-body text-sm font-medium text-primary transition-colors duration-150 hover:bg-primary-light"
        >
          Voir toute l'activité
          <i className="fas fa-arrow-right text-xs"></i>
        </button>
      </footer>
    </div>
  );
}
