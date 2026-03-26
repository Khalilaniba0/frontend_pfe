import React, { useState } from "react";
import JitsiMeetModal from "components/Interviews/JitsiMeetModal";

const ENTRETIENS_EN_LIGNE = [
  {
    id: 1,
    candidat: "Nadia Belkacem",
    poste: "Développeur Full-Stack",
    date: "12 Mars 2026",
    heure: "14:00 - 15:00",
    lien: "https://meet.google.com/abc-defg-hij",
    statut: "À venir",
    recruteur: "Marie Dupont",
  },
  {
    id: 2,
    candidat: "Youssef Amrani",
    poste: "Designer UX/UI",
    date: "13 Mars 2026",
    heure: "10:30 - 11:30",
    lien: "https://zoom.us/j/123456789",
    statut: "Confirmé",
    recruteur: "Lucas Bernard",
  },
  {
    id: 3,
    candidat: "Léa Fontaine",
    poste: "Chef de projet",
    date: "13 Mars 2026",
    heure: "15:00 - 16:00",
    lien: "https://teams.microsoft.com/meet/xyz",
    statut: "À venir",
    recruteur: "Marie Dupont",
  },
  {
    id: 4,
    candidat: "Thomas Petit",
    poste: "Développeur Backend",
    date: "14 Mars 2026",
    heure: "09:00 - 10:00",
    lien: "https://meet.google.com/xyz-abcd-efg",
    statut: "En attente",
    recruteur: "Sophie Martin",
  },
];

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

export default function EntretiensEnLigneTab() {
  const [activeCall, setActiveCall] = useState(null);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-text-primary">
            Entretiens vidéo programmés
          </h3>
          <p className="mt-0.5 font-body text-xs text-text-muted">
            {ENTRETIENS_EN_LIGNE.length} sessions à venir
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
          <span className="font-body text-xs text-text-secondary">
            2 confirmés
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {ENTRETIENS_EN_LIGNE.map(function (entretien) {
          const config = STATUT_CONFIG[entretien.statut] || STATUT_CONFIG["À venir"];

          return (
            <div
              key={entretien.id}
              className="group rounded-xl border border-border bg-white p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <h4 className="font-body text-base font-semibold text-text-primary">
                      {entretien.candidat}
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
                      {entretien.statut}
                    </span>
                  </div>
                  <p className="mb-1 font-body text-sm text-text-secondary">
                    {entretien.poste}
                  </p>
                  <div className="flex items-center gap-1.5 font-body text-xs text-text-muted">
                    <span className="material-symbols-outlined text-sm">
                      person
                    </span>
                    {entretien.recruteur}
                  </div>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-2.5 rounded-lg bg-bg-soft px-3 py-2">
                  <span className="material-symbols-outlined text-lg text-primary">
                    calendar_today
                  </span>
                  <span className="font-body text-sm text-text-primary">
                    {entretien.date}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 rounded-lg bg-bg-soft px-3 py-2">
                  <span className="material-symbols-outlined text-lg text-primary">
                    schedule
                  </span>
                  <span className="font-body text-sm tabular-nums text-text-primary">
                    {entretien.heure}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center gap-2 overflow-hidden rounded-lg bg-bg-soft px-3 py-2">
                  <span className="material-symbols-outlined text-lg text-text-muted">
                    link
                  </span>
                  <span className="truncate font-mono text-xs text-text-secondary">
                    {entretien.lien}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={function () {
                    setActiveCall({
                      lien: entretien.lien,
                      candidat: entretien.candidat,
                    });
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-body text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-primary-dark hover:shadow-md sm:w-auto"
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
