import React, { useState, useEffect } from "react";
import JobStatCard from "components/Jobs/JobStatCard";
import JobsTable from "components/Jobs/JobsTable";
import SourceChart from "components/Jobs/SourceChart";
import RecruitmentTimeCard from "components/Jobs/RecruitmentTimeCard";
import CreateJobModal from "components/Jobs/CreateJobModal";

const STATS = [
  {
    icon: "work_history",
    label: "Total d'offres",
    value: "42",
    badge: "+12%",
    badgeLabel: "vs mois dernier",
    iconBg: "bg-primary-light",
    iconColor: "text-primary",
    trend: "up",
  },
  {
    icon: "rocket_launch",
    label: "Offres actives",
    value: "18",
    badge: "8",
    badgeLabel: "en cours",
    iconBg: "bg-secondary-light",
    iconColor: "text-secondary",
    trend: "neutral",
  },
  {
    icon: "person_search",
    label: "Candidatures reçues",
    value: "1 284",
    badge: "+48",
    badgeLabel: "nouvelles",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    trend: "up",
  },
];

const JOBS = [
  {
    title: "Senior Product Designer",
    department: "Design",
    location: "Remote (FR)",
    status: "Ouverte",
    candidates: { avatars: ["NB", "LF"], extra: 12 },
    team: "Core Product",
    date: "12 Oct 2023",
  },
  {
    title: "Lead Backend Engineer",
    department: "Engineering",
    location: "Paris, FR",
    status: "En pause",
    candidates: { avatars: ["PS"], extra: 4 },
    team: "Platform",
    date: "08 Oct 2023",
  },
  {
    title: "HR Business Partner",
    department: "People",
    location: "Hybrid",
    status: "Fermée",
    candidates: { avatars: [], extra: 0 },
    team: "Operations",
    date: "22 Sep 2023",
  },
  {
    title: "Marketing Manager",
    department: "Marketing",
    location: "Lyon, FR",
    status: "Ouverte",
    candidates: { avatars: ["MJ", "FD"], extra: 2 },
    team: "Growth",
    date: "05 Oct 2023",
  },
];

const SOURCES = [
  { label: "LinkedIn Jobs", percent: 45, color: "bg-primary" },
  { label: "Indeed", percent: 28, color: "bg-secondary" },
  { label: "Site Carrière", percent: 15, color: "bg-primary/40" },
  { label: "Cooptation", percent: 12, color: "bg-secondary/40" },
];

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [jobs, setJobs] = useState(JOBS);
  const [toast, setToast] = useState(null);

  useEffect(
    function () {
      if (toast) {
        const timer = setTimeout(function () {
          setToast(null);
        }, 4000);
        return function () {
          clearTimeout(timer);
        };
      }
    },
    [toast]
  );

  const handleCreateJob = function (newJob) {
    setJobs(function (prev) {
      return [
        {
          ...newJob,
          candidates: { avatars: [], extra: 0 },
        },
        ...prev,
      ];
    });
    setShowCreateModal(false);
    setToast(newJob.title);
  };

  const filteredJobs = jobs.filter(function (j) {
    return (
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.department.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="animate-fade-in space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-xl font-bold tracking-tight text-text-primary md:text-3xl lg:text-4xl">
            Gestion des Offres
          </h1>
          <p className="mt-1 font-body text-sm text-text-secondary">
            Visualisez et gérez vos{" "}
            <span className="font-semibold tabular-nums text-primary">42</span>{" "}
            recrutements actifs
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 font-body text-sm font-medium text-text-primary shadow-sm transition-all duration-150 hover:border-primary/30 hover:shadow-md"
          >
            <span className="material-symbols-outlined text-lg text-text-muted">
              download
            </span>
            Exporter
          </button>
          <button
            type="button"
            onClick={function () {
              setShowCreateModal(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-body text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-150 hover:bg-primary-dark hover:shadow-lg"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Créer une offre
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {STATS.map(function (stat) {
          return <JobStatCard key={stat.label} {...stat} />;
        })}
      </section>

      <div className="relative max-w-md">
        <span className="material-symbols-outlined pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xl text-text-muted">
          search
        </span>
        <input
          type="text"
          value={search}
          onChange={function (e) {
            setSearch(e.target.value);
          }}
          placeholder="Rechercher par titre ou département..."
          className="w-full rounded-xl border border-border bg-white py-2.5 pl-11 pr-4 font-body text-sm text-text-primary shadow-sm transition-all duration-150 placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <JobsTable jobs={filteredJobs} total={42} />

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SourceChart sources={SOURCES} />
        <RecruitmentTimeCard days={22} improvement={5} />
      </section>

      {showCreateModal && (
        <CreateJobModal
          onClose={function () {
            setShowCreateModal(false);
          }}
          onSubmit={handleCreateJob}
        />
      )}

      {toast && (
        <div className="fixed right-6 top-6 z-[9999] flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 shadow-lg">
          <span className="material-symbols-outlined text-success">
            check_circle
          </span>
          <div>
            <p className="font-display text-sm font-semibold text-text-primary">
              Offre publiée avec succès
            </p>
            <p className="text-xs text-text-secondary">
              "{toast}" a été ajoutée à vos offres actives.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
