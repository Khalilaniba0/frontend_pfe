import React from "react";
import PropTypes from "prop-types";

export default function UserStatsCard({ icon, label, value, color }) {
  const colorClasses = {
    primary: "bg-primary-light text-primary",
    success: "bg-emerald-50 text-emerald-600",
    warning: "bg-amber-50 text-amber-600",
    secondary: "bg-secondary-light text-secondary",
  };

  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md">
      <div
        className={
          "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 " +
          (colorClasses[color] || colorClasses.primary)
        }
      >
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="font-body text-xs font-medium text-text-muted">{label}</p>
        <p className="font-display text-2xl font-bold tabular-nums tracking-tight text-text-primary">
          {value}
        </p>
      </div>
    </div>
  );
}

UserStatsCard.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.oneOf(["primary", "success", "warning", "secondary"]),
};

UserStatsCard.defaultProps = {
  color: "primary",
};
