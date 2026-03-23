import React, { useState, useMemo } from "react";
import CandidateFilters from "components/Candidates/CandidateFilters";
import CandidateTable from "components/Candidates/CandidateTable";
import PipelineStatCard from "components/Candidates/PipelineStatCard";

// ── Données fictives (à remplacer par un appel API) ──────────────────────────
const ALL_CANDIDATES = [
  {
    name: "Alexia Chambers",
    email: "alexia.ch@example.com",
    avatar: null,
    role: "Senior UX Designer",
    score: 92,
    status: "Entretien",
    appliedDate: "Oct 12, 2023",
  },
  {
    name: "Marcus Thorne",
    email: "m.thorne@example.com",
    avatar: null,
    role: "Software Engineer",
    score: 88,
    status: "Présélection",
    appliedDate: "Oct 14, 2023",
  },
  {
    name: "Julianne Vogt",
    email: "j.vogt@talent.ai",
    avatar: null,
    role: "Senior UX Designer",
    score: 74,
    status: "Liste d'attente",
    appliedDate: "Oct 15, 2023",
  },
  {
    name: "Leo Richards",
    email: "leo.r@devspace.io",
    avatar: null,
    role: "Software Engineer",
    score: 95,
    status: "Recruté",
    appliedDate: "Oct 10, 2023",
  },
];

const PIPELINE_STATS = [
  {
    title: "Pipeline Velocity",
    value: "4.2",
    unit: "Days to screening",
    trend: "12% slower than last month",
    trendIcon: "trending_up",
    trendColor: "text-red-500",
  },
  {
    title: "Top Sourcing Channel",
    value: "LinkedIn",
    unit: null,
    trend: "64% of High-Score candidates",
    trendIcon: "verified",
    trendColor: "text-indigo-600",
  },
  {
    title: "Talent Availability",
    value: "82%",
    unit: null,
    trend: "In-market pool is growing",
    trendIcon: "info",
    trendColor: "text-text-secondary",
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function Candidates() {
  const [position, setPosition]       = useState("");
  const [scoreFilter, setScoreFilter] = useState("");
  const [activeStatus, setActiveStatus] = useState("Tous");

  // Filtrage côté client
  const filtered = useMemo(() => {
    return ALL_CANDIDATES.filter((c) => {
      const matchPos    = !position || c.role === position;
      const matchStatus = activeStatus === "Tous" || c.status === activeStatus;
      const matchScore  =
        !scoreFilter ||
        (scoreFilter === "80" && c.score > 80) ||
        (scoreFilter === "90" && c.score > 90) ||
        (scoreFilter === "top5"); // simplifié — à gérer côté API
      return matchPos && matchStatus && matchScore;
    });
  }, [position, scoreFilter, activeStatus]);

  const handleClearAll = () => {
    setPosition("");
    setScoreFilter("");
    setActiveStatus("Tous");
  };

  return (
    <div className="space-y-6">

        {/* ── En-tête ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-2xl font-display font-semibold text-text-primary">
              Candidatures
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Gérez et évaluez votre pipeline de talents.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-border text-text-primary px-4 py-2 rounded-xl font-body text-sm font-medium hover:bg-gray-50 transition-colors">
            <span className="material-symbols-outlined text-sm">download</span>
            Exporter
          </button>
        </div>

        {/* ── Filtres ── */}
        <CandidateFilters
          position={position}
          onPositionChange={setPosition}
          scoreFilter={scoreFilter}
          onScoreChange={setScoreFilter}
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
          onClearAll={handleClearAll}
        />

        {/* ── Tableau ── */}
        <CandidateTable candidates={filtered} total={248} />

        {/* ── Bento Stats ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PIPELINE_STATS.map((stat) => (
            <PipelineStatCard key={stat.title} {...stat} />
          ))}
        </section>

    </div>
  );
}
