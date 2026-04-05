// Lignes : 325 | Couche : composant | Depend de : ModalBackdrop, onSubmit
import React, { useState } from "react";
import PropTypes from "prop-types";
import ModalBackdrop from "../commun/FondModal";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

function getPasswordStrength(pwd) {
  if (!pwd) return 0;
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}

const STRENGTH_LABEL = ["", "Faible", "Correct", "Bon", "Excellent"];
const STRENGTH_TEXT_COLOR = [
  "",
  "text-red-500",
  "text-amber-500",
  "text-amber-600",
  "text-emerald-600",
];
const STRENGTH_BAR_COLOR = [
  "",
  "bg-red-400",
  "bg-amber-400",
  "bg-amber-500",
  "bg-emerald-500",
];

export default function CreateUserModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const strength = getPasswordStrength(form.password);

  const handleChange = function (e) {
    const { name, value } = e.target;
    setForm(function (prev) {
      return { ...prev, [name]: value };
    });
    setErrors(function (prev) {
      return { ...prev, [name]: "" };
    });
    setApiError(null);
  };

  const validate = function () {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "Prénom requis";
    if (!form.lastName.trim()) errs.lastName = "Nom requis";
    if (!form.email.trim()) errs.email = "Email requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Adresse email invalide";
    if (!form.password) errs.password = "Mot de passe requis";
    else if (form.password.length < 8)
      errs.password = "Minimum 8 caractères";
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
    setApiError(null);

    try {
      var payload = {
        nom: form.firstName + " " + form.lastName,
        email: form.email,
        motDePasse: form.password,
      };

      await onSubmit(payload);
    } catch (err) {
      setApiError(
        err?.response?.data?.message ||
          "Erreur lors de la création du compte"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = function () {
    setForm(EMPTY_FORM);
    setShowPassword(false);
    setErrors({});
    setApiError(null);
    onClose();
  };

  const inputBase =
    "w-full rounded-xl border bg-white px-4 py-2.5 font-body text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-150 focus:border-primary focus:ring-2 focus:ring-primary/20";

  const inputClass = function (field) {
    return inputBase + " " + (errors[field] ? "border-red-300" : "border-border");
  };

  return (
    <ModalBackdrop>
      <div className="flex max-h-[95vh] w-full animate-scale-in flex-col overflow-y-auto rounded-t-2xl border border-border bg-white shadow-2xl md:mx-4 md:max-w-lg md:rounded-2xl">
        <div className="flex flex-shrink-0 items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary-light">
              <span className="material-symbols-outlined text-xl text-primary">
                person_add
              </span>
            </div>
            <div>
              <h2 className="font-display text-base font-semibold leading-tight text-text-primary">
                Créer un compte RH
              </h2>
              <p className="font-body text-xs text-text-muted">
                Le membre pourra se connecter immédiatement
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
              Ce compte aura le rôle{" "}
              <span className="font-semibold text-primary">
                Responsable RH
              </span>
              . Seul un administrateur peut créer des comptes sur la plateforme.
            </p>
          </div>

          {apiError && (
            <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <span className="material-symbols-outlined mt-0.5 flex-shrink-0 text-base text-red-500">
                error
              </span>
              <p className="font-body text-xs leading-relaxed text-red-600">
                {apiError}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
                Prénom <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Sophie"
                className={inputClass("firstName")}
              />
              {errors.firstName && (
                <p className="mt-1 flex items-center gap-1 font-body text-xs text-red-500">
                  <span className="material-symbols-outlined text-xs">
                    error
                  </span>
                  {errors.firstName}
                </p>
              )}
            </div>
            <div>
              <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
                Nom <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Martin"
                className={inputClass("lastName")}
              />
              {errors.lastName && (
                <p className="mt-1 flex items-center gap-1 font-body text-xs text-red-500">
                  <span className="material-symbols-outlined text-xs">
                    error
                  </span>
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
              Adresse email <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-text-muted">
                mail
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="rh@entreprise.com"
                className={inputClass("email") + " pl-10"}
              />
            </div>
            {errors.email && (
              <p className="mt-1 flex items-center gap-1 font-body text-xs text-red-500">
                <span className="material-symbols-outlined text-xs">error</span>
                {errors.email}
              </p>
            )}
          </div>

          <div className="border-t border-border"></div>

          <div>
            <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
              Mot de passe <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 8 caractères"
                className={inputClass("password") + " pr-11"}
              />
              <button
                type="button"
                onClick={function () {
                  setShowPassword(!showPassword);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-text-primary"
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>

            {form.password && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map(function (i) {
                    return (
                      <div
                        key={i}
                        className={
                          "h-1.5 flex-1 rounded-full transition-all duration-300 " +
                          (i <= strength
                            ? STRENGTH_BAR_COLOR[strength]
                            : "bg-border")
                        }
                      ></div>
                    );
                  })}
                </div>
                <p className="font-body text-xs text-text-muted">
                  Force :{" "}
                  <span className={"font-medium " + STRENGTH_TEXT_COLOR[strength]}>
                    {STRENGTH_LABEL[strength]}
                  </span>
                </p>
              </div>
            )}
            {errors.password && (
              <p className="mt-1 flex items-center gap-1 font-body text-xs text-red-500">
                <span className="material-symbols-outlined text-xs">error</span>
                {errors.password}
              </p>
            )}
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
              disabled={submitting}
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
                    person_add
                  </span>
                  Créer le compte
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </ModalBackdrop>
  );
}

CreateUserModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
