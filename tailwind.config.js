/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["public/**/*.html", "src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // ── Couleurs existantes du projet ──────────────────────────────
        primary: {
          DEFAULT: "#13c8ec",
          light: "#f0fdff",
          dark: "#0891b2",
        },
        secondary: {
          DEFAULT: "#36d1bc",
          light: "#f0fdfb",
        },
        text: {
          primary: "#0f172a",
          secondary: "#64748b",
          muted: "#94a3b8",
        },
        border: "#e2e8f0",
        "bg-soft": "#f8fafc",
        "bg-page": "#f6f8f8",
        success: "#16a34a",

        // ── Tokens Material Design — thème Indigo/Violet (Jobs page) ───
        "md-primary": "#3730a3",
        "md-secondary": "#4f46e5",
        "md-surface": "#f7f9fb",
        "md-surface-container": "#eceef0",
        "md-surface-container-low": "#f2f4f6",
        "md-surface-container-lowest": "#ffffff",
        "md-surface-container-high": "#e6e8ea",
        "md-surface-container-highest": "#e0e3e5",
        "md-surface-dim": "#d8dadc",
        "md-on-surface": "#191c1e",
        "md-on-surface-variant": "#43474f",
        "md-secondary-container": "#ede9fe",
        "md-on-secondary-container": "#4338ca",
        "md-primary-fixed-dim": "#c4b5fd",
        "md-on-primary-container": "#799dd6",
        "md-tertiary-fixed": "#ffdbca",
        "md-on-tertiary-fixed-variant": "#723610",
        "md-outline-variant": "#c3c6d1",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        // aliases utilisés dans la page Jobs
        headline: ["Syne", "sans-serif"],
        label: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};