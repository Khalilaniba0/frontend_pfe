import React, { useState } from "react";
import JitsiMeetModal from "components/Interviews/JitsiMeetModal";

const ENTRETIENS_EN_LIGNE = [
  {
    id: 1,
    candidat: "Sarah Dubois",
    poste: "Développeur Full-Stack",
    date: "12 Mars 2026",
    heure: "14:00 - 15:00",
    lien: "https://meet.google.com/abc-defg-hij",
    statut: "À venir",
    recruteur: "Marie Dupont",
  },
  {
    id: 2,
    candidat: "Ahmed Khalil",
    poste: "Designer UX/UI",
    date: "13 Mars 2026",
    heure: "10:30 - 11:30",
    lien: "https://zoom.us/j/123456789",
    statut: "Confirmé",
    recruteur: "Lucas Bernard",
  },
  {
    id: 3,
    candidat: "Julie Martin",
    poste: "Chef de projet",
    date: "13 Mars 2026",
    heure: "15:00 - 16:00",
    lien: "https://teams.microsoft.com/meet/xyz",
    statut: "À venir",
    recruteur: "Marie Dupont",
  },
  {
    id: 4,
    candidat: "Pierre Lefebvre",
    poste: "Développeur Backend",
    date: "14 Mars 2026",
    heure: "09:00 - 10:00",
    lien: "https://meet.google.com/xyz-abcd-efg",
    statut: "En attente",
    recruteur: "Sophie Martin",
  },
];

const STATUT_STYLES = {
  "À venir": "bg-blue-50 text-blue-600 border-blue-200",
  "Confirmé": "bg-green-50 text-success border-green-200",
  "En attente": "bg-amber-50 text-amber-600 border-amber-200",
};

export default function EntretiensEnLigneTab() {
  // État pour gérer l'appel vidéo actif
  const [activeCall, setActiveCall] = useState(null);

  return (
    <div>
      
      

      {/* Liste des entretiens */}
      <div className="space-y-4">
        {ENTRETIENS_EN_LIGNE.map((entretien) => (
          <div
            key={entretien.id}
            className="bg-white border border-border rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-base font-display font-semibold text-text-primary">
                    {entretien.candidat}
                  </h3>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-display font-medium border ${
                      STATUT_STYLES[entretien.statut]
                    }`}
                  >
                    {entretien.statut}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-1">
                  {entretien.poste}
                </p>
                <div className="flex items-center gap-4 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">
                      person
                    </span>
                    {entretien.recruteur}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <span className="material-symbols-outlined text-lg text-primary">
                  calendar_today
                </span>
                <span>{entretien.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <span className="material-symbols-outlined text-lg text-primary">
                  schedule
                </span>
                <span>{entretien.heure}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <div className="flex-1 flex items-center gap-2 bg-bg-soft rounded-lg px-3 py-2">
                <span className="material-symbols-outlined text-lg text-text-muted">
                  link
                </span>
                <span className="text-sm text-text-secondary font-mono truncate">
                  {entretien.lien}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveCall({ lien: entretien.lien, candidat: entretien.candidat })}
                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-display font-medium px-4 py-2 rounded-lg transition-colors text-sm"
              >
                <span className="material-symbols-outlined text-lg">
                  video_call
                </span>
                Rejoindre
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Jitsi Meet pour les appels vidéo */}
      {activeCall && (
        <JitsiMeetModal
          roomUrl={activeCall.lien}
          candidatName={activeCall.candidat}
          onClose={() => setActiveCall(null)}
        />
      )}
    </div>
  );
}
