import React, { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "layouts/AuthLayout.jsx";
import { ROUTES } from "constants/routes";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    password: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign up submitted:", formData);
  };

  return (
    <AuthLayout>
      <div className="w-full flex flex-col overflow-y-auto">
        <div className="flex-1 flex items-center justify-center py-5 px-4">
          <div className="w-full max-w-[1024px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side: Marketing/Value Prop */}
              <div className="hidden lg:flex">
                <div className="flex flex-col gap-8">
                  <div>
                    <h1 className="text-5xl font-black leading-tight tracking-tight text-slate-900 mb-4">
                      Développez votre équipe avec des{" "}
                      <span className="text-primary">talents internationaux.</span>
                    </h1>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      Rejoignez plus de 2 000 entreprises utilisant Talentia pour automatiser
                      la conformité, la paie et le recrutement dans plus de 150 pays.
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    {[
                      { icon: "verified_user", text: "Recrutement conforme dans toute juridiction" },
                      { icon: "payments", text: "Paie et avantages mondiaux en un clic" },
                      { icon: "group_add", text: "Gestion complète du cycle de vie des talents" },
                    ].map((item) => (
                      <div key={item.icon} className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-full">
                          {item.icon}
                        </span>
                        <p className="font-medium text-slate-700 m-0">{item.text}</p>
                      </div>
                    ))}
                  </div>
                  
                </div>
              </div>

              {/* Right Side: Signup Form */}
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.05),0_8px_10px_-6px_rgba(0,0,0,0.01)] border border-slate-100">
                <div className="flex flex-col gap-1 mb-5">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h2 className="text-xl font-bold text-slate-900 m-0">
                      Créer un compte entreprise
                    </h2>
                    <span className="text-sm text-slate-500">
                      Vous avez déjà un compte ?{" "}
                      <Link to={ROUTES.LOGIN} className="text-primary font-semibold no-underline">
                        Connexion
                      </Link>
                    </span>
                  </div>
                  <p className="text-slate-500 m-0 text-[13px]">
                    Commencez à gérer vos effectifs internationaux dès aujourd'hui.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[13px] font-semibold text-slate-700">Nom complet</label>
                      <input
                        className="w-full h-10 px-3.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                        placeholder="Jane Doe"
                        required
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[13px] font-semibold text-slate-700">E-mail professionnel</label>
                      <input
                        className="w-full h-10 px-3.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                        placeholder="jane@company.com"
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-semibold text-slate-700">Nom de l'entreprise</label>
                    <input
                      className="w-full h-10 px-3.5 border border-slate-200 rounded-lg text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                      placeholder="e.g. Acme Corp"
                      required
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[13px] font-semibold text-slate-700">Mot de passe</label>
                    <div className="relative">
                      <input
                        className="w-full h-10 pl-3.5 pr-[42px] border border-slate-200 rounded-lg text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                        placeholder="••••••••"
                        required
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        style={{ WebkitTextSecurity: showPassword ? 'none' : 'disc' }}
                        autoComplete="new-password"
                      />
                      <span
                        className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 mb-0 italic">
                      Doit contenir au moins 8 caractères avec un symbole spécial.
                    </p>
                  </div>

                  <div className="flex items-start gap-2 mt-1">
                    <input
                      className="mt-1 accent-primary"
                      id="terms"
                      required
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                    />
                    <label className="text-[13px] text-slate-500" htmlFor="terms">
                      En créant un compte, vous acceptez nos{" "}
                      <a className="text-primary font-medium" href="#">Conditions d'utilisation</a>{" "}
                      et notre{" "}
                      <a className="text-primary font-medium" href="#">Politique de confidentialité</a>.
                    </label>
                  </div>

                  <button
                    className="w-full bg-primary text-slate-900 font-bold py-2.5 rounded-lg border-none cursor-pointer flex items-center justify-center gap-2 text-sm mt-1 transition-all hover:brightness-105"
                    type="submit"
                  >
                    <span>Créer un compte entreprise</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>

                  {/* Divider */}
                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-slate-200" />
                    <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-medium uppercase tracking-widest">
                      ou inscrivez-vous avec
                    </span>
                    <div className="flex-grow border-t border-slate-200" />
                  </div>

                  {/* OAuth Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      className="flex items-center justify-center gap-2 border border-slate-200 rounded-lg py-2.5 bg-white cursor-pointer transition-colors hover:bg-slate-50"
                      type="button"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      <span className="text-sm font-semibold">Google</span>
                    </button>
                    <button
                      className="flex items-center justify-center gap-2 border border-slate-200 rounded-lg py-2.5 bg-white cursor-pointer transition-colors hover:bg-slate-50"
                      type="button"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.462 15.599c-0.454 0.409-1.104 0.627-1.884 0.627h-2.311v-3.125h2.311c0.781 0 1.43 0.218 1.884 0.627 0.454 0.408 0.681 1.006 0.681 1.436s-0.227 1.028-0.681 1.435zm-0.681-4.706c-0.454 0.409-1.104 0.627-1.884 0.627h-2.311v-3.125h2.311c0.781 0 1.43 0.218 1.884 0.627 0.454 0.409 0.681 1.006 0.681 1.436s-0.227 1.028-0.681 1.435z" />
                      </svg>
                      <span className="text-sm font-semibold">SSO</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
