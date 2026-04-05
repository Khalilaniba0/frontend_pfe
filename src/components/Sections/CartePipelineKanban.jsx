import React from "react";
import FeatureCard from "./CarteFonctionnalite.jsx";

const icon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M9 9h6M9 12h6M9 15h4" />
  </svg>
);

export default function PipelineKanbanCard() {
  return (
    <FeatureCard
      icon={icon}
      title="Pipeline Kanban"
      description="Visualisez chaque étape du recrutement en temps réel. Glissez-déposez les candidats d'une étape à l'autre en un clic."
      tag="Core"
    />
  );
}
