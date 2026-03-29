# Consommations backend deja faites

Ce document recense les appels API backend deja integres dans le frontend.

## Base URL

- `API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"`

## 1) Authentification et compte entreprise

Source: `src/service/restApiAuth.js`

| Methode | Endpoint backend | Fonction frontend | Utilise depuis |
|---|---|---|---|
| POST | `/user/login` | `loginUser(email, password)` | `src/context/AuthContext.jsx` (`login`) |
| POST | `/user/logout` | `logoutUser()` | `src/context/AuthContext.jsx` (`logout`) |
| POST | `/entreprise/registerEntreprise` | `registerEntreprise(payload)` | `src/pages/SignUp.jsx` |

## 2) Utilisateurs

Source: `src/service/restApiUser.js`

| Methode | Endpoint backend | Fonction frontend | Utilise depuis |
|---|---|---|---|
| GET | `/user/getAllUsers` | `getAllUsers()` | `src/components/Users/UserTable.jsx` |
| DELETE | `/user/deleteUser/:id` | `deleteUser(id)` | Service cree, pas encore branche dans un composant |

Note: il y a aussi un appel direct `GET /user/getAllUsers` dans `src/context/AuthContext.jsx` pour verifier la session.

## 3) Offres cote candidat

Source: `src/service/restApiJobs.js`

| Methode | Endpoint backend | Fonction frontend | Utilise depuis |
|---|---|---|---|
| GET | `/offre/getAllOffres` | `getAllOffres()` | `src/pages/Candidate/JobList.jsx` |

Details:
- essaie d'abord un appel public pour les visiteurs (sans credentials)
- bascule sur un appel authentifie (Bearer + withCredentials) si un token candidat existe
- filtre uniquement les offres ouvertes/actives

## 4) Offres cote RH

Source: `src/service/restApiOffres.js`

| Methode | Endpoint backend | Fonction frontend | Utilise depuis |
|---|---|---|---|
| GET | `/offre/getAllOffres` | `getAllOffresRH()` | Service cree, pas encore branche dans un composant |
| GET | `/offre/getOffresByEntreprise/:entrepriseId` ou `/offre/getOffresByEntreprise` | `getOffreByEntreprise(entrepriseId)` | `src/pages/Jobs.jsx` |
| POST | `/offre/createOffre` | `createOffre(payload)` | `src/components/Jobs/CreateJobModal.jsx` |
| PUT | `/offre/updateOffre/:id` | `updateOffre(id, payload)` | Service cree, pas encore branche dans un composant |
| PUT | `/offre/updateOffreStatus/:id` | `toggleOffreStatus(id)` | `src/pages/Jobs.jsx` |
| DELETE | `/offre/deleteOffreById/:id` | `deleteOffre(id)` | `src/pages/Jobs.jsx` |

## 5) Resume rapide

Appels backend deja utilises dans des ecrans actifs:
- login
- logout
- inscription entreprise
- recuperation des utilisateurs
- recuperation des offres candidat
- recuperation des offres RH par entreprise
- creation d'offre
- changement de statut d'une offre
- suppression d'une offre
