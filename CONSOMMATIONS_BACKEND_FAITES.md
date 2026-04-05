# Consommations backend deja faites

Derniere mise a jour: 2026-04-02

Ce document recense les appels API deja integres et utilises dans le frontend.

## Base URL

- `API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"`

## 1) Auth RH / entreprise

Source: `src/service/restApiAuthentificationentification.js`, `src/service/restApiEntreprise.js`

| Methode | Endpoint | Fonction | Utilise depuis |
|---|---|---|---|
| POST | `/user/login` | `loginUser(email, password)` | `ContexteAuth.jsx` |
| POST | `/user/logout` | `logoutUser()` | `ContexteAuth.jsx` |
| PUT | `/user/updateUser/:id` | `updatePassword(userId, newPassword)` | `SecuriteTab.jsx`, `ManageUsersModal.jsx` |
| POST | `/entreprise/registerEntreprise` | `registerEntreprise(payload)` | `Inscription.jsx` |
| GET | `/entreprise/getMyEntreprise` | `getMyEntreprise()` | `EntrepriseTab.jsx` |
| PUT | `/entreprise/updateEntreprise` | `updateEntreprise(payload)` | `EntrepriseTab.jsx` |

## 2) Auth candidat / profil

Source: `src/service/restApiCandidat.js`

| Methode | Endpoint | Fonction | Utilise depuis |
|---|---|---|---|
| POST | `/candidat/inscrire` | `inscrireCandidat(payload)` | `InscriptionCandidat.jsx` |
| POST | `/candidat/connecter` | `connecterCandidat(email, motDePasse)` | `CandidateConnexion.jsx` |
| POST | `/candidat/deconnecter` | `deconnecterCandidat()` | `ContexteAuthCandidat.jsx`, `MiseEnPageCandidat.jsx` |
| GET | `/candidat/monProfil` | `getMonProfil()` | `ContexteAuthCandidat.jsx` |
| PUT | `/candidat/mettreAJourProfil` | `mettreAJourProfil(payload)` | `ProfilCandidat.jsx` |

## 3) Offres

Sources: `src/service/restApiOffresPubliques.js`, `src/service/restApiOffresEntreprise.js`

| Methode | Endpoint | Fonction | Utilise depuis |
|---|---|---|---|
| GET | `/offre/getOffresDisponibles` | `getAllOffres()` | `useOffresPubliques.js`, `ListeOffresPubliques.jsx`, `ListeOffresCandidat.jsx`, `CandidateTableauDeBord.jsx` |
| GET | `/offre/getOffreById/:id` | `getOffreById(id)` | `DetailOffrePublique.jsx`, `useOffresPubliques.js` |
| GET | `/offre/getOffresByEntreprise` | `getOffreByEntreprise()` | `useOffresEntreprise.js`, `Offres.jsx`, `restApiTableauDeBord.js`, `restApiRecrutement.js` |
| GET | `/offre/getOffresByEntreprise/:entrepriseId` | `getOffreByEntreprise(entrepriseId)` | `restApiOffresEntreprise.js` |
| POST | `/offre/createOffre` | `createOffre(payload)` | `CreateJobModal.jsx`, `useOffresEntreprise.js` |
| PUT | `/offre/updateOffre/:id` | `updateOffre(id, payload)` | `useOffresEntreprise.js` |
| PUT | `/offre/updateOffreStatus/:id` | `toggleOffreStatus(id)` | `useOffresEntreprise.js`, `Offres.jsx` |
| DELETE | `/offre/deleteOffreById/:id` | `deleteOffre(id)` | `useOffresEntreprise.js`, `Offres.jsx` |

## 4) Candidatures et pipeline recruitment

Sources: `src/service/restApiCandidature.js`, `src/service/restApiRecrutement.js`

