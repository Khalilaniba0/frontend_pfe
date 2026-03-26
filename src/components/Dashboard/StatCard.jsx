import React from "react";
import PropTypes from "prop-types";

const COLOR_STYLES = {
  primary: {
    iconBg: "bg-primary-light",
    iconText: "text-primary",
    border: "border-primary/20",
    gradient: "from-white to-primary-light",
  },
  secondary: {
    iconBg: "bg-secondary-light",
    iconText: "text-secondary",
    border: "border-secondary/20",
    gradient: "from-white to-secondary-light",
  },
  warning: {
    iconBg: "bg-amber-50",
    iconText: "text-amber-500",
    border: "border-amber-200",
    gradient: "from-white to-amber-50",
  },
  success: {
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-500",
    border: "border-emerald-200",
    gradient: "from-white to-emerald-50",
  },
};

export default function StatCard({
  icon = "analytics",
  label = "Statistique",
  value = 0,
  subLabel = "",
  color = "primary",
}) {
  const styles = COLOR_STYLES[color] || COLOR_STYLES.primary;

  return (
    <div
      className={
        "group relative flex items-start justify-between overflow-hidden rounded-2xl border p-5 transition-all duration-200 " +
        styles.border +
        " bg-gradient-to-br " +
        styles.gradient +
        " shadow-sm hover:shadow-md"
      }
    >
      <div className="relative z-10 flex flex-col gap-1">
        <p className="font-body text-sm font-medium text-text-secondary">
          {label}
        </p>
        <p className="font-display text-2xl font-bold tabular-nums tracking-tight text-text-primary lg:text-3xl">
          {typeof value === "number" ? value.toLocaleString("fr-FR") : value}
        </p>
        {subLabel && (
          <p className="mt-1 font-body text-xs text-text-secondary">
            {subLabel}
          </p>
        )}
      </div>
      <div
        className={
          "relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 " +
          styles.iconBg +
          " " +
          styles.iconText
        }
      >
        <span className="material-symbols-outlined text-xl">{icon}</span>
      </div>
      <div
        className={
          "pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-30 " +
          styles.iconBg
        }
      ></div>
    </div>
  );
}

StatCard.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  subLabel: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["primary", "secondary", "warning", "success"]),
};
