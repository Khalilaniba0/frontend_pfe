// Lignes : 143 | Couche : composant | Depend de : UserRow, UserTableHeader, useToast
import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import UserRow from "components/Utilisateurs/LigneUtilisateur";
import UserTableHeader from "components/Utilisateurs/EnteteTableauUtilisateurs";
import { getAllUsers } from "../../service/restApiUtilisateurs";

export default function UserTable({
  refreshKey,
  usersData,
  externalLoading,
  externalError,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isControlled = Array.isArray(usersData);

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
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(
    function () {
      if (!isControlled) {
        getUsers();
      }
    },
    [getUsers, refreshKey, isControlled]
  );

  const sourceUsers = isControlled ? usersData : users;
  const sourceLoading = isControlled ? Boolean(externalLoading) : loading;
  const sourceError = isControlled ? externalError : error;

  const filteredUsers = sourceUsers.filter(function (user) {
    if (!searchTerm) return true;
    var query = searchTerm.toLowerCase();
    var name = (user.nom || user.name || "").toLowerCase();
    var email = (user.email || "").toLowerCase();
    return name.includes(query) || email.includes(query);
  });

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <UserTableHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {sourceLoading ? (
        <div className="px-6 py-12 text-center">
          <p className="font-body text-sm text-text-muted">Chargement...</p>
        </div>
      ) : sourceError ? (
        <div className="px-6 py-12 text-center">
          <p className="font-body text-sm text-red-500">{sourceError}</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <p className="font-body text-sm text-text-muted">Aucun utilisateur trouvé</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="block w-full md:table">
            <thead className="hidden bg-bg-soft md:table-header-group">
              <tr>
                <th className="text-left py-3 px-4 font-body font-semibold text-text-secondary text-xs uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="text-left py-3 px-4 font-body font-semibold text-text-secondary text-xs uppercase tracking-wider">
                  Role
                </th>
                <th className="text-left py-3 px-4 font-body font-semibold text-text-secondary text-xs uppercase tracking-wider">
                  Derniere connexion
                </th>
              </tr>
            </thead>
            <tbody className="block divide-y divide-border md:table-row-group md:divide-y-0">
              {filteredUsers.map(function (user) {
                const rowKey = user?._id || user?.id;
                return (
                  <UserRow
                    key={rowKey}
                    user={user}
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
  refreshKey: PropTypes.number,
  usersData: PropTypes.array,
  externalLoading: PropTypes.bool,
  externalError: PropTypes.string,
};
