import React from "react";

import StatCard from "components/Dashboard/StatCard.jsx";
import HiringChart from "components/Dashboard/HiringChart.jsx";
import RecentActivity from "components/Dashboard/RecentActivity.jsx";
import UpcomingInterviews from "components/Dashboard/UpcomingInterviews.jsx";

export default function Dashboard() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="animate-fade-in">
      <header className="mb-8 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Tableau de bord
          </h1>
          <p className="mt-1 font-body text-sm text-text-secondary">
            Vue d'ensemble de vos indicateurs RH
          </p>
        </div>
        <p className="font-body text-sm capitalize text-text-muted">
          {formattedDate}
        </p>
      </header>

      <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          statTitle="Total employés"
          statValue="1 254"
          statTrend="+2,5%"
          trendLabel="vs mois dernier"
          iconClass="fas fa-users"
          iconBgColor="bg-primary-light"
          iconTextColor="text-primary"
          variant="highlight"
        />
        <StatCard
          statTitle="Recrutements actifs"
          statValue="47"
          statSubtext="8 postes en clôture"
          iconClass="fas fa-briefcase"
          iconBgColor="bg-secondary-light"
          iconTextColor="text-secondary"
        />
        <StatCard
          statTitle="Congés en attente"
          statValue="12"
          statSubtext="À examiner"
          iconClass="fas fa-calendar-alt"
          iconBgColor="bg-orange-50"
          iconTextColor="text-orange-500"
        />
        <StatCard
          statTitle="Entretiens ce mois"
          statValue="34"
          statTrend="+18%"
          trendLabel="vs mois dernier"
          iconClass="fas fa-video"
          iconBgColor="bg-indigo-50"
          iconTextColor="text-indigo-500"
        />
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="flex flex-col gap-4 xl:col-span-8">
          <HiringChart />
          <UpcomingInterviews />
        </div>
        <aside className="xl:col-span-4">
          <RecentActivity />
        </aside>
      </section>
    </div>
  );
}
