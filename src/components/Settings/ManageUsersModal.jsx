import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const INITIAL_USERS = [
  {
    id: 1,
    name: "Marie Dupont",
    email: "marie.d@company.com",
    role: "Admin",
    status: "Actif",
    initials: "MD",
    color: "bg-primary",
  },
  {
    id: 2,
    name: "Lucas Bernard",
    email: "lucas.b@company.com",
    role: "RH",
    status: "Actif",
    initials: "LB",
    color: "bg-secondary",
  },
  {
    id: 3,
    name: "Sophie Martin",
    email: "s.martin@company.com",
    role: "RH",
    status: "Inactif",
    initials: "SM",
    color: "bg-amber-400",
  },
  {
    id: 4,
    name: "Thomas Petit",
    email: "t.petit@company.com",
    role: "RH",
    status: "Actif",
    initials: "TP",
    color: "bg-pink-400",
  },
];

export default function ManageUsersModal({ onClose }) {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(function () {
    document.body.style.overflow = "hidden";
    return function () {
      document.body.style.overflow = "";
    };
  }, []);

  const filteredUsers = useMemo(
    function () {
      if (!searchQuery.trim()) return users;
      const query = searchQuery.toLowerCase();
      return users.filter(function (user) {
        return (
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.role.toLowerCase().includes(query)
        );
      });
    },
    [users, searchQuery]
  );

  const handleDelete = function (userId) {
    setUsers(function (prev) {
      return prev.filter(function (u) {
        return u.id !== userId;
      });
    });
    setConfirmDeleteId(null);
  };

  const handleCancelDelete = function () {
    setConfirmDeleteId(null);
  };

  const handleCancel = function () {
    setConfirmDeleteId(null);
    setSearchQuery("");
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="mx-4 flex w-full max-w-lg flex-col rounded-2xl bg-white shadow-2xl"
        style={{ maxHeight: "85vh" }}
      >
        <header className="flex flex-shrink-0 items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-xl text-primary">
              manage_accounts
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold text-text-primary">
                Gérer les utilisateurs
              </h2>
              <p className="font-body text-xs text-text-secondary">
                Gérez les accès et rôles de votre équipe.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-bg-soft hover:text-text-secondary"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </header>

        <div className="flex-shrink-0 border-b border-border px-6 py-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-text-muted">
              search
            </span>
            <input
              type="text"
              placeholder="Rechercher un membre..."
              value={searchQuery}
              onChange={function (e) {
                setSearchQuery(e.target.value);
              }}
              className="w-full rounded-lg border border-border py-2 pl-10 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <span className="material-symbols-outlined mb-2 text-4xl text-text-muted">
                person_off
              </span>
              <p className="font-body text-sm text-text-muted">
                Aucun utilisateur trouvé
              </p>
            </div>
          ) : (
            filteredUsers.map(function (user) {
              return (
                <div key={user.id}>
                  <div className="flex items-center gap-4 border-b border-border px-6 py-4 transition-colors last:border-0 hover:bg-bg-soft">
                    <div
                      className={
                        "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold text-white " +
                        user.color
                      }
                    >
                      {user.initials}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate font-display text-sm font-semibold text-text-primary">
                          {user.name}
                        </p>
                        <span
                          className={
                            "rounded-full px-2 py-0.5 font-display text-xs font-medium " +
                            (user.role === "Admin"
                              ? "bg-violet-100 text-violet-600"
                              : "bg-bg-soft text-text-secondary")
                          }
                        >
                          {user.role}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span
                            className={
                              "inline-block h-2 w-2 rounded-full " +
                              (user.status === "Actif"
                                ? "bg-success"
                                : "bg-text-muted")
                            }
                          ></span>
                          <span className="font-body text-xs text-text-muted">
                            {user.status}
                          </span>
                        </span>
                      </div>
                      <p className="truncate font-body text-xs text-text-secondary">
                        {user.email}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={function () {
                        setConfirmDeleteId(user.id);
                      }}
                      className="cursor-pointer text-text-muted transition-colors hover:text-red-500"
                      title="Supprimer"
                    >
                      <span className="material-symbols-outlined text-lg">
                        delete
                      </span>
                    </button>
                  </div>

                  {confirmDeleteId === user.id && (
                    <div className="flex items-center gap-3 border-b border-border bg-amber-50 px-6 py-3 last:border-0">
                      <span className="material-symbols-outlined flex-shrink-0 text-lg text-amber-500">
                        warning
                      </span>
                      <p className="flex-1 font-body text-sm text-text-primary">
                        Supprimer <strong>{user.name}</strong> ? Cette action
                        est irréversible.
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleCancelDelete}
                          className="rounded-lg border border-border px-3 py-1.5 font-body text-sm text-text-secondary transition-colors hover:bg-bg-soft"
                        >
                          Annuler
                        </button>
                        <button
                          type="button"
                          onClick={function () {
                            handleDelete(user.id);
                          }}
                          className="rounded-lg bg-red-500 px-3 py-1.5 font-body text-sm text-white transition-colors hover:bg-red-600"
                        >
                          Confirmer la suppression
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

ManageUsersModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
