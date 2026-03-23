import React from "react";
import PropTypes from "prop-types";

export default function CandidateCard({
  name,
  role,
  priority,
  appliedDate,
  avatar,
}) {
  const priorityConfig = {
    High: { bg: "bg-red-50", text: "text-red-600", label: "Haute" },
    Haute: { bg: "bg-red-50", text: "text-red-600", label: "Haute" },
    "Medium Priority": {
      bg: "bg-amber-50",
      text: "text-amber-600",
      label: "Moyenne",
    },
    "Priorité moyenne": {
      bg: "bg-amber-50",
      text: "text-amber-600",
      label: "Moyenne",
    },
    Low: { bg: "bg-emerald-50", text: "text-emerald-600", label: "Basse" },
  };

  const config = priorityConfig[priority] || priorityConfig["High"];

  const initials = name
    .split(" ")
    .map(function (n) {
      return n[0];
    })
    .join("")
    .toUpperCase();

  const gradients = [
    "from-pink-400 to-rose-500",
    "from-violet-400 to-purple-500",
    "from-sky-400 to-blue-500",
    "from-emerald-400 to-teal-500",
    "from-amber-400 to-orange-500",
  ];

  const gradientIndex =
    name.split("").reduce(function (acc, char) {
      return acc + char.charCodeAt(0);
    }, 0) % gradients.length;

  return (
    <div className="group cursor-pointer rounded-xl border border-border bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <span
          className={
            "rounded-lg px-2 py-1 font-body text-xs font-semibold " +
            config.bg +
            " " +
            config.text
          }
        >
          {config.label}
        </span>
        <button
          type="button"
          className="flex h-6 w-6 items-center justify-center rounded-lg text-text-muted opacity-0 transition-all duration-150 hover:bg-bg-soft hover:text-text-primary group-hover:opacity-100"
        >
          <i className="fas fa-ellipsis-h text-xs"></i>
        </button>
      </div>

      <div className="mb-3 flex items-center gap-3">
        {avatar ? (
          <img
            alt={name}
            className="h-10 w-10 rounded-xl bg-gray-100 object-cover"
            src={avatar}
          />
        ) : (
          <div
            className={
              "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-body text-xs font-bold text-white shadow-sm " +
              gradients[gradientIndex]
            }
          >
            {initials}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-body text-sm font-semibold text-text-primary">
            {name}
          </p>
          <p className="truncate font-body text-xs text-text-secondary">
            {role}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-2.5">
        <div className="flex items-center gap-1.5 text-text-muted">
          <span className="material-symbols-outlined text-sm">
            calendar_today
          </span>
          <span className="font-body text-xs">{appliedDate}</span>
        </div>
        <div className="flex items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-primary-light hover:text-primary"
            title="Voir le profil"
          >
            <span className="material-symbols-outlined text-base">
              visibility
            </span>
          </button>
          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-secondary-light hover:text-secondary"
            title="Envoyer un email"
          >
            <span className="material-symbols-outlined text-base">mail</span>
          </button>
        </div>
      </div>
    </div>
  );
}

CandidateCard.defaultProps = {
  name: "Candidat",
  role: "Poste",
  priority: "High",
  appliedDate: "N/A",
  avatar: "",
};

CandidateCard.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
  priority: PropTypes.string,
  appliedDate: PropTypes.string,
  avatar: PropTypes.string,
};
