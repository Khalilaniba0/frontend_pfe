
# Talentia ATS - Frontend

Plateforme ATS (Applicant Tracking System) professionnelle pour entreprises et recruteurs. Interface moderne et responsive construite avec React 19 et Tailwind CSS.


## Contexte du projet

Talentia est une solution SaaS de gestion des candidatures destinée aux entreprises et aux recruteurs RH. L'application permet de :
- Suivre les candidatures via un pipeline Kanban
- Visualiser les statistiques de recrutement
- Gérer les entretiens et plannings
- Automatiser certaines tâches RH

---


## Stack technique


| Technologie              | Version  | Usage                   |
|--------------------------|----------|-------------------------|
| React                    | 19.2.4   | Framework UI            |
| React Router DOM         | 6.30.3   | Routing SPA             |
| Tailwind CSS             | 3.x      | Styling utility-first   |
| @tailwindcss/forms       | 0.5.11   | Styles formulaires      |
| Chart.js                 | 4.5.1    | Graphiques et analytics |
| FontAwesome Free         | 7.2.0    | Icônes                  |
| Google Material Symbols  | -        | Icônes outlined         |
| prop-types               | 15.8.1   | Validation des props    |


### Polices (Google Fonts)
- **Syne** : Titres et display (`font-display`)
- **DM Sans** : Corps de texte (`font-body`)
- **Inter** : Interface

---


## Installation


```bash
# Cloner le repo
git clone <repo-url>
cd front

# Installer les dépendances
npm install

# Lancer en développement
npm start
```


### Scripts disponibles


| Commande         | Description                                   |
|------------------|-----------------------------------------------|
| `npm start`      | Lance le serveur de dev sur http://localhost:3000 |
| `npm run build`  | Build de production dans `/build`              |
| `npm test`       | Lance les tests Jest                           |
| `npm run eject`  | Éjecte la config CRA (irréversible)            |

---


## Structure du projet


