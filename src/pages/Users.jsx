// src/pages/Users.jsx
import React, { useState } from "react";
import UserStatsCard from "components/Users/UserStatsCard";
import UserTable from "components/Users/UserTable";
import CreateUserModal from "components/Users/CreateUserModal";

const INITIAL_USERS = [
  {
    id: 1,
    name: "Jane Doe",
    email: "jane.doe@company.com",
    role: "Admin",
    status: "Actif",
    lastLogin: "Aujourd'hui",
  },
  {
    id: 2,
    name: "Marc Dupont",
    email: "marc.dupont@company.com",
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
    name: "Lucas Bernard",
    email: "l.bernard@company.com",
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
  const totalAdmins = users.filter((u) => u.role === "Admin").length;
  const totalRH = users.filter((u) => u.role === "RH").length;
  const totalActifs = users.filter((u) => u.status === "Actif").length;

  const handleCreateUser = (newUserData) => {
    const newUser = {
      id: Date.now(),
      ...newUserData,
    };
    setUsers((prev) => [...prev, newUser]);
    setLastCreated(newUserData.name);
    setShowModal(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const handleEdit = (userId) => {
    console.log("Edit user:", userId);
  };

  const handleDelete = (userId) => {
    if (window.confirm("Supprimer cet utilisateur ?")) {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    }
  };

  return (
    <>
      <div>
        {/* Page header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-semibold text-text-primary">
              Gestion des utilisateurs
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Gérez les accès et les rôles de votre équipe.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary font-display font-semibold text-sm text-white hover:bg-primary-dark transition-colors shadow-md flex-shrink-0"
          >
            <span className="material-symbols-outlined text-base">person_add</span>
            Créer un compte RH
          </button>
        </div>

        {/* Toast succès */}
        {showSuccess && (
          <div className="mb-5 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
            <span className="material-symbols-outlined text-success text-xl flex-shrink-0">
              check_circle
            </span>
            <div>
              <p className="text-sm font-body font-semibold text-green-800">
                Compte créé avec succès
              </p>
              <p className="text-xs text-green-700 font-body">
                {lastCreated} peut maintenant se connecter à la plateforme.
              </p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="ml-auto text-green-500 hover:text-green-700 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

        {/* Table */}
        <UserTable
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal */}
      {showModal && (
        <CreateUserModal
          onClose={() => setShowModal(false)}
          onSubmit={handleCreateUser}
        />
      )}
    </>
  );
}