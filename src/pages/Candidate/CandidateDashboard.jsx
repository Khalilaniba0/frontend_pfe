import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send,
  CalendarCheck,
  Bookmark,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  MapPin,
  Building2,
  Clock,
  Zap,
  Sparkles,
} from "lucide-react";
import { useCandidateAuth } from "context/CandidateAuthContext";
import { getMesCandidatures } from "service/restApiCandidature";
import { getAllOffres } from "service/restApiJobs";

const ETAPE_LABELS = {
  soumise: { label: "Candidature reçue", color: "bg-gray-100 text-gray-600" },
  preselectionne: {
    label: "En cours d'examen",
    color: "bg-blue-100 text-blue-700",
  },
  entretien_planifie: {
    label: "Entretien prévu",
    color: "bg-teal-100 text-teal-700",
  },
  entretien_passe: {
    label: "Entretien passé",
    color: "bg-purple-100 text-purple-700",
  },
  accepte: { label: "Accepté", color: "bg-green-100 text-green-700" },
  refuse: { label: "Refusé", color: "bg-red-100 text-red-600" },
};

function formatRelativeDate(dateStr) {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Aujourd'hui";
  if (days === 1) return "Hier";
  if (days < 30) return `Il y a ${days}j`;
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" }).format(new Date(dateStr));
}

function isUrgent(offre) {
  if (!offre?.dateLimite) return false;
  const daysLeft = (new Date(offre.dateLimite).getTime() - Date.now()) / 86400000;
  return daysLeft > 0 && daysLeft < 7;
}

function isNew(offre) {
  if (!offre?.createdAt) return false;
  const daysAgo = (Date.now() - new Date(offre.createdAt).getTime()) / 86400000;
  return daysAgo < 7;
}

function getSalaryRange(offre) {
  if (offre?.salaire) return offre.salaire;
  if (offre?.salaireMin && offre?.salaireMax) {
    const min = offre.salaireMin >= 1000 ? `${Math.round(offre.salaireMin / 1000)}k` : offre.salaireMin;
    const max = offre.salaireMax >= 1000 ? `${Math.round(offre.salaireMax / 1000)}k` : offre.salaireMax;
    return `${min} - ${max}€`;
  }
  return null;
}

