import React from "react";
import authHeroVisual from "assets/auth-hero-visual.svg";

export default function AuthHero() {
  const avatars = ["NB", "LF", "PS"];
  const gradients = [
    "from-pink-400 to-rose-500",
    "from-sky-400 to-blue-500",
    "from-amber-400 to-orange-500",
  ];

  return (
    <div className="relative hidden min-h-[520px] flex-1 overflow-hidden md:block">
      <img
        src={authHeroVisual}
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover"
        loading="eager"
      />

      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-slate-900/60 via-sky-900/45 to-slate-950/75" />

      <div className="absolute inset-x-8 bottom-9 z-10 max-w-[480px] text-white lg:inset-x-10 lg:bottom-12">
        <span className="mb-4 inline-block rounded-full border border-[#7db8ff]/30 bg-[#007BFF]/20 px-3 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-[#94c5ff]">
          Prêt pour l'entreprise
        </span>

        <h1 className="mb-3 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white lg:mb-4 lg:text-5xl lg:leading-[1.05]">
          Donnez de l'intelligence à votre gestion des effectifs.
        </h1>

        <p className="m-0 font-body text-sm leading-relaxed text-slate-200 lg:text-base">
          Rejoignez des milliers d'organisations qui simplifient leurs
          opérations RH, du recrutement à la gestion de la performance.
        </p>

        <div className="mt-6 flex items-center gap-3 lg:mt-8 lg:gap-4">
          <div className="flex">
            {avatars.map(function (initials, i) {
              return (
                <div
                  key={i}
                  className={
                    "flex h-9 w-9 items-center justify-center rounded-xl border-2 border-white bg-gradient-to-br font-body text-xs font-bold text-white shadow-sm " +
                    gradients[i]
                  }
                  style={{ marginLeft: i === 0 ? 0 : "-8px" }}
                >
                  {initials}
                </div>
              );
            })}
          </div>
          <span className="font-body text-sm font-medium text-white">
            Approuvé par +500 entreprises
          </span>
        </div>
      </div>
    </div>
  );
}
