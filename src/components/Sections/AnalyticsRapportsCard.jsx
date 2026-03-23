import React from "react";
import FeatureCard from "./FeatureCard.jsx";

const icon = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

export default function AnalyticsRapportsCard() {
  return (
    <FeatureCard
      icon={icon}
      title="Analytics & rapports"
      description="Mesurez vos KPIs RH : taux de conversion, temps moyen de recrutement, sources les plus efficaces."
      tag="Analytics"
    />
  );
}
