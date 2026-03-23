import React, { useState } from "react";

const NOTIFICATION_CATEGORIES = [
  {
    title: "Recrutement",
    icon: "work",
    options: [
      {
        id: "newCandidate",
        label: "Nouvelle candidature reçue",
        description: "Recevez une notification à chaque nouvelle candidature",
        defaultChecked: true,
      },
      {
        id: "statusChanged",
        label: "Statut candidat modifié",
        description: "Quand un membre de l'équipe change le statut d'un candidat",
        defaultChecked: true,
      },
    ],
  },
  {
    title: "Entretiens",
    icon: "event",
    options: [
      {
        id: "interviewScheduled",
        label: "Entretien planifié",
        description: "Notification de rappel avant chaque entretien",
        defaultChecked: true,
      },
      {
        id: "interviewReminder",
        label: "Rappel 30 min avant",
        description: "Alerte avant le début d'un entretien",
        defaultChecked: true,
      },
    ],
  },
  {
    title: "Rapports",
    icon: "analytics",
    options: [
      {
        id: "weeklyReport",
        label: "Rapport hebdomadaire",
        description: "Résumé de l'activité de recrutement chaque lundi",
        defaultChecked: true,
      },
      {
        id: "monthlyReport",
        label: "Rapport mensuel",
        description: "Statistiques détaillées en fin de mois",
        defaultChecked: false,
      },
    ],
  },
];

export default function NotificationsTab() {
  const [notifications, setNotifications] = useState(function () {
    const initial = {};
    NOTIFICATION_CATEGORIES.forEach(function (cat) {
      cat.options.forEach(function (opt) {
        initial[opt.id] = opt.defaultChecked;
      });
    });
    return initial;
  });

  const handleToggle = function (id) {
    setNotifications(function (prev) {
      return {
        ...prev,
        [id]: !prev[id],
      };
    });
  };

  return (
    <div>
      <header className="mb-6">
        <h2 className="font-display text-lg font-semibold text-text-primary">
          Notifications
        </h2>
        <p className="mt-1 font-body text-sm text-text-secondary">
          Gérez vos alertes et préférences d'emails.
        </p>
      </header>

      <div className="space-y-6">
        {NOTIFICATION_CATEGORIES.map(function (category) {
          return (
            <div
              key={category.title}
              className="rounded-2xl border border-border bg-white p-6 shadow-sm"
            >
              <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold text-text-primary">
                <span className="material-symbols-outlined text-lg text-primary">
                  {category.icon}
                </span>
                {category.title}
              </h3>

              <div className="space-y-1">
                {category.options.map(function (option, index) {
                  const isEnabled = notifications[option.id];
                  return (
                    <div
                      key={option.id}
                      className={
                        "group flex items-center justify-between rounded-xl p-3 transition-colors duration-150 hover:bg-bg-soft " +
                        (index < category.options.length - 1
                          ? "border-b border-border"
                          : "")
                      }
                    >
                      <div className="min-w-0 flex-1 pr-4">
                        <label
                          htmlFor={option.id}
                          className="block cursor-pointer font-body text-sm font-medium text-text-primary"
                        >
                          {option.label}
                        </label>
                        <p className="mt-0.5 font-body text-xs text-text-muted">
                          {option.description}
                        </p>
                      </div>
                      <button
                        type="button"
                        id={option.id}
                        role="switch"
                        aria-checked={isEnabled}
                        onClick={function () {
                          handleToggle(option.id);
                        }}
                        className={
                          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 " +
                          (isEnabled ? "bg-primary" : "bg-gray-200")
                        }
                      >
                        <span
                          className={
                            "inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 " +
                            (isEnabled ? "translate-x-6" : "translate-x-1")
                          }
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined flex-shrink-0 text-xl text-amber-600">
              info
            </span>
            <div>
              <p className="font-body text-sm font-medium text-amber-800">
                Notifications par email
              </p>
              <p className="mt-0.5 font-body text-xs text-amber-700">
                Les notifications sont envoyées à l'adresse email associée à
                votre compte. Vous pouvez la modifier dans les paramètres de
                sécurité.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
