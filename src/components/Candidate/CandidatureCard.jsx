import React from "react";
import PropTypes from "prop-types";

const ETAPE_LABELS = {
  soumise: { label: "Candidature reçue", color: "bg-gray-100 text-gray-600" },
  preselectionne: {
    label: "En cours d'examen",
    color: "bg-blue-100 text-blue-700",
  },
  entretien_planifie: {
    label: "Entretien prévu",
    color: "bg-amber-50 text-amber-600",
  },
  entretien_passe: {
    label: "Entretien passé",
    color: "bg-purple-100 text-purple-700",
  },
  accepte: { label: "Accepté", color: "bg-emerald-50 text-emerald-600" },
  refuse: { label: "Refusé", color: "bg-red-50 text-red-600" },
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
  // NOTE: Si le backend ne populate pas `offre` dans GET /candidature/mesCandidatures,
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
    <div className="group rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md">
      <div className="flex items-start gap-4">
        {/* Logo entreprise */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary font-display text-sm font-bold text-white shadow-sm">
          {logoLetters}
        </div>

        {/* Infos */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate font-display text-base font-bold text-text-primary group-hover:text-primary transition-colors">
                {poste}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-sm text-text-secondary">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-text-muted">business</span>
                  {entrepriseNom}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-text-muted">location_on</span>
                  {localisation}
                </span>
              </div>
            </div>

            {/* Badge étape */}
            <span
              className={`shrink-0 rounded-full px-3 py-1 font-body text-xs font-semibold ${etapeInfo.color}`}
            >
              {etapeInfo.label}
            </span>
          </div>

          {/* Footer */}
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <div className="flex items-center gap-4 font-body text-xs text-text-muted">
              {dateSoumission && (
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                  Postulé le {dateSoumission}
                </span>
              )}
              {offre?.typeContrat && (
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">work</span>
                  {offre.typeContrat}
                </span>
              )}
            </div>

            {etape === "soumise" && onAnnuler && (
              <button
                onClick={function () {
                  onAnnuler(candidature._id);
                }}
                className="rounded-lg px-3 py-1.5 font-body text-xs font-semibold text-red-500 transition-colors hover:bg-red-50"
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
