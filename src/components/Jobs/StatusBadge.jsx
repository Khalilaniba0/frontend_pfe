import React from "react";
import PropTypes from "prop-types";

const STATUS_STYLES = {
  Ouverte: "bg-indigo-100 text-indigo-700",
  "En pause": "bg-orange-100 text-orange-700",
  Fermée: "bg-gray-200 text-gray-500",
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || "bg-gray-100 text-gray-500";
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full font-body text-xs font-semibold uppercase ${style}`}>
      {status}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.oneOf(["Ouverte", "En pause", "Fermée"]).isRequired,
};