// Lignes : 103 | Couche : page | Depend de : useUsers, UserTable, CreateUserModal
import React, { useState } from "react";
import UserTable from "components/Utilisateurs/TableauUtilisateurs";
import CreateUserModal from "components/Utilisateurs/ModalCreationUtilisateur";
import { useUsers } from "hooks/useUtilisateurs";

export default function Users() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastCreated, setLastCreated] = useState(null);
  const {
    users,
    loading,
    error,
    createUser,
  } = useUsers();

  const handleCreateUser = async function (payload) {
    const result = await createUser(payload);
    var userName =
      result?.data?.data?.nom ||
      result?.data?.nom ||
      payload?.nom ||
      "L'utilisateur";
    setLastCreated(userName);
    setShowModal(false);
    setShowSuccess(true);
    setTimeout(function () {
      setShowSuccess(false);
    }, 4000);
  };

  return (
    <>
      <div className="animate-fade-in">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-xl font-bold tracking-tight text-text-primary md:text-3xl lg:text-4xl">
              Gestion des utilisateurs
            </h1>
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

        <UserTable
          usersData={users}
          externalLoading={loading}
          externalError={error}
        />
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
