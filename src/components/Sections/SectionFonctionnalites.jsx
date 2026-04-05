import React from "react";
import PipelineKanbanCard from "components/Sections/CartePipelineKanban.jsx";
import GestionCandidatsCard from "components/Sections/GestionCandidatsCard.jsx";
import PlanningEntretiensCard from "components/Sections/PlanningEntretiensCard.jsx";
import AnalyticsRapportsCard from "components/Sections/CarteAnalysesRapports.jsx";
import AutomatisationCard from "components/Sections/AutomatisationCard.jsx";

export default function FeaturesSection() {
  return (
    <section id="fonctionnalites" className="th-features-section scroll-mt-28 bg-bg-page py-16 px-4 relative overflow-hidden md:py-24 md:px-8">
      {/* Subtle bg decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse,rgba(19,200,236,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Header */}
        <div className="th-features-header text-center mb-10 md:mb-16">
          <span className="inline-block bg-primary/10 border border-primary/25 rounded-full px-3.5 py-1.5 text-xs text-primary-dark font-semibold font-body tracking-wider mb-5">
            Fonctionnalités
          </span>
          <h2 className="font-body font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight leading-tight mb-4">
            Tout ce qu'il faut pour recruter
            <br />
            <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              avec précision
            </span>
          </h2>
          <p className="font-body text-sm sm:text-base text-slate-500 max-w-lg mx-auto leading-relaxed">
            Une plateforme unifiée pour piloter l'ensemble de vos processus de recrutement, de la sourcing à l'embauche.
          </p>
        </div>

        {/* Grid */}
        <div className="th-features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <PipelineKanbanCard />
          <GestionCandidatsCard />
          <PlanningEntretiensCard />
          <AnalyticsRapportsCard />
          <AutomatisationCard />
        </div>
      </div>
    </section>
  );
}
