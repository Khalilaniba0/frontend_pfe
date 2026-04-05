import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "layouts/MiseEnPageAuth.jsx";
import AuthHero from "components/Sections/HeroAuthentification.jsx";
import { ROUTES } from "constants/routes";
import BrandLogo from "components/commun/LogoMarque.jsx";
import { registerEntreprise } from "service/restApiAuthentification";

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
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

  const handleSubmit = async function (e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await registerEntreprise({
        nom: formData.nom,
        email: formData.email,
        adminName: formData.adminName,
        adminEmail: formData.adminEmail,
        adminPassword: formData.adminPassword,
      });
      navigate(`${ROUTES.LOGIN}?registered=true`);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,_#d8ecff_0,_#eef4f9_42%,_#f4f7fb_100%)] px-4 py-3 font-body md:px-6 md:py-4">
        <div className="mx-auto flex w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-lg md:min-h-[640px]">
          <AuthHero />

          <section className="flex w-full flex-1 items-center justify-center overflow-hidden bg-[#f7fbff] p-4 md:p-6 lg:p-7">
            <div className="w-full max-w-md">
              <BrandLogo to={ROUTES.LANDING} className="mb-4" />

              <div className="mb-3">
                <h2 className="m-0 font-display text-[1.85rem] font-bold tracking-tight text-[#0f2a47]">
                  Créer un compte entreprise
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Commencez à gérer vos effectifs internationaux dès aujourd'hui.
                </p>
                {error && (
                  <p className="mt-2 text-sm text-red-500">{error}</p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#0f2a47]">Nom de l'entreprise</label>
                  <input
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition-all duration-150 placeholder:text-slate-400 focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/20"
                    placeholder="Ex: Acme Corp"
                    required
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#0f2a47]">E-mail entreprise</label>
                  <input
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition-all duration-150 placeholder:text-slate-400 focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/20"
                    placeholder="contact@entreprise.com"
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#0f2a47]">Nom admin</label>
                  <input
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition-all duration-150 placeholder:text-slate-400 focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/20"
                    placeholder="Prénom Nom"
                    required
                    type="text"
                    name="adminName"
                    value={formData.adminName}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#0f2a47]">E-mail admin</label>
                  <input
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition-all duration-150 placeholder:text-slate-400 focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/20"
                    placeholder="admin@exemple.com"
                    required
                    type="email"
                    name="adminEmail"
                    value={formData.adminEmail}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#0f2a47]">Mot de passe admin</label>
                  <div className="relative">
                    <input
                      className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-4 pr-12 text-sm text-slate-700 outline-none transition-all duration-150 placeholder:text-slate-400 focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/20"
                      placeholder="••••••••"
                      required
                      type={showPassword ? "text" : "password"}
                      name="adminPassword"
                      value={formData.adminPassword}
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
                    <Link
                      to={ROUTES.LANDING}
                      className="font-medium text-[#007BFF] no-underline hover:text-[#0062db]"
                    >
                      Conditions d'utilisation
                    </Link>{" "}
                    et notre {" "}
                    <Link
                      to={ROUTES.LANDING}
                      className="font-medium text-[#007BFF] no-underline hover:text-[#0062db]"
                    >
                      Politique de confidentialité
                    </Link>.
                  </label>
                </div>

                <button
                  className="mt-1 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-none bg-[#007BFF] text-sm font-semibold text-white shadow-md shadow-[#007BFF]/25 transition-all duration-150 hover:bg-[#0062db] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
                  type="submit"
                  disabled={loading}
                >
                  <span>{loading ? "Création..." : "Créer un compte entreprise"}</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>

                <div className="relative my-1 py-1.5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  
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