```
front/
├── files/                  # Composants candidats (legacy, hors src)
│   ├── CandidateFilters.jsx
│   ├── CandidateRow.jsx
│   ├── Candidates.jsx
│   ├── CandidateStatusBadge.jsx
│   ├── CandidateTable.jsx
│   ├── MatchScoreBar.jsx
│   └── PipelineStatCard.jsx
│
├── public/
│   ├── index.html          # Template HTML (fonts, meta)
│   └── manifest.json       # PWA manifest
│
├── src/
│   ├── index.js            # Point d'entrée, routing principal
│   ├── index.css           # Styles globaux CSS
│   │
│   ├── assets/
│   │   └── styles/
│   │       └── tailwind.css    # Import Tailwind (base, components, utilities)
│   │
│   ├── constants/
│   │   ├── routes.js           # Définitions centralisées des routes
│   │   ├── navigation.js       # Items de navigation avec rôles autorisés
│   │   └── interviewsData.js   # Données mock pour la page Entretiens
│   │
│   ├── context/
│   │   └── AuthContext.jsx     # Contexte d'authentification et rôle utilisateur
│   │
│   ├── layouts/
│   │   ├── AdminLayout.jsx     # Layout dashboard (sidebar + navbar)
│   │   └── AuthLayout.jsx      # Layout pages auth (login, signup)
│   │
│   ├── pages/
│   │   ├── LandingPage.jsx     # Page d'accueil marketing
│   │   ├── Login.jsx           # Page de connexion
│   │   ├── SignUp.jsx          # Page d'inscription entreprise
│   │   ├── ForgotPassword.jsx  # Réinitialisation mot de passe
│   │   ├── ProfileForm.jsx     # Formulaire profil candidat
│   │   ├── Dashboard.jsx       # Dashboard RH principal
│   │   ├── Recruitment.jsx     # Pipeline recrutement Kanban
│   │   ├── Jobs.jsx            # Liste des offres d'emploi
│   │   ├── Interviews.jsx      # Centre de planification entretiens
│   │   ├── Candidates.jsx      # Liste des candidats
│   │   ├── Users.jsx           # Gestion des utilisateurs (admin)
│   │   └── Settings.jsx        # Paramètres plateforme (admin)
│   │
│   └── components/
│       ├── auth/
│       │   └── LoginForm.jsx
│       ├── Candidates/
│       │   ├── CandidateFilters.jsx
│       │   ├── CandidateRow.jsx
│       │   ├── CandidateStatusBadge.jsx
│       │   ├── CandidateTable.jsx
│       │   ├── MatchScoreBar.jsx
│       │   └── PipelineStatCard.jsx
│       ├── Dashboard/
│       │   ├── HiringChart.jsx
│       │   ├── RecentActivity.jsx
│       │   ├── StatCard.jsx
│       │   └── UpcomingInterviews.jsx
│       ├── Interviews/
│       │   ├── InterviewsLayout.jsx         # Layout 2 colonnes (nav + contenu)
│       │   ├── InterviewCalendar.jsx        # Calendrier mensuel avec événements
│       │   ├── InterviewDayBriefing.jsx     # Briefing du jour
│       │   ├── InterviewStatCards.jsx       # Cartes statistiques
│       │   ├── EntretiensEnLigneTab.jsx     # Onglet entretiens visio en ligne
│       │   └── CreateInterviewModal.jsx     # Modal création entretien
│       ├── Jobs/
│       │   ├── JobRow.jsx
│       │   ├── JobsTable.jsx
│       │   ├── JobStatCard.jsx
│       │   ├── RecruitmentTimeCard.jsx
│       │   ├── SourceChart.jsx
│       │   └── StatusBadge.jsx
│       ├── Recruitment/
│       │   ├── CandidateCard.jsx
│       │   └── PipelineColumn.jsx
│       ├── Sections/
│       │   ├── HeroBanner.jsx
│       │   ├── FeaturesSection.jsx
│       │   ├── AuthHero.jsx
│       │   ├── FeatureCard.jsx
│       │   ├── GestionCandidatsCard.jsx
│       │   ├── PlanningEntretiensCard.jsx
│       │   ├── AnalyticsRapportsCard.jsx
│       │   ├── AutomatisationCard.jsx
│       │   └── PipelineKanbanCard.jsx
│       ├── Settings/
│       │   ├── SettingsLayout.jsx    # Layout 2 colonnes (nav + contenu)
│       │   ├── SettingsSidebar.jsx   # Sidebar legacy (conservé)
│       │   ├── CompanyForm.jsx       # Formulaire entreprise legacy
│       │   └── tabs/
│       │       ├── EntrepriseTab.jsx     # Onglet infos entreprise
│       │       ├── NotificationsTab.jsx  # Onglet notifications
│       │       ├── ApparenceTab.jsx      # Onglet thème/langue
│       │       ├── IntegrationsTab.jsx   # Onglet outils connectés
│       │       └── SecuriteTab.jsx       # Onglet sécurité/sessions
│       ├── Users/
│       │   ├── CreateUserModal.jsx   # Modal de création/édition utilisateur
│       │   ├── UserRow.jsx           # Ligne tableau utilisateur
│       │   ├── UserStatsCard.jsx     # Carte statistique utilisateurs
│       │   └── UserTable.jsx         # Tableau liste utilisateurs
│       ├── common/
│       │   └── ProtectedRoute.jsx # Protection des routes par rôle
│       └── layout/
│           ├── Navbar.jsx          # Navbar landing publique
│           ├── AdminNavbar.jsx     # Navbar dashboard admin
│           ├── Sidebar.jsx         # Sidebar navigation dashboard
│           ├── Footer.jsx          # Footer landing
│           └── AuthFooter.jsx      # Footer pages auth
│
├── tailwind.config.js      # Config Tailwind + Design System
├── jsconfig.json           # Alias imports (baseUrl: src)
└── package.json            # Dépendances et scripts
```

---


## Routes de l'application


### Routes publiques


| Route         | Composant      | Description                  |
|---------------|---------------|------------------------------|
| `/`           | -             | Redirige vers `/landing`     |
| `/landing`    | LandingPage   | Page d'accueil marketing     |
| `/formulaire` | ProfileForm   | Formulaire profil candidat   |


### Routes authentification


| Route              | Composant        | Description                |
|--------------------|-----------------|----------------------------|
| `/login`           | Login            | Page de connexion          |
| `/signup`          | SignUp           | Inscription entreprise     |
| `/forgot-password` | ForgotPassword   | Réinitialisation MDP       |


### Routes dashboard (protégées)


