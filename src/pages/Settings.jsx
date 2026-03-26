import { useState } from "react";
import SettingsLayout from "components/Settings/SettingsLayout";
import EntrepriseTab from "components/Settings/tabs/EntrepriseTab";
import NotificationsTab from "components/Settings/tabs/NotificationsTab";
import ApparenceTab from "components/Settings/tabs/ApparenceTab";
import IntegrationsTab from "components/Settings/tabs/IntegrationsTab";
import SecuriteTab from "components/Settings/tabs/SecuriteTab";

const TABS = {
  entreprise: <EntrepriseTab />,
  notifications: <NotificationsTab />,
  apparence: <ApparenceTab />,
  integrations: <IntegrationsTab />,
  securite: <SecuriteTab />,
};

export default function Settings() {
  const [activeTab, setActiveTab] = useState("entreprise");

  return (
    <div className="animate-fade-in">
      <header className="mb-6">
        <h1 className="font-display text-xl font-bold tracking-tight text-text-primary md:text-3xl lg:text-4xl">
          Paramètres
        </h1>
        <p className="mt-1 font-body text-sm text-text-secondary">
          Configurez les préférences de votre plateforme
        </p>
      </header>

      <SettingsLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {TABS[activeTab]}
      </SettingsLayout>
    </div>
  );
}
