import React from "react";

export default function RecentActivity() {
  var activity = [
    {
      text: "Alex Johnson a demandé un congé (15-18 juin)",
      bold: "Alex Johnson",
      time: "Il y a 2 min",
      dotColor: "bg-blueGray-300",
    },
    {
      text: "Nouvelle offre d'emploi 'Data Analyst' créée",
      bold: "Data Analyst",
      time: "Il y a 1h",
      dotColor: "bg-teal-400",
    },
    {
      text: "Évaluation de performance de David Lee terminée",
      bold: "David Lee",
      time: "Il y a 3h",
      dotColor: "bg-indigo-300",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-border p-5 h-full">
      <h3 className="font-display text-lg font-semibold text-text-primary mb-4">
        Activité récente
      </h3>
      <div className="flex flex-col" style={{ gap: "16px" }}>
        {activity.map(function (item, i) {
          var parts = item.text.split(item.bold);
          return (
            <div key={i} className="flex" style={{ gap: "12px" }}>
              <div
                className={"rounded-full mt-1 flex-shrink-0 " + item.dotColor}
                style={{ width: "10px", height: "10px", minWidth: "10px" }}
              ></div>
              <div>
                <p className="font-body text-xs text-text-secondary leading-relaxed">
                  {parts.map(function (part, j) {
                    return (
                      <span key={j}>
                        {part}
                        {j < parts.length - 1 && (
                          <span className="font-medium text-text-primary">
                            {item.bold}
                          </span>
                        )}
                      </span>
                    );
                  })}
                </p>
                <p className="font-body text-text-muted mt-0.5" style={{ fontSize: "10px" }}>
                  {item.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
