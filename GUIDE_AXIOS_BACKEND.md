# Guide Axios - Etat Reel Front/Backend

Derniere mise a jour: 2026-04-02

Objectif: decrire ce qui est deja consomme via Axios et ce qui reste partiellement statique.

## 1) Convention Axios du projet

Ce projet est en Create React App.

Convention utilisee:
- `import axios from "axios"`
- `const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000"`
- `withCredentials: true` selon les flux
- `Authorization: Bearer ...` ajoutee sur certains appels (token RH/candidat)

Exemple minimal:

```js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export async function getSomething() {
  return await axios.get(`${API_URL}/some/endpoint`, {
    withCredentials: true,
  });
}
```

## 2) Domaines deja branches backend

### Auth RH + entreprise
- `src/service/restApiAuthentificationentification.js`
- `src/service/restApiEntreprise.js`
- utilise par `AuthContext`, signup, settings

### Auth candidat + profil
- `src/service/restApiCandidat.js`
- utilise par `CandidateAuthContext`, login/signup candidat, profil

### Offres candidat et detail
- `src/service/restApiOffresPubliques.js`
- `src/service/restApiOffresEntreprise.js`
- utilise par `useOffres`, `JobList`, `CandidateOffresList`, `JobDetail`

### Candidatures candidat
- `src/service/restApiCandidature.js`
- utilise par `PostulerModal`, `MesCandidatures`, `CandidateDashboard`

### Dashboard RH
- `src/service/restApiTableauDeBord.js`
- agrege dans `src/hooks/useTableauDeBord.js`

### Interviews RH
- `src/service/restApiEntretiens.js`
- orchestre dans `src/hooks/useEntretiens.js`

### Recruitment pipeline RH
- `src/service/restApiRecrutement.js`
- utilise par `Recrutement.jsx` et `useRecrutement.js`

### Users RH
- `src/service/restApiUtilisateurs.js`
- utilise par `useUtilisateurs.js`, `UserTable`, `ManageUsersModal`

### Notifications candidat
- `src/service/restApiNotificationss.js`
- utilise par `useNotificationsSysteme.js`, `NotificationPanel.jsx`

## 3) Endpoints principaux actuellement consommes

### Candidat
- `POST /candidat/inscrire`
- `POST /candidat/connecter`
- `POST /candidat/deconnecter`
- `GET /candidat/monProfil`
- `PUT /candidat/mettreAJourProfil`

### Candidature
- `POST /candidature/postuler`
- `GET /candidature/mesCandidatures`
- `DELETE /candidature/annuler/:id`
- `GET /candidature/getAllCandidatures`
- `PUT /candidature/updateCandidatureEtape/:id`
- `PUT /candidature/refuserCandidature/:id`
- `DELETE /candidature/deleteCandidatureById/:id`

### Offres
- `GET /offre/getOffresDisponibles`
- `GET /offre/getOffreById/:id`
- `GET /offre/getOffresByEntreprise`
- `GET /offre/getOffresByEntreprise/:entrepriseId`
- `POST /offre/createOffre`
- `PUT /offre/updateOffre/:id`
- `PUT /offre/updateOffreStatus/:id`
- `DELETE /offre/deleteOffreById/:id`

### Interviews
- `GET /entretien/getAllEntretiens`
- `POST /entretien/createEntretien`
- `DELETE /entretien/deleteEntretienById/:id`

### Users/Auth/Entreprise
- `GET /user/getAllUsers`
- `GET /user/getUserById/:id`
- `POST /user/createRh`
- `POST /user/createAdmin`
- `PUT /user/updateUser/:id`
- `DELETE /user/deleteUser/:id`
- `POST /user/login`
- `POST /user/logout`
- `POST /entreprise/registerEntreprise`
- `GET /entreprise/getMyEntreprise`
- `PUT /entreprise/updateEntreprise`

### Notifications
- `GET /notification/getNotificationsByCandidat/:candidatId`
- `PUT /notification/markAsRead/:id`
- routes delete testees en fallback:
  - `/notification/deleteNotification/:id`
  - `/notification/deleteNotificationById/:id`
  - `/notification/deleteById/:id`
  - `/notification/delete/:id`

## 4) Ce qui reste encore partiellement statique

- `src/components/Parametres/tabs/IntegrationsTab.jsx`
  - interactions de test webhook et affichage encore orientes UI locale
- `src/components/Parametres/tabs/ApparenceTab.jsx`
  - logique purement front
- contenus marketing et sections landing (normalement statiques)

## 5) Regles de migration pour les prochains ecrans

1. Ajouter/mettre a jour la fonction API dans `src/service/*`.
2. Creer un hook metier si la page est complexe (`src/hooks/*`).
3. Normaliser les reponses (`data.data`, `data`, etc.).
4. Gerer `loading`, `error`, retry et feedback utilisateur (toast).
5. Eviter les appels Axios directs dans les composants quand un service existe deja.

## 6) Configuration .env

```env
REACT_APP_API_URL=http://localhost:5000
```

Note: `VITE_API_URL` ne s'applique pas a CRA.
