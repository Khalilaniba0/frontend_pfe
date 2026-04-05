import React from "react";
import PropTypes from "prop-types";
import ModalBackdrop from "components/commun/FondModal";

const ETAPE_LABELS = {
  soumise: "Candidature recue",
  preselectionne: "En cours d'examen",
  entretien_planifie: "Entretien prevu",
  entretien_passe: "Entretien passe",
  accepte: "Accepte",
  refuse: "Refuse",
};

function formatDate(dateStr) {
  if (!dateStr) return "-";

  try {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return "-";
  }
}

export default function CandidatureDetailsModal({ candidature, onClose }) {
  if (!candidature) return null;

  const offre = candidature?.offre || {};
  const poste =
    offre?.poste || offre?.post || offre?.titre || candidature?.nom || "Poste inconnu";
  const entrepriseNom =
    offre?.entreprise?.nom || offre?.nomEntreprise || "Entreprise non precisee";
  const localisation = offre?.localisation || "Non precise";
  const typeContrat = offre?.typeContrat || "-";
  const etape = candidature?.etape || candidature?.status || "soumise";
  const etapeLabel = ETAPE_LABELS[etape] || ETAPE_LABELS.soumise;
  const dateSoumission = formatDate(candidature?.createdAt);
  const lettreMotivation =
    candidature?.lettre_motivation ||
    candidature?.lettreMotivation ||
    "Aucune lettre de motivation fournie.";

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        className="flex max-h-[95vh] w-full animate-scale-in flex-col overflow-y-auto rounded-t-2xl border border-border bg-white shadow-2xl md:max-w-2xl md:rounded-2xl"
        onClick={function (e) {
          e.stopPropagation();
        }}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-light">
              <span className="material-symbols-outlined text-xl text-primary">
                description
              </span>
            </div>
            <div>
              <h2 className="font-display text-base font-semibold text-text-primary">
                Details de la candidature
              </h2>
              <p className="font-body text-xs text-text-muted">
                Consultation en lecture seule
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-bg-soft hover:text-text-primary"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          <div className="rounded-xl border border-border bg-bg-soft px-4 py-3">
            <p className="mb-1 font-body text-xs text-text-muted">Poste</p>
            <p className="font-body text-sm font-semibold text-text-primary">{poste}</p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-bg-soft px-4 py-3">
              <p className="mb-1 font-body text-xs text-text-muted">Entreprise</p>
              <p className="font-body text-sm font-semibold text-text-primary">{entrepriseNom}</p>
            </div>
            <div className="rounded-xl border border-border bg-bg-soft px-4 py-3">
              <p className="mb-1 font-body text-xs text-text-muted">Localisation</p>
              <p className="font-body text-sm font-semibold text-text-primary">{localisation}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-bg-soft px-4 py-3">
              <p className="mb-1 font-body text-xs text-text-muted">Statut</p>
              <p className="font-body text-sm font-semibold text-text-primary">{etapeLabel}</p>
            </div>
            <div className="rounded-xl border border-border bg-bg-soft px-4 py-3">
              <p className="mb-1 font-body text-xs text-text-muted">Date de candidature</p>
              <p className="font-body text-sm font-semibold text-text-primary">{dateSoumission}</p>
            </div>
            <div className="rounded-xl border border-border bg-bg-soft px-4 py-3">
              <p className="mb-1 font-body text-xs text-text-muted">Type de contrat</p>
              <p className="font-body text-sm font-semibold text-text-primary">{typeContrat}</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-bg-soft px-4 py-3">
            <p className="mb-2 font-body text-xs text-text-muted">Lettre de motivation</p>
            <p className="whitespace-pre-wrap font-body text-sm text-text-primary">
              {lettreMotivation}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end border-t border-border bg-bg-soft px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border bg-white px-5 py-2.5 font-body text-sm font-medium text-text-primary transition-colors hover:bg-bg-soft"
          >
            Fermer
          </button>
        </div>
      </div>
    </ModalBackdrop>
  );
}

CandidatureDetailsModal.propTypes = {
  candidature: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

CandidatureDetailsModal.defaultProps = {
  candidature: null,
};
