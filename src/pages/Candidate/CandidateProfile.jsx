import React, { useState } from "react";
import { useCandidateAuth } from "context/CandidateAuthContext";
import { mettreAJourProfil } from "service/restApiCandidat";

export default function CandidateProfile() {
  const { candidat, refreshProfile } = useCandidateAuth();

  const [form, setForm] = useState({
    nom: candidat?.nom || "",
    telephone: candidat?.telephone || "",
    portfolio_url: candidat?.portfolio_url || "",
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm(function (prev) {
      return { ...prev, [e.target.name]: e.target.value };
    });
    setSuccess(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      setSaving(true);
      await mettreAJourProfil(form);
      await refreshProfile();
      setSuccess(true);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Erreur lors de la mise à jour."
      );
    } finally {
      setSaving(false);
    }
  }

  const initials = (candidat?.nom || "C")
    .split(" ")
    .map(function (w) {
      return w[0];
    })
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="mx-auto max-w-2xl space-y-6 pt-2">
      <div>
        <h1 className="font-display text-xl font-bold tracking-tight text-text-primary md:text-3xl lg:text-4xl">
          Mon Profil
        </h1>
        <p className="mt-1 font-body text-sm text-text-secondary">
          Gérez vos informations personnelles.
        </p>
      </div>

      {/* Avatar + email */}
      <div className="flex items-center gap-5 rounded-2xl border border-border bg-white p-6 shadow-sm">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary font-display text-xl font-bold text-white shadow-md">
          {initials}
        </div>
        <div className="min-w-0">
          <h2 className="truncate font-display text-lg font-bold text-text-primary">
            {candidat?.nom || "Candidat"}
          </h2>
          <p className="truncate font-body text-sm text-text-secondary">
            {candidat?.email || ""}
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-border bg-white p-6 shadow-sm"
      >
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 font-body text-sm text-emerald-700">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Profil mis à jour avec succès !
          </div>
        )}

        {/* Nom */}
        <div>
          <label className="mb-1.5 block font-body text-[10px] font-bold uppercase tracking-wider text-text-muted">
            Nom complet
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-bg-page px-4 py-2.5 transition-colors focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20">
            <span className="material-symbols-outlined shrink-0 text-[18px] text-text-muted">person</span>
            <input
              name="nom"
              value={form.nom}
              onChange={handleChange}
              className="w-full border-none bg-transparent p-0 font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="mb-1.5 block font-body text-[10px] font-bold uppercase tracking-wider text-text-muted">
            Email
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-bg-page px-4 py-2.5 opacity-70">
            <span className="material-symbols-outlined shrink-0 text-[18px] text-text-muted">mail</span>
            <input
              value={candidat?.email || ""}
              readOnly
              className="w-full border-none bg-transparent p-0 font-body text-sm text-text-secondary focus:outline-none focus:ring-0"
            />
          </div>
          <p className="mt-1.5 font-body text-xs text-text-muted">
            L'email ne peut pas être modifié.
          </p>
        </div>

        {/* Téléphone */}
        <div>
          <label className="mb-1.5 block font-body text-[10px] font-bold uppercase tracking-wider text-text-muted">
            Téléphone
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-bg-page px-4 py-2.5 transition-colors focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20">
            <span className="material-symbols-outlined shrink-0 text-[18px] text-text-muted">call</span>
            <input
              name="telephone"
              type="tel"
              value={form.telephone}
              onChange={handleChange}
              placeholder="+212 6XX XXX XXX"
              className="w-full border-none bg-transparent p-0 font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Portfolio */}
        <div>
          <label className="mb-1.5 block font-body text-[10px] font-bold uppercase tracking-wider text-text-muted">
            Portfolio / Site web
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-bg-page px-4 py-2.5 transition-colors focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20">
            <span className="material-symbols-outlined shrink-0 text-[18px] text-text-muted">language</span>
            <input
              name="portfolio_url"
              type="url"
              value={form.portfolio_url}
              onChange={handleChange}
              placeholder="https://monportfolio.com"
              className="w-full border-none bg-transparent p-0 font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-body text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-dark disabled:opacity-60"
        >
          {saving ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
              Sauvegarde…
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">save</span>
              Sauvegarder les modifications
            </>
          )}
        </button>
      </form>
    </div>
  );
}
