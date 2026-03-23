import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "constants/routes";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(function () {
    const onScroll = function () {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return function () {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navLinks = [
    { label: "Fonctionnalités", href: "#fonctionnalites" },
    { label: "À propos", href: "#a-propos" },
  ];

  return (
    <nav
      className={
        "fixed left-0 right-0 top-0 z-50 px-6 py-4 transition-all duration-300 md:px-8 " +
        (scrolled
          ? "border-b border-primary/15 bg-white/95 shadow-sm backdrop-blur-xl"
          : "bg-transparent")
      }
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/25">
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
          <span className="font-display text-xl font-bold tracking-tight text-text-primary">
            Talen<span className="text-primary">tia</span>
          </span>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(function (item) {
            return (
              <a
                key={item.label}
                href={item.href}
                className="font-body text-sm font-medium text-text-secondary transition-colors duration-150 hover:text-primary"
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to={ROUTES.LOGIN}
            className="rounded-xl border border-border bg-white px-5 py-2.5 font-body text-sm font-medium text-text-primary no-underline transition-all duration-150 hover:border-primary hover:text-primary"
          >
            Se connecter
          </Link>
          <Link
            to={ROUTES.SIGNUP}
            className="rounded-xl bg-gradient-to-br from-primary to-primary-dark px-5 py-2.5 font-body text-sm font-semibold text-white no-underline shadow-md shadow-primary/30 transition-all duration-150 hover:shadow-lg"
          >
            S'inscrire gratuitement
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border-none bg-transparent text-text-primary transition-colors hover:bg-bg-soft md:hidden"
          onClick={function () {
            setMenuOpen(!menuOpen);
          }}
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

      {menuOpen && (
        <div className="flex flex-col gap-4 border-t border-primary/10 bg-white/98 px-6 py-6 shadow-lg backdrop-blur-xl md:hidden">
          {navLinks.map(function (item) {
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={function () {
                  setMenuOpen(false);
                }}
                className="font-body text-base text-text-secondary transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            );
          })}
          <Link
            to={ROUTES.LOGIN}
            onClick={function () {
              setMenuOpen(false);
            }}
            className="rounded-xl border border-border bg-white px-5 py-3 text-center font-body text-sm font-medium text-text-primary no-underline transition-all hover:border-primary hover:text-primary"
          >
            Se connecter
          </Link>
          <Link
            to={ROUTES.SIGNUP}
            onClick={function () {
              setMenuOpen(false);
            }}
            className="rounded-xl bg-gradient-to-br from-primary to-primary-dark py-3 text-center font-body text-sm font-semibold text-white no-underline shadow-md"
          >
            S'inscrire gratuitement
          </Link>
        </div>
      )}
    </nav>
  );
}
