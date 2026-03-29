import React, { useState, useEffect, useCallback } from "react";

import InterviewsLayout from "components/Interviews/InterviewsLayout";
import InterviewCalendar from "components/Interviews/InterviewCalendar";
import EntretiensEnLigneTab from "components/Interviews/EntretiensEnLigneTab";
import CreateInterviewModal from "components/Interviews/CreateInterviewModal";
import { getAllEntretiens, createEntretien } from "service/restApiEntretiens";

export default function Interviews() {
  const [activeTab, setActiveTab] = useState("calendrier");
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastCreated, setLastCreated] = useState(null);

  const [entretiens, setEntretiens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEntretiens = useCallback(async function () {
    setLoading(true);
    setError(null);
    try {
      const items = await getAllEntretiens();
      setEntretiens(items);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Erreur de chargement des entretiens"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(
    function () {
      loadEntretiens();
    },
    [loadEntretiens]
  );

  /* ── Build calendar events from entretiens ─── */

  const now = new Date();

  const calendarEvents = entretiens
    .map(function (e) {
      const d = new Date(e.dateEntretien || e.date_entretien);
      if (isNaN(d.getTime())) return null;

      const candidatName =
        e.candidature?.nom ||
        e.candidature?.candidat?.nom ||
        "Entretien";

      const isToday =
        d.getDate() === now.getDate() &&
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear();

      return {
        day: d.getDate(),
        month: d.getMonth(),
        year: d.getFullYear(),
        title: candidatName,
        time: d.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        color: e.typeEntretien === "visio" ? "primary" : "secondary",
        isToday: isToday,
      };
    })
    .filter(function (e) {
      return e !== null;
    });

  /* ── handle create ─────────────────────────── */

  const handleCreateInterview = async function (payload) {
    try {
      await createEntretien(payload);
      setLastCreated(payload.candidatName || "le candidat");
      setShowModal(false);
      setShowSuccess(true);
      setTimeout(function () {
        setShowSuccess(false);
      }, 4000);
      loadEntretiens();
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          "Erreur lors de la création de l'entretien"
      );
    }
  };

  /* ── tabs (pass data down) ─────────────────── */

  function CalendrierTab() {
    // Filter events for current displayed month
    const eventsForCalendar = calendarEvents.filter(function (e) {
      return e.month === now.getMonth() && e.year === now.getFullYear();
    });

    return (
      <div className="w-full">
        {loading ? (
          <div className="py-12 text-center">
            <p className="font-body text-sm text-text-muted">
              Chargement du calendrier...
            </p>
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <p className="font-body text-sm text-red-500">{error}</p>
          </div>
        ) : (
          <InterviewCalendar
            events={eventsForCalendar}
            currentMonth={now.getMonth()}
            currentYear={now.getFullYear()}
          />
        )}
      </div>
    );
  }

  const TABS = {
    calendrier: <CalendrierTab />,
    "en-ligne": (
      <EntretiensEnLigneTab
        entretiens={entretiens}
        loading={loading}
        error={error}
      />
    ),
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
