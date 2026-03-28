# Backend Map: Consommable vs Statique (Axios)

Objectif: ce fichier liste clairement
- ce qui est deja consommable depuis le backend
- ce qui est encore statique dans le front et doit etre remplace par le backend

La methode Axios reste la meme dans tout le projet:
- import axios
- const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"
- fonctions service qui retournent await axios.get/post/put/delete(...)

## 1) Deja consommable (backend branche)

### Utilisateurs
- Fichier: src/service/restApiUser.js
- getAllUsers() -> GET /user/getAllUsers
- deleteUser(id) -> DELETE /user/deleteUser/:id
- Utilisation actuelle: src/components/Users/UserTable.jsx

### Offres candidat
- Fichier: src/service/restApiJobs.js
- getAllOffres() -> GET /offre/getAllOffres
- Utilisation actuelle: src/pages/Candidate/JobList.jsx
- Notes:
  - lit le token cookie jwt_candidat
  - envoie Authorization: Bearer <token> si disponible
  - utilise withCredentials: true

## 2) Statique a remplacer par le backend

## Priorite haute (a connecter en premier)

### Auth utilisateur RH hardcode
- Fichier: src/context/AuthContext.jsx
- Statique actuel: user fixe (Jane Doe, role admin)
- A remplacer par backend:
  - GET /auth/me
  - POST /auth/login
  - POST /auth/logout

### Dashboard (stats globales)
- Fichier: src/pages/Dashboard.jsx
- Statique actuel: MOCK_STATS + setTimeout simulation
- A remplacer par backend:
  - GET /dashboard/stats

### Dashboard (graphe recrutement)
- Fichier: src/components/Dashboard/HiringChart.jsx
- Statique actuel: chartData local (labels, candidatures, pourvus, taux)
- A remplacer par backend:
  - GET /dashboard/hiring-stats

### Dashboard (activite + entretiens)
- Fichiers:
  - src/components/Dashboard/RecentActivity.jsx
  - src/components/Dashboard/UpcomingInterviews.jsx
- Statique actuel: listes activities[] et interviews[] locales
- A remplacer par backend:
  - GET /dashboard/activities
  - GET /interviews/upcoming

### Recrutement Pipeline
- Fichier: src/pages/Recruitment.jsx
- Statique actuel:
  - allCandidatesForCandidature[]
  - initialPipelineData[]
  - jobOpenings[]
- A remplacer par backend:
  - GET /recruitment/pipeline
  - GET /candidates
  - PATCH /recruitment/pipeline/move

### Jobs RH
- Fichier: src/pages/Jobs.jsx
- Statique actuel:
  - STATS[]
  - JOBS[]
  - SOURCES[]
  - creation d'offre en local state seulement
- A remplacer par backend:
  - GET /jobs/stats
  - GET /jobs
  - POST /jobs
  - GET /jobs/sources

### Interviews RH
- Fichiers:
  - src/pages/Interviews.jsx
  - src/constants/interviewsData.js
  - src/components/Interviews/EntretiensEnLigneTab.jsx
  - src/components/Interviews/CreateInterviewModal.jsx
- Statique actuel:
  - CALENDAR_EVENTS
  - ENTRETIENS_EN_LIGNE
  - CANDIDATS_DISPONIBLES / RECRUTEURS_DISPONIBLES
- A remplacer par backend:
  - GET /interviews/calendar
  - GET /interviews/online
  - POST /interviews
  - GET /users/recruiters
  - GET /candidates/available

### Users RH (creation)
- Fichier: src/pages/Users.jsx
- Statique actuel: creation en local (pas de POST backend)
- A remplacer par backend:
  - POST /user/create
  - PUT /user/update/:id

### Securite / sessions
- Fichier: src/components/Settings/tabs/SecuriteTab.jsx
- Statique actuel: INITIAL_SESSIONS local
- A remplacer par backend:
  - GET /auth/sessions
  - DELETE /auth/sessions/:id
  - PUT /auth/password

## Priorite moyenne

### Modales et listes de reference
- Fichiers:
  - src/components/Jobs/CreateJobModal.jsx (departments, contract types, teams)
  - src/components/Settings/tabs/IntegrationsTab.jsx
- Donnees statiques actuelles: options codées en dur
- A remplacer si besoin metier dynamique:
  - GET /meta/departments
  - GET /meta/contract-types
  - GET /integrations

## 3) Statique a garder (normal, pas backend)

Ces elements peuvent rester statiques car ce sont des constantes UI/navigation:
- src/constants/routes.js
- src/constants/navigation.js
- labels visuels, couleurs, icones et classes CSS

## 4) Template service Axios (meme methode projet)

```js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getDashboardStats() {
  return await axios.get(`${API_URL}/dashboard/stats`);
}

export async function getHiringStats() {
  return await axios.get(`${API_URL}/dashboard/hiring-stats`);
}

export async function getPipeline() {
  return await axios.get(`${API_URL}/recruitment/pipeline`);
}

export async function moveCandidate(payload) {
  return await axios.patch(`${API_URL}/recruitment/pipeline/move`, payload);
}
```

## 5) Regle de migration frontend

Pour chaque page/composant qui contient des tableaux statiques:
1. creer une fonction dans src/service/*.js
2. appeler la fonction dans useEffect (GET) ou handleSubmit (POST/PUT/PATCH/DELETE)
3. remplacer la constante statique par les donnees de reponse API
4. garder try/catch cote composant et afficher error/loading

## 6) Configuration .env

```env
VITE_API_URL=http://localhost:5000
```
