import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

import { AuthProvider } from "context/AuthContext";
import { ROUTES } from "constants/routes";
import AdminLayout from "layouts/AdminLayout.jsx";
import LandingPage from "pages/LandingPage.jsx";
import SelectionPage from "pages/SelectionPage.jsx";
import ProfileForm from "pages/ProfileForm.jsx";
import Login from "pages/Login.jsx";
import ForgotPassword from "pages/ForgotPassword.jsx";
import SignUp from "pages/SignUp.jsx";
import JobList from "pages/Candidate/JobList.jsx";
import CandidateLogin from "pages/Candidate/CandidateLogin.jsx";
import CandidateSignup from "pages/Candidate/CandidateSignup.jsx";
import JobDetail from "./pages/Candidate/JobDetail";

const root = createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* Dashboard RH/Admin */}
        <Route path="/dashboard/*" element={<AdminLayout />} />
        <Route path="/offres/:id" element={<JobDetail />} />
        {/* Landing entreprise */}
        <Route path={ROUTES.LANDING} element={<LandingPage />} />

        {/* Espace candidat */}
        <Route path={ROUTES.CANDIDATE_OFFRES} element={<JobList />} />
        <Route path={ROUTES.CANDIDATE_LOGIN} element={<CandidateLogin />} />
        <Route path={ROUTES.CANDIDATE_SIGNUP} element={<CandidateSignup />} />

        {/* Formulaire profil */}
        <Route path={ROUTES.PROFILE_FORM} element={<ProfileForm />} />

        {/* Pages d'authentification */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.SIGNUP} element={<SignUp />} />

        {/* Ecran de sélection d'espace */}
        <Route path={ROUTES.SELECTION} element={<SelectionPage />} />
        <Route path="*" element={<Navigate to={ROUTES.SELECTION} replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
