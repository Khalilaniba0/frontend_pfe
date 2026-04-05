import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "constants/routes";

var GRADIENTS = [
  "from-pink-400 to-rose-500",
  "from-sky-400 to-blue-500",
  "from-amber-400 to-orange-500",
  "from-emerald-400 to-teal-500",
  "from-violet-400 to-purple-500",
];

function getInitials(name) {
  if (!name) return "??";
  var parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

function getTypeLabel(type) {
  switch (type) {
    case "visio":
      return "Visio";
    case "telephone":
      return "Téléphone";
    case "presentiel":
      return "Présentiel";
    default:
      return type || "Entretien";
  }
}

var getTypeStyle = function (type) {
  switch (type) {
    case "visio":
      return "bg-indigo-50 text-indigo-600";
    case "telephone":
      return "bg-secondary-light text-secondary";
    case "presentiel":
      return "bg-primary-light text-primary";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function UpcomingInterviews({ interviews, loading }) {
  const navigate = useNavigate();

  const goToInterviewsCalendar = function () {
    navigate(ROUTES.ADMIN.INTERVIEWS);
  };

  const uiInterviews = useMemo(
    function () {
      return (Array.isArray(interviews) ? interviews : []).map(function (e, index) {
        var candidatName =
          e.candidature?.nom ||
          e.candidature?.candidat?.nom ||
          e.candidature?.email ||
          "Candidat";
        var role =
          e.candidature?.offre?.poste ||
          e.candidature?.poste ||
          "Poste non défini";
        var dateObj = new Date(e.dateEntretien || e.date_entretien);
        var timeStr = dateObj.toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        return {
          name: candidatName,
          role: role,
          time: timeStr,
          type: getTypeLabel(e.typeEntretien || e.type_entretien),
          rawType: e.typeEntretien || e.type_entretien,
          initials: getInitials(candidatName),
          gradient: GRADIENTS[index % GRADIENTS.length],
        };
      });
    },
    [interviews]
  );

  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold tracking-tight text-text-primary">
            Entretiens à venir
          </h3>
        </div>
        <button
          type="button"
          onClick={goToInterviewsCalendar}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 font-body text-xs font-medium text-text-secondary transition-colors duration-150 hover:border-primary hover:text-primary"
        >
          <i className="fas fa-calendar-alt text-[10px]"></i>
          Calendrier
        </button>
      </header>

      {loading ? (
        <div className="py-8 text-center">
          <p className="font-body text-sm text-text-muted">Chargement...</p>
        </div>
      ) : uiInterviews.length === 0 ? (
        <div className="py-8 text-center">
          <p className="font-body text-sm text-text-muted">
            Aucun entretien à venir
          </p>
        </div>
      ) : (
        <ul className="flex flex-col">
          {uiInterviews.map(function (interview, index) {
            return (
              <li
                key={index}
                className={
                  "group flex items-center gap-4 py-3.5 transition-colors duration-150 " +
                  (index < uiInterviews.length - 1
                    ? "border-b border-border"
                    : "")
                }
              >
                <div
                  className={
                    "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-body text-xs font-bold text-white shadow-sm " +
                    interview.gradient
                  }
                >
                  {interview.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-body text-sm font-semibold text-text-primary">
                    {interview.name}
                  </p>
                  <p className="truncate font-body text-xs text-text-secondary">
                    {interview.role}
                  </p>
                </div>

                <span
                  className={
                    "hidden rounded-md px-2 py-1 font-body text-xs font-medium sm:inline-block " +
                    getTypeStyle(interview.rawType)
                  }
                >
                  {interview.type}
                </span>

                <div className="flex items-center gap-1.5 text-text-primary">
                  <i className="fas fa-clock text-xs text-text-muted"></i>
                  <span className="font-body text-sm font-semibold tabular-nums">
                    {interview.time}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={goToInterviewsCalendar}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted opacity-0 transition-all duration-150 hover:bg-primary-light hover:text-primary group-hover:opacity-100"
                  title="Voir les détails"
                >
                  <i className="fas fa-chevron-right text-xs"></i>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

UpcomingInterviews.propTypes = {
  interviews: PropTypes.array,
  loading: PropTypes.bool,
};

UpcomingInterviews.defaultProps = {
  interviews: [],
  loading: false,
};
