// src/components/Settings/tabs/SecuriteTab.jsx
import React, { useState, useMemo } from "react";

const INITIAL_SESSIONS = [
  {
    id: 1,
    device: "Chrome · Windows 11",
    icon: "laptop_windows",
    location: "Paris, France",
    date: "Session actuelle",
    current: true,
  },
  {
    id: 2,
    device: "Safari · iPhone",
    icon: "smartphone",
    location: "Tunis, Tunisie",
    date: "Il y a 2 jours",
    current: false,
  },
];

export default function SecuriteTab() {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);

  // Calculate password strength (0-4)
  const passwordStrength = useMemo(() => {
    const pwd = passwords.new;
    if (!pwd) return 0;
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    return strength;
  }, [passwords.new]);

  const strengthLabels = ["", "Faible", "Moyen", "Bon", "Excellent"];
  const strengthColors = ["bg-gray-200", "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];

  const handlePasswordChange = (field, value) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Password change submitted:", passwords);
  };

  const handleRevokeSession = (sessionId) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId));
  };

  return (
    <div>
      {/* Header */}
      <h2 className="text-lg font-display font-semibold text-text-primary mb-1">
        Sécurité du compte
      </h2>
      <p className="text-sm text-text-secondary mb-6">
        Gérez vos accès, mots de passe et sessions actives.
      </p>

      {/* Section: Modifier le mot de passe */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="material-symbols-outlined text-xl text-text-secondary">lock</span>
          <div>
            <h3 className="text-sm font-display font-semibold text-text-primary">
              Modifier le mot de passe
            </h3>
            <p className="text-xs text-text-muted">
              Choisissez un mot de passe fort et unique
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          {/* Current password */}
          <div className="max-w-md">
            <label className="text-sm font-body font-medium text-text-primary mb-1 block">
              Mot de passe actuel
            </label>
            <div className="relative">
              <input
                type={showPasswords.current ? "text" : "password"}
                value={passwords.current}
                onChange={(e) => handlePasswordChange("current", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-white font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
              >
                <span className="material-symbols-outlined text-xl">
                  {showPasswords.current ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* New password + Confirm */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <div>
              <label className="text-sm font-body font-medium text-text-primary mb-1 block">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  value={passwords.new}
                  onChange={(e) => handlePasswordChange("new", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-white font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPasswords.new ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm font-body font-medium text-text-primary mb-1 block">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwords.confirm}
                  onChange={(e) => handlePasswordChange("confirm", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-white font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPasswords.confirm ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Password strength bar */}
          {passwords.new && (
            <div className="max-w-md">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      level <= passwordStrength ? strengthColors[passwordStrength] : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-text-muted">
                Force du mot de passe : {strengthLabels[passwordStrength]}
              </p>
            </div>
          )}

          {/* Submit button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-primary font-display font-semibold text-sm text-white hover:bg-primary-dark transition-colors shadow-md"
            >
              Mettre à jour le mot de passe
            </button>
          </div>
        </form>
      </div>

      <div className="border-t border-border my-6" />

      {/* Section: Double authentification */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="material-symbols-outlined text-xl text-text-secondary">shield</span>
          <div>
            <h3 className="text-sm font-display font-semibold text-text-primary">
              Double authentification (2FA)
            </h3>
            <p className="text-xs text-text-muted">
              Ajoutez une couche de sécurité supplémentaire
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-body text-text-primary">
              Authentification à deux facteurs
            </p>
            <p className="text-xs text-text-muted mt-0.5">
              Recevez un code de vérification sur votre téléphone lors de la connexion.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`px-2 py-1 rounded-lg text-xs font-medium ${
                twoFactorEnabled
                  ? "bg-green-100 text-green-700"
                  : "bg-bg-soft text-text-muted"
              }`}
            >
              {twoFactorEnabled ? "Activé" : "Désactivé"}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={twoFactorEnabled}
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                twoFactorEnabled ? "bg-primary" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                  twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-border my-6" />

      {/* Section: Sessions actives */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="material-symbols-outlined text-xl text-text-secondary">devices</span>
          <div>
            <h3 className="text-sm font-display font-semibold text-text-primary">
              Sessions actives
            </h3>
            <p className="text-xs text-text-muted">
              Gérez les appareils connectés à votre compte
            </p>
          </div>
        </div>

        <div className="border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-bg-soft">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-display font-semibold text-text-muted uppercase tracking-wider">
                  Appareil
                </th>
                <th className="px-4 py-3 text-left text-xs font-display font-semibold text-text-muted uppercase tracking-wider">
                  Localisation
                </th>
                <th className="px-4 py-3 text-left text-xs font-display font-semibold text-text-muted uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-right text-xs font-display font-semibold text-text-muted uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sessions.map((session) => (
                <tr key={session.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-xl text-text-secondary">
                        {session.icon}
                      </span>
                      <span className="text-sm font-body text-text-primary">
                        {session.device}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-body text-text-secondary">
                    {session.location}
                  </td>
                  <td className="px-4 py-3">
                    {session.current ? (
                      <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                        {session.date}
                      </span>
                    ) : (
                      <span className="text-sm font-body text-text-secondary">
                        {session.date}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {!session.current && (
                      <button
                        onClick={() => handleRevokeSession(session.id)}
                        className="text-sm font-body font-medium text-red-500 hover:text-red-600 transition-colors"
                      >
                        Révoquer
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border-t border-border my-6" />

      {/* Section: Gestion des rôles (info card) */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-xl text-primary">info</span>
          <div className="flex-1">
            <p className="text-sm font-body text-text-primary">
              Besoin de gérer les permissions des utilisateurs ?
            </p>
            <p className="text-xs text-text-muted mt-0.5">
              Accédez à la page Utilisateurs pour attribuer des rôles et gérer les accès.
            </p>
          </div>
          <a
            href="/dashboard/users"
            className="text-sm font-display font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            Gérer les rôles →
          </a>
        </div>
      </div>

      <div className="border-t border-border my-6" />

      {/* Section: Zone de danger */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-xl text-red-500">warning</span>
          <div className="flex-1">
            <h3 className="text-sm font-display font-semibold text-red-600">
              Supprimer le compte entreprise
            </h3>
            <p className="text-sm font-body text-red-500 mt-1">
              Cette action est irréversible. Toutes vos données, candidatures, offres d'emploi
              et historiques seront définitivement supprimés.
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button className="px-5 py-2.5 rounded-xl border border-red-200 bg-white font-body font-medium text-sm text-red-500 hover:bg-red-50 transition-colors">
            Supprimer le compte
          </button>
        </div>
      </div>
    </div>
  );
}
