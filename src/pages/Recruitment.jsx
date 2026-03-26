import React from "react";
import PipelineColumn from "components/Recruitment/PipelineColumn.jsx";
import CandidateModal from "components/Recruitment/CandidateModal.jsx";

var allCandidatesForCandidature = [
  {
    id: "c1",
    name: "Sophie Martin",
    role: "Ingénieure logiciel",
    job: "Ingénieure logiciel",
    priority: "Haute",
    appliedDate: "26 Oct 2023",
    avatar: "",
    score: 91,
    email: "sophie.martin@email.com",
    phone: "+33 6 34 56 78 90",
    location: "Bordeaux, France",
    salary: "52 000 €/an",
    availability: "Immédiate",
    linkedin: "linkedin.com/in/sophie-martin",
  },
  {
    id: "c2",
    name: "Nadia Belkacem",
    role: "Ingénieure logiciel",
    job: "Ingénieure logiciel",
    priority: "Haute",
    appliedDate: "25 Oct 2023",
    avatar: "",
    score: 87,
    email: "nadia.belkacem@email.com",
    phone: "+33 6 12 34 56 78",
    location: "Paris, France",
    salary: "55 000 €/an",
    availability: "Immédiate",
    linkedin: "linkedin.com/in/nadia-belkacem",
  },
  {
    id: "c3",
    name: "Marcus Johansson",
    role: "Chef de produit",
    job: "Chef de produit",
    priority: "Haute",
    appliedDate: "24 Oct 2023",
    avatar: "",
    score: 85,
    email: "marcus.johansson@email.com",
    phone: "+33 6 78 90 12 34",
    location: "Paris, France",
    salary: "60 000 €/an",
    availability: "Immédiate",
    linkedin: "linkedin.com/in/marcus-johansson",
  },
  {
    id: "c4",
    name: "Priya Sharma",
    role: "Data Scientist",
    job: "Data Scientist",
    priority: "Haute",
    appliedDate: "23 Oct 2023",
    avatar: "",
    score: 78,
    email: "priya.sharma@email.com",
    phone: "+33 6 56 78 90 12",
    location: "Toulouse, France",
    salary: "58 000 €/an",
    availability: "Immédiate",
    linkedin: "linkedin.com/in/priya-sharma",
  },
  {
    id: "c5",
    name: "Thomas Dubois",
    role: "Designer UX",
    job: "Designer UX",
    priority: "Haute",
    appliedDate: "22 Oct 2023",
    avatar: "",
    score: 72,
    email: "thomas.dubois@email.com",
    phone: "+33 6 67 89 01 23",
    location: "Nantes, France",
    salary: "45 000 €/an",
    availability: "3 semaines",
    linkedin: "linkedin.com/in/thomas-dubois",
  },
  {
    id: "c6",
    name: "Lucas Ferreira",
    role: "Chef de produit",
    job: "Chef de produit",
    priority: "Priorité moyenne",
    appliedDate: "21 Oct 2023",
    avatar: "",
    score: 62,
    email: "lucas.ferreira@email.com",
    phone: "+33 6 23 45 67 89",
    location: "Lyon, France",
    salary: "48 000 €/an",
    availability: "1 mois",
    linkedin: "linkedin.com/in/lucas-ferreira",
  },
  {
    id: "c7",
    name: "Ahmed Benali",
    role: "Data Scientist",
    job: "Data Scientist",
    priority: "Priorité moyenne",
    appliedDate: "20 Oct 2023",
    avatar: "",
    score: 59,
    email: "ahmed.benali@email.com",
    phone: "+33 6 45 67 89 01",
    location: "Marseille, France",
    salary: "50 000 €/an",
    availability: "2 mois",
    linkedin: "linkedin.com/in/ahmed-benali",
  },
  {
    id: "c8",
    name: "Yuki Tanaka",
    role: "Designer UX",
    job: "Designer UX",
    priority: "Priorité moyenne",
    appliedDate: "19 Oct 2023",
    avatar: "",
    score: 55,
    email: "yuki.tanaka@email.com",
    phone: "+33 6 11 22 33 44",
    location: "Paris, France",
    salary: "43 000 €/an",
    availability: "1 mois",
    linkedin: "linkedin.com/in/yuki-tanaka",
  },
  {
    id: "c9",
    name: "Carlos Rivera",
    role: "Ingénieure logiciel",
    job: "Ingénieure logiciel",
    priority: "Priorité moyenne",
    appliedDate: "18 Oct 2023",
    avatar: "",
    score: 51,
    email: "carlos.rivera@email.com",
    phone: "+33 6 22 33 44 55",
    location: "Lyon, France",
    salary: "40 000 €/an",
    availability: "2 mois",
    linkedin: "linkedin.com/in/carlos-rivera",
  },
  {
    id: "c10",
    name: "Amina Koné",
    role: "Data Scientist",
    job: "Data Scientist",
    priority: "Priorité moyenne",
    appliedDate: "17 Oct 2023",
    avatar: "",
    score: 47,
    email: "amina.kone@email.com",
    phone: "+33 6 33 44 55 66",
    location: "Marseille, France",
    salary: "46 000 €/an",
    availability: "Immédiate",
    linkedin: "linkedin.com/in/amina-kone",
  },
  {
    id: "c11",
    name: "Pierre Leroy",
    role: "Chef de produit",
    job: "Chef de produit",
    priority: "Priorité moyenne",
    appliedDate: "16 Oct 2023",
    avatar: "",
    score: 38,
    email: "pierre.leroy@email.com",
    phone: "+33 6 44 55 66 77",
    location: "Bordeaux, France",
    salary: "44 000 €/an",
    availability: "3 semaines",
    linkedin: "linkedin.com/in/pierre-leroy",
  },
  {
    id: "c12",
    name: "Sara Messaoudi",
    role: "Ingénieure logiciel",
    job: "Ingénieure logiciel",
    priority: "Priorité moyenne",
    appliedDate: "15 Oct 2023",
    avatar: "",
    score: 29,
    email: "sara.messaoudi@email.com",
    phone: "+33 6 55 66 77 88",
    location: "Lille, France",
    salary: "38 000 €/an",
    availability: "2 mois",
    linkedin: "linkedin.com/in/sara-messaoudi",
  },
];

