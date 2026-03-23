import React, { useState } from "react";

const INTEGRATIONS_DATA = [
  {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Synchronisez vos entretiens avec Google Calendar.",
    icon: "calendar_month",
    color: "bg-red-50 text-red-500",
    connected: true,
  },
  {
    id: "linkedin",
    name: "LinkedIn Recruiter",
    description: "Importez des profils directement depuis LinkedIn.",
    icon: "person_search",
    color: "bg-blue-50 text-blue-600",
    connected: false,
    note: "Nécessite une licence Enterprise",
  },
  {
    id: "slack",
    name: "Slack",
    description: "Recevez des notifications instantanées pour les nouveaux candidats.",
    icon: "forum",
    color: "bg-purple-50 text-purple-500",
    connected: false,
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    description: "Générez des liens de réunion Teams pour vos entretiens.",
    icon: "video_chat",
    color: "bg-indigo-50 text-indigo-500",
    connected: false,
  },
  {
    id: "indeed",
    name: "Indeed",
    description: "Publiez vos offres en un clic et suivez les retours.",
    icon: "work",
    color: "bg-sky-50 text-sky-500",
    connected: false,
  },
  {
    id: "smtp",
    name: "SMTP Custom",
    description: "Envoyez depuis votre propre domaine email.",
    icon: "alternate_email",
    color: "bg-emerald-50 text-emerald-500",
    connected: false,
  },
];

export default function IntegrationsTab() {
  const [integrations, setIntegrations] = useState(INTEGRATIONS_DATA);
  const [showApiKey, setShowApiKey] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  const toggleIntegration = function (id) {
    setIntegrations(function (prev) {
      return prev.map(function (integration) {
        if (integration.id === id) {
          return { ...integration, connected: !integration.connected };
        }
        return integration;
      });
    });
  };

  const handleCopyApiKey = function () {
    navigator.clipboard.writeText("sk-tal-xxxxxxxxxxxx");
    setApiKeyCopied(true);
    setTimeout(function () {
      setApiKeyCopied(false);
    }, 2000);
  };

  const handleRegenerateApiKey = function () {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir régénérer votre clé API ? L'ancienne clé ne fonctionnera plus."
      )
    ) {
    }
  };

  const handleTestWebhook = function () {
    if (!webhookUrl) {
      alert("Veuillez entrer une URL de webhook");
      return;
    }
    alert("Test du webhook envoyé !");
  };

  const inputClasses =
    "w-full rounded-xl border border-border bg-white px-4 py-2.5 font-body text-sm text-text-primary placeholder:text-text-muted outline-none transition-all duration-150 focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <div>
      <header className="mb-6">
        <h2 className="font-display text-lg font-semibold text-text-primary">
          Intégrations & Connexions
        </h2>
        <p className="mt-1 font-body text-sm text-text-secondary">
          Connectez Talentia à vos outils existants pour automatiser votre flux
          de travail.
        </p>
      </header>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {integrations.map(function (integration) {
          return (
            <div
              key={integration.id}
              className="group rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-150 hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-4 flex items-start justify-between">
                <div
                  className={
                    "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-150 group-hover:scale-105 " +
                    integration.color
                  }
                >
                  <span className="material-symbols-outlined text-2xl">
                    {integration.icon}
                  </span>
                </div>
                <span
                  className={
                    "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-body text-xs font-medium " +
                    (integration.connected
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-bg-soft text-text-muted")
                  }
                >
                  {integration.connected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  )}
                  {integration.connected ? "Connecté" : "Non connecté"}
                </span>
              </div>

              <h3 className="font-display text-sm font-semibold text-text-primary">
                {integration.name}
              </h3>
              <p className="mb-4 mt-1 font-body text-xs text-text-muted">
                {integration.description}
              </p>

              {integration.note && (
                <p className="mb-4 flex items-center gap-1 font-body text-xs italic text-text-muted">
                  <span className="material-symbols-outlined text-xs">
                    info
                  </span>
                  {integration.note}
                </p>
              )}

              <button
                type="button"
                onClick={function () {
                  toggleIntegration(integration.id);
                }}
                className={
                  "w-full rounded-xl px-5 py-2.5 font-body text-sm font-medium transition-all duration-150 " +
                  (integration.connected
                    ? "border border-primary bg-white text-primary hover:bg-primary-light"
                    : "bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary-dark hover:shadow-lg")
                }
              >
                {integration.connected ? "Configurer" : "Connecter"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="relative my-8 border-t border-border">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-page px-3 font-body text-xs font-medium text-text-muted">
          API & Webhooks
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
              Clé API active
            </label>

            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type={showApiKey ? "text" : "password"}
                  value="sk-tal-xxxxxxxxxxxx"
                  readOnly
                  className={inputClasses + " pr-10 font-mono"}
                />
                <button
                  type="button"
                  onClick={function () {
                    setShowApiKey(!showApiKey);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted transition-colors hover:text-text-secondary"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showApiKey ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopyApiKey}
                title={apiKeyCopied ? "Copié !" : "Copier"}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white transition-colors hover:bg-bg-soft"
              >
                <span className="material-symbols-outlined text-lg text-text-secondary">
                  {apiKeyCopied ? "check" : "content_copy"}
                </span>
              </button>

              <button
                type="button"
                onClick={handleRegenerateApiKey}
                title="Régénérer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white transition-colors hover:border-red-200 hover:bg-red-50"
              >
                <span className="material-symbols-outlined text-lg text-text-secondary hover:text-red-500">
                  refresh
                </span>
              </button>
            </div>

            <p className="flex items-center gap-1.5 font-body text-xs text-text-muted">
              <span className="material-symbols-outlined text-sm">
                schedule
              </span>
              Dernière utilisation il y a 2 heures
            </p>
          </div>

          <div className="space-y-4">
            <label className="mb-1.5 block font-body text-sm font-medium text-text-primary">
              URL du Webhook
            </label>

            <input
              type="url"
              value={webhookUrl}
              onChange={function (e) {
                setWebhookUrl(e.target.value);
              }}
              placeholder="https://votre-domaine.com/webhook"
              className={inputClasses}
            />

            <button
              type="button"
              onClick={handleTestWebhook}
              className="rounded-xl border border-border bg-white px-5 py-2.5 font-body text-sm font-medium text-text-primary transition-colors hover:bg-bg-soft"
            >
              Tester le webhook
            </button>

            <div className="flex items-center gap-4 pt-2">
              <span className="flex items-center gap-2 font-body text-xs text-text-muted">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                12 événements actifs
              </span>
              <a
                href="#"
                className="font-body text-xs font-medium text-primary no-underline transition-colors hover:text-primary-dark"
              >
                Documentation API
                <span className="material-symbols-outlined ml-0.5 align-middle text-xs">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
