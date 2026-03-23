import React from "react";
import FeatureCard from "./FeatureCard.jsx";

const icon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    <path d="M19 8l2 2-4 4" strokeLinecap="round" />
  </svg>
);

export default function GestionCandidatsCard() {
  return (
    <FeatureCard
      icon={icon}
      title="Gestion des candidats"
      description="Centralisez profils, CV, notes et historique d'échanges pour chaque candidat dans une fiche unifiée."
      tag="Core"
    />
  );
}
