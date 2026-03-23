import React from "react";
import PropTypes from "prop-types";
import CandidateStatusBadge from "components/Candidates/CandidateStatusBadge";
import MatchScoreBar from "components/Candidates/MatchScoreBar";

export default function CandidateRow({ name, email, avatar, role, score, status, appliedDate }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors cursor-pointer group">
      {/* Candidat */}
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
            {avatar ? (
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 font-body font-semibold text-sm">
                {name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
            )}
          </div>
          <div>
            <p className="font-body text-sm font-medium text-text-primary">{name}</p>
            <p className="font-body text-xs text-text-secondary mt-0.5">{email}</p>
          </div>
        </div>
      </td>

      {/* Poste */}
      <td className="px-6 py-5">
        <span className="font-body text-sm font-medium text-text-primary">{role}</span>
      </td>

      {/* Score */}
      <td className="px-6 py-5">
        <MatchScoreBar score={score} />
      </td>

      {/* Statut */}
      <td className="px-6 py-5">
        <CandidateStatusBadge status={status} />
      </td>

      {/* Date */}
      <td className="px-6 py-5">
        <span className="font-body text-xs text-text-secondary">{appliedDate}</span>
      </td>

      {/* Actions */}
      <td className="px-6 py-5 text-right">
        <button className="text-text-secondary hover:text-indigo-600 transition-colors p-1 rounded-lg hover:bg-indigo-50">
          <span className="material-symbols-outlined text-xl">more_horiz</span>
        </button>
      </td>
    </tr>
  );
}

CandidateRow.propTypes = {
  name:        PropTypes.string.isRequired,
  email:       PropTypes.string.isRequired,
  avatar:      PropTypes.string,
  role:        PropTypes.string.isRequired,
  score:       PropTypes.number.isRequired,
  status:      PropTypes.string.isRequired,
  appliedDate: PropTypes.string.isRequired,
};

CandidateRow.defaultProps = {
  avatar: null,
};
