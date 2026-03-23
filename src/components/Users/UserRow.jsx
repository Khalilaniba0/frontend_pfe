import React from "react";
import PropTypes from "prop-types";

export default function UserRow({ user, onEdit, onDelete }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getRoleBadgeClasses = (role) => {
    if (role === "Admin") {
      return "bg-primary/10 text-primary";
    }
    return "bg-bg-soft text-text-secondary";
  };

  const getStatusClasses = (status) => {
    if (status === "Actif") {
      return "bg-[#dcfce7] text-[#16a34a]";
    }
    return "bg-gray-100 text-text-secondary";
  };

  return (
    <tr className="border-b border-border hover:bg-bg-soft/50 transition-colors">
      {/* Utilisateur */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display font-semibold text-sm">
              {getInitials(user.name)}
            </div>
          )}
          <div>
            <p className="font-body font-semibold text-text-primary text-sm">
              {user.name}
            </p>
            <p className="font-body text-text-secondary text-xs">
              {user.email}
            </p>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="py-4 px-4">
        <span
          className={`inline-flex px-3 py-1 rounded-full text-xs font-body font-medium ${getRoleBadgeClasses(
            user.role
          )}`}
        >
          {user.role}
        </span>
      </td>

      {/* Statut */}
      <td className="py-4 px-4">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-body font-medium ${getStatusClasses(
            user.status
          )}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              user.status === "Actif" ? "bg-[#16a34a]" : "bg-text-muted"
            }`}
          />
          {user.status}
        </span>
      </td>

      {/* Derniere connexion */}
      <td className="py-4 px-4">
        <p className="font-body text-text-secondary text-sm">
          {user.lastLogin}
        </p>
      </td>

      {/* Actions */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit && onEdit(user.id)}
            className="p-2 rounded-lg hover:bg-bg-soft text-text-secondary hover:text-text-primary transition-colors"
            title="Modifier"
          >
            <span className="material-symbols-outlined text-lg">edit</span>
          </button>
          <button
            onClick={() => onDelete && onDelete(user.id)}
            className="p-2 rounded-lg hover:bg-red-50 text-text-secondary hover:text-red-500 transition-colors"
            title="Supprimer"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
}

UserRow.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    lastLogin: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};
