import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Calendar, Search } from "lucide-react";
import { useCandidateAuth } from "context/CandidateAuthContext";
import { getMesCandidatures } from "service/restApiCandidature";
import { getAllOffres } from "service/restApiJobs";

const ETAPE_CONFIG = {
  soumise:            { label: "Candidature reçue",  cls: "bg-gray-100 text-gray-600"    },
  preselectionne:     { label: "En cours d'examen",  cls: "bg-blue-100 text-blue-700"    },
  entretien_planifie: { label: "Entretien prévu",    cls: "bg-teal-100 text-teal-700"    },
  entretien_passe:    { label: "Entretien passé",    cls: "bg-purple-100 text-purple-700" },
  accepte:            { label: "Accepté",            cls: "bg-green-100 text-green-700"  },
  refuse:             { label: "Refusé",             cls: "bg-red-100 text-red-600"      },
};

export default function CandidateDashboard() {
  const { candidat } = useCandidateAuth();
  const navigate = useNavigate();

  const [candidatures, setCandidatures] = useState([]);
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div className="p-8 space-y-4 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64" />
        <div className="h-4 bg-gray-200 rounded w-48" />
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bonjour, {candidat?.nom || "Candidat"} !
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Suivez l'état de vos candidatures en un clin d'œil.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <StatCard
          label="Candidatures envoyées"
          value={candidatures.length}
          icon={<Briefcase className="w-5 h-5 text-teal-500" />}
        />
        <StatCard
          label="Entretiens prévus"
          value={entretiensPreus}
          icon={<Calendar className="w-5 h-5 text-teal-500" />}
        />
        <StatCard
          label="Offres disponibles"
          value={offres.length}
          icon={<Search className="w-5 h-5 text-teal-500" />}
          onClick={() => navigate("/candidat/offres")}
          clickable
        />
      </div>

      {/* Candidatures en cours */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Mes candidatures
          </h2>
          <button
            onClick={() => navigate("/candidat/mes-candidatures")}
            className="text-sm text-teal-600 hover:text-teal-700 font-medium"
          >
            Voir tout →
          </button>
        </div>

        {candidatures.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Briefcase className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">
              Vous n'avez pas encore postulé à une offre.
            </p>
            <button
              onClick={() => navigate("/candidat/offres")}
              className="mt-4 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Parcourir les offres
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            {candidatures.slice(0, 3).map((c) => {
              const etape = ETAPE_CONFIG[c.etape] || ETAPE_CONFIG.soumise;
              const poste =
                c.offre?.poste || c.offre?.post || c.nom || "Poste";
              const entreprise = c.offre?.entreprise?.nom || "";
              const date = c.createdAt
                ? new Date(c.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                  })
                : "";
              return (
                <div
                  key={c._id}
                  className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-4 h-4 text-teal-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {poste}
                      </p>
                      <p className="text-xs text-gray-500">
                        {[entreprise, date].filter(Boolean).join(" · ")}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${etape.cls}`}
                  >
                    {etape.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Recommandations */}
      {offres.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Offres pour vous
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {offres.map((offre) => (
              <OffreCard
                key={offre._id}
                offre={offre}
                onClick={() => navigate(`/offres/${offre._id}`)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, onClick, clickable }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4 ${
        clickable
          ? "cursor-pointer hover:border-teal-300 transition-colors"
          : ""
      }`}
    >
      <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-2xl font-bold text-gray-900 mt-0.5">{value}</p>
      </div>
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
      className="bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:border-teal-300 hover:shadow-sm transition-all"
    >
      {isUrgent && (
        <span className="text-xs font-semibold bg-red-50 text-red-600 px-2 py-0.5 rounded-full mb-2 inline-block">
          URGENT
        </span>
      )}
      <p className="text-sm font-semibold text-gray-900 mt-1">
        {offre.poste || offre.post}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        {offre.entreprise?.nom && <span>{offre.entreprise.nom}</span>}
        {offre.localisation && <span> · {offre.localisation}</span>}
      </p>
      {(offre.salaireMin || offre.salaireMax) && (
        <p className="text-xs text-teal-600 font-medium mt-2">
          {offre.salaireMin && `${offre.salaireMin}k`}
          {offre.salaireMin && offre.salaireMax && " – "}
          {offre.salaireMax && `${offre.salaireMax}k€`}
        </p>
      )}
      <button className="mt-3 text-xs text-teal-600 font-medium hover:text-teal-700">
        Voir l'offre →
      </button>
    </div>
  );
}
