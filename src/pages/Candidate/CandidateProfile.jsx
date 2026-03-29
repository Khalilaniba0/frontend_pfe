import React, { useState } from "react";
import { User, Mail, Phone, Globe, Save, Loader2, CheckCircle } from "lucide-react";
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
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gérez vos informations personnelles.
        </p>
      </div>

      {/* Avatar + email */}
      <div className="flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-xl font-bold text-white shadow-md">
          {initials}
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold text-gray-900">
            {candidat?.nom || "Candidat"}
          </h2>
          <p className="truncate text-sm text-gray-500">
            {candidat?.email || ""}
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      >
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-700">
            <CheckCircle size={16} />
            Profil mis à jour avec succès !
          </div>
        )}

        {/* Nom */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Nom complet
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 transition-colors focus-within:border-teal-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-teal-500/20">
            <User size={16} className="shrink-0 text-gray-400" />
            <input
              name="nom"
              value={form.nom}
              onChange={handleChange}
              className="w-full border-none bg-transparent p-0 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Email
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-100 px-4 py-2.5">
            <Mail size={16} className="shrink-0 text-gray-400" />
            <input
              value={candidat?.email || ""}
              readOnly
              className="w-full border-none bg-transparent p-0 text-sm text-gray-500 focus:outline-none focus:ring-0"
            />
          </div>
          <p className="mt-1 text-xs text-gray-400">
            L'email ne peut pas être modifié.
          </p>
        </div>

        {/* Téléphone */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Téléphone
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 transition-colors focus-within:border-teal-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-teal-500/20">
            <Phone size={16} className="shrink-0 text-gray-400" />
            <input
              name="telephone"
              type="tel"
              value={form.telephone}
              onChange={handleChange}
              placeholder="+212 6XX XXX XXX"
              className="w-full border-none bg-transparent p-0 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        {/* Portfolio */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
            Portfolio / Site web
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 transition-colors focus-within:border-teal-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-teal-500/20">
            <Globe size={16} className="shrink-0 text-gray-400" />
            <input
              name="portfolio_url"
              type="url"
              value={form.portfolio_url}
              onChange={handleChange}
              placeholder="https://monportfolio.com"
              className="w-full border-none bg-transparent p-0 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-600 disabled:opacity-60"
        >
          {saving ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sauvegarde…
            </>
          ) : (
            <>
              <Save size={16} />
              Sauvegarder les modifications
            </>
          )}
        </button>
      </form>
    </div>
  );
}
