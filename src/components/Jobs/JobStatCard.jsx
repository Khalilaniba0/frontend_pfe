import React from "react";
import PropTypes from "prop-types";

export default function JobStatCard({ icon, label, value, badge, iconBg, iconColor, badgeColor }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-border flex flex-col justify-between h-40">
      <div className="flex justify-between items-start">
        <div className={`p-2 ${iconBg} rounded-xl`}>
          <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
        </div>
        {badge && (
          <span className={`font-body text-xs font-semibold uppercase px-2.5 py-1 rounded-full ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
      <div>
        <p className="font-body text-sm text-text-secondary">{label}</p>
        <h3 className="font-display text-3xl font-bold text-text-primary mt-1">{value}</h3>
      </div>
    </div>
  );
}

JobStatCard.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  badge: PropTypes.string,
  iconBg: PropTypes.string,
  iconColor: PropTypes.string,
  badgeColor: PropTypes.string,
};

JobStatCard.defaultProps = {
  badge: null,
  iconBg: "bg-indigo-100",
  iconColor: "text-indigo-600",
  badgeColor: "bg-indigo-100 text-indigo-600",
};