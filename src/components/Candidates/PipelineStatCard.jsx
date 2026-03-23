import React from "react";
import PropTypes from "prop-types";

export default function PipelineStatCard({ title, value, unit, trend, trendIcon, trendColor }) {
  return (
    <div className="bg-gray-50 p-6 rounded-2xl border border-border">
      <h3 className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
        {title}
      </h3>

      <div className="flex items-end gap-2">
        <span className="font-display text-3xl font-bold text-text-primary leading-none">
          {value}
        </span>
        {unit && (
          <span className="font-body text-sm text-text-secondary mb-1">{unit}</span>
        )}
      </div>

      {trend && (
        <div className={`mt-4 flex items-center gap-2 font-body text-xs font-medium ${trendColor}`}>
          <span className="material-symbols-outlined text-sm">{trendIcon}</span>
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
}

PipelineStatCard.propTypes = {
  title:      PropTypes.string.isRequired,
  value:      PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit:       PropTypes.string,
  trend:      PropTypes.string,
  trendIcon:  PropTypes.string,
  trendColor: PropTypes.string,
};

PipelineStatCard.defaultProps = {
  unit:       null,
  trend:      null,
  trendIcon:  "info",
  trendColor: "text-text-secondary",
};
