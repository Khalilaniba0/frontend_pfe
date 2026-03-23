import React from "react";

import StatCard from "components/Dashboard/StatCard.jsx";
import HiringChart from "components/Dashboard/HiringChart.jsx";
import RecentActivity from "components/Dashboard/RecentActivity.jsx";
import UpcomingInterviews from "components/Dashboard/UpcomingInterviews.jsx";

export default function Dashboard() {
  return (
    <div>
      {/* Page title */}
      <div className="mb-6">
        <h1 className="text-2xl font-display font-semibold text-text-primary">
          Tableau de bord RH
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Vue d'ensemble de vos indicateurs RH
        </p>
      </div>

      {/* ── Stat Cards ────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 mb-4" style={{ gap: "16px" }}>
        <StatCard
          statTitle="Total employés"
          statValue="1,254"
          statTrend="2,5% par rapport au mois dernier"
          iconClass="fas fa-users"
          iconBgColor="bg-indigo-50"
          iconTextColor="text-indigo-500"
        />
        <StatCard
          statTitle="Recrutements actifs"
          statValue="45"
          statSubtext="8 postes en cours de clôture"
          iconClass="fas fa-briefcase"
          iconBgColor="bg-teal-50"
          iconTextColor="text-teal-500"
        />
        <StatCard
          statTitle="Demandes de congés en attente"
          statValue="12"
          statSubtext="À examiner"
          iconClass="fas fa-calendar-alt"
          iconBgColor="bg-orange-50"
          iconTextColor="text-orange-400"
        />
      </div>

      {/* ── Chart + Interviews (left) | Activity (right) ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3" style={{ gap: "16px" }}>
        <div className="xl:col-span-2 flex flex-col" style={{ gap: "16px" }}>
          <HiringChart />
          <UpcomingInterviews />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
