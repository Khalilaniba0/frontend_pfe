import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import CandidatureCard from "components/Candidat/CandidatureCard";
import CandidatureDetailsModal from "components/Candidat/ModalDetailsCandidature";
import { getMesCandidatures, annulerCandidature } from "service/restApiCandidature";
import Toast from "components/commun/NotificationToast";
import { useToast } from "hooks/useNotificationsToast";

const ETAPE_OPTIONS = [
  { value: "", label: "Toutes les étapes" },
  { value: "soumise", label: "Candidature reçue" },
  { value: "preselectionne", label: "En cours d'examen" },
  { value: "entretien_planifie", label: "Entretien prévu" },
  { value: "entretien_passe", label: "Entretien passé" },
  { value: "accepte", label: "Accepté" },
  { value: "refuse", label: "Refusé" },
];

function hasLinkedOffre(candidature) {
  if (!candidature || typeof candidature !== "object") {
    return false;
  }

  if (typeof candidature.offre === "string") {
    return candidature.offre.trim().length > 0;
  }

  if (candidature.offre && typeof candidature.offre === "object") {
    return Boolean(candidature.offre._id || candidature.offre.id);
  }

  if (candidature.offreId) {
    return true;
  }

  return false;
}

export default function MesCandidatures() {
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterEtape, setFilterEtape] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidature, setSelectedCandidature] = useState(null);
  const { toast, showToast, hideToast } = useToast();

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
      setCandidatures(list.filter(hasLinkedOffre));
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
      showToast(
        err?.response?.data?.message ||
          "Impossible d'annuler cette candidature.",
        "error"
      );
    }
  }

  function handleOpenDetails(candidature) {
    setSelectedCandidature(candidature);
  }

  function handleCloseDetails() {
    setSelectedCandidature(null);
  }

  const filtered = candidatures.filter(function (candidature) {
    const matchesEtape =
      !filterEtape || (candidature?.etape || candidature?.status) === filterEtape;

    if (!matchesEtape) {
      return false;
    }

    const q = searchTerm.trim().toLowerCase();
    if (!q) {
      return true;
    }

    const offre = candidature?.offre || {};
    const poste = String(offre?.poste || offre?.post || offre?.titre || "").toLowerCase();
    const entreprise = String(
      offre?.entreprise?.nom || offre?.nomEntreprise || ""
    ).toLowerCase();
    const typeContrat = String(offre?.typeContrat || "").toLowerCase();

    return poste.includes(q) || entreprise.includes(q) || typeContrat.includes(q);
  });

  return (
    <div className="mx-auto max-w-7xl animate-fade-in space-y-6 p-4 md:p-8">
      <section>
        <h1 className="font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
          Mes candidatures
        </h1>
      </section>

      {/* Filter */}
      <div className="mb-2 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <form
          className="w-full max-w-3xl"
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
              placeholder="Nom du poste ou entreprise"
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

        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-text-muted text-lg">filter_list</span>
          <select
            value={filterEtape}
            onChange={function (e) {
              setFilterEtape(e.target.value);
            }}
            className="rounded-xl border border-border bg-white px-3 py-2 font-body text-sm text-text-primary transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
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
                className="h-28 animate-pulse rounded-2xl border border-border bg-white"
              />
            );
          })}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-white px-6 py-16 text-center shadow-sm">
          <span className="material-symbols-outlined mx-auto mb-3 text-4xl text-text-muted">inbox</span>
          <p className="font-display text-lg font-bold text-text-primary">
            {filterEtape
              ? "Aucune candidature pour cette étape"
              : "Vous n'avez pas encore postulé"}
          </p>
          <p className="mt-1 font-body text-sm text-text-secondary">
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
                onOpenDetails={handleOpenDetails}
              />
            );
          })}
        </div>
      )}

      {selectedCandidature && (
        <CandidatureDetailsModal
          candidature={selectedCandidature}
          onClose={handleCloseDetails}
        />
      )}

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}
