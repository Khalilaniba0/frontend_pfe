import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const DEPARTMENTS = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Operations",
  "People",
  "Finance",
];

const CONTRACT_TYPES = ["CDI", "CDD", "Stage", "Alternance", "Freelance"];

const WORK_MODES = ["Présentiel", "Remote", "Hybride"];

const TEAMS = ["Core Product", "Platform", "Design", "Operations", "Marketing"];

const EMPTY_FORM = {
  title: "",
  department: "",
  location: "",
  contract: "",
  workMode: "Hybride",
  team: "",
  deadline: "",
  description: "",
  skills: [],
  publishStatus: "publish",
};

export default function CreateJobModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(function () {
    document.body.style.overflow = "hidden";
    return function () {
      document.body.style.overflow = "";
    };
  }, []);

  const handleChange = function (e) {
    const { name, value } = e.target;
    setForm(function (prev) {
      return { ...prev, [name]: value };
    });
    setErrors(function (prev) {
      return { ...prev, [name]: "" };
    });
  };

  const handleAddSkill = function () {
    const trimmed = skillInput.trim();
    if (trimmed && !form.skills.includes(trimmed)) {
      setForm(function (prev) {
        return { ...prev, skills: [...prev.skills, trimmed] };
      });
      setSkillInput("");
    }
  };

  const handleSkillKeyDown = function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = function (skill) {
    setForm(function (prev) {
      return {
        ...prev,
        skills: prev.skills.filter(function (s) {
          return s !== skill;
        }),
      };
    });
  };

  const validate = function () {
    const errs = {};
    if (!form.title.trim() || form.title.trim().length < 3) {
      errs.title = "Le titre doit contenir au moins 3 caractères";
    }
    if (!form.department) {
      errs.department = "Veuillez sélectionner un département";
    }
    if (!form.location.trim()) {
      errs.location = "La localisation est requise";
    }
    if (!form.contract) {
      errs.contract = "Veuillez sélectionner un type de contrat";
    }
    if (!form.team) {
      errs.team = "Veuillez sélectionner une équipe";
    }
    if (!form.description.trim() || form.description.trim().length < 20) {
      errs.description = "La description doit contenir au moins 20 caractères";
    }
    return errs;
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setTimeout(function () {
      const newJob = {
        id: Date.now(),
        title: form.title.trim(),
        department: form.department,
        location: form.location.trim(),
        contract: form.contract,
        workMode: form.workMode,
        team: form.team,
        deadline: form.deadline || null,
        description: form.description.trim(),
        skills: form.skills,
        status: form.publishStatus === "publish" ? "Ouverte" : "Brouillon",
        candidates: 0,
        date: new Date().toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      };
      onSubmit(newJob);
      setSubmitting(false);
    }, 800);
  };

  const handleCancel = function () {
    setForm(EMPTY_FORM);
    setSkillInput("");
    setErrors({});
    onClose();
  };

  const inputClass = function (field) {
    const base =
      "w-full rounded-lg border px-3 py-2 text-sm font-body outline-none transition-all duration-150 focus:ring-2 focus:ring-primary/30 focus:border-primary";
    return base + " " + (errors[field] ? "border-red-300" : "border-border");
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="flex w-full max-w-2xl animate-scale-in flex-col rounded-2xl bg-white shadow-2xl mx-4"
        style={{ maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-light">
              <span className="material-symbols-outlined text-xl text-primary">
                work
              </span>
            </div>
            <div>
              <h2 className="font-display text-base font-semibold leading-tight text-text-primary">
                Créer une offre d'emploi
              </h2>
              <p className="font-body text-xs text-text-muted">
                Publiez un nouveau poste sur votre plateforme.
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

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 space-y-5 overflow-y-auto px-6 py-5"
        >
          {/* Row 1: Titre + Département */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-display text-sm font-medium text-text-primary">
                Titre du poste <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Ex : Développeur Full-Stack"
                className={inputClass("title")}
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-500">{errors.title}</p>
              )}
            </div>
            <div>
              <label className="mb-1 block font-display text-sm font-medium text-text-primary">
                Département <span className="text-red-400">*</span>
              </label>
              <select
                name="department"
                value={form.department}
                onChange={handleChange}
                className={inputClass("department")}
              >
                <option value="">Sélectionner...</option>
                {DEPARTMENTS.map(function (dep) {
                  return (
                    <option key={dep} value={dep}>
                      {dep}
                    </option>
                  );
                })}
              </select>
              {errors.department && (
                <p className="mt-1 text-xs text-red-500">{errors.department}</p>
              )}
            </div>
          </div>

          {/* Row 2: Localisation + Type de contrat */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-display text-sm font-medium text-text-primary">
                Localisation <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Ex : Paris, France"
                className={inputClass("location")}
              />
              {errors.location && (
                <p className="mt-1 text-xs text-red-500">{errors.location}</p>
              )}
            </div>
            <div>
              <label className="mb-1 block font-display text-sm font-medium text-text-primary">
                Type de contrat <span className="text-red-400">*</span>
              </label>
              <select
                name="contract"
                value={form.contract}
                onChange={handleChange}
                className={inputClass("contract")}
              >
                <option value="">Sélectionner...</option>
                {CONTRACT_TYPES.map(function (ct) {
                  return (
                    <option key={ct} value={ct}>
                      {ct}
                    </option>
                  );
                })}
              </select>
              {errors.contract && (
                <p className="mt-1 text-xs text-red-500">{errors.contract}</p>
              )}
            </div>
          </div>

          {/* Row 3: Mode de travail */}
          <div>
            <label className="mb-1 block font-display text-sm font-medium text-text-primary">
              Mode de travail <span className="text-red-400">*</span>
            </label>
            <div className="flex flex-wrap gap-4">
              {WORK_MODES.map(function (mode) {
                return (
                  <label
                    key={mode}
                    className="flex cursor-pointer items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="workMode"
                      value={mode}
                      checked={form.workMode === mode}
                      onChange={handleChange}
                      className="accent-primary"
                    />
                    <span className="font-body text-sm text-text-primary">
                      {mode}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Row 4: Équipe + Date limite */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block font-display text-sm font-medium text-text-primary">
                Équipe <span className="text-red-400">*</span>
              </label>
              <select
                name="team"
                value={form.team}
                onChange={handleChange}
                className={inputClass("team")}
              >
                <option value="">Sélectionner...</option>
                {TEAMS.map(function (t) {
                  return (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  );
                })}
              </select>
              {errors.team && (
                <p className="mt-1 text-xs text-red-500">{errors.team}</p>
              )}
            </div>
            <div>
              <label className="mb-1 block font-display text-sm font-medium text-text-primary">
                Date limite
              </label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                className={inputClass("deadline")}
              />
            </div>
          </div>

          {/* Row 5: Description */}
          <div>
            <label className="mb-1 block font-display text-sm font-medium text-text-primary">
              Description du poste <span className="text-red-400">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Décrivez le poste, les responsabilités..."
              className={inputClass("description") + " resize-none"}
            ></textarea>
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Row 6: Compétences */}
          <div>
            <label className="mb-1 block font-display text-sm font-medium text-text-primary">
              Compétences requises
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={function (e) {
                  setSkillInput(e.target.value);
                }}
                onKeyDown={handleSkillKeyDown}
                placeholder="Ex : React, Node.js..."
                className="flex-1 rounded-lg border border-border px-3 py-2 text-sm font-body outline-none transition-all duration-150 focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="flex items-center gap-1 rounded-lg border border-border px-3 py-2 font-display text-sm font-medium text-text-secondary transition-colors hover:bg-bg-soft"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Ajouter
              </button>
            </div>
            {form.skills.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {form.skills.map(function (skill) {
                  return (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 rounded-full bg-primary-light px-2.5 py-1 font-display text-xs font-medium text-primary"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={function () {
                          handleRemoveSkill(skill);
                        }}
                        className="flex h-4 w-4 items-center justify-center rounded-full transition-colors hover:bg-primary/20"
                      >
                        <span className="material-symbols-outlined text-xs">
                          close
                        </span>
                      </button>
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          {/* Row 7: Statut de publication */}
          <div>
            <label className="mb-1 block font-display text-sm font-medium text-text-primary">
              Statut de publication
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="publishStatus"
                  value="publish"
                  checked={form.publishStatus === "publish"}
                  onChange={handleChange}
                  className="accent-primary"
                />
                <span className="font-body text-sm text-text-primary">
                  Publier immédiatement
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="publishStatus"
                  value="draft"
                  checked={form.publishStatus === "draft"}
                  onChange={handleChange}
                  className="accent-primary"
                />
                <span className="font-body text-sm text-text-primary">
                  Sauvegarder en brouillon
                </span>
              </label>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex flex-shrink-0 items-center justify-between border-t border-border px-6 py-4">
          <p className="font-body text-xs text-text-muted">
            <span className="text-red-400">*</span> Champs obligatoires
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={submitting}
              className="rounded-lg border border-border px-4 py-2 font-display font-medium text-text-secondary transition-colors hover:bg-bg-soft disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2 font-display font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-base">
                    progress_activity
                  </span>
                  Publication...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">
                    work
                  </span>
                  Publier l'offre
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

CreateJobModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
