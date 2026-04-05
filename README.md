# Talentia ATS Frontend

Frontend React (Create React App) de Talentia ATS, une plateforme RH qui couvre:
- espace public et marketing
- espace candidat (offres, candidatures, profil, notifications)
- espace RH/Admin (dashboard, jobs, interviews, recruitment, users, settings)

Derniere mise a jour: 2026-04-02

## Vue globale

Le projet est aujourd'hui majoritairement branche au backend via Axios, avec une separation claire:
- couche service: `src/service/*`
- hooks metier: `src/hooks/*`
- pages/features: `src/pages/*`, `src/components/*`

## Stack

- React 19 + React Router DOM 6
- Tailwind CSS 3
- Axios
- Chart.js
- Lucide React + Material Symbols
- Build: `react-scripts` (CRA)

## Espaces et routes

### Public
- `/` (selection)
- `/landing`
- `/login`
- `/signup`
- `/forgot-password`

### Candidat (public)
- `/offres`
- `/offres/:id`
- `/candidat/login`
- `/candidat/signup`

### Candidat (espace protege)
- `/candidat/dashboard`
- `/candidat/mes-candidatures`
- `/candidat/offres`
- `/candidat/offres/:id`
- `/candidat/profil`

### RH/Admin (espace protege)
- `/dashboard`
- `/dashboard/recruitment`
- `/dashboard/jobs`
- `/dashboard/interviews`
- `/dashboard/users` (admin uniquement)
- `/dashboard/settings` (admin uniquement)

## Architecture simplifiee

```text
src/
  App.jsx
  index.js
  components/
    Candidate/
    Dashboard/
    Interviews/
    Jobs/
    Recruitment/
    Settings/
    Users/
    common/
    layout/
  constants/
    routes.js
    navigation.js
  context/
    ContexteAuth.jsx
    ContexteAuthCandidat.jsx
  hooks/
    useTableauDeBord.js
    useEntretiens.js
    useOffresEntreprise.js
    useNotificationsSysteme.js
    useOffresPubliques.js
    useRecrutement.js
    useNotificationsToast.js
    useUtilisateurs.js
  pages/
    TableauDeBord.jsx
    Entretiens.jsx
    Offres.jsx
    Recrutement.jsx
    Utilisateurs.jsx
    Parametres.jsx
    Candidate/
      CandidateTableauDeBord.jsx
      DetailOffreCandidat.jsx
      CandidateConnexion.jsx
      ListeOffresCandidat.jsx
      ProfilCandidat.jsx
      InscriptionCandidat.jsx
      DetailOffrePublique.jsx
      ListeOffresPubliques.jsx
      MesCandidatures.jsx
  service/
    restApiAuthentification.js
    restApiCandidat.js
    restApiCandidature.js
    restApiTableauDeBord.js
    restApiEntreprise.js
    restApiEntretiens.js
    restApiOffresPubliques.js
    restApiNotifications.js
    restApiOffresEntreprise.js
    restApiRecrutement.js
    restApiUtilisateurs.js
```

## Etat integration backend

Les ecrans suivants consomment des donnees backend:
- auth RH + session (`AuthContext`)
- auth candidat + profil (`CandidateAuthContext`)
- dashboard RH (`useDashboard`)
- jobs RH (`useJobs`)
- interviews RH (`useInterviews`)
- pipeline recruitment (`restApiRecruitment` + page Recruitment)
- users RH (`useUsers` + `ManageUsersModal`)
- offres candidat (`useOffres`, `restApiJobs`, `restApiOffres`)
- candidatures candidat (`restApiCandidature`)
- notifications candidat (`useNotifications`, `restApiNotification`)

## Services backend principaux

### Auth / entreprise
- `POST /user/login`
- `POST /user/logout`
- `PUT /user/updateUser/:id` (mot de passe)
- `POST /entreprise/registerEntreprise`
- `GET /entreprise/getMyEntreprise`
- `PUT /entreprise/updateEntreprise`

### Candidat
- `POST /candidat/inscrire`
- `POST /candidat/connecter`
- `POST /candidat/deconnecter`
- `GET /candidat/monProfil`
- `PUT /candidat/mettreAJourProfil`

### Offres
- `GET /offre/getOffresDisponibles` (liste publique/candidat)
- `GET /offre/getOffreById/:id`
- `GET /offre/getOffresByEntreprise`
- `GET /offre/getOffresByEntreprise/:entrepriseId`
- `POST /offre/createOffre`
- `PUT /offre/updateOffre/:id`
- `PUT /offre/updateOffreStatus/:id`
- `DELETE /offre/deleteOffreById/:id`

### Candidatures / recruitment
- `POST /candidature/postuler`
- `GET /candidature/mesCandidatures`
- `DELETE /candidature/annuler/:id`
- `GET /candidature/getAllCandidatures`
- `PUT /candidature/updateCandidatureEtape/:id`
- `PUT /candidature/refuserCandidature/:id`
- `DELETE /candidature/deleteCandidatureById/:id`

### Entretiens
- `GET /entretien/getAllEntretiens`
- `POST /entretien/createEntretien`
- `DELETE /entretien/deleteEntretienById/:id`

### Notifications
- `GET /notification/getNotificationsByCandidat/:candidatId`
- `PUT /notification/markAsRead/:id`
- delete selon backend:
  - `/notification/deleteNotification/:id`
  - `/notification/deleteNotificationById/:id`
  - `/notification/deleteById/:id`
  - `/notification/delete/:id`

### Utilisateurs RH
- `GET /user/getAllUsers`
- `GET /user/getUserById/:id`
- `POST /user/createRh`
- `POST /user/createAdmin`
- `PUT /user/updateUser/:id`
- `DELETE /user/deleteUser/:id`

## Configuration environnement

Le frontend lit l'URL API depuis:
- `REACT_APP_API_URL`

Exemple `.env`:

```env
REACT_APP_API_URL=http://localhost:5000
```

Un fichier `.env.example` est aussi fourni pour partager cette configuration dans l'equipe.

Note importante: ce projet est en CRA, donc `VITE_API_URL` n'est pas utilise.

## Installation

Prerequis:
- Node.js 20+

Commandes:

```bash
npm install
npm start
```

Build:

```bash
npm run build
```

## Scripts

- `npm start`: dev server
- `npm run build`: build production
- `npm test`: tests

## Points de vigilance

- Auth mixte cookie + token localStorage selon domaine.
- Certaines routes notifications de suppression sont tentees en fallback pour s'adapter au backend.
- Les formats de reponse backend sont normalises cote hooks/services (`data.data`, `data`, etc.).
