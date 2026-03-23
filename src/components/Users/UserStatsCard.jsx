import React from "react";
import PropTypes from "prop-types";

export default function UserStatsCard({ icon, label, value, color }) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    success: "bg-[#dcfce7] text-[#16a34a]",
    warning: "bg-amber-100 text-amber-600",
    secondary: "bg-secondary/10 text-secondary",
  };

  return (
    <div className="bg-white rounded-2xl border border-border p-6 flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          colorClasses[color] || colorClasses.primary
        }`}
      >
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>
      <div>
        <p className="text-sm font-body text-text-secondary">{label}</p>
        <p className="text-2xl font-display font-bold text-text-primary">
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
