import React, { useEffect, useRef } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function HiringChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(function () {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Avr", "Mai", "Juin"],
          datasets: [
            {
              label: "Pourvus",
              backgroundColor: "#13c8ec",
              borderColor: "#13c8ec",
              data: [58, 72, 91],
              barPercentage: 0.6,
              categoryPercentage: 0.55,
              borderRadius: 6,
              borderSkipped: false,
            },
            {
              label: "Ouverts",
              backgroundColor: "#36d1bc",
              borderColor: "#36d1bc",
              data: [42, 48, 63],
              barPercentage: 0.6,
              categoryPercentage: 0.55,
              borderRadius: 6,
              borderSkipped: false,
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
              grid: {
                color: "#f1f5f9",
                drawBorder: false,
              },
              border: { display: false },
              ticks: {
                color: "#94a3b8",
                font: {
                  family: "DM Sans",
                  size: 11,
                },
                padding: 8,
                stepSize: 25,
              },
              beginAtZero: true,
              max: 100,
            },
          },
        },
      });
    }

    return function () {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="flex h-[300px] flex-col rounded-2xl border border-border bg-white p-5 shadow-sm">
      <header className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold tracking-tight text-text-primary">
            Aperçu des recrutements
          </h3>
          <p className="mt-0.5 font-body text-xs text-text-muted">
            Trimestre 2 — Avril à Juin
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-primary"></span>
            <span className="font-body text-xs font-medium text-text-secondary">
              Pourvus
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-secondary"></span>
            <span className="font-body text-xs font-medium text-text-secondary">
              Ouverts
            </span>
          </div>
        </div>
      </header>
      <div className="relative min-h-0 flex-1">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}
