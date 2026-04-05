import React from "react";
import PropTypes from "prop-types";

function formatDerniereConnexion(dateStr) {
  if (!dateStr) return "Jamais connecté";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function UserRow({ user }) {
  const userName = user.nom || user.name || "Utilisateur";

  const getInitials = function (name) {
    return name
      .split(" ")
      .map(function (n) {
        return n[0];
      })
      .join("")
      .toUpperCase();
  };

  const gradients = [
    "from-pink-400 to-rose-500",
    "from-sky-400 to-blue-500",
    "from-amber-400 to-orange-500",
    "from-emerald-400 to-teal-500",
    "from-violet-400 to-purple-500",
  ];

  const gradientIndex =
    userName.split("").reduce(function (acc, char) {
      return acc + char.charCodeAt(0);
    }, 0) % gradients.length;

  const getRoleBadgeClasses = function (role) {
    if (role === "Admin") {
      return "bg-primary-light text-primary border-primary/20";
    }
    return "bg-secondary-light text-secondary border-secondary/20";
  };

  return (
    <tr className="group block border-b border-border transition-colors duration-150 hover:bg-bg-soft/50 p-4 md:table-row md:p-0">
      <td className="block px-0 py-2 md:table-cell md:px-4 md:py-4">
        <div className="flex items-center gap-3">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={userName}
              className="h-10 w-10 rounded-xl object-cover"
            />
          ) : (
            <div
              className={
                "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-body text-xs font-bold text-white shadow-sm " +
                gradients[gradientIndex]
              }
            >
              {getInitials(userName)}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate font-body text-sm font-semibold text-text-primary">
              {userName}
            </p>
            <p className="truncate font-body text-xs text-text-secondary">
              {user.email}
            </p>
          </div>
        </div>
      </td>

      <td className="block px-0 py-2 md:table-cell md:px-4 md:py-4">
        <div className="flex items-center justify-between md:justify-start">
          <span className="font-body text-xs text-text-muted md:hidden">Rôle</span>
          <span
            className={
              "inline-flex rounded-lg border px-2.5 py-1 font-body text-xs font-medium " +
              getRoleBadgeClasses(user.role)
            }
          >
            {user.role}
          </span>
        </div>
      </td>

      <td className="block px-0 py-2 md:table-cell md:px-4 md:py-4">
        <div className="flex items-center justify-between md:justify-start">
          <span className="font-body text-xs text-text-muted md:hidden">Dernière connexion</span>
          <p className="font-body text-sm text-text-secondary">
            {formatDerniereConnexion(user.derniereConnexion)}
          </p>
        </div>
      </td>
    </tr>
  );
}

UserRow.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    nom: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    derniereConnexion: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
};
