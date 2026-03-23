import React from "react";
import PropTypes from "prop-types";

function getScoreColor(score) {
  if (score >= 90) return "bg-indigo-600";
  if (score >= 75) return "bg-indigo-400";
  if (score >= 60) return "bg-orange-400";
  return "bg-red-400";
}

export default function MatchScoreBar({ score }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full max-w-[100px] overflow-hidden">
        <div
          className={`h-full ${getScoreColor(score)} rounded-full transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="font-display text-sm font-bold text-text-primary tabular-nums">
        {score}/100
      </span>
    </div>
  );
}

MatchScoreBar.propTypes = {
  score: PropTypes.number.isRequired,
};
