import React, { useState } from "react";
import JobStatCard from "components/Jobs/JobStatCard";
import JobsTable from "components/Jobs/JobsTable";
import SourceChart from "components/Jobs/SourceChart";
import RecruitmentTimeCard from "components/Jobs/RecruitmentTimeCard";

// ── Données fictives (à remplacer par un appel API) ──────────────────────────
const STATS = [
  {
    icon: "work_history",
    label: "Total d'offres",
    value: "42",
    badge: "+12% vs last month",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    badgeColor: "bg-indigo-100 text-indigo-700",
  },
  {
    icon: "rocket_launch",
    label: "Offres actives",
    value: "18",
    badge: "8 en cours",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    badgeColor: "bg-indigo-100 text-indigo-700",
  },
  {
    icon: "person_search",
    label: "Candidatures reçues",
    value: "1 284",
    badge: "48 nouvelles",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    badgeColor: "bg-orange-100 text-orange-700",
  },
];

const JOBS = [
  {
    title: "Senior Product Designer",
    department: "Design",
    location: "Remote (FR)",
    status: "Ouverte",
    candidates: { avatars: ["SJ", "DK"], extra: 12 },
    team: "Core Product",
    date: "12 Oct 2023",
  },
  {
    title: "Lead Backend Engineer",
    department: "Engineering",
    location: "Paris, FR",
    status: "En pause",
    candidates: { avatars: ["RW"], extra: 4 },
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
    candidates: { avatars: ["MM", "AL"], extra: 2 },
    team: "Growth",
    date: "05 Oct 2023",
  },
];

const SOURCES = [
  { label: "LinkedIn Jobs", percent: 45, color: "bg-indigo-600" },
  { label: "Indeed", percent: 28, color: "bg-indigo-300" },
  { label: "Site Carrière", percent: 15, color: "bg-indigo-200" },
];

// ─────────────────────────────────────────────────────────────────────────────

export default function Jobs() {
  const [search, setSearch] = useState("");

  const filteredJobs = JOBS.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

        {/* ── En-tête ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-2xl font-display font-semibold text-text-primary">
              Gestion des Offres
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Visualisez et gérez l'ensemble de vos recrutements actifs.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 rounded-xl border border-border text-text-primary font-body text-sm font-medium hover:bg-gray-50 transition-colors">
              Exporter CSV
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-primary text-white font-display text-sm font-semibold shadow hover:bg-primary-dark transition-colors">
              Créer une offre
            </button>
          </div>
        </div>

        {/* ── Statistiques ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((stat) => (
            <JobStatCard key={stat.label} {...stat} />
          ))}
        </section>

        {/* ── Recherche rapide ── */}
        <div className="relative max-w-sm">
          <span className="absolute inset-y-0 left-3 flex items-center text-text-secondary">
            <span className="material-symbols-outlined text-xl">search</span>
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filtrer les offres..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-white text-sm font-body focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* ── Tableau des postes ── */}
        <JobsTable jobs={filteredJobs} total={42} />

        {/* ── Analytics ── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SourceChart sources={SOURCES} />
          <RecruitmentTimeCard days={22} improvement={5} />
        </section>

    </div>
  );
}