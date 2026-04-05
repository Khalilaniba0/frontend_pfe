import React from "react";
import FeatureCard from "./CarteFonctionnalite.jsx";

const icon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <circle cx="12" cy="15" r="2" fill="currentColor" stroke="none" />
  </svg>
);

export default function PlanningEntretiensCard() {
  return (
    <FeatureCard
      icon={icon}
      title="Planning d'entretiens"
      description="Planifiez, confirmez et suivez vos entretiens avec rappels automatiques pour les équipes RH et les candidats."
      tag="Planning"
    />
  );
}
