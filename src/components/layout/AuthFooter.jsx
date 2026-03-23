import React from "react";

export default function AuthFooter() {
  return (
    <footer className="flex flex-shrink-0 items-center justify-center gap-4 border-t border-border bg-white px-6 py-3">
      <p className="m-0 font-body text-xs text-text-muted">
        &copy; 2026 Talentia ATS. Tous droits réservés.
      </p>
      <div className="hidden items-center gap-4 sm:flex">
        <a
          href="#"
          className="font-body text-xs text-text-muted transition-colors hover:text-primary"
        >
          Confidentialité
        </a>
        <a
          href="#"
          className="font-body text-xs text-text-muted transition-colors hover:text-primary"
        >
          Conditions
        </a>
      </div>
    </footer>
  );
}
