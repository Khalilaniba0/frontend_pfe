import React, { useState } from "react";
import PropTypes from "prop-types";
import CandidateRow from "components/Candidates/CandidateRow";

const PER_PAGE = 4;

export default function CandidateTable({ candidates, total }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-border">
              {["Candidat", "Poste", "Score", "Statut", "Date", "Actions"].map(
                (col, i) => (
                  <th
                    key={col}
                    className={`px-6 py-4 font-body text-xs font-semibold uppercase tracking-wider text-text-muted ${
                      i === 5 ? "text-right" : ""
                    }`}
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {candidates.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-text-secondary font-body text-sm">
                  Aucun candidat ne correspond aux filtres sélectionnés.
                </td>
              </tr>
            ) : (
              candidates.map((c, i) => <CandidateRow key={i} {...c} />)
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 bg-gray-50 border-t border-border flex items-center justify-between">
        <p className="font-body text-xs text-text-secondary">
          Affichage de {Math.min(candidates.length, PER_PAGE)} sur {total} candidats
        </p>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg hover:bg-gray-200 text-text-secondary transition-colors disabled:opacity-30"
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg font-body text-xs font-semibold transition-colors ${
                p === page
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-200 text-text-primary"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-lg hover:bg-gray-200 text-text-secondary transition-colors disabled:opacity-30"
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}

CandidateTable.propTypes = {
  candidates: PropTypes.array.isRequired,
  total:      PropTypes.number.isRequired,
};
