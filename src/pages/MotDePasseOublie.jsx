import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthLayout from "layouts/MiseEnPageAuth.jsx";
import { ROUTES } from "constants/routes";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = function (e) {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleBack = function () {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate(ROUTES.LANDING, { replace: true });
  };

  return (
    <AuthLayout>
      <div className="flex w-full flex-col overflow-y-auto">
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-[480px]">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <div className="mb-2 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <span className="material-symbols-outlined text-3xl">
                    lock_reset
                  </span>
                </div>
                <h1 className="m-0 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
                  Mot de passe oublié ?
                </h1>
                <p className="m-0 font-body text-base text-text-secondary">
                  Pas d'inquiétude, nous vous enverrons des instructions de
                  réinitialisation pour retrouver l'accès à votre tableau de
                  bord RH.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
                {submitted ? (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div className="mb-2 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <span className="material-symbols-outlined text-3xl">
                        mark_email_read
                      </span>
                    </div>
                    <h2 className="m-0 font-display text-xl font-bold text-text-primary">
                      Vérifiez votre boîte de réception
                    </h2>
                    <p className="m-0 font-body text-sm text-text-secondary">
                      Nous avons envoyé les instructions de réinitialisation à{" "}
                      <strong className="text-text-primary">{email}</strong>.
                    </p>
                    <button
                      type="button"
                      onClick={function () {
                        setSubmitted(false);
                      }}
                      className="cursor-pointer border-none bg-transparent font-body text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                    >
                      Vous ne l'avez pas reçu ? Réessayez
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    <div className="flex flex-col gap-1.5">
                      <label
                        className="font-body text-sm font-medium text-text-primary"
                        htmlFor="email"
                      >
                        Adresse e-mail professionnelle
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-text-muted">
                          mail
                        </span>
                        <input
                          className="h-12 w-full rounded-xl border border-border bg-white pl-12 pr-4 font-body text-sm text-text-primary outline-none transition-all duration-150 placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                          id="email"
                          placeholder="name@company.com"
                          required
                          type="email"
                          value={email}
                          onChange={function (e) {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <button
                      className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-none bg-primary font-body text-sm font-semibold text-white shadow-md shadow-primary/25 transition-all duration-150 hover:bg-primary-dark hover:shadow-lg"
                      type="submit"
                    >
                      <span>Envoyer les instructions</span>
                      <span className="material-symbols-outlined text-lg">
                        arrow_forward
                      </span>
                    </button>
                  </form>
                )}

                <div className="mt-6 border-t border-border pt-6">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center justify-center gap-2 font-body text-sm font-medium text-text-secondary no-underline transition-colors hover:text-text-primary"
                  >
                    <span className="material-symbols-outlined text-lg">
                      arrow_back
                    </span>
                    <span>Retour à la connexion</span>
                  </button>
                </div>
              </div>

              <div className="text-center">
                <p className="m-0 font-body text-sm text-text-secondary">
                  Besoin d'aide supplémentaire ?{" "}
                  <a
                    className="font-medium text-primary no-underline transition-colors hover:text-primary-dark"
                    href="mailto:support@talentia.com"
                  >
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
