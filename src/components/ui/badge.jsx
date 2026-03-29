import React from "react";
import PropTypes from "prop-types";

const VARIANT_CLASSES = {
  neutral: "bg-gray-100 text-gray-700",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  danger: "bg-red-100 text-red-700",
  info: "bg-sky-100 text-sky-700",
};

function joinClasses() {
  return Array.from(arguments).filter(Boolean).join(" ");
}

export default function Badge({ children, variant, className }) {
  return (
    <span
      className={joinClasses(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        VARIANT_CLASSES[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["neutral", "success", "warning", "danger", "info"]),
  className: PropTypes.string,
};

Badge.defaultProps = {
  variant: "neutral",
  className: "",
};
