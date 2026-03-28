import React from "react";
import { Link } from "react-router-dom";

function BrandLogoContent({ textClassName, iconClassName }) {
  return (
    <>
      <span className={iconClassName}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
      </span>

      <span className={textClassName}>
        Talen<span className="text-primary">tia</span>
      </span>
    </>
  );
}

export default function BrandLogo({
  to,
  className = "",
  textClassName = "font-display text-xl font-bold tracking-tight text-text-primary",
  iconClassName = "flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/25",
}) {
  const sharedClassName = `inline-flex items-center gap-3 ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={`${sharedClassName} no-underline`} aria-label="Talentia">
        <BrandLogoContent textClassName={textClassName} iconClassName={iconClassName} />
      </Link>
    );
  }

  return (
    <div className={sharedClassName} aria-label="Talentia">
      <BrandLogoContent textClassName={textClassName} iconClassName={iconClassName} />
    </div>
  );
}