| Route                    | Composant    | Layout        | Description                           |
|--------------------------|--------------|--------------|---------------------------------------|
| `/dashboard`             | Dashboard    | AdminLayout  | Dashboard RH principal                |
| `/dashboard/recruitment` | Recruitment  | AdminLayout  | Pipeline Kanban                       |
| `/dashboard/jobs`        | Jobs         | AdminLayout  | Gestion des offres d'emploi           |
| `/dashboard/interviews`  | Interviews   | AdminLayout  | Centre de planification entretiens    |
| `/dashboard/candidates`  | Candidates   | AdminLayout  | Gestion des candidats                 |
| `/dashboard/users`       | Users        | AdminLayout  | Gestion utilisateurs (admin only)     |
| `/dashboard/settings`    | Settings     | AdminLayout  | Paramètres plateforme (admin only)    |

---


## Design system


### Palette de couleurs (Tailwind)


```js
// tailwind.config.js - Couleurs personnalisées
colors: {
  // Primary (cyan)
  primary: {
    DEFAULT: "#13c8ec",   // Couleur principale
    light: "#f0fdff",     // Fond léger
    dark: "#0891b2",      // Hover/accent
  },
  // Secondary (teal)
  secondary: {
    DEFAULT: "#36d1bc",   // Couleur secondaire
    light: "#f0fdfb",     // Fond léger
  },
  // Texte
  text: {
    primary: "#0f172a",   // Titres, texte principal
    secondary: "#64748b", // Texte secondaire
    muted: "#94a3b8",     // Texte désactivé/placeholder
  },
  // UI
  border: "#e2e8f0",      // Bordures
  "bg-soft": "#f8fafc",   // Fond cartes
  "bg-page": "#f6f8f8",   // Fond page
  success: "#16a34a",     // Statut succès
}
```


### Typographie


| Classe Tailwind  | Police   | Usage                        |
|------------------|---------|------------------------------|
| `font-display`   | Syne    | Titres, headings, boutons    |
| `font-body`      | DM Sans | Corps de texte, paragraphes  |


### Icônes

- **Material Symbols Outlined** : Icônes principales (visibility, menu, etc.)
- **FontAwesome Free** : Icônes complémentaires (social, etc.)

---


## Configuration


### jsconfig.json - Import aliases


```json
{
  "compilerOptions": {
    "baseUrl": "src"
  }
}
```


Permet d'importer depuis `src/` sans chemins relatifs :

```js
// Au lieu de : import Sidebar from "../../components/layout/Sidebar"
import Sidebar from "components/layout/Sidebar"
```


### tailwind.config.js


- **content** : Scanne `public/**/*.html` et `src/**/*.{js,jsx}`
- **theme.extend** : Couleurs custom, polices
- **plugins** : `@tailwindcss/forms` pour le style des formulaires

---


## Architecture des composants


### Layouts


1. **AdminLayout** : Wrapper pour toutes les pages dashboard
  - Inclut `Sidebar` (navigation gauche)
  - Inclut `AdminNavbar` (barre supérieure)
  - Gère le state `sidebarOpen` pour le responsive

2. **AuthLayout** : Wrapper pour les pages d'authentification
  - Layout split-screen (hero + form)
  - Inclut `AuthFooter`


### Patterns utilisés


- **Composants présentations** : Les dossiers `Dashboard/`, `Jobs/`, `Candidates/` et `Sections/` reçoivent des props et affichent
- **Pages containers** : Les `pages/` gèrent l'état et la logique
- **Layouts** : Structures réutilisables avec `children`

---


## Conventions de code


### Nommage


- **Composants** : PascalCase (ex : `LoginForm.jsx`)
- **Fonctions/hooks** : camelCase (ex : `handleSubmit`)
- **Constantes** : SCREAMING_SNAKE_CASE (ex : `ROUTES`)
- **Fichiers CSS** : kebab-case (ex : `tailwind.css`)


### Structure composant


```jsx
import React from "react";
import PropTypes from "prop-types";

export default function MonComposant({ prop1, prop2 }) {
  // State
  const [state, setState] = React.useState(initial);

  // Handlers
  const handleAction = () => { /* ... */ };

  // Render
  return (
    <div className="...">
      {/* JSX */}
    </div>
  );
}

MonComposant.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};
```


### Template de page dashboard

Toutes les pages du dashboard suivent ce template standardisé. Le padding global est géré par `AdminLayout.jsx` — ne jamais ajouter de padding sur le div racine d'une page.

```jsx
export default function PageName() {
  return (
    <div>  {/* PAS de padding ici — AdminLayout le gère */}

      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-display font-semibold text-text-primary">
          Titre de la page
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Description de la page
        </p>
      </div>

      {/* Page content */}
      <div className="space-y-6">
        {/* Contenu ici */}
      </div>

    </div>
  );
}
```