| Methode | Endpoint | Fonction | Utilise depuis |
|---|---|---|---|
| POST | `/candidature/postuler` | `postuler(formData)` | `PostulerModal.jsx` |
| GET | `/candidature/mesCandidatures` | `getMesCandidatures()` | `MesCandidatures.jsx`, `CandidateTableauDeBord.jsx` |
| DELETE | `/candidature/annuler/:id` | `annulerCandidature(id)` | `MesCandidatures.jsx` |
| GET | `/candidature/getAllCandidatures` | `getPipelineCandidatures()` | `Recrutement.jsx`, `useEntretiens.js`, `useTableauDeBord.js` |
| PUT | `/candidature/updateCandidatureEtape/:id` | `updateCandidatureEtape(id, etape, extra)` | `Recrutement.jsx` |
| PUT | `/candidature/refuserCandidature/:id` | `refuserCandidature(id)` | `Recrutement.jsx` |
| DELETE | `/candidature/deleteCandidatureById/:id` | `deleteCandidature(id)` | `restApiRecrutement.js` |

## 5) Interviews

Source: `src/service/restApiEntretiens.js`

| Methode | Endpoint | Fonction | Utilise depuis |
|---|---|---|---|
| GET | `/entretien/getAllEntretiens` | `getAllEntretiens()` | `useEntretiens.js`, `Entretiens.jsx`, `useTableauDeBord.js` |
| POST | `/entretien/createEntretien` | `createEntretien(payload)` | `useEntretiens.js`, `Entretiens.jsx` |
| DELETE | `/entretien/deleteEntretienById/:id` | `deleteEntretien(id)` | `useEntretiens.js`, `Entretiens.jsx` |
| GET | `/user/getAllUsers` | `getRecruteurs()` | `useEntretiens.js` |

## 6) Dashboard RH

Source: `src/service/restApiTableauDeBord.js`

| Methode | Endpoint | Fonction | Utilise depuis |
|---|---|---|---|
| GET | `/offre/getOffresByEntreprise` | `getDashboardOffres()` | `useTableauDeBord.js` |
| GET | `/candidature/getAllCandidatures` | `getDashboardCandidatures()` | `useTableauDeBord.js` |
| GET | `/entretien/getAllEntretiens` | `getDashboardEntretiens()` | `useTableauDeBord.js` |

## 7) Utilisateurs RH

Source: `src/service/restApiUtilisateurs.js`

| Methode | Endpoint | Fonction | Utilise depuis |
|---|---|---|---|
| GET | `/user/getAllUsers` | `getAllUsers()` | `UserTable.jsx`, `ManageUsersModal.jsx`, `ContexteAuth.jsx` |
| GET | `/user/getUserById/:id` | `getUserById(id)` | `ContexteAuth.jsx` |
| POST | `/user/createRh` | `createRh(payload)` | `useUtilisateurs.js`, `Utilisateurs.jsx` |
| POST | `/user/createAdmin` | `createAdmin(payload)` | service disponible |
| PUT | `/user/updateUser/:id` | `updateUser(id, payload)` | `useUtilisateurs.js` |
| DELETE | `/user/deleteUser/:id` | `deleteUser(id)` | `UserTable.jsx`, `ManageUsersModal.jsx`, `useUtilisateurs.js` |

## 8) Notifications candidat

Source: `src/service/restApiNotificationss.js`

| Methode | Endpoint | Fonction | Utilise depuis |
|---|---|---|---|
| GET | `/notification/getNotificationsByCandidat/:candidatId` | `getNotificationsByCandidat(candidatId)` | `useNotificationsSysteme.js` |
| PUT | `/notification/markAsRead/:id` | `markNotificationAsRead(id)` | `useNotificationsSysteme.js` |
| DELETE | `/notification/deleteNotification/:id` | `deleteNotificationById(id)` | `useNotificationsSysteme.js` |
| DELETE | `/notification/deleteNotificationById/:id` | `deleteNotificationByIdAlt(id)` | fallback `useNotificationsSysteme.js` |
| DELETE | `/notification/deleteById/:id` | `deleteNotificationByIdAlt2(id)` | fallback `useNotificationsSysteme.js` |
| DELETE | `/notification/delete/:id` | `deleteNotificationByIdAlt3(id)` | fallback `useNotificationsSysteme.js` |

## 9) Resume rapide

Consommations backend actives dans les ecrans principaux:
- authentification RH et candidat
- dashboard RH
- gestion jobs RH
- pipeline recruitment
- gestion entretiens
- gestion utilisateurs
- parcours candidat (offres, details, candidature, profil)
- notifications candidat

