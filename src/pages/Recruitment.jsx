import React from "react";
import PipelineColumn from "components/Recruitment/PipelineColumn.jsx";

const pipelineData = [
  {
    title: "Candidature",
    count: 12,
    color: "bg-slate-500",
    candidates: [
      {
        name: "Nadia Belkacem",
        role: "Ingénieure logiciel",
        priority: "Haute",
        appliedDate: "26 Oct 2023",
        avatar: "",
      },
      {
        name: "Lucas Ferreira",
        role: "Chef de produit",
        priority: "Priorité moyenne",
        appliedDate: "24 Oct 2023",
        avatar: "",
      },
    ],
  },
  {
    title: "Présélection",
    count: 8,
    color: "bg-amber-500",
    candidates: [
      {
        name: "Priya Sharma",
        role: "Data Scientist",
        priority: "Haute",
        appliedDate: "26 Oct 2023",
        avatar: "",
      },
    ],
  },
  {
    title: "Entretien",
    count: 5,
    color: "bg-primary",
    candidates: [
      {
        name: "Marcus Johansson",
        role: "Chef de produit",
        priority: "Haute",
        appliedDate: "25 Oct 2023",
        avatar: "",
      },
    ],
  },
  {
    title: "Test technique",
    count: 3,
    color: "bg-indigo-500",
    candidates: [
      {
        name: "Fatima Al-Hassan",
        role: "Ingénieure logiciel",
        priority: "Priorité moyenne",
        appliedDate: "18 Oct 2023",
        avatar: "",
      },
    ],
  },
  {
    title: "Offre",
    count: 2,
    color: "bg-secondary",
    candidates: [
      {
        name: "Olivier Dupont",
        role: "Designer UX",
        priority: "Haute",
        appliedDate: "15 Oct 2023",
        avatar: "",
      },
    ],
  },
];

const jobOpenings = [
  "Tous les postes",
  "Ingénieure logiciel",
  "Chef de produit",
  "Designer UX",
  "Data Scientist",
];

export default function Recruitment() {
  const [selectedJob, setSelectedJob] = React.useState(jobOpenings[0]);

  const totalCandidates = pipelineData.reduce(function (sum, col) {
    return sum + col.count;
  }, 0);

  return (
    <div className="animate-fade-in">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
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

        <div className="flex items-center gap-3">
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

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-body text-sm font-medium text-white shadow-md shadow-primary/20 transition-all duration-150 hover:bg-primary-dark hover:shadow-lg"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Nouveau candidat
          </button>
        </div>
      </header>

      <div className="mb-4 flex items-center gap-6">
        {pipelineData.map(function (col) {
          return (
            <div key={col.title} className="flex items-center gap-2">
              <span className={"h-2.5 w-2.5 rounded-sm " + col.color}></span>
              <span className="font-body text-xs text-text-secondary">
                {col.title}
              </span>
              <span className="font-body text-xs font-semibold tabular-nums text-text-primary">
                {col.count}
              </span>
            </div>
          );
        })}
      </div>

      <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 md:-mx-0 md:px-0">
        {pipelineData.map(function (column) {
          return (
            <PipelineColumn
              key={column.title}
              title={column.title}
              count={column.count}
              color={column.color}
              candidates={column.candidates}
            />
          );
        })}
      </div>
    </div>
  );
}
