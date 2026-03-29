/**
 * Centralized route definitions grouped by role.
 * Keep legacy flat keys for backward compatibility.
 */

export const USER_ROLES = Object.freeze({
  PUBLIC: "public",
  CANDIDATE: "candidate",
  ADMIN: "admin",
});

const PUBLIC_ROUTES = Object.freeze({
  SELECTION: "/",
  LANDING: "/landing",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  PROFILE_FORM: "/formulaire",
});

const CANDIDATE_ROUTES = Object.freeze({
  ROOT: "/candidat",
  LOGIN: "/candidat/login",
  SIGNUP: "/candidat/signup",
  OFFRES: "/offres",
  SPACE_OFFRES: "/candidat/offres",
  OFFRES_DETAIL: "/offres/:id",
  DASHBOARD: "/candidat/dashboard",
  MES_CANDIDATURES: "/candidat/mes-candidatures",
  PROFILE: "/candidat/profil",
});

const ADMIN_ROUTES = Object.freeze({
  ROOT: "/dashboard",
  RECRUITMENT: "/dashboard/recruitment",
  JOBS: "/dashboard/jobs",
  INTERVIEWS: "/dashboard/interviews",
  USERS: "/dashboard/users",
  SETTINGS: "/dashboard/settings",
});

export const ROUTES_BY_ROLE = Object.freeze({
  [USER_ROLES.PUBLIC]: PUBLIC_ROUTES,
  [USER_ROLES.CANDIDATE]: CANDIDATE_ROUTES,
  [USER_ROLES.ADMIN]: ADMIN_ROUTES,
});

export const ROUTES = Object.freeze({
  PUBLIC: PUBLIC_ROUTES,
  CANDIDATE: CANDIDATE_ROUTES,
  ADMIN: ADMIN_ROUTES,

  // Legacy flat keys (compatibility)
  SELECTION: PUBLIC_ROUTES.SELECTION,
  LANDING: PUBLIC_ROUTES.LANDING,
  PROFILE_FORM: PUBLIC_ROUTES.PROFILE_FORM,
  LOGIN: PUBLIC_ROUTES.LOGIN,
  SIGNUP: PUBLIC_ROUTES.SIGNUP,
  FORGOT_PASSWORD: PUBLIC_ROUTES.FORGOT_PASSWORD,

  CANDIDATE_OFFRES: CANDIDATE_ROUTES.OFFRES,
  CANDIDATE_LOGIN: CANDIDATE_ROUTES.LOGIN,
  CANDIDATE_SIGNUP: CANDIDATE_ROUTES.SIGNUP,

  DASHBOARD: ADMIN_ROUTES.ROOT,
  DASHBOARD_RECRUITMENT: ADMIN_ROUTES.RECRUITMENT,
  JOBS: ADMIN_ROUTES.JOBS,
  DASHBOARD_EMPLOYEES: ADMIN_ROUTES.USERS,
  DASHBOARD_TIME_OFF: ADMIN_ROUTES.INTERVIEWS,
  DASHBOARD_SETTINGS: ADMIN_ROUTES.SETTINGS,
});

export function getRoutesByRole(role) {
  return ROUTES_BY_ROLE[role] || ROUTES_BY_ROLE[USER_ROLES.PUBLIC];
}

export default ROUTES;
