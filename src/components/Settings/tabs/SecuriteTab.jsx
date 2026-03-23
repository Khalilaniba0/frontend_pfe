import React, { useState, useMemo } from "react";
import ManageUsersModal from "../ManageUsersModal";

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
  const [saving, setSaving] = useState(false);
  const [showManageUsers, setShowManageUsers] = useState(false);

  const passwordStrength = useMemo(
    function () {
      const pwd = passwords.new;
      if (!pwd) return 0;
      let strength = 0;
      if (pwd.length >= 8) strength++;
      if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
      if (/\d/.test(pwd)) strength++;
      if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
      return strength;
    },
    [passwords.new]
  );

  const strengthLabels = ["", "Faible", "Moyen", "Bon", "Excellent"];
  const strengthColors = [
    "bg-gray-200",
    "bg-red-500",
    "bg-orange-500",
    "bg-amber-500",
    "bg-emerald-500",
  ];

  const handlePasswordChange = function (field, value) {
    setPasswords(function (prev) {
      return { ...prev, [field]: value };
    });
  };

  const togglePasswordVisibility = function (field) {
    setShowPasswords(function (prev) {
      return { ...prev, [field]: !prev[field] };
    });
  };

  const handlePasswordSubmit = function (e) {
    e.preventDefault();
    setSaving(true);
    setTimeout(function () {
      setSaving(false);
      setPasswords({ current: "", new: "", confirm: "" });
    }, 800);
  };

  const handleRevokeSession = function (sessionId) {
    setSessions(function (prev) {
      return prev.filter(function (s) {
        return s.id !== sessionId;
      });
    });
  };

  const inputClasses =
    "w-full rounded-xl border border-border bg-white px-4 py-2.5 pr-10 font-body text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-150 focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <div>
      <header className="mb-6">
        <h2 className="font-display text-lg font-semibold text-text-primary">
          Sécurité du compte
        </h2>
        <p className="mt-1 font-body text-sm text-text-secondary">
          Gérez vos accès, mots de passe et sessions actives.
        </p>
      </header>

      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold text-text-primary">
            <span className="material-symbols-outlined text-lg text-primary">
              lock
            </span>
            Modifier le mot de passe
          </h3>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="max-w-md">
              <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
                Mot de passe actuel
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  value={passwords.current}
                  onChange={function (e) {
                    handlePasswordChange("current", e.target.value);
                  }}
                  className={inputClasses}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={function () {
                    togglePasswordVisibility("current");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-text-secondary"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPasswords.current ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={passwords.new}
                    onChange={function (e) {
                      handlePasswordChange("new", e.target.value);
                    }}
                    className={inputClasses}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={function () {
                      togglePasswordVisibility("new");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-text-secondary"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPasswords.new ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwords.confirm}
                    onChange={function (e) {
                      handlePasswordChange("confirm", e.target.value);
                    }}
                    className={inputClasses}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={function () {
                      togglePasswordVisibility("confirm");
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-text-secondary"
                  >
                    <span className="material-symbols-outlined text-lg">
                      {showPasswords.confirm ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {passwords.new && (
              <div className="max-w-md">
                <div className="mb-1.5 flex gap-1">
                  {[1, 2, 3, 4].map(function (level) {
                    return (
                      <div
                        key={level}
                        className={
                          "h-1.5 flex-1 rounded-full transition-colors " +
                          (level <= passwordStrength
                            ? strengthColors[passwordStrength]
                            : "bg-gray-200")
                        }
                      ></div>
                    );
                  })}
                </div>
                <p className="font-body text-xs text-text-muted">
                  Force du mot de passe :{" "}
                  <span
                    className={
                      "font-medium " +
                      (passwordStrength >= 3
                        ? "text-emerald-600"
                        : passwordStrength >= 2
                          ? "text-amber-600"
                          : "text-red-500")
                    }
                  >
                    {strengthLabels[passwordStrength]}
                  </span>
                </p>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-body text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-150 hover:bg-primary-dark hover:shadow-lg disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-base">
                      progress_activity
                    </span>
                    Mise à jour...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">
                      check
                    </span>
                    Mettre à jour
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold text-text-primary">
            <span className="material-symbols-outlined text-lg text-primary">
              shield
            </span>
            Double authentification (2FA)
          </h3>

          <div className="flex items-center justify-between rounded-xl bg-bg-soft p-4">
            <div>
              <p className="font-body text-sm font-medium text-text-primary">
                Authentification à deux facteurs
              </p>
              <p className="mt-0.5 font-body text-xs text-text-muted">
                Recevez un code de vérification sur votre téléphone lors de la
                connexion.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={
                  "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-body text-xs font-medium " +
                  (twoFactorEnabled
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-gray-100 text-text-muted")
                }
              >
                {twoFactorEnabled && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                )}
                {twoFactorEnabled ? "Activé" : "Désactivé"}
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={twoFactorEnabled}
                onClick={function () {
                  setTwoFactorEnabled(!twoFactorEnabled);
                }}
                className={
                  "relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 " +
                  (twoFactorEnabled ? "bg-primary" : "bg-gray-200")
                }
              >
                <span
                  className={
                    "inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 " +
                    (twoFactorEnabled ? "translate-x-6" : "translate-x-1")
                  }
                />
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 font-display text-sm font-semibold text-text-primary">
            <span className="material-symbols-outlined text-lg text-primary">
              devices
            </span>
            Sessions actives
          </h3>

          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full">
              <thead className="bg-bg-soft">
                <tr>
                  <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Appareil
                  </th>
                  <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Localisation
                  </th>
                  <th className="px-4 py-3 text-left font-body text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Date
                  </th>
                  <th className="px-4 py-3 text-right font-body text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sessions.map(function (session) {
                  return (
                    <tr
                      key={session.id}
                      className="transition-colors duration-150 hover:bg-bg-soft/50"
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-lg text-text-secondary">
                            {session.icon}
                          </span>
                          <span className="font-body text-sm text-text-primary">
                            {session.device}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 font-body text-sm text-text-secondary">
                        {session.location}
                      </td>
                      <td className="px-4 py-3.5">
                        {session.current ? (
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary-light px-2.5 py-1 font-body text-xs font-medium text-primary">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"></span>
                            {session.date}
                          </span>
                        ) : (
                          <span className="font-body text-sm text-text-secondary">
                            {session.date}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        {!session.current && (
                          <button
                            type="button"
                            onClick={function () {
                              handleRevokeSession(session.id);
                            }}
                            className="font-body text-sm font-medium text-red-500 transition-colors hover:text-red-600"
                          >
                            Révoquer
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-primary/20 bg-primary-light p-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined flex-shrink-0 text-xl text-primary">
              info
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-body text-sm font-medium text-text-primary">
                Besoin de gérer les permissions des utilisateurs ?
              </p>
              <p className="mt-0.5 font-body text-xs text-text-muted">
                Accédez à la page Utilisateurs pour attribuer des rôles et gérer
                les accès.
              </p>
            </div>
            <button
              type="button"
              onClick={function () {
                setShowManageUsers(true);
              }}
              className="flex items-center gap-1 whitespace-nowrap font-body text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              Gérer les rôles
              <span className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>

      {showManageUsers && (
        <ManageUsersModal onClose={function () { setShowManageUsers(false); }} />
      )}
    </div>
  );
}
