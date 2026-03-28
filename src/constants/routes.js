/**
 * Centralized route definitions for the application
 */

export const ROUTES = {
  // Public routes
  SELECTION: "/",
  LANDING: "/landing",
  PROFILE_FORM: "/formulaire",
  CANDIDATE_OFFRES: "/offres",
  CANDIDATE_LOGIN: "/candidat/login",
  CANDIDATE_SIGNUP: "/candidat/signup",

  // Auth routes
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",

  // Dashboard routes
  DASHBOARD: "/dashboard",
  DASHBOARD_RECRUITMENT: "/dashboard/recruitment",
  JOBS: "/dashboard/jobs",

  DASHBOARD_EMPLOYEES: "/dashboard/employees",
  DASHBOARD_TIME_OFF: "/dashboard/time-off",
  DASHBOARD_SETTINGS: "/dashboard/settings",
};

export default ROUTES;
