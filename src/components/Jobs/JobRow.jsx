import React from "react";
import PropTypes from "prop-types";
import StatusBadge from "components/Jobs/StatusBadge";

export default function JobRow({
  _id,
  title,
  department,
  location,
  status,
  candidates = { avatars: [], extra: 0 },
  createdDate,
  deadlineDate,
  onToggleStatus,
  onDelete,
}) {
  const gradients = [
    "from-pink-400 to-rose-500",
    "from-violet-400 to-purple-500",
    "from-sky-400 to-blue-500",
    "from-emerald-400 to-teal-500",
    "from-amber-400 to-orange-500",
  ];
  const candidateTotal = Number.isFinite(Number(candidates?.extra))
    ? Number(candidates.extra)
    : 0;

  return (
    <tr className="group border-b border-border/70 bg-white transition-colors hover:bg-surface">
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-body text-sm font-semibold text-text-primary">{title}</span>
          <span className="mt-0.5 flex items-center gap-1.5 font-body text-xs text-text-secondary">
            <span className="material-symbols-outlined text-sm text-text-muted">work</span>
            {department}
          </span>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5 font-body text-xs text-text-secondary">
          <span className="material-symbols-outlined text-sm text-text-muted">location_on</span>
          {location}
        </div>
      </td>

      <td className="px-6 py-4">
        <StatusBadge status={status} />
      </td>

      <td className="px-6 py-4 text-center">
        <div className="flex justify-center">
          <div className="flex -space-x-2">
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
            <div className="flex h-7 min-w-7 items-center justify-center rounded-lg bg-bg-soft px-2 ring-2 ring-white font-body text-[10px] font-semibold text-text-secondary">
              {candidateTotal}
            </div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="font-body text-xs tabular-nums text-text-secondary">{createdDate}</span>
      </td>

      <td className="px-6 py-4">
        <span className="font-body text-xs tabular-nums text-text-secondary">{deadlineDate}</span>
      </td>

      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          <button
            type="button"
            onClick={function () {
              if (onToggleStatus && _id) {
                onToggleStatus(_id);
              }
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-primary-light hover:text-primary"
            title="Changer le statut"
          >
            <span className="material-symbols-outlined text-lg">
              {status === "Ouverte" ? "toggle_on" : "toggle_off"}
            </span>
          </button>
          <button
            type="button"
            onClick={function () {
              if (onDelete && _id) {
                onDelete(_id);
              }
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-bg-soft hover:text-text-primary"
            title="Supprimer"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
}

JobRow.propTypes = {
  _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["Ouverte", "En pause", "Fermée"]).isRequired,
  candidates: PropTypes.shape({
    avatars: PropTypes.arrayOf(PropTypes.string),
    extra: PropTypes.number,
  }),
  createdDate: PropTypes.string.isRequired,
  deadlineDate: PropTypes.string.isRequired,
  onToggleStatus: PropTypes.func,
  onDelete: PropTypes.func,
};