export default function CandidateDashboard() {
  const { candidat } = useCandidateAuth();
  const navigate = useNavigate();

  const [candidatures, setCandidatures] = useState([]);
  const [offres, setOffres] = useState([]);
  const [loadingCandidatures, setLoadingCandidatures] = useState(true);
  const [loadingOffres, setLoadingOffres] = useState(true);
  const [recoPage, setRecoPage] = useState(0);

  useEffect(function () {
    async function fetchCandidatures() {
      try {
        const res = await getMesCandidatures();
        const list = Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data)
          ? res.data
          : [];
        setCandidatures(list);
      } catch {
        setCandidatures([]);
      } finally {
        setLoadingCandidatures(false);
      }
    }

    async function fetchOffres() {
      try {
        const res = await getAllOffres();
        const list = Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data)
          ? res.data
          : [];
        setOffres(list);
      } catch {
        setOffres([]);
      } finally {
        setLoadingOffres(false);
      }
    }

    fetchCandidatures();
    fetchOffres();
  }, []);

  // Stats
  const candidaturesEnvoyees = candidatures.length;
  const entretiensVus = candidatures.filter(function (c) {
    const e = c?.etape || c?.status;
    return e === "entretien_planifie" || e === "entretien_passe";
  }).length;

  const recentCandidatures = candidatures.slice(0, 3);

  // Recommandations pages of 3
  const RECO_PER_PAGE = 3;
  const recoStart = recoPage * RECO_PER_PAGE;
  const recoSlice = offres.slice(recoStart, recoStart + RECO_PER_PAGE);
  const recoMaxPage = Math.max(0, Math.ceil(offres.length / RECO_PER_PAGE) - 1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Bonjour, {candidat?.nom?.split(" ")[0] || "Candidat"} !
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Suivez l'état de vos candidatures en un clin d'œil.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Candidatures envoyées */}
        <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-teal-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Candidatures envoyées
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {loadingCandidatures ? "–" : candidaturesEnvoyees}
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-500 transition-colors group-hover:bg-teal-100">
              <Send size={20} />
            </div>
          </div>
        </div>

        {/* Entretiens prévus */}
        <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-teal-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Entretiens prévus
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {loadingCandidatures ? "–" : entretiensVus}
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-500 transition-colors group-hover:bg-blue-100">
              <CalendarCheck size={20} />
            </div>
          </div>
        </div>

        {/* Offres enregistrées */}
        <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-teal-200 hover:shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Offres enregistrées
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-500 transition-colors group-hover:bg-amber-100">
              <Bookmark size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Candidatures en cours */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            Candidatures en cours
          </h2>
          {candidatures.length > 3 && (
            <button
              onClick={function () {
                navigate("/candidat/mes-candidatures");
              }}
              className="flex items-center gap-1 text-sm font-semibold text-teal-600 transition-colors hover:text-teal-700"
            >
              Voir tout
              <ArrowRight size={16} />
            </button>
          )}
        </div>

        {loadingCandidatures ? (
          <div className="space-y-3">
            {[1, 2, 3].map(function (i) {
              return (
                <div
                  key={i}
                  className="h-20 animate-pulse rounded-2xl border border-gray-100 bg-white"
                />
              );
            })}
          </div>
        ) : recentCandidatures.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center">
            <Briefcase size={32} className="mx-auto mb-3 text-gray-300" />
            <p className="font-medium text-gray-600">
              Aucune candidature pour le moment
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Explorez nos offres et postulez dès maintenant !
            </p>
            <button
              onClick={function () {
                navigate("/offres");
              }}
              className="mt-4 rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-600"
            >
              Découvrir les offres
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentCandidatures.map(function (c) {
              const offre = c?.offre || {};
              const poste = offre?.poste || offre?.titre || "Poste";
              const entreprise = offre?.entreprise?.nom || "Entreprise";
              const loc = offre?.localisation || "";
              const etape = c?.etape || c?.status || "soumise";
              const info = ETAPE_LABELS[etape] || ETAPE_LABELS.soumise;

              return (
                <div
                  key={c._id}
                  className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm transition-all hover:border-teal-200 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 text-xs font-bold text-white">
                    {(entreprise || "E").slice(0, 2).toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-bold text-gray-900">
                      {poste}
                    </h4>
                    <p className="mt-0.5 truncate text-xs text-gray-500">
                      {entreprise}
                      {loc ? ` · ${loc}` : ""}
                      {c?.createdAt
                        ? ` · ${formatRelativeDate(c.createdAt)}`
                        : ""}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${info.color}`}
                  >
                    {info.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Recommandations */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            Recommandations pour vous
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={function () {
                setRecoPage(function (p) {
                  return Math.max(0, p - 1);
                });
              }}
              disabled={recoPage === 0}
              className="rounded-lg border border-gray-200 p-1.5 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={function () {
                setRecoPage(function (p) {
                  return Math.min(recoMaxPage, p + 1);
                });
              }}
              disabled={recoPage >= recoMaxPage}
              className="rounded-lg border border-gray-200 p-1.5 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {loadingOffres ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[1, 2, 3].map(function (i) {
              return (
                <div
                  key={i}
                  className="h-48 animate-pulse rounded-2xl border border-gray-100 bg-white"
                />
              );
            })}
          </div>
        ) : recoSlice.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-8 text-center">
            <p className="text-sm text-gray-500">
              Aucune recommandation disponible pour le moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {recoSlice.map(function (offre) {
              const offreId = offre?._id || offre?.id;
              const poste = offre?.poste || offre?.titre || "Poste";
              const entreprise =
                offre?.entreprise?.nom || offre?.nomEntreprise || "Entreprise";
              const loc = offre?.localisation || "";
              const salary = getSalaryRange(offre);
              const urgent = isUrgent(offre);
              const nouveau = isNew(offre) && !urgent;
              const logoLetters = entreprise.slice(0, 2).toUpperCase();

              return (
                <div
                  key={offreId}
                  className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-teal-200 hover:shadow-md"
                >
                  {/* Badge */}
                  <div className="mb-3 flex items-center gap-2">
                    {urgent && (
                      <span className="flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-600">
                        <Zap size={10} />
                        Urgent
                      </span>
                    )}
                    {nouveau && (
                      <span className="flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-600">
                        <Sparkles size={10} />
                        Nouveau
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 text-xs font-bold text-white">
                      {logoLetters}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold text-gray-900">
                        {poste}
                      </h3>
                      <p className="mt-0.5 truncate text-xs text-gray-500">
                        {entreprise}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="mt-3 space-y-1.5 text-xs text-gray-400">
                    {loc && (
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {loc}
                      </span>
                    )}
                    {salary && (
                      <span className="flex items-center gap-1">
                        <Briefcase size={12} />
                        {salary}
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={function () {
                      navigate(`/offres/${offreId}`);
                    }}
                    className="mt-auto flex items-center gap-1 pt-4 text-sm font-semibold text-teal-600 transition-colors hover:text-teal-700"
                  >
                    Voir l'offre
                    <ArrowRight size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
