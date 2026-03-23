import React from "react";

const footerLinks = {
  Produit: ["Fonctionnalités", "Pipeline Kanban", "Analytics", "Tarifs"],
  Entreprise: ["À propos", "Contact", "Confidentialité", "CGU"],
};

const socialIcons = [
  { label: "LinkedIn", d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
  { label: "Twitter", d: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
  { label: "GitHub", d: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" },
];

export default function Footer() {
  return (
    <footer id="a-propos" className="th-footer-section scroll-mt-28 bg-white border-t border-slate-100 pt-12 pb-6 px-8">
      <div className="max-w-[1200px] mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-[0_0_14px_rgba(19,200,236,0.25)]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L4 7v10l8 5 8-5V7L12 2z"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                    fill="rgba(255,255,255,0.2)"
                  />
                  <path d="M12 8v8M8 10l4-2 4 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
             <span className="font-display font-bold text-xl text-slate-900 tracking-tight">
            Talen<span className="text-primary">tia</span>
              </span>
            </div>

            <p className="font-body text-sm text-slate-400 leading-relaxed max-w-[200px]">
              La plateforme ATS nouvelle génération pour les équipes RH modernes.
            </p>

            {/* Socials */}
            <div className="flex gap-2">
              {socialIcons.map((s, i) => (
                <button
                  key={i}
                  title={s.label}
                  className="w-[34px] h-[34px] rounded-lg bg-bg-soft border-[1.5px] border-slate-200 flex items-center justify-center text-slate-400 transition-all hover:border-primary hover:text-primary-dark hover:bg-primary/[0.06]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d={s.d} />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h5 className="font-body font-bold text-[0.8125rem] text-slate-900 mb-4 tracking-wide uppercase">
                {category}
              </h5>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-sm text-slate-500 hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap justify-between items-center gap-4 pt-6 border-t border-slate-100">
          <p className="font-body text-[0.8125rem] text-slate-400">
            © 2026 Talentia ATS. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-[7px] h-[7px] rounded-full bg-success shadow-[0_0_6px_rgba(22,163,74,0.5)]" />
            <span className="font-body text-xs text-slate-400">
              Tous les systèmes opérationnels · 99.9% uptime
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
