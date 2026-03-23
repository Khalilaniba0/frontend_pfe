import React from "react";
import PropTypes from "prop-types";

const STATUS_STYLES = {
  Entretien:           "bg-blue-100 text-blue-700",
  Présélection:        "bg-orange-100 text-orange-700",
  "Liste d'attente":   "bg-gray-200 text-gray-500",
  Recruté:             "bg-green-100 text-green-700",
  Rejeté:              "bg-red-100 text-red-500",
};

export default function CandidateStatusBadge({ status }) {
  const style = STATUS_STYLES[status] || "bg-gray-100 text-gray-500";
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full font-body text-xs font-semibold uppercase ${style}`}
    >
      {status}
    </span>
  );
}

CandidateStatusBadge.propTypes = {
  status: PropTypes.oneOf(["Entretien", "Présélection", "Liste d'attente", "Recruté", "Rejeté"])
    .isRequired,
};
