# Talentia ATS Frontend

Application web de Talentia ATS (Applicant Tracking System), une plateforme de gestion des ressources humaines dédiée au recrutement de bout en bout : sourcing, pipeline, entretiens, suivi des utilisateurs et administration de plateforme hybride (B2B pour les entreprises, B2C pour les candidats).

## 🚀 À propos de Talentia

Talentia aide les entreprises modernes à centraliser leur processus d'embauche et offre aux candidats une expérience fluide pour postuler et suivre leurs candidatures.

**Pour les entreprises (Dashboard RH) :**
- Gestion des offres d'emploi
- Pipeline de recrutement sous forme de tableau Kanban
- Programmation et gestion des entretiens (dont intégration visio)
- Gestion de l'équipe (utilisateurs, rôles)
- Analytics et rapports de performance d'embauche

**Pour les candidats (Portail public & privé) :**
- Explorateur d'offres avec filtres (teletravail, CDI, etc.)
- Espace personnel sécurisé
- Suivi de candidature simplifié

## 🏗️ Architecture et Espaces

Le frontend est divisé en quatre grands espaces avec leurs propres layouts et logiques d'accès :

- **Espace vitrine public** (`/landing`) : Page de présentation du produit pour la prospection B2B.
- **Espace authentification RH** (`/login`, `/signup`) : Inscription et connexion pour les recruteurs et administrateurs.
- **Espace Candidat** (`/offres`, `/candidat/login`) : Plateforme de recherche d'offres et d'authentification pour les postulants.
- **Espace Dashboard RH/Admin** (`/dashboard/*`) : Le cœur logiciel de l'ATS, un portail complet pour gérer le recrutement.

## 🛠️ État d'avancement (Intégration API)

Le projet combine des écrans déjà connectés au backend et des écrans encore alimentés par des données mock.

### Déjà intégré au backend

- Récupération de la liste des utilisateurs
- Suppression d'un utilisateur
- Récupération des offres candidat via l'endpoint /offre/getAllOffres

### Encore en mock/local

- Dashboard analytics
- Pipeline de recrutement
- Entretiens
- Une partie des paramètres

## 💻 Stack technique

- **Framework :** React 19
- **Routage :** React Router DOM 6
- **Style :** Tailwind CSS 3 (avec `@tailwindcss/forms`)
- **Icônes :** Lucide React, FontAwesome, Material Symbols
- **Appels HTTP :** Axios
- **Graphiques :** Chart.js
- **Build Tool :** react-scripts (Create React App)

## Structure du projet

```text
src/
  assets/
    auth-hero-visual.svg
    styles/
      tailwind.css
  components/
    Candidate/
      JobCard.jsx
    Dashboard/
      HiringChart.jsx
      RecentActivity.jsx
      StatCard.jsx
      UpcomingInterviews.jsx
    Interviews/
      CreateInterviewModal.jsx
      EntretiensEnLigneTab.jsx
      InterviewCalendar.jsx
      InterviewsLayout.jsx
      JitsiMeetModal.jsx
    Jobs/
      CreateJobModal.jsx
      JobRow.jsx
      JobsTable.jsx
      JobStatCard.jsx
      RecruitmentTimeCard.jsx
      SourceChart.jsx
      StatusBadge.jsx
    Recruitment/
      CandidateCard.jsx
      CandidateModal.jsx
      PipelineColumn.jsx
    Sections/
      AnalyticsRapportsCard.jsx
      AuthHero.jsx
      AutomatisationCard.jsx
      FeatureCard.jsx
      FeaturesSection.jsx
      GestionCandidatsCard.jsx
      HeroBanner.jsx
      PipelineKanbanCard.jsx
      PlanningEntretiensCard.jsx
    Settings/
      ManageUsersModal.jsx
      SettingsLayout.jsx
      tabs/
        ApparenceTab.jsx
        EntrepriseTab.jsx
        IntegrationsTab.jsx
        NotificationsTab.jsx
        SecuriteTab.jsx
    Users/
      CreateUserModal.jsx
      UserRow.jsx
      UserStatsCard.jsx
      UserTable.jsx
    auth/
      LoginForm.jsx
    common/
      BrandLogo.jsx
      ModalBackdrop.jsx
      ProtectedRoute.jsx
      SelectionCard.jsx
    layout/
      AdminNavbar.jsx
      AuthFooter.jsx
      Footer.jsx
      Navbar.jsx
      Sidebar.jsx
  constants/
    interviewsData.js
    navigation.js
    routes.js
  context/
    AuthContext.jsx
  layouts/
    AdminLayout.jsx
    AuthLayout.jsx
  pages/
    Dashboard.jsx
    ForgotPassword.jsx
    Interviews.jsx
    Jobs.jsx
    LandingPage.jsx
    Login.jsx
    ProfileForm.jsx
    Recruitment.jsx
    SelectionPage.jsx
    Settings.jsx
    SignUp.jsx
    Users.jsx
    Candidate/
      CandidateLogin.jsx
      CandidateSignup.jsx
      JobList.jsx
  service/
    restApiJobs.js
    restApiUser.js
  index.css
  index.js
```

