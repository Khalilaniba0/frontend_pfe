import React, { useState } from "react";

import InterviewsLayout from "components/Interviews/InterviewsLayout";
import InterviewCalendar from "components/Interviews/InterviewCalendar";
import EntretiensEnLigneTab from "components/Interviews/EntretiensEnLigneTab";
import CreateInterviewModal from "components/Interviews/CreateInterviewModal";
import { CALENDAR_EVENTS } from "constants/interviewsData";

function CalendrierTab() {
  return (
    <div className="w-full">
      <InterviewCalendar
        events={CALENDAR_EVENTS}
        currentMonth={8}
        currentYear={2024}
      />
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

  const handleCreateInterview = function (newInterviewData) {
    setLastCreated(newInterviewData.candidat);
    setShowModal(false);
    setShowSuccess(true);
    setTimeout(function () {
      setShowSuccess(false);
    }, 4000);
  };

  return (
    <>
      <div className="animate-fade-in">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-xl font-bold tracking-tight text-text-primary md:text-3xl lg:text-4xl">
              Centre de planification
            </h1>
            <p className="mt-1 font-body text-sm text-text-secondary">
              Gérez et planifiez vos entretiens de recrutement
            </p>
          </div>

          <button
            type="button"
            onClick={function () {
              setShowModal(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-body text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-150 hover:bg-primary-dark hover:shadow-lg"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Programmer un entretien
          </button>
        </header>

        {showSuccess && (
          <div className="mb-5 flex animate-slide-up items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <span className="material-symbols-outlined flex-shrink-0 text-xl text-emerald-600">
              check_circle
            </span>
            <div className="flex-1">
              <p className="font-body text-sm font-semibold text-emerald-800">
                Entretien programmé avec succès
              </p>
              <p className="font-body text-xs text-emerald-700">
                L'entretien avec {lastCreated} a été ajouté au calendrier.
              </p>
            </div>
            <button
              type="button"
              onClick={function () {
                setShowSuccess(false);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-emerald-500 transition-colors hover:bg-emerald-100 hover:text-emerald-700"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        )}

        <InterviewsLayout activeTab={activeTab} onTabChange={setActiveTab}>
          {TABS[activeTab]}
        </InterviewsLayout>
      </div>

      {showModal && (
        <CreateInterviewModal
          onClose={function () {
            setShowModal(false);
          }}
          onSubmit={handleCreateInterview}
        />
      )}
    </>
  );
}
