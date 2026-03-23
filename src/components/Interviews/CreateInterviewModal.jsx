// src/components/Interviews/CreateInterviewModal.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";

const EMPTY_FORM = {
  candidat: "",
  poste: "",
  date: "",
  heureDebut: "",
  heureFin: "",
  type: "Visio",
  lienVisio: "",
  recruteur: "",
  notes: "",
};

const TYPES_ENTRETIEN = ["Visio", "Téléphonique", "Présentiel"];

const CANDIDATS_DISPONIBLES = [
  "Sarah Dubois",
  "Ahmed Khalil",
  "Julie Martin",
  "Pierre Lefebvre",
  "Marie Lambert",
  "Thomas Rousseau",
];

const RECRUTEURS_DISPONIBLES = [
  "Marie Dupont",
  "Lucas Bernard",
  "Sophie Martin",
  "Jean Moreau",
];

export default function CreateInterviewModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.candidat) errs.candidat = "Candidat requis";
    if (!form.poste.trim()) errs.poste = "Poste requis";
    if (!form.date) errs.date = "Date requise";
    if (!form.heureDebut) errs.heureDebut = "Heure de début requise";
    if (!form.heureFin) errs.heureFin = "Heure de fin requise";
    if (!form.recruteur) errs.recruteur = "Recruteur requis";

    // Validation heure début < heure fin
    if (form.heureDebut && form.heureFin && form.heureDebut >= form.heureFin) {
      errs.heureFin = "L'heure de fin doit être après l'heure de début";
    }

    // Note: Le lien visio Jitsi est généré automatiquement pour les entretiens Visio

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    // Formater la date pour affichage
    const dateObj = new Date(form.date);
    const dateFormatted = dateObj.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    // Générer automatiquement le lien Jitsi pour les entretiens Visio
    let lienEntretien = form.lienVisio || "N/A";
    if (form.type === "Visio") {
      const roomId = `talentia-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      lienEntretien = `https://meet.jit.si/${roomId}`;
    }

    onSubmit({
      candidat: form.candidat,
      poste: form.poste,
      date: dateFormatted,
      heure: `${form.heureDebut} - ${form.heureFin}`,
      type: form.type,
      lien: lienEntretien,
      recruteur: form.recruteur,
      notes: form.notes,
      statut: "À venir",
    });
    setSubmitting(false);
  };

  const inputBase =
    "w-full px-4 py-2.5 rounded-xl border font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white";

  const inputClass = (field) =>
    `${inputBase} ${errors[field] ? "border-red-300" : "border-border"}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(15,23,42,0.45)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl border border-border w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-xl text-primary">
                calendar_today
              </span>
            </div>
            <div>
              <h2 className="font-display font-semibold text-text-primary text-base leading-tight">
                Programmer un entretien
              </h2>
              <p className="text-xs text-text-muted font-body">
                Planifiez un nouvel entretien avec un candidat
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-bg-soft flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* ── Body (scrollable) ── */}
        <form
          onSubmit={handleSubmit}
          className="px-6 py-5 space-y-4 overflow-y-auto flex-1"
        >
          {/* Info type */}
          <div className="flex items-start gap-2 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
            <span className="material-symbols-outlined text-base text-primary mt-0.5 flex-shrink-0">
              info
            </span>
            <p className="text-xs font-body text-text-secondary leading-relaxed">
              L'entretien sera automatiquement ajouté au calendrier et le
              candidat recevra une notification par email.
            </p>
          </div>

          {/* Candidat + Poste */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-body text-sm font-medium text-text-primary mb-1.5">
                Candidat <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                  <span className="material-symbols-outlined text-lg">
                    person
                  </span>
                </span>
                <select
                  name="candidat"
                  value={form.candidat}
                  onChange={handleChange}
                  className={`${inputClass("candidat")} pl-10 appearance-none cursor-pointer`}
                >
                  <option value="">Sélectionner un candidat</option>
                  {CANDIDATS_DISPONIBLES.map((candidat) => (
                    <option key={candidat} value={candidat}>
                      {candidat}
                    </option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                  <span className="material-symbols-outlined text-lg">
                    keyboard_arrow_down
                  </span>
                </span>
              </div>
              {errors.candidat && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">
                    error
                  </span>
                  {errors.candidat}
                </p>
              )}
            </div>

            <div>
              <label className="block font-body text-sm font-medium text-text-primary mb-1.5">
                Poste <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                  <span className="material-symbols-outlined text-lg">
                    work
                  </span>
                </span>
                <input
                  type="text"
                  name="poste"
                  value={form.poste}
                  onChange={handleChange}
                  placeholder="Ex : Développeur Full-Stack"
                  className={`${inputClass("poste")} pl-10`}
                />
              </div>
              {errors.poste && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">
                    error
                  </span>
                  {errors.poste}
                </p>
              )}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block font-body text-sm font-medium text-text-primary mb-1.5">
              Date de l'entretien <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                <span className="material-symbols-outlined text-lg">
                  event
                </span>
              </span>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={`${inputClass("date")} pl-10`}
              />
            </div>
            {errors.date && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">
                  error
                </span>
                {errors.date}
              </p>
            )}
          </div>

          {/* Heure début + Heure fin */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-body text-sm font-medium text-text-primary mb-1.5">
                Heure de début <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                  <span className="material-symbols-outlined text-lg">
                    schedule
                  </span>
                </span>
                <input
                  type="time"
                  name="heureDebut"
                  value={form.heureDebut}
                  onChange={handleChange}
                  className={`${inputClass("heureDebut")} pl-10`}
                />
              </div>
              {errors.heureDebut && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">
                    error
                  </span>
                  {errors.heureDebut}
                </p>
              )}
            </div>

            <div>
              <label className="block font-body text-sm font-medium text-text-primary mb-1.5">
                Heure de fin <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                  <span className="material-symbols-outlined text-lg">
                    schedule
                  </span>
                </span>
                <input
                  type="time"
                  name="heureFin"
                  value={form.heureFin}
                  onChange={handleChange}
                  className={`${inputClass("heureFin")} pl-10`}
                />
              </div>
              {errors.heureFin && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">
                    error
                  </span>
                  {errors.heureFin}
                </p>
              )}
            </div>
          </div>

          {/* Type d'entretien */}
          <div>
            <label className="block font-body text-sm font-medium text-text-primary mb-1.5">
              Type d'entretien <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-3">
              {TYPES_ENTRETIEN.map((type) => (
                <label
                  key={type}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                    form.type === type
                      ? "border-primary bg-primary-light"
                      : "border-border bg-white hover:bg-bg-soft"
                  }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={type}
                    checked={form.type === type}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span
                    className={`material-symbols-outlined text-lg ${
                      form.type === type ? "text-primary" : "text-text-muted"
                    }`}
                  >
                    {type === "Visio"
                      ? "videocam"
                      : type === "Téléphonique"
                        ? "phone"
                        : "location_on"}
                  </span>
                  <span
                    className={`font-body text-sm font-medium ${
                      form.type === type
                        ? "text-primary"
                        : "text-text-secondary"
                    }`}
                  >
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Info génération automatique du lien Jitsi */}
          {form.type === "Visio" && (
            <div className="flex items-start gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <span className="material-symbols-outlined text-base text-green-600 mt-0.5 flex-shrink-0">
                check_circle
              </span>
              <p className="text-xs font-body text-green-700 leading-relaxed">
                Un lien de visioconférence Jitsi Meet sera généré automatiquement
                lors de la création de l'entretien.
              </p>
            </div>
          )}

          {/* Recruteur */}
          <div>
            <label className="block font-body text-sm font-medium text-text-primary mb-1.5">
              Recruteur responsable <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                <span className="material-symbols-outlined text-lg">
                  badge
                </span>
              </span>
              <select
                name="recruteur"
                value={form.recruteur}
                onChange={handleChange}
                className={`${inputClass("recruteur")} pl-10 appearance-none cursor-pointer`}
              >
                <option value="">Sélectionner un recruteur</option>
                {RECRUTEURS_DISPONIBLES.map((recruteur) => (
                  <option key={recruteur} value={recruteur}>
                    {recruteur}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                <span className="material-symbols-outlined text-lg">
                  keyboard_arrow_down
                </span>
              </span>
            </div>
            {errors.recruteur && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">
                  error
                </span>
                {errors.recruteur}
              </p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block font-body text-sm font-medium text-text-primary mb-1.5">
              Notes / Instructions
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Ajoutez des notes ou instructions pour l'entretien..."
              rows={3}
              className={inputClass("notes")}
            />
          </div>
        </form>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-border bg-bg-soft flex-shrink-0">
          <p className="text-xs text-text-muted font-body">
            <span className="text-red-400">*</span> Champs obligatoires
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl border border-border bg-white font-body font-medium text-sm text-text-primary hover:bg-bg-soft transition-colors disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={submitting}
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary font-display font-semibold text-sm text-white hover:bg-primary-dark transition-colors shadow-md disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="material-symbols-outlined text-base animate-spin">
                    progress_activity
                  </span>
                  Création...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">
                    calendar_add_on
                  </span>
                  Programmer
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

CreateInterviewModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
