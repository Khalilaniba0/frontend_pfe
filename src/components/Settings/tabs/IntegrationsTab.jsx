// src/components/Settings/tabs/IntegrationsTab.jsx
import React, { useState } from 'react';

// Integration data
const INTEGRATIONS_DATA = [
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Synchronisez vos entretiens avec Google Calendar.',
    icon: 'calendar_month',
    connected: true
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Recruiter',
    description: 'Importez des profils directement depuis LinkedIn.',
    icon: 'person_search',
    connected: false,
    note: 'Nécessite une licence Enterprise'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Recevez des notifications instantanées pour les nouveaux candidats.',
    icon: 'forum',
    connected: false
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description: 'Générez des liens de réunion Teams pour vos entretiens.',
    icon: 'video_chat',
    connected: false
  },
  {
    id: 'indeed',
    name: 'Indeed',
    description: 'Publiez vos offres en un clic et suivez les retours.',
    icon: 'work',
    connected: false
  },
  {
    id: 'smtp',
    name: 'SMTP Custom',
    description: 'Envoyez depuis votre propre domaine email.',
    icon: 'alternate_email',
    connected: false
  }
];

export default function IntegrationsTab() {
  const [integrations, setIntegrations] = useState(INTEGRATIONS_DATA);
  const [showApiKey, setShowApiKey] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  const toggleIntegration = (id) => {
    setIntegrations(prev =>
      prev.map(integration =>
        integration.id === id
          ? { ...integration, connected: !integration.connected }
          : integration
      )
    );
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText('sk-tal-••••••••••••');
    setApiKeyCopied(true);
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

  const handleRegenerateApiKey = () => {
    if (window.confirm('Êtes-vous sûr de vouloir régénérer votre clé API ? L\'ancienne clé ne fonctionnera plus.')) {
      console.log('Regenerating API key...');
    }
  };

  const handleTestWebhook = () => {
    if (!webhookUrl) {
      alert('Veuillez entrer une URL de webhook');
      return;
    }
    console.log('Testing webhook:', webhookUrl);
    alert('Test du webhook envoyé !');
  };

  return (
    <div>
      {/* Header */}
      <h2 className="text-lg font-display font-semibold text-text-primary mb-1">
        Intégrations & Connexions
      </h2>
      <p className="text-sm text-text-secondary mb-6">
        Connectez Talentia à vos outils existants pour automatiser votre flux de travail.
      </p>

      {/* Integrations grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="bg-white rounded-2xl border border-border p-5 hover:border-primary/40 hover:shadow-sm transition-all"
          >
            {/* Top row: icon + badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-bg-soft flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-text-secondary">
                  {integration.icon}
                </span>
              </div>
              <span
                className={`px-2 py-1 rounded-lg text-xs font-medium ${
                  integration.connected
                    ? 'bg-green-100 text-green-700'
                    : 'bg-bg-soft text-text-muted'
                }`}
              >
                {integration.connected ? 'Connecté' : 'Non connecté'}
              </span>
            </div>

            {/* Name */}
            <h3 className="text-sm font-display font-semibold text-text-primary mt-3">
              {integration.name}
            </h3>

            {/* Description */}
            <p className="text-xs text-text-muted mt-1 mb-4">
              {integration.description}
            </p>

            {/* Optional note */}
            {integration.note && (
              <p className="text-xs text-text-muted italic mb-4">
                {integration.note}
              </p>
            )}

            {/* Action button */}
            <div className="mt-auto">
              {integration.connected ? (
                <button
                  onClick={() => toggleIntegration(integration.id)}
                  className="w-full px-5 py-2.5 rounded-xl border border-primary bg-white font-body font-medium text-sm text-primary hover:bg-primary/5 transition-colors"
                >
                  Configurer
                </button>
              ) : (
                <button
                  onClick={() => toggleIntegration(integration.id)}
                  className="w-full px-5 py-2.5 rounded-xl bg-primary font-display font-semibold text-sm text-white hover:bg-primary-dark transition-colors shadow-md"
                >
                  Connecter
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Divider with label */}
      <div className="relative border-t border-border my-8">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-page px-3 text-xs text-text-muted font-medium">
          API & Webhooks
        </span>
      </div>

      {/* API & Webhooks section */}
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: API Key */}
          <div className="space-y-4">
            <label className="block text-sm font-body font-medium text-text-primary">
              Clé API active
            </label>

            {/* API Key input with buttons */}
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value="sk-tal-••••••••••••"
                  readOnly
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-white font-mono text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showApiKey ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>

              {/* Copy button */}
              <button
                type="button"
                onClick={handleCopyApiKey}
                title={apiKeyCopied ? 'Copié !' : 'Copier'}
                className="p-2.5 border border-border rounded-xl bg-white hover:bg-bg-soft transition-colors"
              >
                <span className="material-symbols-outlined text-text-secondary">
                  {apiKeyCopied ? 'check' : 'content_copy'}
                </span>
              </button>

              {/* Regenerate button */}
              <button
                type="button"
                onClick={handleRegenerateApiKey}
                title="Régénérer"
                className="p-2.5 border border-border rounded-xl bg-white hover:border-red-200 hover:text-red-500 transition-colors"
              >
                <span className="material-symbols-outlined text-text-secondary hover:text-red-500">
                  refresh
                </span>
              </button>
            </div>

            {/* Helper text */}
            <p className="text-xs text-text-muted">
              Dernière utilisation il y a 2 heures
            </p>
          </div>

          {/* Right: Webhook */}
          <div className="space-y-4">
            <label className="block text-sm font-body font-medium text-text-primary">
              URL du Webhook
            </label>

            {/* Webhook input */}
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              placeholder="https://votre-domaine.com/webhook"
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />

            {/* Test button */}
            <button
              type="button"
              onClick={handleTestWebhook}
              className="px-5 py-2.5 rounded-xl border border-border bg-white font-body font-medium text-sm text-text-primary hover:bg-bg-soft transition-colors"
            >
              Tester le webhook
            </button>

            {/* Status row */}
            <div className="flex items-center gap-4 pt-2">
              <span className="flex items-center gap-2 text-xs text-text-muted">
                <span className="w-2 h-2 rounded-full bg-success"></span>
                12 événements actifs
              </span>
              <a
                href="https://docs.example.com/api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-primary hover:underline"
              >
                Documentation API →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
