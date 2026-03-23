import React from "react";

export default function UpcomingInterviews() {
  var interviews = [
    {
      name: "Sarah Chen",
      role: "Ingénieur senior",
      time: "10:00 AM",
      initials: "SC",
      color: "bg-pink-200 text-pink-700",
    },
    {
      name: "Mike Ross",
      role: "Responsable marketing",
      time: "1:30 PM",
      initials: "MR",
      color: "bg-lightBlue-200 text-lightBlue-700",
    },
    {
      name: "Emily Davis",
      role: "Designer produit",
      time: "3:45 PM",
      initials: "ED",
      color: "bg-amber-200 text-amber-700",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <h3 className="font-display text-lg font-semibold text-text-primary mb-4">
        Entretiens à venir
      </h3>
      <div className="flex flex-col" style={{ gap: "0px" }}>
        {interviews.map(function (iv, i) {
          return (
            <div
              key={i}
              className={
                "flex items-center py-3 " +
                (i < interviews.length - 1 ? "border-b border-border" : "")
              }
              style={{ gap: "12px" }}
            >
              <div
                className={
                  "w-8 h-8 rounded-full flex items-center justify-center font-body text-xs font-semibold flex-shrink-0 " +
                  iv.color
                }
              >
                {iv.initials}
              </div>
              <span className="font-body text-sm font-medium text-text-primary" style={{ flex: 1 }}>
                {iv.name}
              </span>
              <span className="font-body text-xs text-text-secondary" style={{ flex: 1 }}>
                {iv.role}
              </span>
              <span className="font-body text-sm font-medium text-text-primary">
                {iv.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
