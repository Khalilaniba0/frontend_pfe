// Lignes : 29 | Couche : page | Depend de : SettingsLayout, EntrepriseTab, IntegrationsTab, SecuriteTab
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import SettingsLayout from "components/Parametres/MiseEnPageParametres";
import EntrepriseTab from "components/Parametres/tabs/EntrepriseTab";
import IntegrationsTab from "components/Parametres/tabs/IntegrationsTab";
import SecuriteTab from "components/Parametres/tabs/SecuriteTab";

const TABS = {
  entreprise: <EntrepriseTab />,
  integrations: <IntegrationsTab />,
  securite: <SecuriteTab />,
};

export default function Settings() {
  const location = useLocation();

  const requestedTab = useMemo(
    function () {
      const tab = new URLSearchParams(location.search).get("tab");
      return tab && Object.prototype.hasOwnProperty.call(TABS, tab)
        ? tab
        : "entreprise";
    },
    [location.search],
  );

  const [activeTab, setActiveTab] = useState(requestedTab);

  useEffect(
    function () {
      setActiveTab(requestedTab);
    },
    [requestedTab],
  );

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
