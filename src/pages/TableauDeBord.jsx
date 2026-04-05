// Lignes : 135 | Couche : page | Depend de : useDashboard, StatCard, HiringChart, RecentActivity, UpcomingInterviews
import React from "react";

import StatCard from "components/TableauDeBord/CarteStatistique.jsx";
import HiringChart from "components/TableauDeBord/GraphiqueRecrutement.jsx";
import RecentActivity from "components/TableauDeBord/ActiviteRecente.jsx";
import UpcomingInterviews from "components/TableauDeBord/ProchainsEntretiens.jsx";
import { useDashboard } from "hooks/useTableauDeBord";

export default function Dashboard() {
  const {
    stats,
    recentCandidatures,
    upcomingInterviews,
    hiringChart,
    loading,
    error,
    refetch,
  } = useDashboard();

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
          <h1 className="font-display text-xl font-bold tracking-tight text-text-primary md:text-3xl lg:text-4xl">
            Tableau de bord
          </h1>
        </div>
        <p className="font-body text-sm capitalize text-text-muted">
          {formattedDate}
        </p>
      </header>

      <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          <>
            {[1, 2, 3, 4].map(function (i) {
              return (
                <div
                  key={i}
                  className="animate-pulse rounded-2xl border border-border bg-white p-5"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-2 h-4 w-24 rounded bg-gray-200"></div>
                      <div className="mb-2 h-8 w-16 rounded bg-gray-200"></div>
                      <div className="h-3 w-32 rounded bg-gray-200"></div>
                    </div>
                    <div className="h-11 w-11 rounded-xl bg-gray-200"></div>
                  </div>
                </div>
              );
            })}
          </>
        ) : error ? (
          <div className="col-span-full rounded-2xl border border-red-200 bg-red-50 p-5">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-red-500">
                error
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-red-700">
                  Erreur de chargement
                </p>
                <p className="font-body text-xs text-red-600">{error}</p>
                <button
                  type="button"
                  onClick={function () {
                    refetch();
                  }}
                  className="mt-2 rounded-lg border border-red-300 bg-white px-3 py-1.5 font-body text-xs font-semibold text-red-700 transition-colors hover:bg-red-100"
                >
                  Reessayer
                </button>
              </div>
            </div>
          </div>
        ) : stats ? (
          <>
            <StatCard
              icon="inbox"
              label="Candidatures en attente"
              value={stats.candidatures_en_attente.total}
              subLabel=""
              color="primary"
            />
            <StatCard
              icon="folder_open"
              label="Postes ouverts"
              value={stats.postes_ouverts.total}
              subLabel=""
              color="secondary"
            />
            <StatCard
              icon="videocam"
              label="Entretiens cette semaine"
              value={stats.entretiens_cette_semaine.total}
              subLabel={
                stats.entretiens_cette_semaine.aujourd_hui +
                " auj. · " +
                stats.entretiens_cette_semaine.demain +
                " demain"
              }
              color="warning"
            />
            <StatCard
              icon="description"
              label="Offres en attente"
              value={stats.offres_en_attente.total}
              subLabel=""
              color="success"
            />
          </>
        ) : null}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="flex flex-col gap-4 xl:col-span-8">
          <HiringChart data={hiringChart} loading={loading} />
          <UpcomingInterviews interviews={upcomingInterviews} loading={loading} />
        </div>
        <aside className="xl:col-span-4">
          <RecentActivity candidatures={recentCandidatures} loading={loading} />
        </aside>
      </section>
    </div>
  );
}
