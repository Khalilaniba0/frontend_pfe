import React from "react";
import PropTypes from "prop-types";

const STATUS_CONFIG = {
  Ouverte: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  "En pause": {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  Fermée: {
    bg: "bg-slate-100",
    text: "text-slate-500",
    dot: "bg-slate-400",
  },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG["Fermée"];

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

StatusBadge.propTypes = {
  status: PropTypes.oneOf(["Ouverte", "En pause", "Fermée"]).isRequired,
};