var initialPipelineData = [
  {
    title: "Candidature",
    color: "bg-slate-500",
    candidates: allCandidatesForCandidature.slice(0, 5),
  },
  {
    title: "Présélection",
    color: "bg-amber-500",
    candidates: [],
  },
  {
    title: "Entretien",
    color: "bg-primary",
    candidates: [],
  },
  {
    title: "Test technique",
    color: "bg-indigo-500",
    candidates: [],
  },
  {
    title: "Offre",
    color: "bg-secondary",
    candidates: [],
  },
];

var jobOpenings = [
  "Tous les postes",
  "Ingénieure logiciel",
  "Chef de produit",
  "Designer UX",
  "Data Scientist",
];

var pipelineOrder = [
  "Candidature",
  "Présélection",
  "Entretien",
  "Test technique",
  "Offre",
];

export default function Recruitment() {
  var selectedJobState = React.useState(jobOpenings[0]);
  var selectedJob = selectedJobState[0];
  var setSelectedJob = selectedJobState[1];

  var pipelineState = React.useState(initialPipelineData);
  var pipelineData = pipelineState[0];
  var setPipelineData = pipelineState[1];

  var waitingState = React.useState(allCandidatesForCandidature.slice(5));
  var waitingCandidates = waitingState[0];
  var setWaitingCandidates = waitingState[1];

  var totalReceivedState = React.useState(12);
  var totalReceived = totalReceivedState[0];

  var draggingState = React.useState(null);
  var dragging = draggingState[0];
  var setDragging = draggingState[1];

  var modalCandidateState = React.useState(null);
  var modalCandidate = modalCandidateState[0];
  var setModalCandidate = modalCandidateState[1];

  var lastMoveState = React.useState(null);
  var lastMove = lastMoveState[0];
  var setLastMove = lastMoveState[1];

  var errorToastState = React.useState(null);
  var errorToast = errorToastState[0];
  var setErrorToast = errorToastState[1];

  var toastTimerRef = React.useRef(null);
  var errorTimerRef = React.useRef(null);

  function getFilteredPipeline() {
    var data = pipelineData;
    if (selectedJob !== "Tous les postes") {
      data = pipelineData.map(function (column) {
        var filteredCandidates = column.candidates.filter(function (candidate) {
          return candidate.job === selectedJob;
        });
        return {
          title: column.title,
          color: column.color,
          candidates: filteredCandidates,
        };
      });
    }

    return data.map(function (column) {
      var sorted = column.candidates.slice().sort(function (a, b) {
        return b.score - a.score;
      });
      return {
        title: column.title,
        color: column.color,
        candidates: sorted,
      };
    });
  }

  var filteredPipeline = getFilteredPipeline();

  var filteredWaitingCount = 0;
  var displayedTotalReceived = totalReceived;

  if (selectedJob !== "Tous les postes") {
    filteredWaitingCount = waitingCandidates.filter(function (c) {
      return c.job === selectedJob;
    }).length;

    var candidatureColumn = filteredPipeline.find(function (col) {
      return col.title === "Candidature";
    });
    var displayedCount = candidatureColumn ? candidatureColumn.candidates.length : 0;
    displayedTotalReceived = displayedCount + filteredWaitingCount;
  } else {
    filteredWaitingCount = waitingCandidates.length;
  }

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

  var totalCandidates = filteredPipeline.reduce(function (sum, col) {
    return sum + col.candidates.length;
  }, 0);

  function handleCandidateDragStart(candidateId, fromColumn, e) {
    setDragging({ candidateId: candidateId, fromColumn: fromColumn });
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", candidateId);
  }

  function handleCandidateDragEnd() {
    setDragging(null);
  }

  function refillCandidature(prevData, prevWaiting, removedId) {
    var candidatureIndex = prevData.findIndex(function (col) {
      return col.title === "Candidature";
    });

    if (candidatureIndex === -1) {
      return { newPipelineData: prevData, newWaiting: prevWaiting };
    }

    var candidatureColumn = prevData[candidatureIndex];
    var candidatesAfterRemoval = candidatureColumn.candidates.filter(
      function (c) {
        return c.id !== removedId;
      }
    );

    var newWaiting = prevWaiting.slice();
    var newCandidates = candidatesAfterRemoval;
    var replacementId = null;

    if (newWaiting.length > 0) {
      var nextCandidate = newWaiting[0];
      newCandidates = candidatesAfterRemoval.concat([nextCandidate]);
      newWaiting = newWaiting.slice(1);
      replacementId = nextCandidate.id;
    }

    var newPipelineData = prevData.map(function (col, index) {
      if (index === candidatureIndex) {
        return {
          title: col.title,
          color: col.color,
          candidates: newCandidates,
        };
      }
      return col;
    });

    return { newPipelineData: newPipelineData, newWaiting: newWaiting, replacementId: replacementId };
  }

  function cancelLastMove() {
    if (!lastMove) return;

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }

    var move = lastMove;
    var isFromCandidature = move.fromColumn === "Candidature";

    if (isFromCandidature && move.replacementId) {
      setWaitingCandidates(function (prevWaiting) {
        setPipelineData(function (prevData) {
          var toIndex = prevData.findIndex(function (col) {
            return col.title === move.toColumn;
          });
          var fromIndex = prevData.findIndex(function (col) {
            return col.title === move.fromColumn;
          });

          if (fromIndex === -1 || toIndex === -1) return prevData;

          var replacementCandidate = prevData[fromIndex].candidates.find(
            function (c) {
              return c.id === move.replacementId;
            }
          );

          var newData = prevData.map(function (col, index) {
            if (index === fromIndex) {
              var candidatesWithoutReplacement = col.candidates.filter(
                function (c) {
                  return c.id !== move.replacementId;
                }
              );
              var candidatesWithOriginal = candidatesWithoutReplacement
                .concat([move.candidate])
                .sort(function (a, b) {
                  return b.score - a.score;
                });
              return {
                title: col.title,
                color: col.color,
                candidates: candidatesWithOriginal,
              };
            }
            if (index === toIndex) {
              return {
                title: col.title,
                color: col.color,
                candidates: col.candidates.filter(function (c) {
                  return c.id !== move.candidate.id;
                }),
              };
            }
            return col;
          });

          if (replacementCandidate) {
            setTimeout(function () {
              setWaitingCandidates([replacementCandidate].concat(prevWaiting));
            }, 0);
          }

          return newData;
        });

        return prevWaiting;
      });
    } else {
      setPipelineData(function (prevData) {
        var toIndex = prevData.findIndex(function (col) {
          return col.title === move.toColumn;
        });
        var fromIndex = prevData.findIndex(function (col) {
          return col.title === move.fromColumn;
        });

        if (fromIndex === -1 || toIndex === -1) return prevData;

        var newData = prevData.map(function (col, index) {
          if (index === fromIndex) {
            return {
              title: col.title,
              color: col.color,
              candidates: col.candidates.concat([move.candidate]),
            };
          }
          if (index === toIndex) {
            return {
              title: col.title,
              color: col.color,
              candidates: col.candidates.filter(function (c) {
                return c.id !== move.candidate.id;
              }),
            };
          }
          return col;
        });

        return newData;
      });
    }

    setLastMove(null);
  }

  function handleDrop(toColumn) {
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

    var foundCandidate = null;
    for (var i = 0; i < pipelineData.length; i++) {
      var col = pipelineData[i];
      if (col.title === dragging.fromColumn) {
        foundCandidate = col.candidates.find(function (c) {
          return c.id === dragging.candidateId;
        });
        break;
      }
    }

    if (!foundCandidate) {
      setDragging(null);
      return;
    }

    var isLeavingCandidature = dragging.fromColumn === "Candidature";

    if (isLeavingCandidature) {
      setWaitingCandidates(function (prevWaiting) {
        setPipelineData(function (prevData) {
          var result = refillCandidature(
            prevData,
            prevWaiting,
            foundCandidate.id
          );
          var fromIdx = result.newPipelineData.findIndex(function (col) {
            return col.title === dragging.fromColumn;
          });
          var toIdx = result.newPipelineData.findIndex(function (col) {
            return col.title === toColumn;
          });

          if (fromIdx === -1 || toIdx === -1) return prevData;

          var candidate = result.newPipelineData[fromIdx].candidates.find(
            function (c) {
              return c.id === foundCandidate.id;
            }
          );

          if (!candidate) {
            candidate = prevData[fromIdx].candidates.find(function (c) {
              return c.id === foundCandidate.id;
            });
          }

          if (!candidate) return prevData;

          var finalData = result.newPipelineData.map(function (col, index) {
            if (index === fromIdx) {
              return {
                title: col.title,
                color: col.color,
                candidates: col.candidates.filter(function (c) {
                  return c.id !== foundCandidate.id;
                }),
              };
            }
            if (index === toIdx) {
              return {
                title: col.title,
                color: col.color,
                candidates: col.candidates.concat([candidate]),
              };
            }
            return col;
          });

          setTimeout(function () {
            setWaitingCandidates(result.newWaiting);
          }, 0);

          setLastMove({
            candidate: candidate,
            fromColumn: dragging.fromColumn,
            toColumn: toColumn,
            replacementId: result.replacementId,
          });

          return finalData;
        });

        return prevWaiting;
      });
    } else {
      setPipelineData(function (prevData) {
        var fromIdx = prevData.findIndex(function (col) {
          return col.title === dragging.fromColumn;
        });
        var toIdx = prevData.findIndex(function (col) {
          return col.title === toColumn;
        });

        if (fromIdx === -1 || toIdx === -1) return prevData;

        var candidate = prevData[fromIdx].candidates.find(function (c) {
          return c.id === foundCandidate.id;
        });

        if (!candidate) return prevData;

        var newData = prevData.map(function (col, index) {
          if (index === fromIdx) {
            return {
              title: col.title,
              color: col.color,
              candidates: col.candidates.filter(function (c) {
                return c.id !== foundCandidate.id;
              }),
            };
          }
          if (index === toIdx) {
            return {
              title: col.title,
              color: col.color,
              candidates: col.candidates.concat([candidate]),
            };
          }
          return col;
        });

        setLastMove({
          candidate: candidate,
          fromColumn: dragging.fromColumn,
          toColumn: toColumn,
          replacementId: null,
        });

        return newData;
      });
    }

    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = setTimeout(function () {
      setLastMove(null);
    }, 5000);

    setDragging(null);
  }

  function handleCandidateClick(candidate) {
    setModalCandidate(candidate);
  }

  function closeModal() {
    setModalCandidate(null);
  }

  function findCandidateColumn(candidateId) {
    for (var i = 0; i < pipelineData.length; i++) {
      var col = pipelineData[i];
      var found = col.candidates.find(function (c) {
        return c.id === candidateId;
      });
      if (found) {
        return col.title;
      }
    }
    return null;
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
    var isLeavingCandidature = currentColumn === "Candidature";

    if (isLeavingCandidature) {
      setWaitingCandidates(function (prevWaiting) {
        setPipelineData(function (prevData) {
          var result = refillCandidature(
            prevData,
            prevWaiting,
            modalCandidate.id
          );
          var fromIndex = result.newPipelineData.findIndex(function (col) {
            return col.title === currentColumn;
          });
          var toIndex = result.newPipelineData.findIndex(function (col) {
            return col.title === nextColumn;
          });

          if (fromIndex === -1 || toIndex === -1) return prevData;

          var candidate = result.newPipelineData[fromIndex].candidates.find(
            function (c) {
              return c.id === modalCandidate.id;
            }
          );

          if (!candidate) {
            candidate = prevData[fromIndex].candidates.find(function (c) {
              return c.id === modalCandidate.id;
            });
          }

          if (!candidate) return prevData;

          var finalData = result.newPipelineData.map(function (col, index) {
            if (index === fromIndex) {
              return {
                title: col.title,
                color: col.color,
                candidates: col.candidates.filter(function (c) {
                  return c.id !== modalCandidate.id;
                }),
              };
            }
            if (index === toIndex) {
              return {
                title: col.title,
                color: col.color,
                candidates: col.candidates.concat([candidate]),
              };
            }
            return col;
          });

          setTimeout(function () {
            setWaitingCandidates(result.newWaiting);
          }, 0);

          return finalData;
        });

        return prevWaiting;
      });
    } else {
      setPipelineData(function (prevData) {
        var fromIndex = prevData.findIndex(function (col) {
          return col.title === currentColumn;
        });
        var toIndex = prevData.findIndex(function (col) {
          return col.title === nextColumn;
        });

        if (fromIndex === -1 || toIndex === -1) return prevData;

        var candidate = prevData[fromIndex].candidates.find(function (c) {
          return c.id === modalCandidate.id;
        });

        if (!candidate) return prevData;

        var newData = prevData.map(function (col, index) {
          if (index === fromIndex) {
            return {
              title: col.title,
              color: col.color,
              candidates: col.candidates.filter(function (c) {
                return c.id !== modalCandidate.id;
              }),
            };
          }
          if (index === toIndex) {
            return {
              title: col.title,
              color: col.color,
              candidates: col.candidates.concat([candidate]),
            };
          }
          return col;
        });

        return newData;
      });
    }

    closeModal();
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
              waitingCount={isCandidatureColumn ? filteredWaitingCount : 0}
              totalReceived={isCandidatureColumn ? displayedTotalReceived : 0}
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
          <span className="break-words font-body text-sm font-medium">{errorToast}</span>
        </div>
      )}
    </div>
  );
}
