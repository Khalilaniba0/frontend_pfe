import React from "react";
import { ROUTES } from "constants/routes";
import SelectionCard from "components/commun/CarteSelection.jsx";
import BrandLogo from "components/commun/LogoMarque.jsx";

function CandidateIcon() {
  return (
    <svg
      className="h-8 w-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="6" />
      <path d="m21 21-4.35-4.35" />
      <path d="M8 10h4" />
      <path d="M10 8v4" />
    </svg>
  );
}

function CompanyIcon() {
  return (
    <svg
      className="h-8 w-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 10h.01" />
      <path d="M9 13h.01" />
      <path d="M9 16h.01" />
      <path d="M12 10h.01" />
      <path d="M12 13h.01" />
      <path d="M12 16h.01" />
      <path d="M15 10h.01" />
      <path d="M15 13h.01" />
      <path d="M15 16h.01" />
    </svg>
  );
}

export default function SelectionPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_10%,rgba(19,200,236,0.08),transparent_30%),radial-gradient(circle_at_90%_90%,rgba(55,48,163,0.08),transparent_35%),linear-gradient(135deg,#f6f8f8_0%,#ffffff_45%,#f8fafc_100%)] px-5 py-8 font-body sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute -left-16 top-16 h-52 w-52 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-md-secondary/15 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col">
        <header className="mb-8 flex items-center justify-center lg:mb-10">
          <BrandLogo
            to={ROUTES.LANDING}
            className="rounded-full border border-slate-200/80 bg-white/85 px-5 py-2.5 shadow-sm backdrop-blur"
          />
        </header>

        <section className="grid flex-1 grid-cols-1 gap-5 pb-4 md:grid-cols-2 md:gap-6 lg:gap-8">
          <SelectionCard
            icon={<CandidateIcon />}
            label="Je suis candidat"
            title="Je cherche un emploi"
            subtitle="Explorez des centaines d'offres et postulez en quelques clics"
            ctaLabel="Voir les offres"
            to={ROUTES.CANDIDATE_OFFRES}
          />

          <SelectionCard
            icon={<CompanyIcon />}
            label="J'ai une entreprise"
            title="Je recrute pour mon entreprise"
            subtitle="Centralisez vos recrutements et trouvez les meilleurs profils"
            ctaLabel="Accéder à Talentia "
            to={ROUTES.LANDING}
            orbPositionClass="-left-10 -top-8"
          />
        </section>
      </div>
    </main>
  );
}