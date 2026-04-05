import React from "react";
import Navbar from "components/miseEnPage/BarreNavigation.jsx";
import HeroBanner from "components/Sections/BanniereHero.jsx";
import FeaturesSection from "components/Sections/SectionFonctionnalites.jsx";
import Footer from "components/miseEnPage/PiedDePage.jsx";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-bg-page font-body">
      <Navbar />

      <main className="flex-1">
        <HeroBanner />
        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
}
