# Project Architecture – Talentia ATS Frontend (Create React App)

```
frontend_pfe/
├─ .gitignore
├─ package.json
├─ README.md
├─ tailwind.config.js
├─ postcss.config.js
├─ vite.config.js   # (if using Vite) – otherwise CRA config files
├─ public/
│   ├─ index.html
│   └─ assets/…
└─ src/
    ├─ index.js                # entry point, router configuration
    ├─ App.jsx                 # (optional) root component
    ├─ constants/
    │   └─ routes.js           # centralized route definitions
    ├─ context/
    │   ├─ AuthContext.jsx     # admin/HR auth
    │   └─ CandidateAuthContext.jsx
    ├─ service/
    │   ├─ restApiAuth.js
    │   ├─ restApiCandidat.js
    │   ├─ restApiCandidature.js
    │   ├─ restApiJobs.js
    │   ├─ restApiOffres.js
    │   └─ … (other service files)
    ├─ components/
    │   ├─ layout/
    │   │   ├─ Navbar.jsx
    │   │   └─ (other layout components)
    │   ├─ Candidate/
    │   │   ├─ CandidateLayout.jsx      # sidebar with 4 links
    │   │   ├─ CandidatureCard.jsx      # card for a single candidature
    │   │   └─ (other candidate‑specific UI components)
    │   └─ common/
    │       └─ CandidateAuthGuard.jsx   # route guard for protected pages
    ├─ pages/
    │   ├─ Candidate/
    │   │   ├─ CandidateLogin.jsx
    │   │   ├─ CandidateSignup.jsx
    │   │   ├─ CandidateDashboard.jsx   # rewritten dashboard (clean UI)
    │   │   ├─ CandidateOffresList.jsx # embedded offers list used in the layout
    │   │   ├─ JobDetail.jsx
    │   │   ├─ JobList.jsx              # public offers list (kept unchanged)
    │   │   ├─ MesCandidatures.jsx
    │   │   └─ CandidateProfile.jsx
    │   ├─ LandingPage.jsx
    │   ├─ SelectionPage.jsx
    │   ├─ ProfileForm.jsx
    │   ├─ Login.jsx
    │   ├─ SignUp.jsx
    │   ├─ ForgotPassword.jsx
    │   └─ … (any additional public pages)
    └─ assets/
        └─ styles/
            └─ tailwind.css
```

**Explanation**
- All React components live under `src/pages` (route‑level) or `src/components` (re‑usable UI).  
- Authentication contexts are in `src/context`.  
- API service wrappers are in `src/service`.  
- The router is defined in `src/index.js`, where the new route `/candidat/offres` points to `JobList` (or the embedded `CandidateOffresList`).
- The sidebar (`CandidateLayout.jsx`) now contains only the four required navigation links.

This file gives a quick overview of the folder hierarchy and the location of every major file in the project.
