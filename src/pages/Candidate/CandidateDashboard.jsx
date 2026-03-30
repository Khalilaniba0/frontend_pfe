import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Calendar, Search } from "lucide-react";
import { useCandidateAuth } from "context/CandidateAuthContext";
import { getMesCandidatures } from "service/restApiCandidature";
import { getAllOffres } from "service/restApiJobs";
import StatCard from "components/Dashboard/StatCard";

const ETAPE_CONFIG = {
  soumise: { label: "Candidature reçue", cls: "bg-gray-100 text-gray-600" },
  preselectionne: { label: "En cours d'examen", cls: "bg-blue-100 text-blue-700" },
  entretien_planifie: { label: "Entretien prévu", cls: "bg-amber-50 text-amber-600" },
  entretien_passe: { label: "Entretien passé", cls: "bg-purple-100 text-purple-700" },
  accepte: { label: "Accepté", cls: "bg-emerald-50 text-emerald-600" },
  refuse: { label: "Refusé", cls: "bg-red-50 text-red-600" },
};

export default function CandidateDashboard() {
  const { candidat } = useCandidateAuth();
  const navigate = useNavigate();

  const [candidatures, setCandidatures] = useState([]);
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [cRes, oRes] = await Promise.all([
          getMesCandidatures(),
          getAllOffres(),
        ]);
        const cList = Array.isArray(cRes?.data?.data) ? cRes.data.data
          : Array.isArray(cRes?.data) ? cRes.data : [];
        const oList = Array.isArray(oRes?.data?.data) ? oRes.data.data
          : Array.isArray(oRes?.data) ? oRes.data : [];
        setCandidatures(cList);
        setOffres(oList.slice(0, 3));
      } catch {
        // silently handle
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const entretiensPreus = candidatures.filter(
    (c) => c.etape === "entretien_planifie"
  ).length;

  if (loading) {
    return (
      <div className="animate-fade-in p-6 md:p-8 max-w-6xl mx-auto space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64" />
        <div className="h-4 bg-gray-200 rounded w-48" />
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-8 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-xl font-bold tracking-tight text-text-primary md:text-3xl lg:text-4xl">
            Bonjour, {candidat?.nom || "Candidat"} !
          </h1>
          <p className="mt-1 font-body text-sm text-text-secondary">
            Suivez l'état de vos candidatures en un clin d'œil.
          </p>
        </div>
        <p className="font-body text-sm capitalize text-text-muted">
          {formattedDate}
        </p>
      </header>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div onClick={() => navigate("/candidat/mes-candidatures")} className="cursor-pointer">
          <StatCard
            label="Candidatures"
            value={candidatures.length}
            icon="work"
            subLabel="Envoyées au total"
            color="primary"
          />
        </div>
        <div onClick={() => navigate("/candidat/mes-candidatures")} className="cursor-pointer">
          <StatCard
            label="Entretiens"
            value={entretiensPreus}
            icon="event"
            subLabel="Prévus prochainement"
            color="warning"
          />
        </div>
        <div onClick={() => navigate("/candidat/offres")} className="cursor-pointer">
          <StatCard
            label="Offres d'emploi"
            value={offres.length > 0 ? "+" + offres.length : "0"}
            icon="search"
            subLabel="Disponibles"
            color="secondary"
          />
        </div>
      </div>

      {/* Candidatures en cours */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-bold text-text-primary">
            Mes candidatures récentes
          </h2>
          <button
            onClick={() => navigate("/candidat/mes-candidatures")}
            className="font-body text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            Voir tout →
          </button>
        </div>

        {candidatures.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white py-12 text-center">
            <span className="material-symbols-outlined text-4xl text-text-muted mb-3 mx-auto">inbox</span>
            <p className="font-body text-sm text-text-secondary">
              Vous n'avez pas encore postulé à une offre.
            </p>
            <button
              onClick={() => navigate("/candidat/offres")}
              className="mt-4 rounded-xl bg-primary px-5 py-2.5 font-body text-sm font-semibold text-white transition-all hover:bg-primary-dark"
            >
              Parcourir les offres
            </button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border bg-white">
            <div className="divide-y divide-border">
              {candidatures.slice(0, 3).map((c) => {
                const etape = ETAPE_CONFIG[c.etape] || ETAPE_CONFIG.soumise;
                const poste = c.offre?.poste || c.nom || "Poste inconnu";
                const entreprise = c.offre?.entreprise?.nom || "Entreprise confidentielle";
                const date = c.createdAt
                  ? new Date(c.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                  })
                  : "";
                return (
                  <div
                    key={c._id}
                    className="flex items-center justify-between p-5 transition-colors hover:bg-bg-soft"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                        <span className="material-symbols-outlined text-xl">work</span>
                      </div>
                      <div>
                        <p className="font-display font-semibold text-text-primary">
                          {poste}
                        </p>
                        <p className="font-body text-xs text-text-secondary mt-0.5">
                          {[entreprise, date].filter(Boolean).join(" • ")}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`font-body text-xs font-semibold px-3 py-1 rounded-full ${etape.cls}`}
                    >
                      {etape.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Recommandations */}
      {offres.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-bold text-text-primary">
              Offres recommandées
            </h2>
            <button
              onClick={() => navigate("/candidat/offres")}
              className="font-body text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              Plus d'offres →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {offres.map((offre) => (
              <OffreCard
                key={offre._id}
                offre={offre}
                onClick={() => navigate(`/candidat/offres/${offre._id}`)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function OffreCard({ offre, onClick }) {
  const isUrgent =
    offre.dateLimite &&
    new Date(offre.dateLimite) - new Date() < 7 * 86400000;
  return (
    <div
      onClick={onClick}
      className="group flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-border bg-white p-5 transition-all duration-200 hover:border-primary/40 hover:shadow-md"
    >
      <div>
        <div className="flex flex-col mb-3">
          {isUrgent && (
            <span className="self-start font-body text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-600 px-2.5 py-1 rounded-full mb-2">
              URGENT
            </span>
          )}
          <h3 className="font-display text-base font-bold text-text-primary group-hover:text-primary transition-colors">
            {offre.poste || offre.post}
          </h3>
          <p className="font-body text-sm text-text-secondary mt-1 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">business_center</span>
            {offre.entreprise?.nom || "Entreprise confidentielle"}
          </p>
          {(offre.type || offre.modalite) && (
            <div className="mt-3 flex flex-wrap gap-2">
              {offre.type && (
                <span className="rounded-lg bg-bg-soft px-2.5 py-1 font-body text-xs font-medium text-text-secondary">
                  {offre.type}
                </span>
              )}
              {offre.modalite && (
                <span className="rounded-lg bg-bg-page px-2.5 py-1 font-body text-xs font-medium text-text-secondary">
                  {offre.modalite}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
        <p className="font-body text-xs text-text-muted flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">location_on</span>
          {offre.localisation || "Non spécifié"}
        </p>
        <button className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-light text-primary group-hover:bg-primary group-hover:text-white transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
