import React from "react";
import PropTypes from "prop-types";

export default function RecruitmentTimeCard({ days = 22, improvement = 5 }) {
  const progressPercent = Math.min((improvement / days) * 100, 100);

  return (
    <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="relative z-10">
        <div className="mb-4 flex items-start justify-between">
          <h4 className="font-display text-lg font-semibold text-text-primary">
            Temps Moyen de Recrutement
          </h4>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-light transition-transform duration-200 group-hover:scale-105">
            <span className="material-symbols-outlined text-xl text-secondary">
              timer
            </span>
          </div>
        </div>
        <p className="max-w-[30ch] font-body text-sm leading-relaxed text-text-secondary">
          Votre efficacité s'est améliorée de{" "}
          <span className="font-semibold text-secondary">{improvement} jours</span>{" "}
          ce mois-ci.
        </p>
      </div>

      <div className="relative z-10 mt-6">
        <div className="mb-3 flex items-baseline gap-2">
          <span className="font-display text-4xl font-bold tabular-nums tracking-tight text-text-primary">
            {days}
          </span>
          <span className="font-body text-sm text-text-secondary">jours</span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-bg-soft">
          <div
            className="h-full rounded-full bg-gradient-to-r from-secondary to-primary transition-all duration-700"
            style={{ width: progressPercent + "%" }}
          ></div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="flex items-center gap-1 font-body text-xs text-emerald-600">
            <span className="material-symbols-outlined text-sm">
              trending_down
            </span>
            -{improvement} jours
          </span>
          <span className="font-body text-xs text-text-muted">
            Objectif: 15 jours
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-8 -right-8 opacity-5 transition-opacity duration-200 group-hover:opacity-10">
        <span
          className="material-symbols-outlined text-secondary"
          style={{ fontSize: "140px" }}
        >
          analytics
        </span>
      </div>
    </div>
  );
}

RecruitmentTimeCard.propTypes = {
  days: PropTypes.number,
  improvement: PropTypes.number,
};
