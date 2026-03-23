import React from "react";
import PropTypes from "prop-types";
import StatusBadge from "components/Jobs/StatusBadge";

export default function JobRow({
  title,
  department,
  location,
  status,
  candidates = { avatars: [], extra: 0 },
  team,
  date,
}) {
  const gradients = [
    "from-pink-400 to-rose-500",
    "from-violet-400 to-purple-500",
    "from-sky-400 to-blue-500",
    "from-emerald-400 to-teal-500",
    "from-amber-400 to-orange-500",
  ];

  return (
    <tr className="group transition-colors duration-150 hover:bg-bg-soft/50">
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-body text-sm font-semibold text-text-primary">
            {title}
          </span>
          <span className="mt-0.5 flex items-center gap-1.5 font-body text-xs text-text-secondary">
            <span className="material-symbols-outlined text-sm text-text-muted">
              business
            </span>
            {department}
            <span className="text-text-muted">•</span>
            <span className="material-symbols-outlined text-sm text-text-muted">
              location_on
            </span>
            {location}
          </span>
        </div>
      </td>

      <td className="px-6 py-4">
        <StatusBadge status={status} />
      </td>

      <td className="px-6 py-4 text-center">
        {status === "Fermée" ? (
          <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1 font-body text-xs font-semibold text-emerald-600">
            <span className="material-symbols-outlined text-sm">
              check_circle
            </span>
            Recruté
          </span>
        ) : (
          <div className="flex -space-x-2 justify-center">
            {candidates.avatars.map(function (initials, i) {
              return (
                <div
                  key={i}
                  className={
                    "flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br ring-2 ring-white font-body text-[10px] font-bold text-white shadow-sm " +
                    gradients[i % gradients.length]
                  }
                >
                  {initials}
                </div>
              );
            })}
            {candidates.extra > 0 && (
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-bg-soft ring-2 ring-white font-body text-[10px] font-semibold text-text-secondary">
                +{candidates.extra}
              </div>
            )}
          </div>
        )}
      </td>

      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-bg-soft px-2.5 py-1 font-body text-xs font-medium text-text-primary">
          <span className="material-symbols-outlined text-sm text-text-muted">
            groups
          </span>
          {team}
        </span>
      </td>

      <td className="px-6 py-4">
        <span className="font-body text-xs tabular-nums text-text-secondary">
          {date}
        </span>
      </td>

      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-primary-light hover:text-primary"
            title="Voir les détails"
          >
            <span className="material-symbols-outlined text-lg">
              visibility
            </span>
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-bg-soft hover:text-text-primary"
            title="Plus d'options"
          >
            <span className="material-symbols-outlined text-lg">
              more_horiz
            </span>
          </button>
        </div>
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
