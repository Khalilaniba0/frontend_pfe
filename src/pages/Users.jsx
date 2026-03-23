import React, { useState } from "react";
import UserStatsCard from "components/Users/UserStatsCard";
import UserTable from "components/Users/UserTable";
import CreateUserModal from "components/Users/CreateUserModal";

const INITIAL_USERS = [
  {
    id: 1,
    name: "Marie Dupont",
    email: "marie.d@company.com",
    role: "Admin",
    status: "Actif",
    lastLogin: "Aujourd'hui",
  },
  {
    id: 2,
    name: "Lucas Bernard",
    email: "lucas.b@company.com",
    role: "RH",
    status: "Actif",
    lastLogin: "Hier",
  },
  {
    id: 3,
    name: "Sophie Martin",
    email: "s.martin@company.com",
    role: "RH",
    status: "Inactif",
    lastLogin: "Il y a 7 jours",
  },
  {
    id: 4,
    name: "Thomas Petit",
    email: "t.petit@company.com",
    role: "RH",
    status: "Actif",
    lastLogin: "Il y a 2 jours",
  },
];

export default function Users() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastCreated, setLastCreated] = useState(null);

  const totalUsers = users.length;
  const totalAdmins = users.filter(function (u) {
    return u.role === "Admin";
  }).length;
  const totalRH = users.filter(function (u) {
    return u.role === "RH";
  }).length;
  const totalActifs = users.filter(function (u) {
    return u.status === "Actif";
  }).length;

  const handleCreateUser = function (newUserData) {
    const newUser = {
      id: Date.now(),
      ...newUserData,
    };
    setUsers(function (prev) {
      return [...prev, newUser];
    });
    setLastCreated(newUserData.name);
    setShowModal(false);
    setShowSuccess(true);
    setTimeout(function () {
      setShowSuccess(false);
    }, 4000);
  };

  const handleEdit = function (userId) {
  };

  const handleDelete = function (userId) {
    if (window.confirm("Supprimer cet utilisateur ?")) {
      setUsers(function (prev) {
        return prev.filter(function (u) {
          return u.id !== userId;
        });
      });
    }
  };

  return (
    <>
      <div className="animate-fade-in">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              Gestion des utilisateurs
            </h1>
            <p className="mt-1 font-body text-sm text-text-secondary">
              Gérez les accès et les rôles de votre équipe
            </p>
          </div>
          <button
            type="button"
            onClick={function () {
              setShowModal(true);
            }}
            className="flex flex-shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-body text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-150 hover:bg-primary-dark hover:shadow-lg"
          >
            <span className="material-symbols-outlined text-base">
              person_add
            </span>
            Créer un compte RH
          </button>
        </header>

        {showSuccess && (
          <div className="mb-5 flex animate-slide-up items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <span className="material-symbols-outlined flex-shrink-0 text-xl text-emerald-600">
              check_circle
            </span>
            <div className="flex-1">
              <p className="font-body text-sm font-semibold text-emerald-800">
                Compte créé avec succès
              </p>
              <p className="font-body text-xs text-emerald-700">
                {lastCreated} peut maintenant se connecter à la plateforme.
              </p>
            </div>
            <button
              type="button"
              onClick={function () {
                setShowSuccess(false);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-emerald-500 transition-colors hover:bg-emerald-100 hover:text-emerald-700"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        )}

        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <UserStatsCard
            icon="group"
            label="Total utilisateurs"
            value={totalUsers}
            color="primary"
          />
          <UserStatsCard
            icon="admin_panel_settings"
            label="Administrateurs"
            value={totalAdmins}
            color="secondary"
          />
          <UserStatsCard
            icon="badge"
            label="Responsables RH"
            value={totalRH}
            color="warning"
          />
          <UserStatsCard
            icon="verified"
            label="Utilisateurs actifs"
            value={totalActifs}
            color="success"
          />
        </div>

        <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      {showModal && (
        <CreateUserModal
          onClose={function () {
            setShowModal(false);
          }}
          onSubmit={handleCreateUser}
        />
      )}
    </>
  );
}
