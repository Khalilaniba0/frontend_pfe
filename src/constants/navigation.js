export const NAV_ITEMS = [
  {
    label: "Tableau de bord",
    path: "/dashboard",
    icon: "dashboard",
    roles: ["rh", "admin"],
  },
  {
    label: "Recrutement",
    path: "/dashboard/recruitment",
    icon: "view_kanban",
    roles: ["rh", "admin"],
  },
  {
    label: "Offres d'emploi",
    path: "/dashboard/jobs",
    icon: "work",
    roles: ["rh", "admin"],
  },
  {
    label: "Entretiens",
    path: "/dashboard/interviews",
    icon: "calendar_month",
    roles: ["rh", "admin"],
  },
 
  {
    label: "Utilisateurs",
    path: "/dashboard/users",
    icon: "manage_accounts",
    roles: ["admin"],
  },
  {
    label: "Paramètres",
    path: "/dashboard/settings",
    icon: "settings",
    roles: ["admin"],
  },
];
