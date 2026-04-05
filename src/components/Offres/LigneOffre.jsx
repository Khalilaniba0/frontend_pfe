import React from "react";
import PropTypes from "prop-types";
import StatusBadge from "components/Offres/BadgeStatut";

export default function JobRow({
  _id,
  title,
  department,
  status,
  createdDate,
  candidaturesCount,
  onToggleStatus,
  onDelete,
}) {
  return (
    <tr className="group block md:table-row border-b border-border/70 bg-white transition-colors hover:bg-surface p-4 md:p-0 relative">
      <td className="block md:table-cell px-0 py-2 md:px-6 md:py-4">
        <div className="flex flex-col">
          <span className="font-body text-sm font-semibold text-text-primary">{title}</span>
          <span className="mt-0.5 flex items-center gap-1.5 font-body text-xs text-text-secondary">
            <span className="material-symbols-outlined text-sm text-text-muted">work</span>
            {department}
          </span>
        </div>
      </td>

      <td className="block md:table-cell px-0 py-2 md:px-6 md:py-4">
        <div className="flex items-center justify-between md:justify-start">
          <span className="font-body text-xs text-text-muted md:hidden">Statut</span>
          <StatusBadge status={status} />
        </div>
      </td>

      <td className="block md:table-cell px-0 py-2 md:px-6 md:py-4">
        <div className="flex items-center justify-between md:justify-start">
          <span className="font-body text-xs text-text-muted md:hidden">Date de création</span>
          <span className="font-body text-xs tabular-nums text-text-secondary">{createdDate}</span>
        </div>
      </td>

      <td className="block md:table-cell px-0 py-2 md:px-6 md:py-4">
        <div className="flex items-center justify-between md:justify-start">
          <span className="font-body text-xs text-text-muted md:hidden">Candidatures</span>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 font-body text-xs font-semibold tabular-nums text-primary">
            {candidaturesCount}
          </span>
        </div>
      </td>

      <td className="block md:table-cell px-0 py-3 md:px-6 md:py-4 text-right">
        <div className="flex items-center md:justify-end gap-1 opacity-100 md:opacity-0 transition-opacity duration-150 group-hover:opacity-100 pt-2 border-t border-border/50 md:border-0 md:pt-0">
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
  status: PropTypes.oneOf(["Ouverte", "En pause", "Fermée"]).isRequired,
  createdDate: PropTypes.string.isRequired,
  candidaturesCount: PropTypes.number,
  onToggleStatus: PropTypes.func,
  onDelete: PropTypes.func,
};
