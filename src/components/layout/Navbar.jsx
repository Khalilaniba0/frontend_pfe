import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "constants/routes";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Fonctionnalités", href: "#fonctionnalites" },
    { label: "À propos", href: "#a-propos" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-8 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-white/[0.97] backdrop-blur-xl border-b border-primary/15 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-[34px] h-[34px] rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-[0_0_16px_rgba(19,200,236,0.3)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L4 7v10l8 5 8-5V7L12 2z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinejoin="round"
                fill="rgba(255,255,255,0.2)"
              />
              <path
                d="M12 8v8M8 10l4-2 4 2"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="font-display font-bold text-xl text-slate-900 tracking-tight">
            Talen<span className="text-primary">tia</span>
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-slate-500 text-sm font-medium font-body hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to={ROUTES.LOGIN}
            className="bg-transparent border border-slate-200 text-slate-600 px-5 py-2 rounded-lg text-sm font-medium font-body hover:border-primary hover:text-primary transition-all no-underline"
          >
            Se connecter
          </Link>
          <Link
            to={ROUTES.SIGNUP}
            className="bg-gradient-to-br from-primary to-primary-dark text-white px-5 py-2 rounded-lg text-sm font-semibold font-body shadow-[0_4px_15px_rgba(19,200,236,0.35)] hover:opacity-90 transition-opacity no-underline"
          >
            S'inscrire gratuitement
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden bg-transparent border-none text-slate-900 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/[0.98] backdrop-blur-xl px-8 py-6 flex flex-col gap-5 border-t border-primary/10 shadow-lg">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-slate-600 text-base font-body hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
          <Link
            to={ROUTES.LOGIN}
            onClick={() => setMenuOpen(false)}
            className="bg-transparent border border-slate-200 text-slate-600 px-5 py-3 rounded-lg text-sm font-medium font-body hover:border-primary hover:text-primary transition-all text-center no-underline"
          >
            Se connecter
          </Link>
          <Link
            to={ROUTES.SIGNUP}
            onClick={() => setMenuOpen(false)}
            className="bg-gradient-to-br from-primary to-primary-dark text-white py-3 rounded-lg text-sm font-semibold font-body text-center no-underline"
          >
            S'inscrire gratuitement
          </Link>
        </div>
      )}
    </nav>
  );
}
