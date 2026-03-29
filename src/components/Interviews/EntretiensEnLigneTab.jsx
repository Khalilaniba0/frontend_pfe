import React, { useState } from "react";
import PropTypes from "prop-types";
import JitsiMeetModal from "components/Interviews/JitsiMeetModal";

const STATUT_CONFIG = {
  "À venir": {
    bg: "bg-sky-50",
    text: "text-sky-600",
    border: "border-sky-200",
  },
  Confirmé: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    border: "border-emerald-200",
  },
  "En attente": {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-200",
  },
};

function getStatutLabel(entretien) {
  var d = new Date(entretien.dateEntretien || entretien.date_entretien);
  var now = new Date();
  if (d < now) return "Terminé";
  if (entretien.reponse === "accepte") return "Confirmé";
  if (entretien.reponse === "en_attente") return "En attente";
  return "À venir";
}

function formatDate(dateStr) {
  var d = new Date(dateStr);
  if (isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatHeure(dateStr, duree) {
  var d = new Date(dateStr);
  if (isNaN(d.getTime())) return "-";
  var start = d.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (duree) {
    var end = new Date(d.getTime() + duree * 60000);
    var endStr = end.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return start + " - " + endStr;
  }
  return start;
}

export default function EntretiensEnLigneTab({ entretiens, loading, error }) {
  const [activeCall, setActiveCall] = useState(null);

  // Filter for visio entretiens
  var visioEntretiens = (entretiens || []).filter(function (e) {
    var type = (e.typeEntretien || e.type_entretien || "").toLowerCase();
    return type === "visio";
  });

  var confirmedCount = visioEntretiens.filter(function (e) {
    return e.reponse === "accepte";
  }).length;

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="font-body text-sm text-text-muted">Chargement des entretiens en ligne...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="font-body text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-text-primary">
            Entretiens vidéo programmés
          </h3>
          <p className="mt-0.5 font-body text-xs text-text-muted">
            {visioEntretiens.length} sessions à venir
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
          <span className="font-body text-xs text-text-secondary">
            {confirmedCount} confirmés
          </span>
        </div>
      </div>

      {visioEntretiens.length === 0 ? (
        <div className="rounded-xl border border-border bg-white p-8 text-center">
          <p className="font-body text-sm text-text-muted">
            Aucun entretien vidéo programmé
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {visioEntretiens.map(function (entretien) {
            var statut = getStatutLabel(entretien);
            var config = STATUT_CONFIG[statut] || STATUT_CONFIG["À venir"];
            var candidatName =
              entretien.candidature?.nom ||
              entretien.candidature?.candidat?.nom ||
              entretien.candidature?.email ||
              "Candidat";
            var poste =
              entretien.candidature?.offre?.poste ||
              entretien.candidature?.poste ||
              "Poste non défini";
            var recruteur =
              entretien.responsable?.nom || "Recruteur";
            var dateEntretien = entretien.dateEntretien || entretien.date_entretien;
            var lien = entretien.lienVisio || entretien.lien_visio || "";

            return (
              <div
                key={entretien._id}
                className="group rounded-xl border border-border bg-white p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-md"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h4 className="font-body text-base font-semibold text-text-primary">
                        {candidatName}
                      </h4>
                      <span
                        className={
                          "inline-flex items-center rounded-lg border px-2.5 py-0.5 font-body text-xs font-medium " +
                          config.bg +
                          " " +
                          config.text +
                          " " +
                          config.border
                        }
                      >
                        {statut}
                      </span>
                    </div>
                    <p className="mb-1 font-body text-sm text-text-secondary">
                      {poste}
                    </p>
                    <div className="flex items-center gap-1.5 font-body text-xs text-text-muted">
                      <span className="material-symbols-outlined text-sm">
                        person
                      </span>
                      {recruteur}
                    </div>
                  </div>
                </div>

                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-2.5 rounded-lg bg-bg-soft px-3 py-2">
                    <span className="material-symbols-outlined text-lg text-primary">
                      calendar_today
                    </span>
                    <span className="font-body text-sm text-text-primary">
                      {formatDate(dateEntretien)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-lg bg-bg-soft px-3 py-2">
                    <span className="material-symbols-outlined text-lg text-primary">
                      schedule
                    </span>
                    <span className="font-body text-sm tabular-nums text-text-primary">
                      {formatHeure(dateEntretien, entretien.duree)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center">
                  <div className="flex flex-1 items-center gap-2 overflow-hidden rounded-lg bg-bg-soft px-3 py-2">
                    <span className="material-symbols-outlined text-lg text-text-muted">
                      link
                    </span>
                    <span className="truncate font-mono text-xs text-text-secondary">
                      {lien || "Pas de lien"}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={function () {
                      if (lien) {
                        setActiveCall({
                          lien: lien,
                          candidat: candidatName,
                        });
                      }
                    }}
                    disabled={!lien}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-body text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-primary-dark hover:shadow-md disabled:opacity-50 sm:w-auto"
                  >
                    <span className="material-symbols-outlined text-lg">
                      video_call
                    </span>
                    Rejoindre
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeCall && (
        <JitsiMeetModal
          roomUrl={activeCall.lien}
          candidatName={activeCall.candidat}
          onClose={function () {
            setActiveCall(null);
          }}
        />
      )}
    </div>
  );
}

EntretiensEnLigneTab.propTypes = {
  entretiens: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

EntretiensEnLigneTab.defaultProps = {
  entretiens: [],
  loading: false,
  error: null,
};
