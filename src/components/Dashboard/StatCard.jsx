import React from "react";
import PropTypes from "prop-types";

export default function StatCard({
  statTitle,
  statValue,
  statSubtext,
  statTrend,
  iconClass,
  iconBgColor,
  iconTextColor,
}) {
  return (
    <div className="bg-white rounded-xl border border-border p-5 flex items-start justify-between">
      <div>
        <p className="font-body text-sm text-text-secondary mb-1">{statTitle}</p>
        <p className="font-display text-3xl font-bold text-text-primary">{statValue}</p>
        {statTrend ? (
          <p className="font-body text-xs text-emerald-500 mt-1 flex items-center" style={{ gap: "4px" }}>
            <i className="fas fa-arrow-up text-emerald-500" style={{ fontSize: "9px" }}></i>
            {statTrend}
          </p>
        ) : (
          <p className="font-body text-xs text-text-secondary mt-1">{statSubtext}</p>
        )}
      </div>
      <div
        className={"w-10 h-10 rounded-xl flex items-center justify-center " + iconBgColor + " " + iconTextColor}
      >
        <i className={iconClass + " text-sm"}></i>
      </div>
    </div>
  );
}

StatCard.defaultProps = {
  statTitle: "Statistique",
  statValue: "0",
  statSubtext: "",
  statTrend: "",
  iconClass: "fas fa-users",
  iconBgColor: "bg-indigo-50",
  iconTextColor: "text-indigo-500",
};

StatCard.propTypes = {
  statTitle: PropTypes.string,
  statValue: PropTypes.string,
  statSubtext: PropTypes.string,
  statTrend: PropTypes.string,
  iconClass: PropTypes.string,
  iconBgColor: PropTypes.string,
  iconTextColor: PropTypes.string,
};
