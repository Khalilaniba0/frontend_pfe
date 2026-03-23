import React, { useState } from "react";

import InterviewsLayout from "components/Interviews/InterviewsLayout";
import InterviewCalendar from "components/Interviews/InterviewCalendar";
import EntretiensEnLigneTab from "components/Interviews/EntretiensEnLigneTab";
import CreateInterviewModal from "components/Interviews/CreateInterviewModal";
import {
  CALENDAR_EVENTS,
} from "constants/interviewsData";

// Composant pour l'onglet Calendrier
function CalendrierTab() {
  return (
    <div className="w-full">
      {/* Calendrier */}
      <div className="col-span-8">
        <InterviewCalendar
          events={CALENDAR_EVENTS}
          currentMonth={8}
          currentYear={2024}
        />
      </div>

      
    </div>
  );
}

const TABS = {
  calendrier: <CalendrierTab />,
  "en-ligne": <EntretiensEnLigneTab />,
};

export default function Interviews() {
  const [activeTab, setActiveTab] = useState("calendrier");
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastCreated, setLastCreated] = useState(null);

  const handleCreateInterview = (newInterviewData) => {
    console.log("Nouvel entretien créé:", newInterviewData);
    setLastCreated(newInterviewData.candidat);
    setShowModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <>
      <div>
        {/* Header de page */}
        <div className="flex justify-between items-end mb-6">
          <div>
            {/* Titre */}
            <h1 className="text-2xl font-display font-semibold text-text-primary">
              Centre de planification
            </h1>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            {/* Bouton Programmer un entretien */}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary font-display font-semibold text-sm text-white hover:bg-primary-dark transition-colors shadow-md"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Programmer un entretien
            </button>
          </div>
        </div>

        {/* Toast succès */}
        {showSuccess && (
          <div className="mb-5 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <span className="material-symbols-outlined text-success text-xl flex-shrink-0">
              check_circle
            </span>
            <div>
              <p className="text-sm font-body font-semibold text-green-800">
                Entretien programmé avec succès
              </p>
              <p className="text-xs text-green-700 font-body">
                L'entretien avec {lastCreated} a été ajouté au calendrier.
              </p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="ml-auto text-green-500 hover:text-green-700 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        )}

        {/* Layout à deux colonnes avec navigation par onglets */}
        <InterviewsLayout activeTab={activeTab} onTabChange={setActiveTab}>
          {TABS[activeTab]}
        </InterviewsLayout>
      </div>

      {/* Modal */}
      {showModal && (
        <CreateInterviewModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateInterview}
        />
      )}
    </>
  );
}

