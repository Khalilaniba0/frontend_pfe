import React, { useState } from "react";
import PropTypes from "prop-types";
import JobRow from "components/Jobs/JobRow";

const JOBS_PER_PAGE = 4;

export default function JobsTable({ jobs, total }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(total / JOBS_PER_PAGE);

  return (
    <section className="bg-gray-50 rounded-2xl overflow-hidden border border-border">
      {/* En-tête du tableau */}
      <div className="px-6 py-5 flex justify-between items-center bg-gray-50 border-b border-border">
        <h3 className="font-display text-lg font-semibold text-text-primary">Postes Ouverts</h3>
        <div className="flex space-x-1">
          <button className="text-text-secondary hover:bg-gray-200 p-2 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-xl">filter_list</span>
          </button>
          <button className="text-text-secondary hover:bg-gray-200 p-2 rounded-lg transition-colors">
            <span className="material-symbols-outlined text-xl">sort</span>
          </button>
        </div>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-border">
              <th className="px-8 py-4 font-body text-xs font-semibold uppercase tracking-wider text-text-muted">Titre du Poste</th>
              <th className="px-6 py-4 font-body text-xs font-semibold uppercase tracking-wider text-text-muted">Statut</th>
              <th className="px-6 py-4 text-center font-body text-xs font-semibold uppercase tracking-wider text-text-muted">Candidats</th>
              <th className="px-6 py-4 font-body text-xs font-semibold uppercase tracking-wider text-text-muted">Équipe</th>
              <th className="px-6 py-4 font-body text-xs font-semibold uppercase tracking-wider text-text-muted">Date de Création</th>
              <th className="px-8 py-4 text-right font-body text-xs font-semibold uppercase tracking-wider text-text-muted">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {jobs.map((job, i) => (
              <JobRow key={i} {...job} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 bg-white border-t border-border flex justify-between items-center">
        <p className="text-xs text-text-secondary font-body">
          Affichage de {(page - 1) * JOBS_PER_PAGE + 1}–{Math.min(page * JOBS_PER_PAGE, total)} sur{" "}
          {total} offres d'emploi
        </p>

        <div className="flex space-x-1 items-center">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30"
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg font-body font-semibold text-xs transition-colors ${
                p === page
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-100 text-text-secondary"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-30"
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
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