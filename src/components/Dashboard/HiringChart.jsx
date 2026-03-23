import React from "react";
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function HiringChart() {
  React.useEffect(function () {
    var ctx = document.getElementById("hiring-chart-new").getContext("2d");
    var chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Avr", "Mai", "Juin"],
        datasets: [
          {
            label: "Pourvus",
            backgroundColor: "#818cf8",
            borderColor: "#818cf8",
            data: [60, 72, 88],
            barPercentage: 0.55,
            categoryPercentage: 0.5,
          },
          {
            label: "Ouverts",
            backgroundColor: "#2dd4bf",
            borderColor: "#2dd4bf",
            data: [38, 44, 60],
            barPercentage: 0.55,
            categoryPercentage: 0.5,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            align: "end",
            position: "top",
            labels: {
              color: "#94a3b8",
              font: { size: 11 },
              boxWidth: 10,
              padding: 16,
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              color: "#94a3b8",
              font: { size: 11 },
            },
          },
          y: {
            grid: { color: "#f1f5f9" },
            border: { display: false },
            ticks: {
              color: "#94a3b8",
              font: { size: 11 },
              beginAtZero: true,
              max: 100,
              stepSize: 25,
              padding: 8,
            },
          },
        },
      },
    });

    return function () {
      chartInstance.destroy();
    };
  }, []);

  return (
    <div className="bg-white rounded-xl border border-border p-5 flex flex-col" style={{ height: "260px" }}>
      <h3 className="font-display text-lg font-semibold text-text-primary mb-2">
        Aperçu des recrutements (T2)
      </h3>
      <div className="relative" style={{ flex: 1 }}>
        <canvas id="hiring-chart-new"></canvas>
      </div>
    </div>
  );
}