### Règles de layout

| Élément | Classe Tailwind |
|---------|-----------------|
| Padding global | `px-6 py-6` (dans AdminLayout uniquement) |
| Largeur max | `max-w-screen-2xl mx-auto` (dans AdminLayout) |
| Titre page | `text-2xl font-display font-semibold text-text-primary` |
| Sous-titre | `text-sm text-text-secondary mt-1` |
| Espacement header | `mb-6` |
| Espacement sections | `space-y-6` ou `gap-6` |
| Fond page | `bg-bg-page` |

---


## Gestion des rôles et permissions


### Rôles disponibles

L'application gère deux rôles utilisateur distincts :

| Rôle | Description |
|------|-------------|
| `admin` | Administrateur avec accès complet à toutes les fonctionnalités |
| `rh` | Responsable RH avec accès limité aux fonctions de recrutement |


### Permissions par rôle

| Fonctionnalité | Admin | RH |
|----------------|:-----:|:--:|
| Tableau de bord | ✅ | ✅ |
| Recrutement (Pipeline Kanban) | ✅ | ✅ |
| Offres d'emploi | ✅ | ✅ |
| Entretiens | ✅ | ✅ |
| Candidats | ✅ | ✅ |
| **Gestion utilisateurs** | ✅ | ❌ |
| **Paramètres** | ✅ | ❌ |


### Routes protégées

| Route | Rôles autorisés |
|-------|-----------------|
| `/dashboard` | admin, rh |
| `/dashboard/recruitment` | admin, rh |
| `/dashboard/jobs` | admin, rh |
| `/dashboard/interviews` | admin, rh |
| `/dashboard/candidates` | admin, rh |
| `/dashboard/users` | admin uniquement |
| `/dashboard/settings` | admin uniquement |

> **Note** : Un utilisateur RH tentant d'accéder à une route réservée aux admins sera automatiquement redirigé vers `/dashboard`.


### Différences visuelles

- **Sidebar** : Le menu est filtré selon le rôle. Un badge "Mode Administrateur" apparaît uniquement pour les admins.
- **Navbar** : Le badge de rôle utilise un style différent :
  - Admin : fond violet (`bg-primary`)
  - RH : fond gris (`bg-bg-soft`)


### Architecture technique des rôles

| Fichier | Responsabilité |
|---------|----------------|
| `src/context/AuthContext.jsx` | Définition et fourniture du contexte utilisateur |
| `src/constants/navigation.js` | Configuration des items de navigation par rôle |
| `src/components/common/ProtectedRoute.jsx` | Protection des routes selon les rôles autorisés |
| `src/components/layout/Sidebar.jsx` | Filtrage du menu et affichage du badge admin |
| `src/components/layout/AdminNavbar.jsx` | Affichage du badge de rôle dans la navbar |

---


## Page Paramètres (Settings)


### Architecture

La page `Settings.jsx` utilise un layout à deux colonnes avec navigation par onglets :

```
┌─────────────────────────────────────────────────────────────┐
│  Paramètres                                                 │
│  Configurez les préférences de votre plateforme.           │
├─────────────────────────────────────────────────────────────┤
│ ┌──────────────┬──────────────────────────────────────────┐ │
│ │  PARAMÈTRES  │  Contenu de l'onglet actif              │ │
│ │              │                                          │ │
│ │  Entreprise  │  - Formulaire / Toggles / Cards         │ │
│ │  Notifications│                                         │ │
│ │  Apparence   │                                          │ │
│ │  Intégrations│                                          │ │
│ │  Sécurité    │                                          │ │
│ │              │                                          │ │
│ └──────────────┴──────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```


### Composants

| Composant | Chemin | Description |
|-----------|--------|-------------|
| `SettingsLayout` | `components/Settings/SettingsLayout.jsx` | Layout 2 colonnes réutilisable |
| `EntrepriseTab` | `components/Settings/tabs/EntrepriseTab.jsx` | Formulaire infos entreprise |
| `NotificationsTab` | `components/Settings/tabs/NotificationsTab.jsx` | Toggles notifications |
| `ApparenceTab` | `components/Settings/tabs/ApparenceTab.jsx` | Sélecteur thème + langue |
| `IntegrationsTab` | `components/Settings/tabs/IntegrationsTab.jsx` | Cards outils externes |
| `SecuriteTab` | `components/Settings/tabs/SecuriteTab.jsx` | Mot de passe + 2FA + sessions |


