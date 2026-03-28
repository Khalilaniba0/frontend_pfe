import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "constants/routes";

export default function HeroBanner() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let w = canvas.offsetWidth,
      h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    const dots = Array.from({ length: 55 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }));

    function draw() {
      ctx.clearRect(0, 0, w, h);
      dots.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(19,200,236,0.25)";
        ctx.fill();
      });
      dots.forEach((a, i) =>
        dots.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(19,200,236,${0.07 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        })
      );
      animId = requestAnimationFrame(draw);
    }
    draw();

    const ro = new ResizeObserver(() => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    });
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  const avatars = ["JD", "AM", "KL", "SR"];

  const kanbanCols = [
    { stage: "Nouveau", count: 8 },
    { stage: "Présélection", count: 5 },
    { stage: "Entretien", count: 4 },
    { stage: "Offre", count: 2 },
  ];

  const activities = [
    { text: "Marie D. a passé l'entretien RH", time: "il y a 5 min" },
    { text: "Offre envoyée à Paul R.", time: "il y a 1h" },
    { text: "3 nouveaux candidats aujourd'hui", time: "il y a 2h" },
  ];

  return (
    <section className="th-hero-section relative bg-gradient-to-br from-primary-light via-bg-page to-sky-50 min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      {/* Canvas animé */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
      />

      {/* Soft glow orbs */}
      <div className="absolute top-[10%] -left-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(19,200,236,0.08)_0%,transparent_70%)] blur-[50px] z-0" />
      <div className="absolute bottom-[5%] right-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(14,165,201,0.07)_0%,transparent_70%)] blur-[50px] z-0" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-8 w-full">
        <div className="th-hero-grid grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="th-hero-content flex flex-col gap-7">

            {/* Title */}
            <h1 className="th-hero-title font-body font-extrabold text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] text-slate-900 tracking-tight">
              Le recrutement,{" "}
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
               Recrutez 2x plus vite, sans friction.
              </span>
              <span className="block text-slate-400 font-normal text-2xl mt-2 tracking-normal">
                Talentia ATS — pensé pour aller vite.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="th-hero-subtitle font-body text-lg text-slate-500 leading-relaxed max-w-lg">
              Centralisez vos candidatures, automatisez le suivi et prenez vos
              décisions d'embauche en un seul espace de travail. Plus clair.
              Plus rapide. <span className="text-slate-700 font-medium">Vraiment efficace.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
               <Link
                to={ROUTES.SIGNUP}
                className="rounded-xl bg-gradient-to-br from-primary to-primary-dark px-7 py-3.5 font-body text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] hover:shadow-xl w-full sm:w-auto text-center"
              >
                Démarrez gratuitement
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3.5">
              <div className="flex">
                {avatars.map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-primary-light border-2 border-bg-page flex items-center justify-center text-[0.6rem] text-primary-dark font-extrabold font-body"
                    style={{ marginLeft: i > 0 ? "-8px" : 0 }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <span className="text-sm text-slate-500 font-body">
                <span className="text-primary-dark font-bold">+100</span>{" "}
                recruteurs font confiance à Talentia au quotidien
              </span>
            </div>
          </div>

          {/* RIGHT – Dashboard preview */}
          <div className="th-hero-visual relative hidden lg:block">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08),0_4px_16px_rgba(19,200,236,0.08)]">
              {/* Window bar */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <div className="flex-1 h-[22px] bg-slate-100 rounded-md ml-2" />
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Candidats actifs", val: "247", up: "+12%" },
                  { label: "Entretiens prévus", val: "18", up: "+5%" },
                  { label: "Offres envoyées", val: "6", up: "+2%" },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="bg-bg-soft border border-slate-200 rounded-xl p-3.5"
                  >
                    <div className="text-[0.65rem] text-slate-400 mb-1 font-body">
                      {card.label}
                    </div>
                    <div className="text-xl font-extrabold text-slate-900 font-body leading-none">
                      {card.val}
                    </div>
                    <div className="text-[0.65rem] text-primary-dark mt-1 font-semibold font-body">
                      ↑ {card.up}
                    </div>
                  </div>
                ))}
              </div>

              {/* Kanban preview */}
              <div className="grid grid-cols-4 gap-2.5 mb-4">
                {kanbanCols.map((col, i) => (
                  <div
                    key={i}
                    className="bg-bg-soft border border-slate-200 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-dark" />
                      <span className="text-[0.6rem] text-slate-500 font-body font-semibold">
                        {col.stage}
                      </span>
                    </div>
                    {Array.from({ length: Math.min(col.count, 2) }).map(
                      (_, j) => (
                        <div
                          key={j}
                          className="h-7 bg-white border border-slate-100 rounded-md mb-1.5 flex items-center px-1.5 gap-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                        >
                          <div className="w-3.5 h-3.5 rounded-full bg-slate-200" />
                          <div className="flex-1 h-1.5 rounded bg-slate-100" />
                        </div>
                      )
                    )}
                    <div className="text-[0.6rem] text-slate-400 mt-1 font-body">
                      {col.count} candidats
                    </div>
                  </div>
                ))}
              </div>

              {/* Activity */}
              <div className="bg-bg-soft border border-slate-100 rounded-lg p-3.5 flex flex-col gap-2">
                <div className="text-[0.65rem] text-slate-400 font-body font-semibold mb-1">
                  Activité récente
                </div>
                {activities.map((act, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-dark shrink-0" />
                    <span className="text-[0.7rem] text-slate-500 font-body flex-1">
                      {act.text}
                    </span>
                    <span className="text-[0.65rem] text-slate-400 font-body">
                      {act.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-primary to-primary-dark rounded-xl px-4 py-3 shadow-[0_8px_24px_rgba(19,200,236,0.35)] flex items-center gap-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-white text-xs font-bold font-body">
                Offre acceptée !
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
