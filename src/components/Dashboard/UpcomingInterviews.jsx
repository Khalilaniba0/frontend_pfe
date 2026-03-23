import React from "react";

export default function UpcomingInterviews() {
  const interviews = [
    {
      name: "Amira Khoury",
      role: "Ingénieure senior",
      time: "10:00",
      type: "Technique",
      initials: "AK",
      gradient: "from-pink-400 to-rose-500",
    },
    {
      name: "Thomas Petit",
      role: "Responsable marketing",
      time: "13:30",
      type: "RH",
      initials: "TP",
      gradient: "from-sky-400 to-blue-500",
    },
    {
      name: "Fatou Diallo",
      role: "Designer produit",
      time: "15:45",
      type: "Final",
      initials: "FD",
      gradient: "from-amber-400 to-orange-500",
    },
  ];

  const getTypeStyle = function (type) {
    switch (type) {
      case "Technique":
        return "bg-indigo-50 text-indigo-600";
      case "RH":
        return "bg-secondary-light text-secondary";
      case "Final":
        return "bg-primary-light text-primary";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold tracking-tight text-text-primary">
            Entretiens à venir
          </h3>
          <p className="mt-0.5 font-body text-xs text-text-muted">
            Aujourd'hui — {interviews.length} programmés
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 font-body text-xs font-medium text-text-secondary transition-colors duration-150 hover:border-primary hover:text-primary"
        >
          <i className="fas fa-calendar-alt text-[10px]"></i>
          Calendrier
        </button>
      </header>

      <ul className="flex flex-col">
        {interviews.map(function (interview, index) {
          return (
            <li
              key={index}
              className={
                "group flex items-center gap-4 py-3.5 transition-colors duration-150 " +
                (index < interviews.length - 1 ? "border-b border-border" : "")
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
                  getTypeStyle(interview.type)
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
                className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted opacity-0 transition-all duration-150 hover:bg-primary-light hover:text-primary group-hover:opacity-100"
                title="Voir les détails"
              >
                <i className="fas fa-chevron-right text-xs"></i>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
