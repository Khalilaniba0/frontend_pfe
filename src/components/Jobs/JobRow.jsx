import React from "react";
import PropTypes from "prop-types";
import StatusBadge from "components/Jobs/StatusBadge";

export default function JobRow({ title, department, location, status, candidates, team, date }) {
  return (
    <tr className="group hover:bg-gray-50 transition-colors">
      {/* Titre */}
      <td className="px-8 py-5">
        <div className="flex flex-col">
          <span className="font-body text-sm font-medium text-text-primary">{title}</span>
          <span className="font-body text-xs text-text-secondary mt-0.5">
            {department} • {location}
          </span>
        </div>
      </td>

      {/* Statut */}
      <td className="px-6 py-5">
        <StatusBadge status={status} />
      </td>

      {/* Candidats */}
      <td className="px-6 py-5 text-center">
        {status === "Fermée" ? (
          <span className="font-body text-xs font-semibold text-text-secondary italic">Recruté</span>
        ) : (
          <div className="flex -space-x-2 justify-center">
            {candidates.avatars.map((initials, i) => (
              <div
                key={i}
                className="h-6 w-6 rounded-full ring-2 ring-white bg-indigo-100 flex items-center justify-center font-body text-[10px] font-semibold text-indigo-600"
              >
                {initials}
              </div>
            ))}
            {candidates.extra > 0 && (
              <div className="h-6 w-6 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center font-body text-[10px] font-semibold text-text-secondary">
                +{candidates.extra}
              </div>
            )}
          </div>
        )}
      </td>

      {/* Équipe */}
      <td className="px-6 py-5">
        <span className="font-body text-sm font-medium text-text-primary">{team}</span>
      </td>

      {/* Date */}
      <td className="px-6 py-5">
        <span className="font-body text-xs text-text-secondary">{date}</span>
      </td>

      {/* Actions */}
      <td className="px-8 py-5 text-right">
        <button className="text-text-secondary hover:text-indigo-600 transition-colors p-1 rounded-lg hover:bg-indigo-50">
          <span className="material-symbols-outlined text-xl">more_horiz</span>
        </button>
      </td>
    </tr>
  );
}

JobRow.propTypes = {
  title: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["Ouverte", "En pause", "Fermée"]).isRequired,
  candidates: PropTypes.shape({
    avatars: PropTypes.arrayOf(PropTypes.string),
    extra: PropTypes.number,
  }),
  team: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

JobRow.defaultProps = {
  candidates: { avatars: [], extra: 0 },
};