import React, { useCallback, useState  } from "react";
import PropTypes from "prop-types";
import UserRow from "components/Users/UserRow";
import { getAllUsers } from "../../service/restApiUser";


export default function UserTable({  onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");

  
  const [users, setUsers] = useState([]);
  const getUsers = useCallback(async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);
  React.useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      {/* Header avec recherche */}
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
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-xl border border-border bg-bg-soft font-body text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Tableau */}
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
            {users?.map((user) => (
              <UserRow
                key={user._id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

UserTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      lastLogin: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    })
  ).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
