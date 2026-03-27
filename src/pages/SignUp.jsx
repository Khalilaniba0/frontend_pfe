import React, { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "layouts/AuthLayout.jsx";
import AuthHero from "components/Sections/AuthHero.jsx";
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

  const handleChange = function (e) {
    const { name, value, type, checked } = e.target;
    setFormData(function (prev) {
      return {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
  };

  return (
    <AuthLayout>
      <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,_#d8ecff_0,_#eef4f9_42%,_#f4f7fb_100%)] px-4 py-3 font-body md:px-6 md:py-4">
        <div className="mx-auto flex w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-lg md:min-h-[640px]">
          <AuthHero />

          <section className="flex w-full flex-1 items-center justify-center overflow-hidden bg-[#f7fbff] p-4 md:p-6 lg:p-7">
            <div className="w-full max-w-md">
              <Link to={ROUTES.LANDING} className="mb-4 inline-flex items-center gap-2 no-underline">
                <span className="text-2xl font-bold tracking-tight text-[#0f2a47]">
                  Talen<span className="text-[#007BFF]">tia</span>
                </span>
              </Link>

              <div className="mb-3">
                <h2 className="m-0 font-display text-[1.85rem] font-bold tracking-tight text-[#0f2a47]">
                  Créer un compte entreprise
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Commencez à gérer vos effectifs internationaux dès aujourd'hui.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#0f2a47]">Nom complet</label>
                  <input
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition-all duration-150 placeholder:text-slate-400 focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/20"
                    placeholder="Jane Doe"
                    required
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#0f2a47]">E-mail professionnel</label>
                  <input
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition-all duration-150 placeholder:text-slate-400 focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/20"
                    placeholder="jane@company.com"
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#0f2a47]">Nom de l'entreprise</label>
                  <input
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition-all duration-150 placeholder:text-slate-400 focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/20"
                    placeholder="Ex: Acme Corp"
                    required
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#0f2a47]">Mot de passe</label>
                  <div className="relative">
                    <input
                      className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-4 pr-12 text-sm text-slate-700 outline-none transition-all duration-150 placeholder:text-slate-400 focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/20"
                      placeholder="••••••••"
                      required
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 border-none bg-transparent p-0 text-slate-400 transition-colors hover:text-slate-600"
                      onClick={function () {
                        setShowPassword(!showPassword);
                      }}
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="mt-0.5 flex items-start gap-2">
                  <input
                    className="mt-1 h-4 w-4 accent-[#007BFF]"
                    id="terms"
                    required
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                  />
                  <label className="text-xs leading-4 text-slate-500" htmlFor="terms">
                    En créant un compte, vous acceptez nos {" "}
                    <a className="font-medium text-[#007BFF] no-underline hover:text-[#0062db]" href="#">
                      Conditions d'utilisation
                    </a>{" "}
                    et notre {" "}
                    <a className="font-medium text-[#007BFF] no-underline hover:text-[#0062db]" href="#">
                      Politique de confidentialité
                    </a>.
                  </label>
                </div>

                <button
                  className="mt-1 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-none bg-[#007BFF] text-sm font-semibold text-white shadow-md shadow-[#007BFF]/25 transition-all duration-150 hover:bg-[#0062db] hover:shadow-lg"
                  type="submit"
                >
                  <span>Créer un compte entreprise</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>

                <div className="relative my-1 py-1.5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-[#f7fbff] px-3 text-xs font-medium uppercase tracking-wide text-slate-400">
                      ou inscrivez-vous avec
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <button
                    className="flex h-[38px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300"
                    type="button"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <span>Google</span>
                  </button>

                  <button
                    className="flex h-[38px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300"
                    type="button"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.462 15.599c-0.454 0.409-1.104 0.627-1.884 0.627h-2.311v-3.125h2.311c0.781 0 1.43 0.218 1.884 0.627 0.454 0.408 0.681 1.006 0.681 1.436s-0.227 1.028-0.681 1.435zm-0.681-4.706c-0.454 0.409-1.104 0.627-1.884 0.627h-2.311v-3.125h2.311c0.781 0 1.43 0.218 1.884 0.627 0.454 0.409 0.681 1.006 0.681 1.436s-0.227 1.028-0.681 1.435z" />
                    </svg>
                    <span>SSO</span>
                  </button>
                </div>
              </form>

              <p className="mt-4 text-center text-xs text-slate-500">
                Vous avez déjà un compte ? {" "}
                <Link
                  to={ROUTES.LOGIN}
                  className="font-semibold text-[#007BFF] no-underline transition-colors hover:text-[#0062db]"
                >
                  Connexion
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </AuthLayout>
  );
}