### SettingsLayout - Props

```jsx
<SettingsLayout
  activeTab="entreprise"      // string - ID de l'onglet actif
  onTabChange={setActiveTab}  // function - callback changement d'onglet
>
  {children}                  // ReactNode - contenu de l'onglet
</SettingsLayout>
```


### Onglets disponibles

| ID | Label | Icône Material | Description |
|----|-------|----------------|-------------|
| `entreprise` | Entreprise | `business` | Informations générales |
| `notifications` | Notifications | `notifications` | Alertes et emails |
| `apparence` | Apparence | `palette` | Thème et affichage |
| `integrations` | Intégrations | `extension` | Outils connectés |
| `securite` | Sécurité | `security` | Accès et permissions |


### Styles des onglets

**Onglet inactif :**
```jsx
className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
           text-left text-text-secondary hover:bg-bg-soft transition-colors"
```

**Onglet actif :**
```jsx
className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
           text-left bg-primary-light border-l-2 border-primary transition-colors"
```


### Contenu des onglets

| Onglet | Contenu |
|--------|---------|
| **EntrepriseTab** | Upload logo, nom, description, secteur, taille, site web, email, adresse |
| **NotificationsTab** | 4 toggles ON/OFF (nouvelle candidature, entretien, statut, rapport) |
| **ApparenceTab** | Sélecteur thème (Clair/Sombre en cards), sélecteur langue (FR/EN/AR) |
| **IntegrationsTab** | 4 cards (Google Calendar, Slack, LinkedIn, Zapier) avec bouton "Connecter" |
| **SecuriteTab** | Changer mot de passe, toggle 2FA, tableau sessions actives |


### Styles globaux (formulaires Settings)

```jsx
// Input
className="border border-border rounded-lg px-3 py-2 text-sm w-full
           focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"

// Label
className="text-sm font-display font-medium text-text-primary mb-1 block"

// Titre section
className="text-lg font-display font-semibold text-text-primary mb-1"

// Sous-titre section
className="text-sm text-text-secondary mb-6"

// Bouton primary
className="bg-primary hover:bg-primary-dark text-white font-display
           font-medium px-4 py-2 rounded-lg transition-colors"

// Séparateur
className="border-t border-border my-6"
```

---


## Page Entretiens (Interviews)


### Architecture

La page `Interviews.jsx` permet de gérer les entretiens avec un layout à deux colonnes et navigation par onglets. Elle affiche le calendrier des entretiens et la liste des sessions en ligne.

```
┌─────────────────────────────────────────────────────────────┐
│  Centre de planification      [Exporter] [+ Programmer]    │
├─────────────────────────────────────────────────────────────┤
│ ┌──────────────┬──────────────────────────────────────────┐ │
│ │  ENTRETIENS  │  Contenu de l'onglet actif              │ │
│ │              │                                          │ │
│ │  Calendrier  │  - Calendrier mensuel + Briefing        │ │
│ │  Entretiens  │  - Liste des entretiens en ligne        │ │
│ │  en ligne    │                                          │ │
│ │              │                                          │ │
│ └──────────────┴──────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```


### Composants

