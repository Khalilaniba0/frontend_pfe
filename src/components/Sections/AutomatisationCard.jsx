import React from "react";
import FeatureCard from "./CarteFonctionnalite.jsx";

const icon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

export default function AutomatisationCard() {
  return (
    <FeatureCard
      icon={icon}
      title="Automatisation intelligente"
      description="Automatisez les emails de suivi, les mises à jour de statut et les relances pour gagner du temps sur les tâches répétitives."
      tag="Automation"
    />
  );
}
