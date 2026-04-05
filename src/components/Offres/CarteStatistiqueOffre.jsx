import React from "react";
import PropTypes from "prop-types";

export default function JobStatCard({
  icon,
  label,
  value,
  badge = null,
  badgeLabel = "",
  iconBg = "bg-primary-light",
  iconColor = "text-primary",
  trend = "neutral",
}) {
  return (
    <div className="group relative flex h-36 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div
          className={
            "flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 " +
            iconBg
          }
        >
          <span className={"material-symbols-outlined text-xl " + iconColor}>
            {icon}
          </span>
        </div>
        {badge && (
          <div className="flex items-center gap-1.5">
            {trend === "up" && (
              <span className="material-symbols-outlined text-sm text-emerald-500">
                trending_up
              </span>
            )}
            <span
              className={
                "font-body text-xs font-semibold tabular-nums " +
                (trend === "up" ? "text-emerald-600" : "text-text-secondary")
              }
            >
              {badge}
            </span>
            {badgeLabel && (
              <span className="font-body text-xs text-text-muted">
                {badgeLabel}
              </span>
            )}
          </div>
        )}
      </div>
      <div>
        <p className="font-body text-sm text-text-secondary">{label}</p>
        <h3 className="mt-0.5 font-display text-2xl font-bold tabular-nums tracking-tight text-text-primary">
          {value}
        </h3>
      </div>
    </div>
  );
}

JobStatCard.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  badge: PropTypes.string,
  badgeLabel: PropTypes.string,
  iconBg: PropTypes.string,
  iconColor: PropTypes.string,
  trend: PropTypes.oneOf(["up", "down", "neutral"]),
};
