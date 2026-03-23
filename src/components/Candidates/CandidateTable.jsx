import React, { useState } from "react";
import PropTypes from "prop-types";
import CandidateRow from "components/Candidates/CandidateRow";

const PER_PAGE = 4;

export default function CandidateTable({ candidates, total }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border bg-bg-soft/50">
              {["Candidat", "Poste", "Score", "Statut", "Date", "Actions"].map(
                function (col, i) {
                  return (
                    <th
                      key={col}
                      className={
                        "px-6 py-3.5 font-body text-xs font-semibold uppercase tracking-wider text-text-muted " +
                        (i === 5 ? "text-right" : "")
                      }
                    >
                      {col}
                    </th>
                  );
                }
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {candidates.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <span className="material-symbols-outlined mb-2 text-4xl text-text-muted">
                    person_search
                  </span>
                  <p className="font-body text-sm text-text-secondary">
                    Aucun candidat ne correspond aux filtres sélectionnés
                  </p>
                </td>
              </tr>
            ) : (
              candidates.map(function (c, i) {
                return <CandidateRow key={i} {...c} />;
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-border bg-bg-soft/30 px-6 py-3">
        <p className="font-body text-xs text-text-secondary">
          Affichage de{" "}
          <span className="font-semibold tabular-nums text-text-primary">
            {Math.min(candidates.length, PER_PAGE)}
          </span>{" "}
          sur <span className="font-semibold tabular-nums">{total}</span>{" "}
          candidats
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

          {Array.from({ length: Math.min(totalPages, 5) }, function (_, i) {
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
            disabled={page === totalPages}
            className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-150 hover:bg-white disabled:opacity-30"
          >
            <span className="material-symbols-outlined text-sm">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

CandidateTable.propTypes = {
  candidates: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
};
