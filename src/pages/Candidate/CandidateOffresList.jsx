import React, { useEffect, useMemo, useState } from "react";
import { Search, MapPin, Filter, Grid, List as ListIcon } from "lucide-react";

import JobCard from "components/Candidate/JobCard.jsx";
import { getAllOffres } from "service/restApiJobs.js";

const QUICK_FILTERS = ["CDI", "CDD", "Teletravail", "Senior (+5 ans)"];

function matchesQuickFilter(offre, filter) {
  const normalizedFilter = filter.toLowerCase();
  const typeContrat = (offre?.typeContrat || "").toLowerCase();
  const localisation = (offre?.localisation || "").toLowerCase();
  const poste = (offre?.poste || "").toLowerCase();
  const experience =
    `${offre?.experience || ""} ${offre?.niveauExperience || ""}`.toLowerCase();

  if (normalizedFilter === "teletravail") {
    return /(teletravail|remote|hybrid|hybride)/.test(localisation);
  }

  if (normalizedFilter === "senior (+5 ans)") {
    return /(senior|5|6|7|8|9|10)/.test(experience + poste);
  }

  return typeContrat === normalizedFilter;
}

/**
 * Version embarquée de la liste d'offres, sans Navbar ni footer,
 * destinée à être rendue dans le CandidateLayout (sidebar).
 */
export default function CandidateOffresList() {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(function () {
    async function fetchOffres() {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await getAllOffres();
        const payload = response?.data;
        const offersList = Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload?.offres)
          ? payload.offres
          : Array.isArray(payload)
          ? payload
          : [];

        setOffres(offersList);
      } catch (error) {
        setErrorMessage(
          error?.response?.data?.message ||
            "Impossible de charger les offres pour le moment."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchOffres();
  }, []);

  const filteredOffres = useMemo(
    function () {
      return offres.filter(function (offre) {
        const poste = (offre?.poste || "").toLowerCase();
        const entrepriseNom = (offre?.entreprise?.nom || "").toLowerCase();
        const localisation = (offre?.localisation || "").toLowerCase();

        const matchesSearch =
          !searchTerm ||
          poste.includes(searchTerm.toLowerCase()) ||
          entrepriseNom.includes(searchTerm.toLowerCase());

        const matchesLocation =
          !locationTerm || localisation.includes(locationTerm.toLowerCase());

        const matchesFilters = activeFilters.every(function (filter) {
          return matchesQuickFilter(offre, filter);
        });

        return matchesSearch && matchesLocation && matchesFilters;
      });
    },
    [offres, searchTerm, locationTerm, activeFilters]
  );

  function toggleFilter(filterValue) {
    setActiveFilters(function (previousFilters) {
      if (previousFilters.includes(filterValue)) {
        return previousFilters.filter(function (item) {
          return item !== filterValue;
        });
      }
      return [...previousFilters, filterValue];
    });
  }

  return (
    <div className="space-y-8">
      {/* Hero / Search */}
      <section>
        <h1 className="text-2xl font-bold text-gray-900">
          Parcourir les offres
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Explorez des opportunités parmi les meilleures entreprises.
        </p>

        <form
          className="mt-6 flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-2 shadow-sm md:flex-row"
          onSubmit={function (event) {
            event.preventDefault();
          }}
        >
          <label className="flex flex-1 items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-500 md:border-r md:border-gray-100">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={function (event) {
                setSearchTerm(event.target.value);
              }}
              placeholder="Poste, mot-clé..."
              className="w-full border-none p-0 text-sm text-gray-700 placeholder:text-gray-400 focus:ring-0"
            />
          </label>

          <label className="flex flex-1 items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-500">
            <MapPin size={18} className="text-gray-400" />
            <input
              type="text"
              value={locationTerm}
              onChange={function (event) {
                setLocationTerm(event.target.value);
              }}
              placeholder="Ville ou télétravail"
              className="w-full border-none p-0 text-sm text-gray-700 placeholder:text-gray-400 focus:ring-0"
            />
          </label>

          <button
            type="submit"
            className="rounded-lg bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-600"
          >
            Rechercher
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          {QUICK_FILTERS.map(function (filter) {
            const isActive = activeFilters.includes(filter);

            return (
              <button
                key={filter}
                type="button"
                onClick={function () {
                  toggleFilter(filter);
                }}
                className={
                  "rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors " +
                  (isActive
                    ? "border-teal-300 bg-teal-50 text-teal-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-teal-300 hover:text-teal-700")
                }
              >
                {filter}
              </button>
            );
          })}
        </div>
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

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Filter size={16} />
              Filtres
            </button>
          </div>
        </div>

        {errorMessage ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        {!loading && !errorMessage && filteredOffres.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white px-5 py-10 text-center">
            <p className="font-medium text-gray-700">
              Aucune offre ne correspond à votre recherche.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Essayez d'enlever un filtre ou de changer vos mots-clés.
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
                  />
                );
              })}
        </div>
      </section>
    </div>
  );
}
