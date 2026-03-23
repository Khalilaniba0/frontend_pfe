import React from "react";
import PropTypes from "prop-types";

function getScoreColor(score) {
  if (score >= 90) return "from-emerald-400 to-emerald-500";
  if (score >= 75) return "from-primary to-secondary";
  if (score >= 60) return "from-amber-400 to-orange-400";
  return "from-red-400 to-red-500";
}

function getScoreLabel(score) {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Bon";
  if (score >= 60) return "Moyen";
  return "Faible";
}

export default function MatchScoreBar({ score }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 max-w-[80px] flex-1 overflow-hidden rounded-full bg-bg-soft">
        <div
          className={
            "h-full rounded-full bg-gradient-to-r transition-all duration-500 " +
            getScoreColor(score)
          }
          style={{ width: score + "%" }}
        ></div>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-sm font-bold tabular-nums text-text-primary">
          {score}
        </span>
        <span className="font-body text-[10px] text-text-muted">
          {getScoreLabel(score)}
        </span>
      </div>
    </div>
  );
}

MatchScoreBar.propTypes = {
  score: PropTypes.number.isRequired,
};
