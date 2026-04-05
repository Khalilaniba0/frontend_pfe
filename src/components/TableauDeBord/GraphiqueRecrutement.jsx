import React, { useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import {
  Chart,
  BarController,
  LineController,
  BarElement,
  LineElement,
  PointElement,
  Filler,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  BarController,
  LineController,
  BarElement,
  LineElement,
  PointElement,
  Filler,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function HiringChart({ data, loading }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const chartData = useMemo(
    function () {
      return (
        data || {
          labels: [],
          candidatures: [],
          pourvus: [],
          tauxConversion: [],
        }
      );
    },
    [data]
  );

  // KPI calculés
  const totalCandidatures = chartData
    ? chartData.candidatures.reduce(function (a, b) { return a + b; }, 0)
    : 0;
  const totalPourvus = chartData
    ? chartData.pourvus.reduce(function (a, b) { return a + b; }, 0)
    : 0;
  const tauxMoyen = chartData && chartData.tauxConversion.length > 0
    ? Math.round(
        chartData.tauxConversion.reduce(function (a, b) { return a + b; }, 0) /
          chartData.tauxConversion.length
      )
    : 0;

  useEffect(
    function () {
      if (!chartRef.current || !chartData || chartData.labels.length === 0) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
          chartInstance.current = null;
        }
        return;
      }

      const ctx = chartRef.current.getContext("2d");

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: chartData.labels,
          datasets: [
            {
              type: "bar",
              label: "Candidatures reçues",
              data: chartData.candidatures,
              backgroundColor: "#13c8ec26",
              borderColor: "#13c8ec",
              borderWidth: 2,
              borderRadius: 8,
              borderSkipped: false,
              yAxisID: "y",
              barPercentage: 0.55,
              categoryPercentage: 0.6,
            },
            {
              type: "bar",
              label: "Postes pourvus",
              data: chartData.pourvus,
              backgroundColor: "#36d1bc26",
              borderColor: "#36d1bc",
              borderWidth: 2,
              borderRadius: 8,
              borderSkipped: false,
              yAxisID: "y",
              barPercentage: 0.55,
              categoryPercentage: 0.6,
            },
            {
              type: "line",
              label: "Taux de conversion %",
              data: chartData.tauxConversion,
              borderColor: "#0b61f5",
              backgroundColor: "#0b61f515",
              borderWidth: 2.5,
              pointBackgroundColor: "#0b61f5",
              pointBorderColor: "#fff",
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 7,
              fill: true,
              tension: 0.4,
              yAxisID: "y2",
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              mode: "index",
              intersect: false,
              backgroundColor: "#0f172a",
              titleFont: {
                family: "DM Sans",
                size: 12,
                weight: "600",
              },
              bodyFont: {
                family: "DM Sans",
                size: 11,
              },
              padding: 10,
              cornerRadius: 8,
              displayColors: true,
              boxWidth: 8,
              boxHeight: 8,
              boxPadding: 4,
              callbacks: {
                label: function (context) {
                  if (context.dataset.label === "Taux de conversion %") {
                    return " Taux de conversion : " + context.parsed.y + "%";
                  }
                  return " " + context.dataset.label + " : " + context.parsed.y;
                },
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: {
                color: "#64748b",
                font: {
                  family: "DM Sans",
                  size: 12,
                  weight: "500",
                },
              },
              border: { display: false },
            },
            y: {
              type: "linear",
              position: "left",
              beginAtZero: true,
              grid: { color: "#f1f5f9" },
              border: { display: false },
              ticks: {
                color: "#94a3b8",
                font: { family: "DM Sans", size: 11 },
                stepSize: 20,
                padding: 8,
              },
            },
            y2: {
              type: "linear",
              position: "right",
              beginAtZero: true,
              max: 100,
              grid: { drawOnChartArea: false },
              border: { display: false },
              ticks: {
                color: "#0b61f5",
                font: { family: "DM Sans", size: 11 },
                callback: function (value) {
                  return value + "%";
                },
              },
            },
          },
        },
      });

      return function () {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    },
    [chartData]
  );

  return (
    <div className="flex h-64 sm:h-80 lg:h-[380px] flex-col rounded-2xl border border-border bg-white p-5 shadow-sm">
      <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-display text-base font-semibold tracking-tight text-text-primary sm:text-lg">
            Aperçu des recrutements
          </h3>
          <p className="mt-0.5 font-body text-xs text-text-muted">
            6 derniers mois
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-primary"></span>
            <span className="font-body text-xs font-medium text-text-secondary">
              Candidatures
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-secondary"></span>
            <span className="font-body text-xs font-medium text-text-secondary">
              Pourvus
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-blue-500"></span>
            <span className="font-body text-xs font-medium text-text-secondary">
              Conversion
            </span>
          </div>
        </div>
      </header>

      {/* KPI Pills */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light px-3 py-1.5 font-display text-xs font-semibold text-primary">
          <span className="material-symbols-outlined text-sm">inbox</span>
          {loading ? "…" : totalCandidatures} Candidatures
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary-light px-3 py-1.5 font-display text-xs font-semibold text-secondary">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          {loading ? "…" : totalPourvus} Pourvus
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 font-display text-xs font-semibold text-blue-600">
          <span className="material-symbols-outlined text-sm">trending_up</span>
          {loading ? "…" : tauxMoyen}% Conversion
        </span>
      </div>

      <div className="relative min-h-0 flex-1">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <p className="font-body text-sm text-text-muted">Chargement du graphique...</p>
          </div>
        ) : !chartData?.labels?.length ? (
          <div className="flex h-full items-center justify-center">
            <p className="font-body text-sm text-text-muted">Aucune donnee disponible</p>
          </div>
        ) : (
          <canvas ref={chartRef}></canvas>
        )}
      </div>
    </div>
  );
}

HiringChart.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string),
    candidatures: PropTypes.arrayOf(PropTypes.number),
    pourvus: PropTypes.arrayOf(PropTypes.number),
    tauxConversion: PropTypes.arrayOf(PropTypes.number),
  }),
  loading: PropTypes.bool,
};

HiringChart.defaultProps = {
  data: null,
  loading: false,
};
