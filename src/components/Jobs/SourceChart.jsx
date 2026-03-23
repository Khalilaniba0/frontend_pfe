import React from "react";
import PropTypes from "prop-types";

const DEFAULT_SOURCES = [
  { label: "LinkedIn Jobs", percent: 45, color: "bg-primary" },
  { label: "Indeed", percent: 28, color: "bg-secondary" },
  { label: "Site Carrière", percent: 15, color: "bg-primary/40" },
  { label: "Cooptation", percent: 12, color: "bg-secondary/40" },
];

export default function SourceChart({ sources }) {
  const total = sources.reduce(function (sum, s) {
    return sum + s.percent;
  }, 0);

  return (
    <div className="group flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h4 className="font-display text-lg font-semibold text-text-primary">
            Source des Candidatures
          </h4>
          <p className="mt-1 font-body text-xs text-text-muted">
            Répartition par canal d'acquisition
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light transition-transform duration-200 group-hover:scale-105">
          <span className="material-symbols-outlined text-xl text-primary">
            insights
          </span>
        </div>
      </div>

      <div className="mb-6 flex h-3 w-full overflow-hidden rounded-full bg-bg-soft">
        {sources.map(function (source, index) {
          return (
            <div
              key={source.label}
              className={
                "h-full transition-all duration-500 " +
                source.color +
                (index === 0 ? " rounded-l-full" : "") +
                (index === sources.length - 1 ? " rounded-r-full" : "")
              }
              style={{ width: (source.percent / total) * 100 + "%" }}
              title={source.label + ": " + source.percent + "%"}
            ></div>
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        {sources.map(function (source) {
          return (
            <div
              key={source.label}
              className="group/item flex items-center justify-between rounded-lg p-2 transition-colors duration-150 hover:bg-bg-soft"
            >
              <div className="flex items-center gap-3">
                <span
                  className={"h-3 w-3 rounded-sm " + source.color}
                  aria-hidden="true"
                ></span>
                <span className="font-body text-sm text-text-primary">
                  {source.label}
                </span>
              </div>
              <span className="font-body text-sm font-semibold tabular-nums text-text-primary">
                {source.percent}%
              </span>
            </div>
          );
        })}
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
