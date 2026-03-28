import React from "react";
import { Link } from "react-router-dom";

export default function SelectionCard({
  icon,
  label,
  title,
  subtitle,
  ctaLabel,
  to,
  orbPositionClass = "-right-10 -top-8",
}) {
  return (
    <article className="group relative flex h-full min-h-[320px] flex-col rounded-3xl border border-cyan-200/70 bg-gradient-to-br from-primary-light via-white to-cyan-100/70 p-7 shadow-[0_18px_50px_rgba(8,145,178,0.13)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015] hover:shadow-[0_28px_65px_rgba(8,145,178,0.2)] sm:p-8">
      <div
        className={`absolute h-36 w-36 rounded-full bg-cyan-300/25 blur-2xl ${orbPositionClass}`}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg shadow-primary/35">
          {icon}
        </div>

        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-dark/80">
          {label}
        </p>

        <h2 className="font-display text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
          {title}
        </h2>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
          {subtitle}
        </p>

        <div className="mt-auto pt-8">
          <Link
            to={to}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary-dark px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 transition-all duration-200 hover:shadow-xl hover:shadow-primary/35"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}