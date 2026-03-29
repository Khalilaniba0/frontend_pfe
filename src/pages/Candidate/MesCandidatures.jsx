import React, { useEffect, useState } from "react";
import { Briefcase, Filter, Inbox } from "lucide-react";
import CandidatureCard from "components/Candidate/CandidatureCard";
import { getMesCandidatures, annulerCandidature } from "service/restApiCandidature";

const ETAPE_OPTIONS = [
  { value: "", label: "Toutes les étapes" },
  { value: "soumise", label: "Candidature reçue" },
  { value: "preselectionne", label: "En cours d'examen" },
  { value: "entretien_planifie", label: "Entretien prévu" },
  { value: "entretien_passe", label: "Entretien passé" },
  { value: "accepte", label: "Accepté" },
  { value: "refuse", label: "Refusé" },
];

export default function MesCandidatures() {
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterEtape, setFilterEtape] = useState("");

  async function fetchCandidatures() {
    try {
      setLoading(true);
      setError("");
      const res = await getMesCandidatures();
      const list = Array.isArray(res?.data?.data)
        ? res.data.data
        : Array.isArray(res?.data)
        ? res.data
        : [];
      setCandidatures(list);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Impossible de charger vos candidatures."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(function () {
    fetchCandidatures();
  }, []);

  async function handleAnnuler(id) {
    if (!window.confirm("Voulez-vous vraiment annuler cette candidature ?")) {
      return;
    }
    try {
      await annulerCandidature(id);
      setCandidatures(function (prev) {
        return prev.filter(function (c) {
          return c._id !== id;
        });
      });
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Impossible d'annuler cette candidature."
      );
    }
  }

  const filtered = filterEtape
    ? candidatures.filter(function (c) {
        return (c?.etape || c?.status) === filterEtape;
      })
    : candidatures;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Mes Candidatures
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {loading
              ? "Chargement…"
              : `${filtered.length} candidature(s) au total`}
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-400" />
          <select
            value={filterEtape}
            onChange={function (e) {
              setFilterEtape(e.target.value);
            }}
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            {ETAPE_OPTIONS.map(function (opt) {
              return (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map(function (i) {
            return (
              <div
                key={i}
                className="h-24 animate-pulse rounded-2xl border border-gray-100 bg-white"
              />
            );
          })}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
          <Inbox size={40} className="mx-auto mb-3 text-gray-300" />
          <p className="font-medium text-gray-600">
            {filterEtape
              ? "Aucune candidature pour cette étape"
              : "Vous n'avez pas encore postulé"}
          </p>
          <p className="mt-1 text-sm text-gray-400">
            Explorez nos offres et commencez à postuler !
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(function (candidature) {
            return (
              <CandidatureCard
                key={candidature._id}
                candidature={candidature}
                onAnnuler={handleAnnuler}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
