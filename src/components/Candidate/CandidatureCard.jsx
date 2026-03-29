import React from "react";
import PropTypes from "prop-types";
import { Calendar, Briefcase, Building2, MapPin, Clock } from "lucide-react";

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

function formatDate(dateStr) {
  if (!dateStr) return "";
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export default function CandidatureCard({ candidature, onAnnuler }) {
  const offre = candidature?.offre || {};
  // NOTE: Si le backend ne populate pas `offre` dans GET /condidature/mesCandidatures,
  // on utilise candidature.nom comme fallback (qui stocke le nom du candidat, pas le poste).
  const poste = offre?.poste || offre?.post || offre?.titre || candidature?.nom || "Poste inconnu";
  const entrepriseNom =
    offre?.entreprise?.nom || offre?.nomEntreprise || "Entreprise";
  const localisation = offre?.localisation || "Non précisé";
  const etape = candidature?.etape || candidature?.status || "soumise";
  const etapeInfo =
    ETAPE_LABELS[etape] || ETAPE_LABELS.soumise;
  const dateSoumission = formatDate(candidature?.createdAt);
  const logoLetters = entrepriseNom.slice(0, 2).toUpperCase();

  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-teal-200 hover:shadow-md">
      <div className="flex items-start gap-4">
        {/* Logo entreprise */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 text-sm font-bold text-white shadow-sm">
          {logoLetters}
        </div>

        {/* Infos */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-base font-bold text-gray-900">
                {poste}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Building2 size={14} className="text-gray-400" />
                  {entrepriseNom}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-gray-400" />
                  {localisation}
                </span>
              </div>
            </div>

            {/* Badge étape */}
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${etapeInfo.color}`}
            >
              {etapeInfo.label}
            </span>
          </div>

          {/* Footer */}
          <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex items-center gap-4 text-xs text-gray-400">
              {dateSoumission && (
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  Postulé le {dateSoumission}
                </span>
              )}
              {offre?.typeContrat && (
                <span className="flex items-center gap-1">
                  <Briefcase size={12} />
                  {offre.typeContrat}
                </span>
              )}
            </div>

            {etape === "soumise" && onAnnuler && (
              <button
                onClick={function () {
                  onAnnuler(candidature._id);
                }}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50"
              >
                Annuler
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

CandidatureCard.propTypes = {
  candidature: PropTypes.object.isRequired,
  onAnnuler: PropTypes.func,
};
