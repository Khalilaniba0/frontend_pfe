import React, { useState, useEffect } from "react";

import StatCard from "components/Dashboard/StatCard.jsx";
import HiringChart from "components/Dashboard/HiringChart.jsx";
import RecentActivity from "components/Dashboard/RecentActivity.jsx";
import UpcomingInterviews from "components/Dashboard/UpcomingInterviews.jsx";
import { getDashboardStats } from "service/restApiDashboard";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  useEffect(function () {
    var cancelled = false;

    async function fetchStats() {
      setLoading(true);
      setError(null);
      try {
        const result = await getDashboardStats();
        if (!cancelled) {
          setStats(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.response?.data?.message || "Erreur de chargement des statistiques");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchStats();

    return function () {
      cancelled = true;
    };
  }, []);

  return (
    <div className="animate-fade-in">
      <header className="mb-8 flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-xl font-bold tracking-tight text-text-primary md:text-3xl lg:text-4xl">
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
              </div>
            </div>
          </div>
        ) : stats ? (
          <>
            <StatCard
              icon="inbox"
              label="Candidatures en attente"
              value={stats.candidatures_en_attente.total}
              subLabel={
                "+" +
                stats.candidatures_en_attente.nouvelles_aujourd_hui +
                " nouvelles aujourd'hui"
              }
              color="primary"
            />
            <StatCard
              icon="folder_open"
              label="Postes ouverts"
              value={stats.postes_ouverts.total}
              subLabel={
                stats.postes_ouverts.en_cloture_cette_semaine +
                " postes en clôture cette semaine"
              }
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
              subLabel={
                "Délai moyen de réponse : " +
                stats.offres_en_attente.delai_moyen_reponse_jours +
                " jours"
              }
              color="success"
            />
          </>
        ) : null}
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
