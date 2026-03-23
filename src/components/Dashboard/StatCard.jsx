import React from "react";
import PropTypes from "prop-types";

export default function StatCard({
  statTitle,
  statValue,
  statSubtext,
  statTrend,
  trendLabel,
  iconClass,
  iconBgColor,
  iconTextColor,
  variant,
}) {
  const isHighlight = variant === "highlight";

  return (
    <div
      className={
        "group relative flex items-start justify-between overflow-hidden rounded-2xl border p-5 transition-all duration-200 " +
        (isHighlight
          ? "border-primary/20 bg-gradient-to-br from-white to-primary-light shadow-md hover:shadow-lg"
          : "border-border bg-white shadow-sm hover:border-primary/30 hover:shadow-md")
      }
    >
      <div className="relative z-10 flex flex-col gap-1">
        <p className="font-body text-sm font-medium text-text-secondary">
          {statTitle}
        </p>
        <p className="font-display text-3xl font-bold tabular-nums tracking-tight text-text-primary">
          {statValue}
        </p>
        {statTrend ? (
          <div className="mt-1 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 font-body text-xs font-semibold text-emerald-600">
              <i className="fas fa-arrow-up text-[10px]"></i>
              {statTrend}
            </span>
            {trendLabel && (
              <span className="font-body text-xs text-text-muted">
                {trendLabel}
              </span>
            )}
          </div>
        ) : statSubtext ? (
          <p className="mt-1 font-body text-xs text-text-secondary">
            {statSubtext}
          </p>
        ) : null}
      </div>
      <div
        className={
          "relative z-10 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 " +
          iconBgColor +
          " " +
          iconTextColor
        }
      >
        <i className={iconClass + " text-base"}></i>
      </div>
      {isHighlight && (
        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5"></div>
      )}
    </div>
  );
}

StatCard.defaultProps = {
  statTitle: "Statistique",
  statValue: "0",
  statSubtext: "",
  statTrend: "",
  trendLabel: "",
  iconClass: "fas fa-users",
  iconBgColor: "bg-indigo-50",
  iconTextColor: "text-indigo-500",
  variant: "default",
};

StatCard.propTypes = {
  statTitle: PropTypes.string,
  statValue: PropTypes.string,
  statSubtext: PropTypes.string,
  statTrend: PropTypes.string,
  trendLabel: PropTypes.string,
  iconClass: PropTypes.string,
  iconBgColor: PropTypes.string,
  iconTextColor: PropTypes.string,
  variant: PropTypes.oneOf(["default", "highlight"]),
};