| Composant | Chemin | Description |
|-----------|--------|-------------|
| `InterviewsLayout` | `components/Interviews/InterviewsLayout.jsx` | Layout 2 colonnes réutilisable |
| `InterviewCalendar` | `components/Interviews/InterviewCalendar.jsx` | Calendrier mensuel avec événements |
| `InterviewDayBriefing` | `components/Interviews/InterviewDayBriefing.jsx` | Briefing des entretiens du jour |
| `InterviewStatCards` | `components/Interviews/InterviewStatCards.jsx` | Cartes statistiques (aujourd'hui, taux succès) |
| `EntretiensEnLigneTab` | `components/Interviews/EntretiensEnLigneTab.jsx` | Liste des entretiens visio planifiés |
| `CreateInterviewModal` | `components/Interviews/CreateInterviewModal.jsx` | Modal de création d'entretien |


### InterviewsLayout - Props

```jsx
<InterviewsLayout
  activeTab="calendrier"      // string - ID de l'onglet actif
  onTabChange={setActiveTab}  // function - callback changement d'onglet
>
  {children}                  // ReactNode - contenu de l'onglet
</InterviewsLayout>
```


### Onglets disponibles

| ID | Label | Icône Material | Description |
|----|-------|----------------|-------------|
| `calendrier` | Calendrier | `calendar_month` | Vue mensuelle avec calendrier + briefing + stats |
| `en-ligne` | Entretiens en ligne | `videocam` | Sessions visioconférence planifiées |


### Contenu des onglets

| Onglet | Contenu |
|--------|---------|
| **Calendrier** | Calendrier mensuel (8 colonnes) + Panel droit avec briefing du jour et statistiques (4 colonnes) |
| **Entretiens en ligne** | Stats rapides (cette semaine, confirmés, en attente) + Liste de cards avec candidat, poste, date, heure, lien visio, statut, recruteur, bouton "Rejoindre" |


### Format objet entretien en ligne

```js
{
  id: 1,
  candidat: "Sarah Dubois",
  poste: "Développeur Full-Stack",
  date: "12 Mars 2026",
  heure: "14:00 - 15:00",
  lien: "https://meet.google.com/abc-defg-hij",
  statut: "À venir",           // "À venir" | "Confirmé" | "En attente"
  recruteur: "Marie Dupont"
}
```


### Styles des statuts (Entretiens en ligne)

```jsx
const STATUT_STYLES = {
  "À venir": "bg-blue-50 text-blue-600 border-blue-200",
  "Confirmé": "bg-green-50 text-success border-green-200",
  "En attente": "bg-amber-50 text-amber-600 border-amber-200",
};
```


### Styles des onglets

**Onglet inactif :**
```jsx
className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
           text-left text-text-secondary hover:bg-bg-soft transition-colors"
```

**Onglet actif :**
```jsx
className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
           text-left bg-primary-light border-l-2 border-primary transition-colors"
```


### CreateInterviewModal - Props

```jsx
<CreateInterviewModal
  onClose={() => setShowModal(false)} // function - Callback fermeture
  onSubmit={handleCreateInterview}    // function - Callback soumission
/>
```

**Callback `onSubmit` reçoit un objet :**
```js
{
  candidat: "Sarah Dubois",
  poste: "Développeur Full-Stack",
  date: "12 Mars 2026",        // Format: "DD Mois YYYY"
  heure: "14:00 - 15:00",      // Format: "HH:MM - HH:MM"
  type: "Visio",               // "Visio" | "Téléphonique" | "Présentiel"
  lien: "https://meet.google.com/abc-defg-hij",
  recruteur: "Marie Dupont",
  notes: "...",
  statut: "À venir"
}
```


### Fonctionnalités du modal

| Fonctionnalité | Description |
|----------------|-------------|
| **Validation en temps réel** | Affichage des erreurs sous chaque champ |
| **Sélection candidat** | Dropdown avec liste de candidats disponibles |
| **Type d'entretien** | Choix par boutons radio (Visio, Téléphonique, Présentiel) |
| **Lien visio conditionnel** | Affiché uniquement si type = "Visio" |
| **Validation horaires** | Vérification que l'heure de fin > heure de début |
| **Loading state** | Désactivation du bouton pendant la soumission |


### Validation des champs

| Champ | Règles |
|-------|--------|
| Candidat | Requis + sélection dans la liste |
| Poste | Requis |
| Date | Requise |
| Heure début | Requise |
| Heure fin | Requise + doit être après l'heure de début |
| Type | Présélectionné à "Visio" |
| Lien visio | Requis si type = "Visio" |
| Recruteur | Requis + sélection dans la liste |
| Notes | Optionnel |


### Liste de données

**Candidats disponibles :**
```js
["Sarah Dubois", "Ahmed Khalil", "Julie Martin", "Pierre Lefebvre",
 "Marie Lambert", "Thomas Rousseau"]
```

**Recruteurs disponibles :**
```js
["Marie Dupont", "Lucas Bernard", "Sophie Martin", "Jean Moreau"]
```

**Types d'entretien :**
```js
["Visio", "Téléphonique", "Présentiel"]
```


### Toast de succès

Après la création d'un entretien, un toast vert s'affiche pendant 4 secondes :

```jsx
{showSuccess && (
  <div className="mb-5 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
    {/* Icon check_circle */}
    <div>
      <p>Entretien programmé avec succès</p>
      <p>L'entretien avec {candidat} a été ajouté au calendrier.</p>
    </div>
    {/* Bouton fermeture */}
  </div>
)}
```

---


## Page Utilisateurs (Users)


### Architecture

La page `Users.jsx` permet de gérer les comptes utilisateurs de la plateforme (Admin et RH). Elle affiche des cartes statistiques, un tableau de gestion des utilisateurs et un modal de création.

```
┌─────────────────────────────────────────────────────────────┐
│  Gestion des utilisateurs          [+ Créer un compte RH]  │
│  Gérez les accès et les rôles de votre équipe.             │
├─────────────────────────────────────────────────────────────┤
│  ┌────────┬─────────┬────────────┬────────────┐            │
│  │ Total  │ Admins  │ RH         │ Actifs     │            │
│  │   4    │   1     │   3        │   3        │            │
│  └────────┴─────────┴────────────┴────────────┘            │
│                                                             │
│  Tableau des utilisateurs                                  │
│  ┌──────────────────────────────────────────────────┐      │
│  │ Nom   │ Email   │ Rôle │ Statut │ Connexion│Actions│    │
│  ├──────────────────────────────────────────────────┤      │
│  │ ...   │ ...     │ ...  │ ...    │ ...      │ ✏️🗑️│     │
│  └──────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
```


### Composants

| Composant | Chemin | Description |
|-----------|--------|-------------|
| `UserStatsCard` | `components/Users/UserStatsCard.jsx` | Carte statistique avec icône |
| `UserTable` | `components/Users/UserTable.jsx` | Tableau liste utilisateurs |
| `UserRow` | `components/Users/UserRow.jsx` | Ligne tableau avec actions |
| `CreateUserModal` | `components/Users/CreateUserModal.jsx` | Modal création compte RH |


### UserStatsCard - Props

```jsx
<UserStatsCard
  icon="group"              // string - Material Symbol icon name
  label="Total utilisateurs" // string - Label de la carte
  value={4}                 // number - Valeur affichée
  color="primary"           // string - Couleur (primary|secondary|warning|success)
/>
```


### UserTable - Props

```jsx
<UserTable
  users={usersArray}        // array - Liste des utilisateurs
  onEdit={handleEdit}       // function - Callback édition (userId)
  onDelete={handleDelete}   // function - Callback suppression (userId)
/>
```

**Format objet utilisateur :**
```js
{
  id: 1,
  name: "Jane Doe",
  email: "jane.doe@company.com",
  role: "Admin",           // "Admin" | "RH"
  status: "Actif",         // "Actif" | "Inactif"
  lastLogin: "Aujourd'hui" // string - texte libre
}
```


### CreateUserModal - Props

```jsx
<CreateUserModal
  onClose={() => setShowModal(false)} // function - Callback fermeture
  onSubmit={handleCreateUser}         // function - Callback soumission
/>
```

**Callback `onSubmit` reçoit un objet :**
```js
{
  name: "Prénom Nom",
  email: "email@company.com",
  role: "RH",
  status: "Actif",
  lastLogin: "Jamais",
  // Champs internes (non affichés dans le tableau) :
  firstName: "Prénom",
  lastName: "Nom",
  phone: "+33 6 12 34 56 78",
  department: "Ressources Humaines",
  password: "...encrypted...",
}
```


### Fonctionnalités du modal

| Fonctionnalité | Description |
|----------------|-------------|
| **Validation en temps réel** | Affichage des erreurs sous chaque champ |
| **Force du mot de passe** | Barre de progression avec niveau (Faible → Excellent) |
| **Toggle visibilité MDP** | Icône œil pour afficher/masquer le mot de passe |
| **Gestion des erreurs** | Email invalide, mots de passe non identiques, champs vides |
| **Loading state** | Désactivation du bouton pendant la soumission |


### Validation des champs

| Champ | Règles |
|-------|--------|
| Prénom / Nom | Requis |
| Email | Requis + format email valide |
| Téléphone | Optionnel |
| Département | Optionnel |
| Mot de passe | Requis + 8 caractères minimum |
| Confirmation MDP | Requis + identique au mot de passe |


### Niveaux de force du mot de passe

| Score | Label | Couleur |
|-------|-------|---------|
| 0 | - | - |
| 1 | Faible | Rouge |
| 2 | Correct | Ambre |
| 3 | Bon | Jaune |
| 4 | Excellent | Vert |

**Critères :**
- ≥ 8 caractères : +1
- ≥ 12 caractères : +1
- Majuscule + Chiffre : +1
- Caractère spécial : +1


### Styles des cartes statistiques

```jsx
// Couleurs disponibles
const COLORS = {
  primary: "bg-primary-light border-primary/20 text-primary",
  secondary: "bg-secondary-light border-secondary/20 text-secondary",
  warning: "bg-amber-50 border-amber-200 text-amber-600",
  success: "bg-green-50 border-green-200 text-success",
};
```

---


## État actuel du projet


### Implémenté
- [x] Landing page marketing
- [x] Pages d'authentification (Login, SignUp, ForgotPassword)
- [x] Dashboard RH avec statistiques
- [x] Pipeline recrutement Kanban avec tri par score IA
- [x] Pages Dashboard Jobs et Candidates
- [x] **Page Entretiens avec layout 2 colonnes et 2 onglets**
  - Calendrier (vue mensuelle + briefing + statistiques)
  - Entretiens en ligne (liste des sessions visio planifiées)
- [x] Pages Users et Settings (admin only)
- [x] **Page Settings complète avec layout 2 colonnes et 5 onglets**
  - Entreprise (formulaire infos)
  - Notifications (toggles)
  - Apparence (thème + langue)
  - Intégrations (cards outils externes)
  - Sécurité (mot de passe, 2FA, sessions)
- [x] **Page Users complète avec modal de création utilisateur**
  - Cartes statistiques (Total, Admins, RH, Actifs)
  - Tableau de gestion avec actions (éditer, supprimer)
  - Modal création avec validation et force du mot de passe
- [x] Composants réutilisables (Dashboard, Jobs, Candidates, Interviews, Sections, Settings, Users)
- [x] Design system Tailwind avec couleurs primary/secondary
- [x] Système de rôles (Admin / RH) avec routes protégées
- [x] Navigation conditionnelle selon le rôle utilisateur
- [x] Layout standardisé avec padding centralisé dans AdminLayout


### À implémenter

- [ ] Drag & drop Kanban fonctionnel

---


## Pipeline de recrutement - Tri par score IA


### Fonctionnalité

Le pipeline de recrutement Kanban intègre un système de tri automatique par score IA qui classe les candidats selon leur pertinence pour le poste.

**Comportement :**
- **Tri décroissant** : Les candidats avec le score le plus élevé apparaissent en premier
- **Toutes les colonnes** : Le tri s'applique à l'ensemble du pipeline (Candidature, Présélection, Entretien, Test technique, Offre)
- **Tri automatique** : Appliqué lors du filtrage par poste et à chaque actualisation des données


### Implémentation technique

**Fichier :** `src/pages/Recruitment.jsx`
**Fonction :** `getFilteredPipeline()`

```js
// Tri par score IA décroissant sur toutes les colonnes
return data.map(function (column) {
  var sorted = column.candidates.slice().sort(function (a, b) {
    return b.score - a.score;  // Tri décroissant
  });
  return {
    title: column.title,
    color: column.color,
    candidates: sorted,
  };
});
```


### Données de score

Chaque candidat possède une propriété `score` (entier 0-100) qui représente :
- **Score IA** : Niveau de correspondance calculé entre le profil du candidat et les exigences du poste
- **Utilisation** : Tri automatique, identification des "top candidats", priorisation des entretiens

**Exemple :**
```js
{
  id: "c1",
  name: "Sophie Martin",
  job: "Ingénieure logiciel",
  score: 91,  // Score IA élevé = priorité haute
  // ... autres propriétés
}
```


### Interface utilisateur

- **Tri visible** : Les candidats apparaissent automatiquement triés par score dans chaque colonne
- **Badge "Top candidat"** : Mis en évidence pour le meilleur score de chaque poste (uniquement en colonne "Candidature")
- **Cohérence** : Le tri est maintenu lors des déplacements entre colonnes et du filtrage par poste

---


## Dépendances principales


### Production
```json
{
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "react-router-dom": "^6.30.3",
  "chart.js": "^4.5.1",
  "@fortawesome/fontawesome-free": "^7.2.0",
  "@tailwindcss/forms": "^0.5.11",
  "prop-types": "^15.8.1"
}
```


### Développement (via react-scripts)
- Webpack 5
- Babel
- ESLint (react-app preset)
- Jest + Testing Library

---


## Notes pour les développeurs

1. **Imports absolus** : Utiliser `components/...` au lieu de `../../components/...`
2. **Classes Tailwind** : Privilégier les classes utilitaires, éviter le CSS custom
3. **Responsive** : Mobile-first avec breakpoints Tailwind (`md:`, `lg:`)
4. **État local** : useState pour l'état composant, pas de state manager global (prévu : Context ou Redux)
