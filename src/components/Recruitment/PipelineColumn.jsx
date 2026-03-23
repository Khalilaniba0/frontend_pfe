import React from "react";
import PropTypes from "prop-types";
import CandidateCard from "components/Recruitment/CandidateCard.jsx";

export default function PipelineColumn({ title, count, candidates }) {
  return (
    <div className="flex-shrink-0 flex-1" style={{ minWidth: "200px" }}>
      <div
        className="rounded-lg px-2 py-2 mb-2 flex items-center justify-center bg-gray-100"
      >
        <span className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted">{title}</span>
        <span className="ml-1 font-body text-xs text-text-secondary">
          ({count})
        </span>
      </div>
      <div className="flex flex-col overflow-y-auto max-h-[calc(100vh-280px)]" style={{ gap: "8px" }}>
        {candidates.map(function (candidate, index) {
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
        })}
      </div>
    </div>
  );
}

PipelineColumn.defaultProps = {
  title: "Colonne",
  count: 0,
  candidates: [],
};

PipelineColumn.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  candidates: PropTypes.arrayOf(PropTypes.object),
};
