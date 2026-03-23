import React from "react";
import PropTypes from "prop-types";

const DEFAULT_SOURCES = [
  { label: "LinkedIn Jobs", percent: 45, color: "bg-indigo-600" },
  { label: "Indeed", percent: 28, color: "bg-indigo-300" },
  { label: "Site Carrière", percent: 15, color: "bg-indigo-200" },
];

export default function SourceChart({ sources }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
      <div className="flex justify-between items-start mb-6">
        <h4 className="font-display text-lg font-semibold text-text-primary">
          Source des Candidatures
        </h4>
        <span className="material-symbols-outlined text-text-secondary">insights</span>
      </div>

      <div className="space-y-4">
        {sources.map(({ label, percent, color }) => (
          <div key={label}>
            <div className="flex justify-between font-body text-xs font-semibold text-text-secondary mb-2">
              <span>{label}</span>
              <span>{percent}%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${color} rounded-full transition-all duration-500`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

SourceChart.propTypes = {
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      percent: PropTypes.number.isRequired,
      color: PropTypes.string,
    })
  ),
};

SourceChart.defaultProps = {
  sources: DEFAULT_SOURCES,
};