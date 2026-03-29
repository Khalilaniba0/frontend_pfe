import React, { useState, useEffect, useRef, useCallback } from "react";
import PipelineColumn from "components/Recruitment/PipelineColumn.jsx";
import CandidateModal from "components/Recruitment/CandidateModal.jsx";
import {
  getPipelineCandidatures,
  updateCandidatureEtape,
  getOffresEntreprise,
} from "service/restApiRecruitment";

/* ── mapping étapes backend → colonnes Kanban ──── */

var ETAPE_TO_COLUMN = {
  soumise: "Candidature",
  preselectionne: "Présélection",
  entretien_planifie: "Entretien",
  entretien_passe: "Test technique",
  accepte: "Offre",
  refuse: "Refusé",
};

var COLUMN_TO_ETAPE = {
  Candidature: "soumise",
  "Présélection": "preselectionne",
  Entretien: "entretien_planifie",
  "Test technique": "entretien_passe",
  Offre: "accepte",
};

var COLUMN_DEFS = [
  { title: "Candidature", color: "bg-slate-500" },
  { title: "Présélection", color: "bg-amber-500" },
  { title: "Entretien", color: "bg-primary" },
  { title: "Test technique", color: "bg-indigo-500" },
  { title: "Offre", color: "bg-secondary" },
];

var pipelineOrder = COLUMN_DEFS.map(function (c) {
  return c.title;
});

/* ── map backend candidature → card data ─────── */

function mapCandidateCard(c) {
  return {
    id: c._id,
    name: c.nom || c.candidat?.nom || c.email || "Candidat",
    role: c.offre?.poste || c.poste || "Poste",
    job: c.offre?.poste || c.poste || "Poste",
    priority:
      c.scoreIA >= 70
        ? "Haute"
        : c.scoreIA >= 40
          ? "Priorité moyenne"
          : "Normale",
    appliedDate: c.createdAt
      ? new Date(c.createdAt).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "",
    avatar: "",
    score: c.scoreIA || 0,
    email: c.email || c.candidat?.email || "",
    phone: c.telephone || c.candidat?.telephone || "",
    location: c.offre?.localisation || "",
    salary: "",
    availability: "",
    linkedin: "",
    _etape: c.etape,
    _offreId: c.offre?._id || c.offre || "",
  };
}

