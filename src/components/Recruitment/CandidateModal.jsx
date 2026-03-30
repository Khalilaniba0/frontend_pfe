import React from "react";
import PropTypes from "prop-types";
import ModalBackdrop from "../common/ModalBackdrop";

export default function CandidateModal({
  candidate = null,
  pipelineOrder,
  onClose,
  onNextStage,
  onRefuse,
  findCandidateColumn,
}) {
  var noteState = React.useState("");
  var note = noteState[0];
  var setNote = noteState[1];

  function getScoreColor(scoreValue) {
    if (scoreValue <= 40) return "text-red-600";
    if (scoreValue <= 69) return "text-amber-600";
    return "text-emerald-600";
  }

  var gradients = [
    "from-pink-400 to-rose-500",
    "from-violet-400 to-purple-500",
    "from-sky-400 to-blue-500",
    "from-emerald-400 to-teal-500",
    "from-amber-400 to-orange-500",
  ];

  function getGradient(name) {
    var index =
      name.split("").reduce(function (acc, char) {
        return acc + char.charCodeAt(0);
      }, 0) % gradients.length;
    return gradients[index];
  }

  function getInitials(name) {
    return name
      .split(" ")
      .map(function (n) {
        return n[0];
      })
      .join("")
      .toUpperCase();
  }

  if (!candidate) return null;

  var currentStage = findCandidateColumn(candidate.id);
  var currentIdx = pipelineOrder.indexOf(currentStage);
  var isLastStage = currentIdx >= pipelineOrder.length - 1;
  var nextStage = isLastStage ? null : pipelineOrder[currentIdx + 1];
  var isFinalStage = currentStage === "Offre";
  var canRefuse = candidate._etape !== "refuse" && candidate._etape !== "accepte";

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        className="relative flex w-full max-w-[520px] max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={function (e) {
          e.stopPropagation();
        }}
      >
        <div className="flex items-start justify-between border-b border-border p-5">
          <div className="flex items-center gap-4">
            {candidate.avatar ? (
              <img
                alt={candidate.name}
                className="h-14 w-14 rounded-xl bg-gray-100 object-cover"
                src={candidate.avatar}
              />
            ) : (
              <div
                className={
                  "flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-body text-sm font-bold text-white shadow-sm " +
                  getGradient(candidate.name)
                }
              >
                {getInitials(candidate.name)}
              </div>
            )}
            <div>
              <h2 className="font-display text-lg font-bold text-text-primary">
                {candidate.name}
              </h2>
              <p className="font-body text-sm text-text-secondary">
                {candidate.role} •{" "}
                <span
                  className={"font-semibold " + getScoreColor(candidate.score)}
                >
                  Score IA : {candidate.score}/100
                </span>
              </p>
              <div className="mt-3 flex items-center gap-2">
                {pipelineOrder.map(function (stage, idx) {
                  var isPast = idx < currentIdx;
                  var isCurrent = idx === currentIdx;

                  return (
                    <React.Fragment key={stage}>
                      {idx > 0 && (
                        <div
                          className={
                            "h-0.5 w-4 " +
                            (isPast
                              ? "bg-primary/30"
                              : isCurrent
                                ? "bg-gray-200"
                                : "bg-gray-200")
                          }
                        ></div>
                      )}
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className={
                            "h-2 w-2 rounded-full " +
                            (isCurrent
                              ? "bg-primary"
                              : isPast
                                ? "bg-primary/30"
                                : "bg-gray-200")
                          }
                        ></div>
                        <span
                          className={
                            "whitespace-nowrap font-body text-[10px] " +
                            (isCurrent
                              ? "font-semibold text-primary"
                              : "text-text-muted")
                          }
                        >
                          {stage}
                        </span>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-bg-soft hover:text-text-primary"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-5">
          <div className="mb-5 space-y-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-lg text-text-muted">
                mail
              </span>
              <a
                href={"mailto:" + candidate.email}
                className="font-body text-sm text-primary hover:underline"
              >
                {candidate.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-lg text-text-muted">
                phone
              </span>
              <span className="font-body text-sm text-text-primary">
                {candidate.phone}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-lg text-text-muted">
                location_on
              </span>
              <span className="font-body text-sm text-text-primary">
                {candidate.location}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-lg text-text-muted">
                payments
              </span>
              <span className="font-body text-sm text-text-primary">
                Salaire souhaité : {candidate.salary}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-lg text-text-muted">
                event_available
              </span>
              <span className="font-body text-sm text-text-primary">
                Disponibilité : {candidate.availability}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-lg text-text-muted">
                link
              </span>
              <a
                href={"https://" + candidate.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-primary hover:underline"
              >
                {candidate.linkedin}
              </a>
            </div>
          </div>

          <div className="mb-5 border-t border-border pt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg text-text-muted">
                  description
                </span>
                <span className="font-body text-sm font-medium text-text-primary">
                  CV
                </span>
              </div>
              <a
                href="#"
                className="flex items-center gap-1 font-body text-sm font-medium text-primary transition-colors hover:text-primary-dark"
              >
                Voir le CV
                <span className="material-symbols-outlined text-base">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>

          <div className="border-t border-border pt-5">
            <label className="mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-text-muted">
                edit_note
              </span>
              <span className="font-body text-sm font-medium text-text-primary">
                Note RH
              </span>
            </label>
            <textarea
              className="w-full resize-none rounded-xl border border-border bg-bg-soft/50 px-4 py-3 font-body text-sm text-text-primary placeholder-text-muted transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              rows="3"
              placeholder="Ajouter une note..."
              value={note}
              onChange={function (e) {
                setNote(e.target.value);
              }}
            ></textarea>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-border px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border bg-white px-4 py-2.5 font-body text-sm font-medium text-text-secondary transition-all hover:bg-bg-soft"
          >
            Annuler
          </button>
          {canRefuse && (
            <button
              type="button"
              onClick={onRefuse}
              className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 font-body text-sm font-medium text-white transition-all hover:bg-red-600"
            >
              <span className="material-symbols-outlined text-lg">
                person_remove
              </span>
              Refuser
            </button>
          )}
          {!isLastStage && (
            <button
              type="button"
              onClick={onNextStage}
              className={
                "flex items-center gap-2 rounded-xl px-4 py-2.5 font-body text-sm font-medium text-white shadow-md transition-all hover:shadow-lg " +
                (isFinalStage
                  ? "bg-secondary shadow-secondary/20 hover:bg-secondary/90"
                  : "bg-primary shadow-primary/20 hover:bg-primary-dark")
              }
            >
              <span className="material-symbols-outlined text-lg">
                {isFinalStage ? "check" : "arrow_forward"}
              </span>
              {isFinalStage
                ? "✓ Finaliser le recrutement"
                : "→ Passer en " + nextStage}
            </button>
          )}
        </div>
      </div>
    </ModalBackdrop>
  );
}

CandidateModal.propTypes = {
  candidate: PropTypes.object,
  pipelineOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
  onNextStage: PropTypes.func.isRequired,
  onRefuse: PropTypes.func.isRequired,
  findCandidateColumn: PropTypes.func.isRequired,
};
