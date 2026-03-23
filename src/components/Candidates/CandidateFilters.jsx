import React from "react";
import PropTypes from "prop-types";

const STATUS_FILTERS = [
  "Tous",
  "Présélection",
  "Entretien",
  "Recruté",
  "Liste d'attente",
];

export default function CandidateFilters({
  position,
  onPositionChange,
  scoreFilter,
  onScoreChange,
  activeStatus,
  onStatusChange,
  onClearAll,
}) {
  return (
    <div className="flex flex-wrap items-end gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-1.5">
        <label className="px-1 font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          Filtrer par poste
        </label>
        <div className="relative">
          <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-text-muted">
            work
          </span>
          <select
            value={position}
            onChange={function (e) {
              onPositionChange(e.target.value);
            }}
            className="min-w-[200px] appearance-none rounded-xl border border-border bg-white py-2.5 pl-10 pr-10 font-body text-sm font-medium text-text-primary transition-all duration-150 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Tous les postes</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Senior UX Designer">Senior UX Designer</option>
            <option value="Product Manager">Product Manager</option>
            <option value="HR Specialist">HR Specialist</option>
          </select>
          <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-text-muted">
            expand_more
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="px-1 font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          Top Score
        </label>
        <div className="relative">
          <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-text-muted">
            trending_up
          </span>
          <select
            value={scoreFilter}
            onChange={function (e) {
              onScoreChange(e.target.value);
            }}
            className="min-w-[200px] appearance-none rounded-xl border border-border bg-white py-2.5 pl-10 pr-10 font-body text-sm font-medium text-text-primary transition-all duration-150 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Tous les scores</option>
            <option value="top5">Top 5 Meilleurs</option>
            <option value="80">Score &gt; 80</option>
            <option value="90">Score &gt; 90</option>
          </select>
          <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-text-muted">
            expand_more
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="px-1 font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted">
          Statut
        </label>
        <div className="flex flex-wrap gap-2">
          {STATUS_FILTERS.map(function (s) {
            const isActive = activeStatus === s;
            return (
              <button
                key={s}
                type="button"
                onClick={function () {
                  onStatusChange(s);
                }}
                className={
                  "rounded-lg px-3.5 py-2 font-body text-xs font-semibold transition-all duration-150 " +
                  (isActive
                    ? "bg-primary text-white shadow-sm"
                    : "border border-border bg-white text-text-primary hover:border-primary/30 hover:bg-primary-light")
                }
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      <div className="ml-auto">
        <button
          type="button"
          onClick={onClearAll}
          className="flex items-center gap-1.5 font-body text-sm font-medium text-primary transition-colors hover:text-primary-dark"
        >
          <span className="material-symbols-outlined text-base">
            filter_alt_off
          </span>
          Effacer
        </button>
      </div>
    </div>
  );
}

CandidateFilters.propTypes = {
  position: PropTypes.string.isRequired,
  onPositionChange: PropTypes.func.isRequired,
  scoreFilter: PropTypes.string.isRequired,
  onScoreChange: PropTypes.func.isRequired,
  activeStatus: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onClearAll: PropTypes.func.isRequired,
};
