import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { ROUTES } from "constants/routes";
import ProtectedRoute from "components/common/ProtectedRoute";
import CandidateAuthGuard from "components/common/CandidateAuthGuard";

import PublicLayout from "components/layout/publicLayout";
import AdminLayout from "components/layout/adminLayout";
import CandidateLayout from "components/layout/candidateLayout";

import SelectionPage from "pages/SelectionPage";
import LandingPage from "pages/LandingPage";
import Login from "pages/Login";
import SignUp from "pages/SignUp";
import ForgotPassword from "pages/ForgotPassword";
import ProfileForm from "pages/ProfileForm";

import Dashboard from "pages/Dashboard";
import Recruitment from "pages/Recruitment";
import Jobs from "pages/Jobs";
import Interviews from "pages/Interviews";
import Users from "pages/Users";
import Settings from "pages/Settings";

import CandidateLogin from "pages/Candidate/CandidateLogin";
import CandidateSignup from "pages/Candidate/CandidateSignup";
import CandidateDashboard from "pages/Candidate/CandidateDashboard";
import MesCandidatures from "pages/Candidate/MesCandidatures";
import CandidateProfile from "pages/Candidate/CandidateProfile";
import JobList from "pages/Candidate/JobList";
import JobDetail from "pages/Candidate/JobDetail";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path={ROUTES.PUBLIC.SELECTION} element={<SelectionPage />} />
        <Route path={ROUTES.PUBLIC.LANDING} element={<LandingPage />} />
        <Route path={ROUTES.PUBLIC.LOGIN} element={<Login />} />
        <Route path={ROUTES.PUBLIC.SIGNUP} element={<SignUp />} />
        <Route
          path={ROUTES.PUBLIC.FORGOT_PASSWORD}
          element={<ForgotPassword />}
        />
        <Route path={ROUTES.PUBLIC.PROFILE_FORM} element={<ProfileForm />} />

        <Route path={ROUTES.CANDIDATE.OFFRES} element={<JobList />} />
        <Route path={ROUTES.CANDIDATE.OFFRES_DETAIL} element={<JobDetail />} />
        <Route path={ROUTES.CANDIDATE.LOGIN} element={<CandidateLogin />} />
        <Route path={ROUTES.CANDIDATE.SIGNUP} element={<CandidateSignup />} />
      </Route>

      <Route
        path={ROUTES.ADMIN.ROOT}
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="recruitment" element={<Recruitment />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="interviews" element={<Interviews />} />

        <Route
          path="users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={ROUTES.ADMIN.ROOT} replace />} />
      </Route>

      <Route element={<CandidateAuthGuard />}>
        <Route path={ROUTES.CANDIDATE.ROOT} element={<CandidateLayout />}>
          <Route path="dashboard" element={<CandidateDashboard />} />
          <Route path="mes-candidatures" element={<MesCandidatures />} />
          <Route path="offres" element={<JobList />} />
          <Route path="profil" element={<CandidateProfile />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.PUBLIC.SELECTION} replace />} />
    </Routes>
  );
}
