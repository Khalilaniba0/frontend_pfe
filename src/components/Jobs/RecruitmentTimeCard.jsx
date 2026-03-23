import React from "react";
import PropTypes from "prop-types";

export default function RecruitmentTimeCard({ days, improvement }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-border relative overflow-hidden">
      {/* Contenu principal */}
      <div className="relative z-10 h-full flex flex-col justify-between gap-6">
        <div>
          <h4 className="font-display text-lg font-semibold text-text-primary mb-2">
            Temps Moyen de Recrutement
          </h4>
          <p className="font-body text-sm text-text-secondary">
            Votre efficacité s'est améliorée de{" "}
            <span className="font-medium text-indigo-600">{improvement} jours</span> ce mois-ci.
          </p>
        </div>

        <div className="flex items-baseline space-x-2">
          <span className="font-display text-3xl font-bold text-indigo-600">{days}</span>
          <span className="font-body text-sm text-text-secondary">Jours</span>
        </div>
      </div>

      {/* Icône décorative en arrière-plan */}
      <div className="absolute -right-8 -bottom-8 opacity-[0.07] pointer-events-none">
        <span
          className="material-symbols-outlined text-indigo-600"
          style={{ fontSize: "160px", fontVariationSettings: "'FILL' 1" }}
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

RecruitmentTimeCard.defaultProps = {
  days: 22,
  improvement: 5,
};