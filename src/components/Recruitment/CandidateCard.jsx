import React from "react";
import PropTypes from "prop-types";

export default function CandidateCard({ name, role, priority, appliedDate, avatar }) {
  var priorityStyles = {
    High: "bg-red-100 text-red-600",
    Haute: "bg-red-100 text-red-600",
    "Medium Priority": "bg-orange-100 text-orange-600",
    "Priorité moyenne": "bg-orange-100 text-orange-600",
    Low: "bg-green-100 text-green-600",
  };

  var badgeClass = priorityStyles[priority] || priorityStyles["High"];

  return (
    <div className="bg-white px-3 py-2.5 rounded-lg border border-border shadow-sm">
      <div className="flex justify-between items-center mb-1.5">
        <span
          className={badgeClass + " font-body text-xs font-semibold uppercase px-2 py-1 rounded-full"}
        >
          {priority}
        </span>
        <button className="text-text-muted">
          <i className="fas fa-ellipsis-h text-xs"></i>
        </button>
      </div>
      <div className="flex items-center mb-1.5 gap-2">
        {avatar ? (
          <img
            alt={name}
            className="w-7 h-7 rounded-full bg-gray-100"
            src={avatar}
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center font-body text-xs font-medium text-indigo-600">
            {name.split(" ").map((n) => n[0]).join("")}
          </div>
        )}
        <div style={{ minWidth: 0 }}>
          <p className="font-body text-sm font-medium text-text-primary truncate">{name}</p>
          <p className="font-body text-xs text-text-secondary truncate">{role}</p>
        </div>
      </div>
      <p className="text-right font-body text-xs text-text-muted">
        Candidature : {appliedDate}
      </p>
    </div>
  );
}

CandidateCard.defaultProps = {
  name: "Candidat",
  role: "Poste",
  priority: "High",
  appliedDate: "N/A",
  avatar: "",
};

CandidateCard.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
  priority: PropTypes.string,
  appliedDate: PropTypes.string,
  avatar: PropTypes.string,
};
