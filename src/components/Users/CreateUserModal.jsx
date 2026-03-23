// src/components/Users/CreateUserModal.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  department: "",
  password: "",
  confirmPassword: "",
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
  "text-yellow-600",
  "text-green-600",
];
const STRENGTH_BAR_COLOR = [
  "",
  "bg-red-400",
  "bg-amber-400",
  "bg-yellow-400",
  "bg-green-500",
];

export default function CreateUserModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const strength = getPasswordStrength(form.password);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "Prénom requis";
    if (!form.lastName.trim()) errs.lastName = "Nom requis";
    if (!form.email.trim()) errs.email = "Email requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Adresse email invalide";
    if (!form.password) errs.password = "Mot de passe requis";
    else if (form.password.length < 8)
      errs.password = "Minimum 8 caractères";
    if (!form.confirmPassword)
      errs.confirmPassword = "Veuillez confirmer le mot de passe";
    else if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Les mots de passe ne correspondent pas";
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
    onSubmit({
      name: `${form.firstName} ${form.lastName}`,
      email: form.email,
      phone: form.phone,
      department: form.department,
      role: "RH",
      status: "Actif",
      lastLogin: "Jamais",
    });
    setSubmitting(false);
  };

  const inputBase =
    "w-full px-4 py-2.5 rounded-xl border font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white";

  const inputClass = (field) =>
    `${inputBase} ${errors[field] ? "border-red-300" : "border-border"}`;

  const passwordsMatch =
    form.confirmPassword.length > 0 &&
    form.password === form.confirmPassword;
  const passwordsMismatch =
    form.confirmPassword.length > 0 &&
    form.password !== form.confirmPassword;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(15,23,42,0.45)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl border border-border w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-xl text-primary">
                person_add
              </span>
            </div>
            <div>
              <h2 className="font-display font-semibold text-text-primary text-base leading-tight">
                Créer un compte RH
              </h2>
              <p className="text-xs text-text-muted font-body">
                Le membre pourra se connecter immédiatement
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

          {/* Info rôle */}
          <div className="flex items-start gap-2 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
            <span className="material-symbols-outlined text-base text-primary mt-0.5 flex-shrink-0">
              info
            </span>
            <p className="text-xs font-body text-text-secondary leading-relaxed">
              Ce compte aura le rôle{" "}
              <span className="font-semibold text-primary">
                Responsable RH
              </span>
              . Seul un administrateur peut créer des comptes sur la plateforme.
            </p>
          </div>

          {/* Prénom + Nom */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-body text-sm font-medium text-text-primary mb-1.5">
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
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">error</span>
                  {errors.firstName}
                </p>
              )}
            </div>
            <div>
              <label className="block font-body text-sm font-medium text-text-primary mb-1.5">
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
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">error</span>
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block font-body text-sm font-medium text-text-primary mb-1.5">
              Adresse email <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                <span className="material-symbols-outlined text-lg">mail</span>
              </span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="rh@entreprise.com"
                className={`${inputClass("email")} pl-10`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">error</span>
                {errors.email}
              </p>
            )}
          </div>

          {/* Téléphone + Département */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-body text-sm font-medium text-text-primary mb-1.5">
                Téléphone
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                  <span className="material-symbols-outlined text-lg">phone</span>
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+216 XX XXX XXX"
                  className={`${inputClass("phone")} pl-10`}
                />
              </div>
            </div>
            <div>
              <label className="block font-body text-sm font-medium text-text-primary mb-1.5">
                Département
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
                  <span className="material-symbols-outlined text-lg">apartment</span>
                </span>
                <input
                  type="text"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  placeholder="Ex : RH, Finance..."
                  className={`${inputClass("department")} pl-10`}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-border" />

          {/* Mot de passe */}
          <div>
            <label className="block font-body text-sm font-medium text-text-primary mb-1.5">
              Mot de passe <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 8 caractères"
                className={`${inputClass("password")} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>

            {/* Strength bar */}
            {form.password && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        i <= strength
                          ? STRENGTH_BAR_COLOR[strength]
                          : "bg-border"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-text-muted">
                  Force :{" "}
                  <span
                    className={`font-medium ${STRENGTH_TEXT_COLOR[strength]}`}
                  >
                    {STRENGTH_LABEL[strength]}
                  </span>
                </p>
              </div>
            )}
            {errors.password && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">error</span>
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirmer mot de passe */}
          <div>
            <label className="block font-body text-sm font-medium text-text-primary mb-1.5">
              Confirmer le mot de passe <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Répétez le mot de passe"
                className={`${inputClass("confirmPassword")} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-lg">
                  {showConfirm ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
            {/* Match feedback */}
            {form.confirmPassword && (
              <p
                className={`text-xs mt-1 flex items-center gap-1 ${
                  passwordsMatch ? "text-success" : "text-red-500"
                }`}
              >
                <span className="material-symbols-outlined text-sm">
                  {passwordsMatch ? "check_circle" : "cancel"}
                </span>
                {passwordsMatch
                  ? "Les mots de passe correspondent"
                  : "Les mots de passe ne correspondent pas"}
              </p>
            )}
            {errors.confirmPassword && !form.confirmPassword && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">error</span>
                {errors.confirmPassword}
              </p>
            )}
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
                    person_add
                  </span>
                  Créer le compte
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

CreateUserModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};