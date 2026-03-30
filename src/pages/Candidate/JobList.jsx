import React, { useEffect, useMemo, useState } from "react";
import { Search, MapPin, Filter, Grid, List as ListIcon } from "lucide-react";

import JobCard from "components/Candidate/JobCard.jsx";
import Navbar from "components/layout/Navbar.jsx";
import { getAllOffres } from "service/restApiJobs.js";

const QUICK_FILTERS = ["CDI", "CDD", "Télétravail", "Senior (+5 ans)"];

function matchesQuickFilter(offre, filter) {
  const normalizedFilter = filter.toLowerCase();
  const typeContrat = (offre?.typeContrat || "").toLowerCase();
  const localisation = (offre?.localisation || "").toLowerCase();
  const poste = (offre?.poste || "").toLowerCase();
  const experience =
    `${offre?.experience || ""} ${offre?.niveauExperience || ""}`.toLowerCase();

  if (normalizedFilter === "teletravail" || normalizedFilter === "télétravail") {
    return /(teletravail|télétravail|remote|hybrid|hybride)/.test(localisation);
  }

  if (normalizedFilter === "senior (+5 ans)") {
    return /(senior|5|6|7|8|9|10)/.test(experience + poste);
  }

  return typeContrat === normalizedFilter;
}

export default function JobList() {
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
    <div className="min-h-screen bg-bg-page font-body text-slate-900">
      <Navbar />

      <main className="px-4 pb-16 pt-24 md:px-8">
        <section className="mx-auto w-full max-w-6xl">
          <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-primary-light via-bg-page to-sky-50 p-8 shadow-sm md:p-12">
            <div className="pointer-events-none absolute -left-14 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(19,200,236,0.15)_0%,transparent_70%)]" />
            <div className="pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(58,123,213,0.15)_0%,transparent_70%)]" />

            <h1 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 md:text-6xl">
              Trouvez votre prochain défi professionnel.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
              Explorez des opportunités exclusives parmi les meilleures entreprises
              technologiques et créatives.
            </p>

            <form
              className="mt-8 flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm md:flex-row"
              onSubmit={function (event) {
                event.preventDefault();
              }}
            >
              <label className="flex flex-1 items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-500 md:border-r md:border-slate-100">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={function (event) {
                    setSearchTerm(event.target.value);
                  }}
                  placeholder="Poste, mot-clé..."
                  className="w-full border-none p-0 text-sm text-slate-700 placeholder:text-slate-400 focus:ring-0"
                />
              </label>

              <label className="flex flex-1 items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-500">
                <MapPin size={18} className="text-slate-400" />
                <input
                  type="text"
                  value={locationTerm}
                  onChange={function (event) {
                    setLocationTerm(event.target.value);
                  }}
                  placeholder="Ville ou télétravail"
                  className="w-full border-none p-0 text-sm text-slate-700 placeholder:text-slate-400 focus:ring-0"
                />
              </label>

              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-[#00D2FF] to-[#3a7bd5] px-7 py-3 text-sm font-semibold text-white shadow-sm shadow-primary/25 transition-all duration-200 hover:shadow-md hover:brightness-105"
              >
                Rechercher
              </button>
            </form>

            <div className="mt-5 flex flex-wrap gap-2">
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
                        ? "border-primary/40 bg-primary-light text-primary-dark"
                        : "border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:text-primary-dark")
                    }
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section id="offres" className="mx-auto mt-10 w-full max-w-6xl">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900">
                Dernières offres
              </h2>
              <p className="text-sm text-slate-500">
                {loading
                  ? "Chargement des postes..."
                  : `${filteredOffres.length} poste(s) disponible(s) actuellement`}
              </p>
            </div>

            <div className="flex w-full items-center gap-3 md:w-auto">
              <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                <button
                  type="button"
                  onClick={function () {
                    setViewMode("grid");
                  }}
                  className={
                    "rounded-lg p-2 transition-colors " +
                    (viewMode === "grid"
                      ? "bg-primary-light text-primary-dark"
                      : "text-slate-400 hover:bg-slate-50")
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
                    "rounded-lg p-2 transition-colors " +
                    (viewMode === "list"
                      ? "bg-primary-light text-primary-dark"
                      : "text-slate-400 hover:bg-slate-50")
                  }
                >
                  <ListIcon size={18} />
                </button>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
              >
                <Filter size={16} />
                Filtres
              </button>
            </div>
          </div>

          {errorMessage ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}

          {!loading && !errorMessage && filteredOffres.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center shadow-sm">
              <p className="font-medium text-slate-700">
                Aucune offre ne correspond à votre recherche.
              </p>
              <p className="mt-1 text-sm text-slate-500">
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
                      className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-white shadow-sm"
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
      </main>

      <footer id="apropos" className="border-t border-slate-200 bg-bg-soft px-6 py-7 text-center text-xs text-slate-500 md:px-8">
        © {new Date().getFullYear()} Talentia Candidate. Tous droits réservés.
      </footer>
    </div>
  );
}
