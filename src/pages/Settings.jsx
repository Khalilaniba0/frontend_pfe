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
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-display font-semibold text-text-primary">
          Paramètres
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Configurez les préférences de votre plateforme.
        </p>
      </div>

      {/* Layout paramètres */}
      <SettingsLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {TABS[activeTab]}
      </SettingsLayout>
    </div>
  );
}
