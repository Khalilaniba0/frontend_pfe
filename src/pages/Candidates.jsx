import React, { useState, useMemo } from "react";
import CandidateFilters from "components/Candidates/CandidateFilters";
import CandidateTable from "components/Candidates/CandidateTable";
import PipelineStatCard from "components/Candidates/PipelineStatCard";

const ALL_CANDIDATES = [
  {
    name: "Amira Benali",
    email: "amira.b@example.com",
    avatar: null,
    role: "Senior UX Designer",
    score: 92,
    status: "Entretien",
    appliedDate: "12 Oct 2023",
  },
  {
    name: "Lucas Ferreira",
    email: "l.ferreira@example.com",
    avatar: null,
    role: "Software Engineer",
    score: 88,
    status: "Présélection",
    appliedDate: "14 Oct 2023",
  },
  {
    name: "Sophie Durand",
    email: "s.durand@talent.ai",
    avatar: null,
    role: "Senior UX Designer",
    score: 74,
    status: "Liste d'attente",
    appliedDate: "15 Oct 2023",
  },
  {
    name: "Youssef Khoury",
    email: "y.khoury@devspace.io",
    avatar: null,
    role: "Software Engineer",
    score: 95,
    status: "Recruté",
    appliedDate: "10 Oct 2023",
  },
];

const PIPELINE_STATS = [
  {
    title: "Vélocité du pipeline",
    value: "4.2",
    unit: "jours de présélection",
    trend: "+12% vs mois dernier",
    trendIcon: "trending_up",
    trendColor: "text-amber-600",
    iconBg: "bg-amber-50",
  },
  {
    title: "Canal principal",
    value: "LinkedIn",
    unit: null,
    trend: "64% des meilleurs profils",
    trendIcon: "verified",
    trendColor: "text-primary",
    iconBg: "bg-primary-light",
  },
  {
    title: "Disponibilité talents",
    value: "82%",
    unit: null,
    trend: "Vivier en croissance",
    trendIcon: "trending_up",
    trendColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
];

export default function Candidates() {
  const [position, setPosition] = useState("");
  const [scoreFilter, setScoreFilter] = useState("");
  const [activeStatus, setActiveStatus] = useState("Tous");

  const filtered = useMemo(
    function () {
      return ALL_CANDIDATES.filter(function (c) {
        const matchPos = !position || c.role === position;
        const matchStatus =
          activeStatus === "Tous" || c.status === activeStatus;
        const matchScore =
          !scoreFilter ||
          (scoreFilter === "80" && c.score > 80) ||
          (scoreFilter === "90" && c.score > 90) ||
          scoreFilter === "top5";
        return matchPos && matchStatus && matchScore;
      });
    },
    [position, scoreFilter, activeStatus]
  );

  const handleClearAll = function () {
    setPosition("");
    setScoreFilter("");
    setActiveStatus("Tous");
  };

  return (
    <div className="animate-fade-in space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Candidatures
          </h1>
          <p className="mt-1 font-body text-sm text-text-secondary">
            Gérez et évaluez votre pipeline de{" "}
            <span className="font-semibold tabular-nums text-primary">248</span>{" "}
            talents
          </p>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 font-body text-sm font-medium text-text-primary shadow-sm transition-all duration-150 hover:border-primary/30 hover:shadow-md"
        >
          <span className="material-symbols-outlined text-lg text-text-muted">
            download
          </span>
          Exporter
        </button>
      </header>

      <CandidateFilters
        position={position}
        onPositionChange={setPosition}
        scoreFilter={scoreFilter}
        onScoreChange={setScoreFilter}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        onClearAll={handleClearAll}
      />

      <CandidateTable candidates={filtered} total={248} />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {PIPELINE_STATS.map(function (stat) {
          return <PipelineStatCard key={stat.title} {...stat} />;
        })}
      </section>
    </div>
  );
}
