import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ModalBackdrop from "../common/ModalBackdrop";
import {
  getCandidaturesDisponibles,
  getRecruteurs,
} from "service/restApiEntretiens";

const EMPTY_FORM = {
  candidature: "",
  poste: "",
  date: "",
  heureDebut: "",
  heureFin: "",
  type: "visio",
  lienVisio: "",
  recruteur: "",
  notes: "",
};

const TYPES_ENTRETIEN = [
  { value: "visio", label: "Visio", icon: "videocam" },
  { value: "telephone", label: "Téléphonique", icon: "phone" },
  { value: "presentiel", label: "Présentiel", icon: "location_on" },
];

export default function CreateInterviewModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const [candidatures, setCandidatures] = useState([]);
  const [recruteurs, setRecruteurs] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(function () {
    var cancelled = false;

    async function loadData() {
      try {
        var [cands, recs] = await Promise.all([
          getCandidaturesDisponibles(),
          getRecruteurs(),
        ]);
        if (!cancelled) {
          setCandidatures(cands);
          setRecruteurs(recs);
        }
      } catch (err) {
        console.error("Erreur chargement données modal:", err);
      } finally {
        if (!cancelled) {
          setLoadingData(false);
        }
      }
    }

    loadData();

    return function () {
      cancelled = true;
    };
  }, []);

  const handleChange = function (e) {
    const { name, value } = e.target;
    setForm(function (prev) {
      var updated = { ...prev, [name]: value };

      // Auto-fill poste when candidature is selected
      if (name === "candidature" && value) {
        var selected = candidatures.find(function (c) {
          return c._id === value;
        });
        if (selected) {
          updated.poste =
            selected.offre?.poste || selected.poste || updated.poste;
        }
      }

      return updated;
    });
    setErrors(function (prev) {
      return { ...prev, [name]: "" };
    });
  };

  const validate = function () {
    const errs = {};
    if (!form.candidature) errs.candidature = "Candidature requise";
    if (!form.date) errs.date = "Date requise";
    if (!form.heureDebut) errs.heureDebut = "Heure de début requise";
    if (!form.heureFin) errs.heureFin = "Heure de fin requise";
    if (!form.recruteur) errs.recruteur = "Recruteur requis";

    if (
      form.heureDebut &&
      form.heureFin &&
      form.heureDebut >= form.heureFin
    ) {
      errs.heureFin = "L'heure de fin doit être après l'heure de début";
    }

    return errs;
  };

  const handleSubmit = async function (e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);

    try {
      // Calculate duration in minutes
      var startParts = form.heureDebut.split(":");
      var endParts = form.heureFin.split(":");
      var startMin =
        parseInt(startParts[0]) * 60 + parseInt(startParts[1]);
      var endMin =
        parseInt(endParts[0]) * 60 + parseInt(endParts[1]);
      var duree = endMin - startMin;

      // Build ISO date
      var dateEntretien = form.date + "T" + form.heureDebut + ":00.000Z";

      // Generate Jitsi link for visio
      var lienVisio = form.lienVisio || "";
      if (form.type === "visio" && !lienVisio) {
        var roomId =
          "talentia-" +
          Date.now() +
          "-" +
          Math.random().toString(36).substr(2, 9);
        lienVisio = "https://meet.jit.si/" + roomId;
      }

      var payload = {
        candidature: form.candidature,
        responsable: form.recruteur,
        dateEntretien: dateEntretien,
        date_entretien: dateEntretien,
        typeEntretien: form.type,
        type_entretien: form.type,
        duree: duree > 0 ? duree : 60,
        lienVisio: lienVisio,
        lien_visio: lienVisio,
        commentaires: form.notes,
      };

      // Find candidat name for success message
      var selectedCand = candidatures.find(function (c) {
        return c._id === form.candidature;
      });
      payload.candidatName =
        selectedCand?.nom ||
        selectedCand?.candidat?.nom ||
        selectedCand?.email ||
        "le candidat";

      await onSubmit(payload);
    } catch (err) {
      console.error("Erreur soumission:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = function () {
    setForm(EMPTY_FORM);
    setErrors({});
    onClose();
  };

  const inputBase =
    "w-full rounded-xl border bg-white px-4 py-2.5 font-body text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-150 focus:border-primary focus:ring-2 focus:ring-primary/20";

  const inputClass = function (field) {
    return inputBase + " " + (errors[field] ? "border-red-300" : "border-border");
  };

  return (
    <ModalBackdrop>
      <div className="flex max-h-[90vh] w-full max-w-2xl mx-4 lg:mx-auto animate-scale-in flex-col rounded-2xl border border-border bg-white shadow-2xl overflow-y-auto">
        <div className="flex flex-shrink-0 items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-light">
              <span className="material-symbols-outlined text-xl text-primary">
                calendar_today
              </span>
            </div>
            <div>
              <h2 className="font-display text-base font-semibold leading-tight text-text-primary">
                Programmer un entretien
              </h2>
              <p className="font-body text-xs text-text-muted">
                Planifiez un nouvel entretien avec un candidat
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-bg-soft hover:text-text-primary"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 space-y-4 overflow-y-auto px-6 py-5"
        >
          <div className="flex items-start gap-2 rounded-xl border border-primary/20 bg-primary-light px-4 py-3">
            <span className="material-symbols-outlined mt-0.5 flex-shrink-0 text-base text-primary">
              info
            </span>
            <p className="font-body text-xs leading-relaxed text-text-secondary">
              L'entretien sera automatiquement ajouté au calendrier et le
              candidat recevra une notification par email.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
                Candidat <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-text-muted">
                  person
                </span>
                <select
                  name="candidature"
                  value={form.candidature}
                  onChange={handleChange}
                  disabled={loadingData}
                  className={
                    inputClass("candidature") +
                    " cursor-pointer appearance-none pl-10 pr-10"
                  }
                >
                  <option value="">
                    {loadingData
                      ? "Chargement..."
                      : "Sélectionner un candidat"}
                  </option>
                  {candidatures.map(function (c) {
                    var name =
                      c.nom ||
                      c.candidat?.nom ||
                      c.email ||
                      "Candidat";
                    var poste = c.offre?.poste || "";
                    return (
                      <option key={c._id} value={c._id}>
                        {name}
                        {poste ? " — " + poste : ""}
                      </option>
                    );
                  })}
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-text-muted">
                  expand_more
                </span>
              </div>
              {errors.candidature && (
                <p className="mt-1 flex items-center gap-1 font-body text-xs text-red-500">
                  <span className="material-symbols-outlined text-xs">
                    error
                  </span>
                  {errors.candidature}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
                Poste
              </label>
              <div className="relative">
                <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-text-muted">
                  work
                </span>
                <input
                  type="text"
                  name="poste"
                  value={form.poste}
                  onChange={handleChange}
                  placeholder="Auto-rempli depuis la candidature"
                  readOnly
                  className={inputClass("poste") + " pl-10 bg-bg-soft"}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
              Date de l'entretien <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-text-muted">
                event
              </span>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={inputClass("date") + " pl-10"}
              />
            </div>
            {errors.date && (
              <p className="mt-1 flex items-center gap-1 font-body text-xs text-red-500">
                <span className="material-symbols-outlined text-xs">error</span>
                {errors.date}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
                Heure de début <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-text-muted">
                  schedule
                </span>
                <input
                  type="time"
                  name="heureDebut"
                  value={form.heureDebut}
                  onChange={handleChange}
                  className={inputClass("heureDebut") + " pl-10"}
                />
              </div>
              {errors.heureDebut && (
                <p className="mt-1 flex items-center gap-1 font-body text-xs text-red-500">
                  <span className="material-symbols-outlined text-xs">
                    error
                  </span>
                  {errors.heureDebut}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
                Heure de fin <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-text-muted">
                  schedule
                </span>
                <input
                  type="time"
                  name="heureFin"
                  value={form.heureFin}
                  onChange={handleChange}
                  className={inputClass("heureFin") + " pl-10"}
                />
              </div>
              {errors.heureFin && (
                <p className="mt-1 flex items-center gap-1 font-body text-xs text-red-500">
                  <span className="material-symbols-outlined text-xs">
                    error
                  </span>
                  {errors.heureFin}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
              Type d'entretien <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-3">
              {TYPES_ENTRETIEN.map(function (t) {
                const isSelected = form.type === t.value;
                return (
                  <label
                    key={t.value}
                    className={
                      "flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 transition-all duration-150 " +
                      (isSelected
                        ? "border-primary bg-primary-light"
                        : "border-border bg-white hover:bg-bg-soft")
                    }
                  >
                    <input
                      type="radio"
                      name="type"
                      value={t.value}
                      checked={isSelected}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <span
                      className={
                        "material-symbols-outlined text-lg " +
                        (isSelected ? "text-primary" : "text-text-muted")
                      }
                    >
                      {t.icon}
                    </span>
                    <span
                      className={
                        "font-body text-sm font-medium " +
                        (isSelected ? "text-primary" : "text-text-secondary")
                      }
                    >
                      {t.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {form.type === "visio" && (
            <div className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <span className="material-symbols-outlined mt-0.5 flex-shrink-0 text-base text-emerald-600">
                check_circle
              </span>
              <p className="font-body text-xs leading-relaxed text-emerald-700">
                Un lien de visioconférence Jitsi Meet sera généré automatiquement
                lors de la création de l'entretien.
              </p>
            </div>
          )}

          <div>
            <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
              Recruteur responsable <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-text-muted">
                badge
              </span>
              <select
                name="recruteur"
                value={form.recruteur}
                onChange={handleChange}
                disabled={loadingData}
                className={
                  inputClass("recruteur") +
                  " cursor-pointer appearance-none pl-10 pr-10"
                }
              >
                <option value="">
                  {loadingData
                    ? "Chargement..."
                    : "Sélectionner un recruteur"}
                </option>
                {recruteurs.map(function (r) {
                  return (
                    <option key={r._id} value={r._id}>
                      {r.nom || r.name || r.email} ({r.role})
                    </option>
                  );
                })}
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-lg text-text-muted">
                expand_more
              </span>
            </div>
            {errors.recruteur && (
              <p className="mt-1 flex items-center gap-1 font-body text-xs text-red-500">
                <span className="material-symbols-outlined text-xs">error</span>
                {errors.recruteur}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
              Notes / Instructions
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Ajoutez des notes ou instructions pour l'entretien..."
              rows={3}
              className={inputClass("notes") + " resize-none"}
            />
          </div>
        </form>

        <div className="flex flex-shrink-0 items-center justify-between gap-3 border-t border-border bg-bg-soft px-6 py-4">
          <p className="font-body text-xs text-text-muted">
            <span className="text-red-400">*</span> Champs obligatoires
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={submitting}
              className="rounded-xl border border-border bg-white px-5 py-2.5 font-body text-sm font-medium text-text-primary transition-colors hover:bg-bg-soft disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={submitting || loadingData}
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-body text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-150 hover:bg-primary-dark hover:shadow-lg disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-base">
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
    </ModalBackdrop>
  );
}

CreateInterviewModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