export default function Recruitment() {
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(null);
  var [allCandidatures, setAllCandidatures] = useState([]);
  var [jobOpenings, setJobOpenings] = useState(["Tous les postes"]);
  var [selectedJob, setSelectedJob] = useState("Tous les postes");

  var [dragging, setDragging] = useState(null);
  var [modalCandidate, setModalCandidate] = useState(null);
  var [lastMove, setLastMove] = useState(null);
  var [errorToast, setErrorToast] = useState(null);

  var toastTimerRef = useRef(null);
  var errorTimerRef = useRef(null);

  /* ── load data ─────────────────────────────── */

  var loadData = useCallback(async function () {
    setLoading(true);
    setError(null);
    try {
      var [candidatures, offres] = await Promise.all([
        getPipelineCandidatures(),
        getOffresEntreprise(),
      ]);

      setAllCandidatures(candidatures.map(mapCandidateCard));

      var postes = offres
        .map(function (o) {
          return o.poste || o.post || "";
        })
        .filter(function (p) {
          return p.length > 0;
        });
      var uniquePostes = Array.from(new Set(postes));
      setJobOpenings(["Tous les postes"].concat(uniquePostes));
    } catch (err) {
      setError(
        err?.response?.data?.message || "Erreur de chargement du pipeline"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(
    function () {
      loadData();
    },
    [loadData]
  );

  /* ── build pipeline from candidatures ──────── */

  function buildPipeline(candidatures) {
    return COLUMN_DEFS.map(function (col) {
      var etape = COLUMN_TO_ETAPE[col.title];
      var candidates = candidatures.filter(function (c) {
        return c._etape === etape;
      });
      return {
        title: col.title,
        color: col.color,
        candidates: candidates.slice().sort(function (a, b) {
          return b.score - a.score;
        }),
      };
    });
  }

  /* ── filtering ─────────────────────────────── */

  var filteredCandidatures = allCandidatures;
  if (selectedJob !== "Tous les postes") {
    filteredCandidatures = allCandidatures.filter(function (c) {
      return c.job === selectedJob;
    });
  }

  var filteredPipeline = buildPipeline(filteredCandidatures);

  var totalCandidates = filteredPipeline.reduce(function (sum, col) {
    return sum + col.candidates.length;
  }, 0);

  /* ── top candidates per job ────────────────── */

  function getTopCandidateIds() {
    var candidatureColumn = filteredPipeline.find(function (col) {
      return col.title === "Candidature";
    });
    if (!candidatureColumn) return [];

    var jobGroups = {};
    candidatureColumn.candidates.forEach(function (candidate) {
      var job = candidate.job;
      if (!jobGroups[job]) {
        jobGroups[job] = [];
      }
      jobGroups[job].push(candidate);
    });

    var topIds = [];
    Object.keys(jobGroups).forEach(function (job) {
      var candidates = jobGroups[job];
      var sorted = candidates.slice().sort(function (a, b) {
        return b.score - a.score;
      });
      if (sorted.length > 0) {
        topIds.push(sorted[0].id);
      }
    });

    return topIds;
  }

  var topCandidateIds = getTopCandidateIds();

  /* ── drag & drop ───────────────────────────── */

  function handleCandidateDragStart(candidateId, fromColumn, e) {
    setDragging({ candidateId: candidateId, fromColumn: fromColumn });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", candidateId);
  }

  function handleCandidateDragEnd() {
    setDragging(null);
  }

  async function handleDrop(toColumn) {
    if (!dragging) return;
    if (dragging.fromColumn === toColumn) {
      setDragging(null);
      return;
    }

    var fromIndex = pipelineOrder.indexOf(dragging.fromColumn);
    var toIndex = pipelineOrder.indexOf(toColumn);

    if (toIndex < fromIndex) {
      setErrorToast("⚠ Impossible de reculer une étape dans le pipeline");
      if (errorTimerRef.current) {
        clearTimeout(errorTimerRef.current);
      }
      errorTimerRef.current = setTimeout(function () {
        setErrorToast(null);
      }, 3000);
      setDragging(null);
      return;
    }

    var candidateId = dragging.candidateId;
    var newEtape = COLUMN_TO_ETAPE[toColumn];

    if (!newEtape) {
      setDragging(null);
      return;
    }

    // Find the candidate
    var foundCandidate = allCandidatures.find(function (c) {
      return c.id === candidateId;
    });
    if (!foundCandidate) {
      setDragging(null);
      return;
    }

    // Optimistic update
    var previousEtape = foundCandidate._etape;
    setAllCandidatures(function (prev) {
      return prev.map(function (c) {
        if (c.id === candidateId) {
          return { ...c, _etape: newEtape };
        }
        return c;
      });
    });

    setLastMove({
      candidate: foundCandidate,
      fromColumn: dragging.fromColumn,
      toColumn: toColumn,
    });

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(function () {
      setLastMove(null);
    }, 5000);

    setDragging(null);

    // API call
    try {
      await updateCandidatureEtape(candidateId, newEtape);
    } catch (err) {
      // Revert on error
      setAllCandidatures(function (prev) {
        return prev.map(function (c) {
          if (c.id === candidateId) {
            return { ...c, _etape: previousEtape };
          }
          return c;
        });
      });
      setErrorToast(
        err?.response?.data?.message ||
          "Erreur lors du déplacement du candidat"
      );
      if (errorTimerRef.current) {
        clearTimeout(errorTimerRef.current);
      }
      errorTimerRef.current = setTimeout(function () {
        setErrorToast(null);
      }, 3000);
    }
  }

  function cancelLastMove() {
    if (!lastMove) return;

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }

    var move = lastMove;
    var previousEtape = COLUMN_TO_ETAPE[move.fromColumn];

    setAllCandidatures(function (prev) {
      return prev.map(function (c) {
        if (c.id === move.candidate.id) {
          return { ...c, _etape: previousEtape };
        }
        return c;
      });
    });

    // Revert on backend too
    updateCandidatureEtape(move.candidate.id, previousEtape).catch(function (err) {
      console.error("Erreur annulation:", err);
    });

    setLastMove(null);
  }

  /* ── modal ─────────────────────────────────── */

  function handleCandidateClick(candidate) {
    setModalCandidate(candidate);
  }

  function closeModal() {
    setModalCandidate(null);
  }

  function findCandidateColumn(candidateId) {
    var candidate = allCandidatures.find(function (c) {
      return c.id === candidateId;
    });
    if (!candidate) return null;
    return ETAPE_TO_COLUMN[candidate._etape] || null;
  }

  function moveToNextStage() {
    if (!modalCandidate) return;

    var currentColumn = findCandidateColumn(modalCandidate.id);
    if (!currentColumn) return;

    var currentIndex = pipelineOrder.indexOf(currentColumn);
    if (currentIndex === -1 || currentIndex >= pipelineOrder.length - 1) {
      return;
    }

    var nextColumn = pipelineOrder[currentIndex + 1];

    // Simulate drop
    var tempDragging = {
      candidateId: modalCandidate.id,
      fromColumn: currentColumn,
    };
    setDragging(tempDragging);

    // Close modal first, then handle drop
    closeModal();

    var newEtape = COLUMN_TO_ETAPE[nextColumn];
    var previousEtape = COLUMN_TO_ETAPE[currentColumn];

    setAllCandidatures(function (prev) {
      return prev.map(function (c) {
        if (c.id === modalCandidate.id) {
          return { ...c, _etape: newEtape };
        }
        return c;
      });
    });

    setDragging(null);

    updateCandidatureEtape(modalCandidate.id, newEtape).catch(function () {
      setAllCandidatures(function (prev) {
        return prev.map(function (c) {
          if (c.id === modalCandidate.id) {
            return { ...c, _etape: previousEtape };
          }
          return c;
        });
      });
    });
  }

  /* ── render ─────────────────────────────────── */

  if (loading) {
    return (
      <div className="animate-fade-in">
        <header className="mb-6">
          <h1 className="font-display text-xl font-bold tracking-tight text-text-primary md:text-3xl lg:text-4xl">
            Pipeline de recrutement
          </h1>
          <p className="mt-1 font-body text-sm text-text-secondary">
            Chargement...
          </p>
        </header>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1, 2, 3, 4, 5].map(function (i) {
            return (
              <div
                key={i}
                className="w-72 flex-shrink-0 animate-pulse rounded-2xl border border-border bg-white p-4"
              >
                <div className="mb-4 h-4 w-24 rounded bg-gray-200"></div>
                <div className="space-y-3">
                  <div className="h-20 rounded-xl bg-gray-100"></div>
                  <div className="h-20 rounded-xl bg-gray-100"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in">
        <header className="mb-6">
          <h1 className="font-display text-xl font-bold tracking-tight text-text-primary md:text-3xl lg:text-4xl">
            Pipeline de recrutement
          </h1>
        </header>
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <span className="material-symbols-outlined mb-2 text-3xl text-red-400">
            error
          </span>
          <p className="font-body text-sm text-red-600">{error}</p>
          <button
            type="button"
            onClick={loadData}
            className="mt-3 rounded-lg bg-red-100 px-4 py-2 font-body text-sm font-medium text-red-700 transition-colors hover:bg-red-200"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-xl font-bold tracking-tight text-text-primary md:text-3xl lg:text-4xl">
            Pipeline de recrutement
          </h1>
          <p className="mt-1 font-body text-sm text-text-secondary">
            Suivez et gérez la progression des{" "}
            <span className="font-semibold text-primary tabular-nums">
              {totalCandidates}
            </span>{" "}
            candidats actifs
          </p>
        </div>

        <div className="flex w-full items-center gap-3 sm:w-auto">
          <div className="relative">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-text-muted">
              filter_list
            </span>
            <select
              className="min-w-[180px] appearance-none rounded-xl border border-border bg-white py-2.5 pl-10 pr-10 font-body text-sm text-text-primary shadow-sm transition-all duration-150 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={selectedJob}
              onChange={function (e) {
                setSelectedJob(e.target.value);
              }}
            >
              {jobOpenings.map(function (job) {
                return (
                  <option key={job} value={job}>
                    {job}
                  </option>
                );
              })}
            </select>
            <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-text-muted">
              expand_more
            </span>
          </div>
        </div>
      </header>

      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 md:-mx-0 md:px-0">
        {filteredPipeline.map(function (column) {
          var isCandidatureColumn = column.title === "Candidature";
          return (
            <PipelineColumn
              key={column.title}
              title={column.title}
              count={column.candidates.length}
              color={column.color}
              candidates={column.candidates}
              onDrop={handleDrop}
              onCandidateDragStart={handleCandidateDragStart}
              onCandidateDragEnd={handleCandidateDragEnd}
              onCandidateClick={handleCandidateClick}
              topCandidateIds={isCandidatureColumn ? topCandidateIds : []}
              dragging={dragging}
              waitingCount={0}
              totalReceived={
                isCandidatureColumn ? column.candidates.length : 0
              }
            />
          );
        })}
      </div>

      <CandidateModal
        candidate={modalCandidate}
        pipelineOrder={pipelineOrder}
        onClose={closeModal}
        onNextStage={moveToNextStage}
        findCandidateColumn={findCandidateColumn}
      />

      {lastMove && (
        <div className="fixed bottom-4 left-4 right-4 z-50 flex items-center gap-3 rounded-xl bg-text-primary px-4 py-3 text-white shadow-lg animate-fade-in sm:right-auto sm:max-w-md">
          <span className="material-symbols-outlined text-lg text-secondary">
            check_circle
          </span>
          <span className="min-w-0 flex-1 truncate font-body text-sm font-medium">
            {lastMove.candidate.name} → {lastMove.toColumn}
          </span>
          <button
            type="button"
            onClick={cancelLastMove}
            className="ml-2 font-body text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            Annuler
          </button>
        </div>
      )}

      {errorToast && (
        <div className="fixed bottom-4 left-4 right-4 z-50 flex items-center gap-3 rounded-xl bg-red-500 px-4 py-3 text-white shadow-lg animate-fade-in sm:right-auto sm:max-w-md">
          <span className="break-words font-body text-sm font-medium">
            {errorToast}
          </span>
        </div>
      )}
    </div>
  );
}
