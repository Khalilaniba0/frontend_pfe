import React from "react";
import PropTypes from "prop-types";

export default function PipelineStatCard({
  title,
  value,
  unit,
  trend,
  trendIcon,
  trendColor,
  iconBg,
}) {
  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-200 hover:border-primary/30 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <h3 className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted">
          {title}
        </h3>
        <div
          className={
            "flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105 " +
            (iconBg || "bg-bg-soft")
          }
        >
          <span
            className={
              "material-symbols-outlined text-lg " +
              (trendColor || "text-text-secondary")
            }
          >
            {trendIcon}
          </span>
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="font-display text-3xl font-bold tabular-nums tracking-tight text-text-primary">
          {value}
        </span>
        {unit && (
          <span className="font-body text-xs text-text-secondary">{unit}</span>
        )}
      </div>

      {trend && (
        <div
          className={
            "mt-3 flex items-center gap-1.5 font-body text-xs font-medium " +
            trendColor
          }
        >
          <span className="material-symbols-outlined text-sm">{trendIcon}</span>
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
}

PipelineStatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string,
  trend: PropTypes.string,
  trendIcon: PropTypes.string,
  trendColor: PropTypes.string,
  iconBg: PropTypes.string,
};

PipelineStatCard.defaultProps = {
  unit: null,
  trend: null,
  trendIcon: "info",
  trendColor: "text-text-secondary",
  iconBg: "bg-bg-soft",
};
