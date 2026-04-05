import React, { useMemo, useState } from "react";
import { Search, Grid, List as ListIcon } from "lucide-react";

import { ROUTES } from "constants/routes";
import JobCard from "components/Candidat/CarteOffre.jsx";
import { useOffres } from "hooks/useOffresPubliques";

/**
 * Version embarquée de la liste d'offres, sans Navbar ni footer,
 * destinée à être rendue dans le CandidateLayout (sidebar).
 */
export default function CandidateOffresList() {
  const { offres, loading, error, refetch } = useOffres();
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");

  function toSearchableSkills(value) {
    if (!value) return "";

    if (Array.isArray(value)) {
      return value
        .map(function (item) {
          if (typeof item === "string") return item;
          return item?.nom || item?.name || item?.texte || item?.text || "";
        })
        .join(" ")
        .toLowerCase();
    }

    return String(value).toLowerCase();
  }

  const filteredOffres = useMemo(
    function () {
      return offres.filter(function (offre) {
        const poste = (offre?.poste || "").toLowerCase();
        const entrepriseNom = (offre?.entreprise?.nom || "").toLowerCase();
        const skillsText = toSearchableSkills(
          offre?.competences || offre?.skills || offre?.technologies || offre?.requirements
        );
        const q = searchTerm.toLowerCase();

        const matchesSearch =
          !searchTerm ||
          poste.includes(q) ||
          entrepriseNom.includes(q) ||
          skillsText.includes(q);

        return matchesSearch;
      });
    },
    [offres, searchTerm]
  );

  return (
    <div className="mx-auto max-w-7xl animate-fade-in space-y-8 p-4 md:p-8">
      <section>
        <h1 className="font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
          Offres
        </h1>
      </section>

      {/* Hero / Search */}
      <section>
        <form
          className="max-w-3xl"
          onSubmit={function (event) {
            event.preventDefault();
          }}
        >
          <div className="relative rounded-xl border border-gray-200 bg-white p-1.5 shadow-sm">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={function (event) {
                setSearchTerm(event.target.value);
              }}
              placeholder="Nom du poste ou compétence (Python, Node.js...)"
              className="w-full rounded-lg border-none py-2.5 pl-10 pr-32 text-sm text-gray-700 placeholder:text-gray-400 focus:ring-0"
            />

            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-600"
            >
              Rechercher
            </button>
          </div>
        </form>

      </section>

      {/* Results */}
      <section>
        <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="text-sm text-gray-500">
            {loading
              ? "Chargement des postes..."
              : `${filteredOffres.length} poste(s) disponible(s)`}
          </p>

          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
              <button
                type="button"
                onClick={function () {
                  setViewMode("grid");
                }}
                className={
                  "rounded-md p-2 transition-colors " +
                  (viewMode === "grid"
                    ? "bg-teal-50 text-teal-600"
                    : "text-gray-400 hover:bg-gray-50")
                }
              >
                <Grid size={18} />
              </button>
              <button
                type="button"
                onClick={function () {
                  setViewMode("list");
                }}
                className={
                  "rounded-md p-2 transition-colors " +
                  (viewMode === "list"
                    ? "bg-teal-50 text-teal-600"
                    : "text-gray-400 hover:bg-gray-50")
                }
              >
                <ListIcon size={18} />
              </button>
            </div>
          </div>
        </div>

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <div className="flex items-center justify-between gap-3">
              <span>{error}</span>
              <button
                type="button"
                onClick={function () {
                  refetch();
                }}
                className="rounded-lg border border-red-300 bg-white px-3 py-1 font-semibold text-red-700 transition-colors hover:bg-red-100"
              >
                Reessayer
              </button>
            </div>
          </div>
        ) : null}

        {!loading && !error && filteredOffres.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white px-5 py-10 text-center">
            <p className="font-medium text-gray-700">
              Aucune offre ne correspond à votre recherche.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Essayez de changer vos mots-clés.
            </p>
          </div>
        ) : null}

        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 gap-4 md:grid-cols-2"
              : "flex flex-col gap-4"
          }
        >
          {loading
            ? Array.from({ length: 4 }).map(function (_, index) {
                return (
                  <div
                    key={`skeleton-${index}`}
                    className="h-44 animate-pulse rounded-xl border border-gray-200 bg-white"
                  />
                );
              })
            : filteredOffres.map(function (offre, index) {
                return (
                  <JobCard
                    key={offre?._id || `${offre?.poste || "offre"}-${index}`}
                    offre={offre}
                    viewMode={viewMode}
                    detailBasePath={ROUTES.CANDIDATE.SPACE_OFFRES}
                  />
                );
              })}
        </div>
      </section>
    </div>
  );
}