Fichiers importants:

- src/index.js: définition des routes et montage de l'application
- src/layouts/AdminLayout.jsx: structure globale du dashboard
- src/context/AuthContext.jsx: contexte d'authentification et gestion des rôles
- src/service/restApiUser.js: appels HTTP liés aux utilisateurs
- src/service/restApiJobs.js: appels HTTP liés aux offres candidat
- src/components/Users/UserTable.jsx: récupération et affichage des utilisateurs
- src/pages/Candidate/JobList.jsx: page liste des offres candidat
- src/pages/Candidate/CandidateLogin.jsx: page de connexion candidat
- src/components/Candidate/JobCard.jsx: carte d'offre côté candidat

## Installation et lancement

Prérequis recommandés:

- Node.js 20+

Installation des dépendances:

```bash
npm install
```

Lancement en développement:

```bash
npm start
```

Build de production:

```bash
npm run build
```

## Configuration API

Les services API lisent l'URL backend depuis:

- REACT_APP_API_URL

Si la variable n'est pas définie, la valeur de fallback est:

- http://localhost:5000

Créer un fichier .env à la racine:

```env
REACT_APP_API_URL=http://localhost:5000
```

## Routes principales

| Zone | Route |
|---|---|
| Landing | /landing |
| Connexion RH/Entreprise | /login |
| Connexion Candidat | /candidat/login |
| Liste des offres Candidat | /offres |
| Dashboard RH/Admin | /dashboard/* |

## Intégration backend actuelle (utilisateurs)

Le fichier src/service/restApiUser.js centralise les appels Axios.

| Fonction | Méthode HTTP | Endpoint |
|---|---|---|
| getAllUsers() | GET | /user/getAllUsers |
| deleteUser(id) | DELETE | /user/deleteUser/:id |

## Intégration backend actuelle (offres candidat)

Le fichier src/service/restApiJobs.js centralise l'appel Axios des offres.

| Fonction | Méthode HTTP | Endpoint |
|---|---|---|
| getAllOffres() | GET | /offre/getAllOffres |

Notes d'implémentation côté candidat:

- Le token candidat est lu depuis le cookie jwt_candidat
- Le token est envoyé en Bearer (Authorization) lorsque présent
- withCredentials est activé pour permettre les échanges basés cookie
- La page src/pages/Candidate/JobList.jsx charge les données en useEffect puis les affiche via map() sur src/components/Candidate/JobCard.jsx

### Flux front -> backend

1. Le composant src/components/Users/UserTable.jsx se monte.
2. useEffect déclenche getUsers().
3. getUsers() appelle getAllUsers() dans src/service/restApiUser.js.
4. Axios envoie GET vers {API_URL}/user/getAllUsers.
5. La réponse est lue via res.data.data.
6. Le tableau rend les lignes avec src/components/Users/UserRow.jsx.

### Contrat de réponse attendu (Utilisateurs)

```json
{
  "data": [
    {
      "_id": "660f...",
      "name": "Sophie Martin",
      "email": "sophie@entreprise.com",
      "role": "Admin",
      "status": "Actif",
      "lastLogin": "2026-03-25T10:30:00.000Z",
      "avatar": "https://..."
    }
  ]
}
```

### Contrat de réponse attendu (Offres Candidat - `/offre/getAllOffres`)

```json
{
  "data": [
    {
      "_id": "offre_1",
      "poste": "Développeur Fullstack React & Node.js",
      "entreprise": {
        "nom": "TECH CORP"
      },
      "localisation": "Paris (Hybride)",
      "typeContrat": "CDI",
      "salaire": "55k - 70k€",
      "createdAt": "2026-03-27T10:00:00.000Z"
    }
  ]
}
```

Notes générales d'implémentation frontend :

- Le front lit généralement `res.data.data` ou s'adapte selon la racine (il gère `payload.data`, `payload.offres` en fallback).
- L'identifiant utilisé pour les actions/rendus est principalement `_id`.

## Exigences backend minimales

Pour que cette version du front fonctionne, le backend doit:

- Exposer les routes /user/getAllUsers et /user/deleteUser/:id
- Exposer la route /offre/getAllOffres
- Retourner un JSON contenant le tableau dans la propriété data
- Autoriser CORS depuis l'origine du frontend (exemple: http://localhost:3000)
- Autoriser les credentials (cookies) pour les flux candidat

## Scripts npm

| Script | Description |
|---|---|
| npm start | Lance le serveur de développement |
| npm run build | Génère le build de production |
| npm test | Lance les tests |

## Roadmap recommandée

Pour généraliser l'intégration API sur tout le produit:

1. Ajouter les services par domaine:
   - src/service/restApiRecruitment.js
   - src/service/restApiInterviews.js
2. Remplacer les données mock écran par écran.
3. Harmoniser la gestion des erreurs et des états de chargement sur toutes les pages.
