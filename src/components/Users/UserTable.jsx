import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import UserRow from "components/Users/UserRow";
import { getAllUsers, deleteUser } from "../../service/restApiUser";

export default function UserTable({ onEdit, refreshKey }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUsers = useCallback(async function () {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllUsers();
      const data = Array.isArray(res?.data?.data)
        ? res.data.data
        : Array.isArray(res?.data)
          ? res.data
          : [];
      setUsers(data);
    } catch (err) {
      setError(err?.response?.data?.message || "Erreur de chargement des utilisateurs");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(
    function () {
      getUsers();
    },
    [getUsers, refreshKey]
  );

  const handleDelete = async function (userId) {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    try {
      await deleteUser(userId);
      getUsers();
    } catch (err) {
      alert(err?.response?.data?.message || "Erreur lors de la suppression");
    }
  };

  const filteredUsers = users.filter(function (user) {
    if (!searchTerm) return true;
    var query = searchTerm.toLowerCase();
    var name = (user.nom || user.name || "").toLowerCase();
    var email = (user.email || "").toLowerCase();
    return name.includes(query) || email.includes(query);
  });

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="font-display font-semibold text-text-primary">
          Membres de l'equipe
        </h3>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-lg">
            search
          </span>
          <input
            type="text"
            placeholder="Rechercher un membre..."
            value={searchTerm}
            onChange={function (e) {
              setSearchTerm(e.target.value);
            }}
            className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-xl border border-border bg-bg-soft font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>
      </div>

      {loading ? (
        <div className="px-6 py-12 text-center">
          <p className="font-body text-sm text-text-muted">Chargement...</p>
        </div>
      ) : error ? (
        <div className="px-6 py-12 text-center">
          <p className="font-body text-sm text-red-500">{error}</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <p className="font-body text-sm text-text-muted">Aucun utilisateur trouvé</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-bg-soft">
              <tr>
                <th className="text-left py-3 px-4 font-body font-semibold text-text-secondary text-xs uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="text-left py-3 px-4 font-body font-semibold text-text-secondary text-xs uppercase tracking-wider">
                  Role
                </th>
                <th className="text-left py-3 px-4 font-body font-semibold text-text-secondary text-xs uppercase tracking-wider">
                  Statut
                </th>
                <th className="text-left py-3 px-4 font-body font-semibold text-text-secondary text-xs uppercase tracking-wider">
                  Derniere connexion
                </th>
                <th className="text-left py-3 px-4 font-body font-semibold text-text-secondary text-xs uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(function (user) {
                return (
                  <UserRow
                    key={user._id}
                    user={user}
                    onEdit={onEdit}
                    onDelete={handleDelete}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

UserTable.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  refreshKey: PropTypes.number,
};
