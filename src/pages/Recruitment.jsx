/*eslint-disable*/
import React from "react";
import PipelineColumn from "components/Recruitment/PipelineColumn.jsx";

var pipelineData = [
  {
    title: "Candidature",
    count: 12,
    candidates: [
      {
        name: "Sarah Jenkins",
        role: "Ingénieur logiciel",
        priority: "Haute",
        appliedDate: "Oct 26, 2023",
        avatar: "",
      },
      {
        name: "Michael Chen",
        role: "Chef de produit",
        priority: "Priorité moyenne",
        appliedDate: "Oct 24, 2023",
        avatar: "",
      },
    ],
  },
  {
    title: "Présélection",
    count: 8,
    candidates: [
      {
        name: "David Kim",
        role: "Data Scientist",
        priority: "Haute",
        appliedDate: "Oct 26, 2023",
        avatar: "",
      },
    ],
  },
  {
    title: "Entretien",
    count: 5,
    candidates: [
      {
        name: "Robert Wilson",
        role: "Chef de produit",
        priority: "Haute",
        appliedDate: "Oct 25, 2023",
        avatar: "",
      },
    ],
  },
  {
    title: "Test technique",
    count: 3,
    candidates: [
      {
        name: "Amanda Garcia",
        role: "Ingénieur logiciel",
        priority: "Priorité moyenne",
        appliedDate: "Oct 18, 2023",
        avatar: "",
      },
    ],
  },
  {
    title: "Offre",
    count: 2,
    candidates: [
      {
        name: "Kevin White",
        role: "Designer UX",
        priority: "Haute",
        appliedDate: "Oct 15, 2023",
        avatar: "",
      },
    ],
  },
];

var jobOpenings = [
  "Ingénieur logiciel",
  "Chef de produit",
  "Designer UX",
  "Data Scientist",
];

export default function Recruitment() {
  var [selectedJob, setSelectedJob] = React.useState(jobOpenings[0]);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6" style={{ gap: "8px" }}>
        <div>
          <h1 className="text-2xl font-display font-semibold text-text-primary">
            Pipeline de recrutement
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Suivez et gérez la progression des candidats.
          </p>
        </div>
        <div className="flex items-center ml-auto" style={{ gap: "6px" }}>
          <span className="font-body text-sm text-text-secondary">
            Filtrer
          </span>
          <select
            className="border border-border rounded-lg font-body text-sm px-3 py-1.5 focus:ring-indigo-500 focus:border-indigo-500"
            style={{ minWidth: "160px" }}
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
        </div>
      </div>

      {/* Pipeline board - horizontally scrollable on mobile */}
      <div
        className="flex pb-2 overflow-x-auto"
        style={{ gap: "12px" }}
      >
        {pipelineData.map(function (column) {
          return (
            <PipelineColumn
              key={column.title}
              title={column.title}
              count={column.count}
              candidates={column.candidates}
            />
          );
        })}
      </div>
    </div>
  );
}
