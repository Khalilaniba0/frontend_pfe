import React from "react";
import PropTypes from "prop-types";

const STATUS_CONFIG = {
  Entretien: {
    bg: "bg-sky-50",
    text: "text-sky-700",
    dot: "bg-sky-500",
  },
  Présélection: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  "Liste d'attente": {
    bg: "bg-slate-100",
    text: "text-slate-500",
    dot: "bg-slate-400",
  },
  Recruté: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  Rejeté: {
    bg: "bg-red-50",
    text: "text-red-600",
    dot: "bg-red-500",
  },
};

export default function CandidateStatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG["Liste d'attente"];

  return (
    <span
      className={
        "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-body text-xs font-semibold " +
        config.bg +
        " " +
        config.text
      }
    >
      <span
        className={"h-1.5 w-1.5 rounded-full " + config.dot}
        aria-hidden="true"
      ></span>
      {status}
    </span>
  );
}

CandidateStatusBadge.propTypes = {
  status: PropTypes.oneOf([
    "Entretien",
    "Présélection",
    "Liste d'attente",
    "Recruté",
    "Rejeté",
  ]).isRequired,
};
