import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import JobRow from "components/Jobs/JobRow";

const JOBS_PER_PAGE = 4;

export default function JobsTable({ jobs, total }) {
  const [page, setPage] = useState(1);
  const safeTotal = Number.isFinite(total) ? total : jobs.length;
  const totalPages = Math.max(1, Math.ceil(safeTotal / JOBS_PER_PAGE));
  const startIndex = (page - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  const visibleJobs = jobs.slice(startIndex, endIndex);
  const displayFrom = safeTotal === 0 ? 0 : startIndex + 1;
  const displayTo = safeTotal === 0 ? 0 : Math.min(page * JOBS_PER_PAGE, safeTotal);

  useEffect(
    function () {
      if (page > totalPages) {
        setPage(totalPages);
      }
    },
    [page, totalPages]
  );

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-border bg-bg-soft/50 px-6 py-4">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-lg font-semibold text-text-primary">
            Postes Ouverts
          </h3>
          <span className="flex h-6 items-center rounded-full bg-primary/10 px-2.5 font-body text-xs font-semibold tabular-nums text-primary">
            {total}
          </span>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors duration-150 hover:bg-white hover:text-text-primary hover:shadow-sm"
          >
            <span className="material-symbols-outlined text-xl">
              filter_list
            </span>
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors duration-150 hover:bg-white hover:text-text-primary hover:shadow-sm"
          >
            <span className="material-symbols-outlined text-xl">sort</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-bg-soft/30">
              <th className="px-6 py-3.5 font-body text-xs font-semibold uppercase tracking-wider text-text-muted">
                Titre du Poste
              </th>
              <th className="px-6 py-3.5 font-body text-xs font-semibold uppercase tracking-wider text-text-muted">
                Localisation
              </th>
              <th className="px-6 py-3.5 font-body text-xs font-semibold uppercase tracking-wider text-text-muted">
                Statut
              </th>
              <th className="px-6 py-3.5 text-center font-body text-xs font-semibold uppercase tracking-wider text-text-muted">
                Candidats
              </th>
              <th className="px-6 py-3.5 font-body text-xs font-semibold uppercase tracking-wider text-text-muted">
                Date création
              </th>
              <th className="px-6 py-3.5 font-body text-xs font-semibold uppercase tracking-wider text-text-muted">
                Date limite
              </th>
              <th className="px-6 py-3.5 text-right font-body text-xs font-semibold uppercase tracking-wider text-text-muted">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {visibleJobs.length > 0 ? (
              visibleJobs.map(function (job, i) {
                return <JobRow key={job?._id || i} {...job} />;
              })
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center">
                  <span className="material-symbols-outlined mb-2 text-4xl text-text-muted">
                    search_off
                  </span>
                  <p className="font-body text-sm text-text-secondary">
                    Aucune offre ne correspond à votre recherche
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
              setPage(function (p) {
                return Math.max(1, p - 1);
              });
            }}
            disabled={page === 1}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-150 hover:bg-white disabled:opacity-30"
          >
            <span className="material-symbols-outlined text-sm">
              chevron_left
            </span>
          </button>

          {Array.from({ length: totalPages }, function (_, i) {
            return i + 1;
          }).map(function (p) {
            return (
              <button
                key={p}
                type="button"
                onClick={function () {
                  setPage(p);
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
              setPage(function (p) {
                return Math.min(totalPages, p + 1);
              });
            }}
            disabled={page >= totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-150 hover:bg-white disabled:opacity-30"
          >
            <span className="material-symbols-outlined text-sm">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

JobsTable.propTypes = {
  jobs: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
};
