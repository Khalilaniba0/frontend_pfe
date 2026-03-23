import React, { useState } from "react";

const NOTIFICATION_OPTIONS = [
  {
    id: "newCandidate",
    label: "Nouvelle candidature reçue",
    defaultChecked: true,
  },
  {
    id: "interviewScheduled",
    label: "Entretien planifié",
    defaultChecked: true,
  },
  {
    id: "statusChanged",
    label: "Statut candidat modifié",
    defaultChecked: true,
  },
  {
    id: "weeklyReport",
    label: "Rapport hebdomadaire",
    defaultChecked: true,
  },
];

export default function NotificationsTab() {
  const [notifications, setNotifications] = useState(
    NOTIFICATION_OPTIONS.reduce((acc, option) => {
      acc[option.id] = option.defaultChecked;
      return acc;
    }, {})
  );

  const handleToggle = (id) => {
    setNotifications((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      {/* Header */}
      <h2 className="text-lg font-display font-semibold text-text-primary mb-1">
        Notifications
      </h2>
      <p className="text-sm text-text-secondary mb-6">
        Gérez vos alertes et préférences d'emails.
      </p>

      {/* Notification toggles */}
      <div className="space-y-4">
        {NOTIFICATION_OPTIONS.map((option) => (
          <div
            key={option.id}
            className="flex items-center justify-between py-3 border-b border-border last:border-b-0"
          >
            <label
              htmlFor={option.id}
              className="text-sm font-display font-medium text-text-primary cursor-pointer"
            >
              {option.label}
            </label>
            <button
              type="button"
              id={option.id}
              role="switch"
              aria-checked={notifications[option.id]}
              onClick={() => handleToggle(option.id)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                notifications[option.id] ? "bg-primary" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications[option.id] ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
