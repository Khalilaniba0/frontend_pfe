import React from "react";
import Navbar from "components/layout/Navbar.jsx";
import HeroBanner from "components/Sections/HeroBanner.jsx";
import FeaturesSection from "components/Sections/FeaturesSection.jsx";
import Footer from "components/layout/Footer.jsx";

export default function LandingPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-bg-page font-body">
      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

        html { scroll-behavior: smooth; }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f6f8f8; }
        ::-webkit-scrollbar-thumb { background: rgba(19,200,236,0.35); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(19,200,236,0.6); }

        /* Selection */
        ::selection { background: rgba(19,200,236,0.2); color: #0f172a; }

        /* Focus states */
        button:focus-visible { outline: 2px solid #13c8ec; outline-offset: 3px; }
        a:focus-visible { outline: 2px solid #13c8ec; outline-offset: 2px; }
      `}</style>

      <Navbar />

      <main className="flex-1">
        <HeroBanner />
        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
}
