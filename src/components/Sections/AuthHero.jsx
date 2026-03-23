import React from "react";

export default function AuthHero() {
  const avatars = ["NB", "LF", "PS"];
  const gradients = [
    "from-pink-400 to-rose-500",
    "from-sky-400 to-blue-500",
    "from-amber-400 to-orange-500",
  ];

  return (
    <div className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-bg-page to-secondary/10 lg:flex">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80')",
        }}
      ></div>

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top right, rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.5), transparent)",
        }}
      ></div>

      <div className="relative z-10 max-w-[480px] px-12 py-10">
        <span className="mb-5 inline-block rounded-full border border-primary/30 bg-primary/20 px-3 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-primary">
          Prêt pour l'entreprise
        </span>

        <h1 className="mb-4 font-display text-4xl font-bold leading-tight tracking-tight text-white">
          Donnez de l'intelligence à votre gestion des effectifs.
        </h1>

        <p className="m-0 font-body text-base leading-relaxed text-slate-200">
          Rejoignez des milliers d'organisations qui simplifient leurs
          opérations RH, du recrutement à la gestion de la performance.
        </p>

        <div className="mt-8 flex items-center gap-4">
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
