import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { ROUTES } from "constants/routes";
import BrandLogo from "components/common/BrandLogo.jsx";

export default function CandidateLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#d8ecff_0,_#eef4f9_42%,_#f4f7fb_100%)] px-4 py-4 font-body md:h-screen md:overflow-hidden md:px-6 md:py-5">
      <div className="mx-auto flex w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm md:h-[calc(100vh-2.5rem)] md:max-h-[780px]">
        <section className="relative hidden h-full flex-1 md:block">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80"
            alt="Carriere Talentia"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d3b66]/80 via-[#0f4c75]/75 to-[#0a2238]/90" />

          <div className="absolute inset-x-10 bottom-12 text-white">
            <h1 className="max-w-md font-display text-5xl font-bold leading-[1.05] tracking-tight">
              Propulsez votre carriere avec Talentia.
            </h1>
            <p className="mt-5 max-w-sm text-sm text-slate-200">
              Trouvez le job de vos reves parmi nos meilleures opportunites.
            </p>
            <p className="mt-10 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
              Le futur du recrutement
            </p>
          </div>
        </section>

        <section className="flex w-full flex-1 items-center justify-center overflow-y-auto bg-[#f7fbff] p-5 md:p-8 lg:p-10">
          <div className="w-full max-w-md">
            <BrandLogo to={ROUTES.LANDING} className="mb-5" />

            <h2 className="font-display text-3xl font-bold text-[#0f2a47]">
              Bienvenue chez Talentia
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Connectez-vous pour postuler et suivre vos candidatures.
            </p>

            <form
              className="mt-6 space-y-4"
              onSubmit={function (event) {
                event.preventDefault();
              }}
            >
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Email
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                  <Mail size={16} className="text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={function (event) {
                      setEmail(event.target.value);
                    }}
                    placeholder="candidat@exemple.com"
                    className="w-full border-none p-0 text-sm text-slate-700 placeholder:text-slate-400 focus:ring-0"
                  />
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Mot de passe
                  </label>
                  <Link
                    to={ROUTES.FORGOT_PASSWORD}
                    className="text-xs font-medium text-[#0072FF] no-underline hover:underline"
                  >
                    Mot de passe oublie ?
                  </Link>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                  <Lock size={16} className="text-slate-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={function (event) {
                      setPassword(event.target.value);
                    }}
                    placeholder="************"
                    className="w-full border-none p-0 text-sm text-slate-700 placeholder:text-slate-400 focus:ring-0"
                  />
                  <button
                    type="button"
                    onClick={function () {
                      setShowPassword(!showPassword);
                    }}
                    className="text-slate-400 transition-colors hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="mt-1 flex w-full items-center justify-center rounded-xl bg-[#0072FF] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0062db]"
              >
                Se connecter
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                ou continuer avec
              </p>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300"
              >
                <span className="text-base font-black text-[#ea4335]">G</span>
                Google
              </button>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300"
              >
                <span className="rounded bg-[#0a66c2] px-1 text-[10px] font-bold text-white">
                  in
                </span>
                LinkedIn
              </button>
            </div>

            <p className="mt-5 text-center text-xs text-slate-500">
              Pas encore de compte ?{" "}
              <Link to={ROUTES.CANDIDATE_SIGNUP} className="font-semibold text-[#0072FF] no-underline hover:underline">
                Inscrivez-vous
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
