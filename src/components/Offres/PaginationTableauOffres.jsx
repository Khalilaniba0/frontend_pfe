// Lignes : 74 | Couche : composant | Depend de : react
import React from "react";
import PropTypes from "prop-types";

export default function JobsTablePagination({
  page,
  totalPages,
  displayFrom,
  displayTo,
  safeTotal,
  onPageChange,
}) {
  return (
    <div className="flex items-center justify-between border-t border-border bg-bg-soft/30 px-6 py-3">
      <p className="font-body text-xs text-text-secondary">
        Affichage de{" "}
        <span className="font-semibold tabular-nums text-text-primary">
          {displayFrom}–{displayTo}
        </span>{" "}
        sur <span className="font-semibold tabular-nums">{safeTotal}</span> offres
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={function () {
            onPageChange(Math.max(1, page - 1));
          }}
          disabled={page === 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-150 hover:bg-white disabled:opacity-30"
        >
          <span className="material-symbols-outlined text-sm">chevron_left</span>
        </button>

        {Array.from({ length: totalPages }, function (_, i) {
          return i + 1;
        }).map(function (p) {
          return (
            <button
              key={p}
              type="button"
              onClick={function () {
                onPageChange(p);
              }}
              className={
                "flex h-8 w-8 items-center justify-center rounded-lg font-body text-xs font-semibold tabular-nums transition-all duration-150 " +
                (p === page
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-secondary hover:bg-white")
              }
            >
              {p}
            </button>
          );
        })}

        <button
          type="button"
          onClick={function () {
            onPageChange(Math.min(totalPages, page + 1));
          }}
          disabled={page >= totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-150 hover:bg-white disabled:opacity-30"
        >
          <span className="material-symbols-outlined text-sm">chevron_right</span>
        </button>
      </div>
    </div>
  );
}

JobsTablePagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  displayFrom: PropTypes.number.isRequired,
  displayTo: PropTypes.number.isRequired,
  safeTotal: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
