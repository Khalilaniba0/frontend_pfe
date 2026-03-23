import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "constants/routes";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = function (e) {
    e.preventDefault();
  };

  return (
    <div className="flex w-full items-center justify-center overflow-y-auto bg-white px-6 py-8 md:px-10 lg:w-1/2">
      <div className="w-full max-w-[400px]">
        <Link to="/landing" className="mb-8 flex items-center gap-3 no-underline">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-md shadow-primary/20">
            <span className="material-symbols-outlined text-lg text-white">
              shield
            </span>
          </div>
          <span className="font-display text-xl font-bold text-text-primary">
            Talen<span className="text-primary">tia</span>
          </span>
        </Link>

        <div className="mb-6">
          <h2 className="mb-1.5 font-display text-2xl font-bold tracking-tight text-text-primary md:text-3xl">
            Bon retour
          </h2>
          <p className="m-0 font-body text-sm leading-relaxed text-text-secondary">
            Entrez vos identifiants pour accéder au portail de gestion RH.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-body text-sm font-medium text-text-primary">
              Adresse e-mail
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={function (e) {
                setEmail(e.target.value);
              }}
              className="h-11 w-full rounded-xl border border-border bg-white px-4 font-body text-sm text-text-primary outline-none transition-all duration-150 placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-body text-sm font-medium text-text-primary">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={function (e) {
                  setPassword(e.target.value);
                }}
                autoComplete="current-password"
                className="h-11 w-full rounded-xl border border-border bg-white pl-4 pr-12 font-body text-sm text-text-primary outline-none transition-all duration-150 placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="button"
                onClick={function () {
                  setShowPassword(!showPassword);
                }}
                className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center border-none bg-transparent p-0 text-text-muted transition-colors hover:text-text-primary"
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={function (e) {
                  setRememberMe(e.target.checked);
                }}
                className="h-4 w-4 cursor-pointer accent-primary"
              />
              <span className="font-body text-sm text-text-secondary">
                Se souvenir de moi
              </span>
            </label>
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className="font-body text-sm font-medium text-primary no-underline transition-colors hover:text-primary-dark"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            className="mt-2 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-none bg-primary font-body text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all duration-150 hover:bg-primary-dark hover:shadow-lg"
          >
            <span>Se connecter</span>
            <span className="material-symbols-outlined text-lg">login</span>
          </button>

          <div className="relative my-2 py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-3 font-body text-xs text-text-muted">
                Nouveau sur Talentia ?
              </span>
            </div>
          </div>

          <Link
            to={ROUTES.SIGNUP}
            className="flex h-12 w-full items-center justify-center rounded-xl border border-border bg-white font-body text-sm font-medium text-text-primary no-underline transition-all duration-150 hover:border-primary/30 hover:bg-primary-light"
          >
            Inscrivez-vous gratuitement
          </Link>
        </form>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-text-muted">
          <span className="material-symbols-outlined text-sm">lock</span>
          <p className="m-0 font-body text-xs">
            Authentification sécurisée chiffrée AES-256
          </p>
        </div>
      </div>
    </div>
  );
}
