import React, { useState } from "react";

export default function ApparenceTab() {
  const [theme, setTheme] = useState("clair");
  const [language, setLanguage] = useState("fr");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Apparence saved:", { theme, language });
  };

  return (
    <div>
      {/* Header */}
      <h2 className="text-lg font-display font-semibold text-text-primary mb-1">
        Apparence
      </h2>
      <p className="text-sm text-text-secondary mb-6">
        Personnalisez le thème de la plateforme.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Theme selector */}
        <div>
          <label className="text-sm font-display font-medium text-text-primary mb-3 block">
            Thème
          </label>
          <div className="grid grid-cols-2 gap-4">
            {/* Clair */}
            <button
              type="button"
              onClick={() => setTheme("clair")}
              className={`p-4 rounded-lg border-2 transition-colors text-left ${
                theme === "clair"
                  ? "border-primary bg-primary-light"
                  : "border-border hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-xl text-text-primary">
                  light_mode
                </span>
                <span
                  className={`text-sm font-display font-medium ${
                    theme === "clair" ? "text-primary" : "text-text-primary"
                  }`}
                >
                  Clair
                </span>
              </div>
              <div className="w-full h-12 bg-white border border-border rounded flex items-center justify-center">
                <div className="w-8 h-2 bg-gray-200 rounded" />
              </div>
            </button>

            {/* Sombre */}
            <button
              type="button"
              onClick={() => setTheme("sombre")}
              className={`p-4 rounded-lg border-2 transition-colors text-left ${
                theme === "sombre"
                  ? "border-primary bg-primary-light"
                  : "border-border hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-xl text-text-primary">
                  dark_mode
                </span>
                <span
                  className={`text-sm font-display font-medium ${
                    theme === "sombre" ? "text-primary" : "text-text-primary"
                  }`}
                >
                  Sombre
                </span>
              </div>
              <div className="w-full h-12 bg-gray-800 border border-gray-700 rounded flex items-center justify-center">
                <div className="w-8 h-2 bg-gray-600 rounded" />
              </div>
            </button>
          </div>
        </div>

        <div className="border-t border-border my-6" />

        {/* Language selector */}
        <div>
          <label
            htmlFor="language"
            className="text-sm font-display font-medium text-text-primary mb-1 block"
          >
            Langue
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border border-border rounded-lg px-3 py-2 text-sm w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>

        {/* Submit button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-primary hover:bg-primary-dark text-white font-display font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
}
