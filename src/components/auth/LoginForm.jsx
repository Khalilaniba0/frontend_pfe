import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "constants/routes";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, rememberMe });
  };

  return (
    <div className="login-form-panel w-full lg:w-1/2 flex items-center justify-center px-4 py-5 md:px-10 md:py-6 bg-white overflow-y-auto">
      <div className="w-full max-w-[400px]">
        <a href="/landing" className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-lg">shield</span>
          </div>
          <span className="text-xl font-display font-bold text-text-primary">
            Talen<span className="text-primary">tia</span>
          </span>
        </a>
        <div className="mb-5">
          <h2 className="text-2xl md:text-[26px] font-black text-slate-900 tracking-tight mb-1.5">
            Bon retour
          </h2>
          <p className="text-slate-500 text-sm leading-normal m-0">
            Entrez vos identifiants pour accéder au portail de gestion RH.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3.5">
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Adresse e-mail
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-[10px] outline-none text-sm font-display text-slate-900 transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="mb-3.5">
            <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 pl-3.5 pr-[42px] bg-slate-50 border border-slate-200 rounded-[10px] outline-none text-sm font-display text-slate-900 transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
                style={{ WebkitTextSecurity: showPassword ? 'none' : 'disc' }}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-slate-400 p-0 flex items-center hover:text-slate-600"
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-[15px] h-[15px] accent-primary cursor-pointer"
              />
              <span className="text-[13px] text-slate-500">Se souvenir de moi</span>
            </label>
            <Link
              to={ROUTES.FORGOT_PASSWORD}
              className="text-[13px] font-semibold text-primary no-underline hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full h-[46px] bg-primary text-slate-900 font-bold text-sm rounded-[10px] border-none cursor-pointer flex items-center justify-center gap-2 shadow-[0_8px_12px_-3px_rgba(19,200,236,0.2)] transition-all font-display hover:brightness-105 hover:shadow-[0_8px_12px_-3px_rgba(19,200,236,0.3)] active:scale-[0.98]"
          >
            <span>Se connecter</span>
            <span className="material-symbols-outlined text-lg">login</span>
          </button>

          <div className="relative py-3.5 my-2.5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-slate-400 text-[11px] font-medium uppercase">
                Nouveau sur Talentia ?
              </span>
            </div>
          </div>

          <Link
            to={ROUTES.SIGNUP}
            className="flex w-full h-[46px] items-center justify-center bg-white border border-slate-200 rounded-[10px] text-slate-700 font-semibold text-[13px] no-underline transition-colors font-display hover:bg-slate-50"
          >
            Inscrivez-vous pour un essai gratuit
          </Link>
        </form>

        <div className="pt-4 flex items-center justify-center gap-1.5 text-slate-400">
          <span className="material-symbols-outlined text-[13px]">lock</span>
          <p className="text-[11px] m-0">
            Authentification sécurisée chiffrée AES-256
          </p>
        </div>
      </div>
    </div>
  );
}
