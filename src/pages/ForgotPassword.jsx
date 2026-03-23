import React, { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "layouts/AuthLayout.jsx";
import { ROUTES } from "constants/routes";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    setSubmitted(true);
  };

  return (
    <AuthLayout>
      <div className="w-full flex flex-col overflow-y-auto">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-[480px]">
            <div className="flex flex-col gap-8">
              {/* Hero Header Section */}
              <div className="flex flex-col gap-3">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-2">
                  <span className="material-symbols-outlined text-[30px]">lock_reset</span>
                </div>
                <h1 className="text-4xl font-black tracking-tight text-slate-900 m-0">
                  Mot de passe oublié ?
                </h1>
                <p className="text-slate-500 text-lg m-0">
                  Pas d'inquiétude, nous vous enverrons des instructions de réinitialisation pour retrouver l'accès à votre tableau de bord RH.
                </p>
              </div>

              {/* Form Container */}
              <div className="bg-white border border-primary/10 rounded-xl p-8 shadow-sm">
                {submitted ? (
                  <div className="text-center flex flex-col gap-4">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-green-100 text-green-600 mb-2 mx-auto">
                      <span className="material-symbols-outlined text-[30px]">mark_email_read</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 m-0">Vérifiez votre boîte de réception</h2>
                    <p className="text-slate-500 m-0">
                      Nous avons envoyé les instructions de réinitialisation à <strong>{email}</strong>.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="bg-transparent border-none text-primary font-semibold cursor-pointer text-sm"
                    >
                      Vous ne l'avez pas reçu ? Réessayez
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-slate-700 text-sm font-semibold" htmlFor="email">
                        Adresse e-mail professionnelle
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                          mail
                        </span>
                        <input
                          className="w-full pl-12 pr-4 py-4 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                          id="email"
                          placeholder="name@company.com"
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      className="w-full bg-primary text-slate-900 font-bold py-4 rounded-lg border-none cursor-pointer shadow-[0_8px_12px_-3px_rgba(19,200,236,0.2)] transition-all flex items-center justify-center gap-2 text-sm hover:brightness-105"
                      type="submit"
                    >
                      <span>Envoyer les instructions</span>
                      <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </button>
                  </form>
                )}

                <div className="mt-8 pt-6 border-t border-primary/10">
                  <Link
                    to={ROUTES.LOGIN}
                    className="flex items-center justify-center gap-2 text-slate-600 font-semibold no-underline transition-colors hover:text-slate-900"
                  >
                    <span className="material-symbols-outlined text-xl">arrow_back</span>
                    <span>Retour à la connexion</span>
                  </Link>
                </div>
              </div>

              {/* Footer Help */}
              <div className="text-center">
                <p className="text-sm text-slate-500 m-0">
                  Besoin d'aide supplémentaire ?{" "}
                  <a className="text-primary font-medium underline-offset-4" href="#">
                    Contacter le support
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
