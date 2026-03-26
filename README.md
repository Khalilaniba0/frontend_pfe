# Talentia ATS Frontend

Interface web de Talentia ATS (Applicant Tracking System) construite avec React et Tailwind CSS.

## 1) Objectif du projet

Cette application couvre:
- un espace public (landing, formulaire candidat)
- un espace authentification (login, signup, mot de passe oublié)
- un dashboard RH/Admin (recrutement, offres, entretiens, utilisateurs, paramètres)

## 2) État actuel de l'intégration backend

Le projet contient du mock data sur plusieurs écrans, mais la consommation API réelle est déjà en place pour la gestion des utilisateurs.

Intégré au backend:
- liste des utilisateurs via API
- suppression d'utilisateur via API (fonction service prête)

Encore basé sur des données locales/mock:
- dashboard analytics
- pipeline recrutement
- offres
- entretiens
- une partie des paramètres

## 3) Stack technique

- React 19
- React Router DOM 6
- Tailwind CSS 3 + @tailwindcss/forms
- Axios
- Chart.js
- react-scripts (CRA)

## 4) Structure utile (résumé)

```text
src/
  components/
  constants/
  context/
  layouts/
  pages/
  service/
    restApiUser.js
  index.js
```

Fichiers clés:
- src/index.js: routes principales et montage de l'app
- src/layouts/AdminLayout.jsx: layout dashboard
- src/context/AuthContext.jsx: gestion utilisateur/role côté front
- src/service/restApiUser.js: couche d'appel HTTP utilisateurs
- src/components/Users/UserTable.jsx: consommation du service getAllUsers

## 5) Installation et lancement

Prérequis recommandés:
- Node.js 20+ (npm récent)

Commandes:

```bash
npm install
npm start
```

Build production:

```bash
npm run build
```

## 6) Configuration API

Le front lit une URL de backend depuis:
- VITE_API_URL

Fallback actuel si la variable est absente:
- http://localhost:5000

Créer un fichier .env à la racine:

```env
VITE_API_URL=http://localhost:5000
```

## 7) Partie Service: comment le front consomme le backend

### 7.1 Fichier service

Le fichier src/service/restApiUser.js centralise les appels HTTP utilisateurs via Axios.

Fonctions exposées:

| Fonction | Méthode HTTP | Endpoint appelé |
|---|---|---|
| getAllUsers() | GET | /user/getAllUsers |
| deleteUser(id) | DELETE | /user/deleteUser/:id |

Base URL utilisée:
- API_URL = VITE_API_URL ou http://localhost:5000

### 7.2 Flux front -> backend (cas réel actuel)

1. Le composant src/components/Users/UserTable.jsx se monte.
2. useEffect déclenche getUsers().
3. getUsers() appelle getAllUsers() depuis src/service/restApiUser.js.
4. Axios envoie GET {API_URL}/user/getAllUsers.
5. La réponse est lue via res.data.data puis injectée dans le state users.
6. Le tableau affiche chaque entrée avec src/components/Users/UserRow.jsx.

### 7.3 Contrat de réponse attendu par le front

Le front attend actuellement ce shape:

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

Note:
- le code lit res.data.data dans UserTable
- l'identifiant utilisé dans le rendu/action est _id

### 7.4 Gestion d'erreur côté front

Dans UserTable:
- les erreurs API sont capturées dans un try/catch
- en cas d'échec, une erreur est loggée dans la console

## 8) Exigences backend pour fonctionner avec ce front

Le backend doit:
- exposer les routes /user/getAllUsers et /user/deleteUser/:id
- répondre en JSON avec un tableau disponible dans data
- autoriser CORS depuis l'origine du front (ex: http://localhost:3000)

## 9) Scripts npm

| Script | Description |
|---|---|
| npm start | Lance le serveur de développement |
| npm run build | Génère le build de production |
| npm test | Lance les tests |

## 10) Prochaine étape recommandée

Pour industrialiser la connexion front/backend, ajouter progressivement un service par domaine:
- src/service/restApiJobs.js
- src/service/restApiRecruitment.js
- src/service/restApiInterviews.js


Puis remplacer les données mock page par page par les appels API correspondants.
