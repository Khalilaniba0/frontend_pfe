import React from "react";
import PropTypes from "prop-types";

const STATUS_FILTERS = ["Tous", "Présélection", "Entretien", "Recruté", "Liste d'attente"];

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
    <div className="bg-gray-50 border border-border p-4 rounded-xl flex flex-wrap items-end gap-4">
      {/* Filtre par poste */}
      <div className="flex flex-col gap-1.5">
        <label className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted px-1">
          Filtrer par poste
        </label>
        <select
          value={position}
          onChange={(e) => onPositionChange(e.target.value)}
          className="bg-white border border-border rounded-lg font-body text-sm font-medium py-2.5 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-300 min-w-[200px] text-text-primary"
        >
          <option value="">Tous les postes</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Senior UX Designer">Senior UX Designer</option>
          <option value="Product Manager">Product Manager</option>
          <option value="HR Specialist">HR Specialist</option>
        </select>
      </div>

      {/* Top Score */}
      <div className="flex flex-col gap-1.5">
        <label className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted px-1">
          Top Score
        </label>
        <select
          value={scoreFilter}
          onChange={(e) => onScoreChange(e.target.value)}
          className="bg-white border border-border rounded-lg font-body text-sm font-medium py-2.5 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-300 min-w-[200px] text-text-primary"
        >
          <option value="">Tous les scores</option>
          <option value="top5">Top 5 Meilleurs Scores</option>
          <option value="80">Score &gt; 80</option>
          <option value="90">Score &gt; 90</option>
        </select>
      </div>

      {/* Status buttons */}
      <div className="flex flex-col gap-1.5">
        <label className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted px-1">
          Status
        </label>
        <div className="flex gap-2 flex-wrap">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => onStatusChange(s)}
              className={`font-body text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors ${
                activeStatus === s
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-border text-text-primary hover:bg-gray-100"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Clear */}
      <div className="ml-auto">
        <button
          onClick={onClearAll}
          className="text-indigo-600 font-body text-sm font-medium flex items-center gap-1 hover:underline underline-offset-4"
        >
          Effacer les filtres
        </button>
      </div>
    </div>
  );
}

CandidateFilters.propTypes = {
  position:       PropTypes.string.isRequired,
  onPositionChange: PropTypes.func.isRequired,
  scoreFilter:    PropTypes.string.isRequired,
  onScoreChange:  PropTypes.func.isRequired,
  activeStatus:   PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onClearAll:     PropTypes.func.isRequired,
};
