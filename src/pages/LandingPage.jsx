import React from "react";
import Navbar from "components/layout/Navbar.jsx";
import HeroBanner from "components/Sections/HeroBanner.jsx";
import FeaturesSection from "components/Sections/FeaturesSection.jsx";
import Footer from "components/layout/Footer.jsx";

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
