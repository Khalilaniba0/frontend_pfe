import React from "react";
import PropTypes from "prop-types";
import CandidateCard from "components/Recruitment/CandidateCard.jsx";

export default function PipelineColumn({ title, count, color, candidates }) {
  return (
    <div className="w-64 flex-shrink-0 md:w-auto md:flex-1">
      <div className="mb-3 flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className={"h-2.5 w-2.5 rounded-sm " + color}></span>
          <span className="font-body text-sm font-semibold text-text-primary">
            {title}
          </span>
        </div>
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-bg-soft font-body text-xs font-semibold tabular-nums text-text-secondary">
          {count}
        </span>
      </div>

      <div className="flex max-h-[calc(100vh-320px)] flex-col gap-3 overflow-y-auto rounded-xl bg-bg-soft/50 p-2">
        {candidates.length > 0 ? (
          candidates.map(function (candidate, index) {
            return (
              <CandidateCard
                key={index}
                name={candidate.name}
                role={candidate.role}
                priority={candidate.priority}
                appliedDate={candidate.appliedDate}
                avatar={candidate.avatar}
              />
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <span className="material-symbols-outlined mb-2 text-3xl text-text-muted">
              person_search
            </span>
            <p className="font-body text-sm text-text-muted">
              Aucun candidat
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

PipelineColumn.defaultProps = {
  title: "Colonne",
  count: 0,
  color: "bg-slate-500",
  candidates: [],
};

PipelineColumn.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  color: PropTypes.string,
  candidates: PropTypes.arrayOf(PropTypes.object),
};
