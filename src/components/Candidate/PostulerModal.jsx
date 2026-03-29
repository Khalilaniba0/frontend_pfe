import React, { useState } from "react";
import PropTypes from "prop-types";
import { X, Upload, FileText, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useCandidateAuth } from "context/CandidateAuthContext";
import { postuler } from "service/restApiCandidature";

export default function PostulerModal({ offreId, offreTitre, onClose, onSuccess }) {
  const { candidat } = useCandidateAuth();

  const [form, setForm] = useState({
    nom: candidat?.nom || "",
    email: candidat?.email || "",
    telephone: candidat?.telephone || "",
    lettre_motivation: "",
  });
  const [cvFile, setCvFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm(function (prev) {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("offre", offreId);
    formData.append("nom", form.nom);
    formData.append("email", form.email);
    formData.append("telephone", form.telephone);
    formData.append("lettre_motivation", form.lettre_motivation);
    if (cvFile) {
      formData.append("cv_url", cvFile);
    }

    try {
      setSubmitting(true);
      await postuler(formData);
      setSuccess(true);
      setTimeout(function () {
        if (onSuccess) onSuccess();
      }, 1500);
    } catch (err) {
      const msg =
        err?.response?.data?.message || "Erreur lors de la candidature.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Postuler à cette offre
            </h2>
            {offreTitre && (
              <p className="mt-0.5 text-sm text-gray-500 truncate max-w-[340px]">
                {offreTitre}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Success view */}
        {success ? (
          <div className="flex flex-col items-center gap-3 px-6 py-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50">
              <CheckCircle size={32} className="text-teal-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Candidature envoyée !
            </h3>
            <p className="text-sm text-gray-500 text-center">
              Votre candidature a été transmise avec succès. Vous pouvez suivre
              son avancement depuis votre tableau de bord.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            {/* Nom */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Nom complet
              </label>
              <input
                name="nom"
                value={form.nom}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 transition-colors focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 transition-colors focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            {/* Téléphone */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Téléphone
              </label>
              <input
                name="telephone"
                type="tel"
                value={form.telephone}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 transition-colors focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            {/* Lettre de motivation */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                Lettre de motivation{" "}
                <span className="font-normal normal-case text-gray-400">
                  (optionnel)
                </span>
              </label>
              <textarea
                name="lettre_motivation"
                value={form.lettre_motivation}
                onChange={handleChange}
                rows={3}
                placeholder="Expliquez pourquoi vous êtes le candidat idéal…"
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 transition-colors focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            {/* Upload CV */}
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                CV (PDF, DOC, DOCX)
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-4 transition-colors hover:border-teal-400 hover:bg-teal-50/30">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50">
                  {cvFile ? (
                    <FileText size={20} className="text-teal-600" />
                  ) : (
                    <Upload size={20} className="text-teal-500" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  {cvFile ? (
                    <>
                      <p className="truncate text-sm font-medium text-gray-700">
                        {cvFile.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {(cvFile.size / 1024).toFixed(0)} Ko
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-gray-600">
                        Cliquez pour sélectionner votre CV
                      </p>
                      <p className="text-xs text-gray-400">
                        PDF, DOC ou DOCX · Max 5 Mo
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-600 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Envoi…
                  </>
                ) : (
                  "Envoyer ma candidature"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

PostulerModal.propTypes = {
  offreId: PropTypes.string.isRequired,
  offreTitre: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func,
};
