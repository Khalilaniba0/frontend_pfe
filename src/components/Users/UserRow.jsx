import React from "react";
import PropTypes from "prop-types";

export default function UserRow({ user, onEdit }) {
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
    user.name.split("").reduce(function (acc, char) {
      return acc + char.charCodeAt(0);
    }, 0) % gradients.length;

  const getRoleBadgeClasses = function (role) {
    if (role === "Admin") {
      return "bg-primary-light text-primary border-primary/20";
    }
    return "bg-secondary-light text-secondary border-secondary/20";
  };

  const getStatusClasses = function (status) {
    if (status === "Actif") {
      return "bg-emerald-50 text-emerald-600";
    }
    return "bg-gray-100 text-text-muted";
  };

  return (
    <tr className="group border-b border-border transition-colors duration-150 hover:bg-bg-soft/50">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="h-10 w-10 rounded-xl object-cover"
            />
          ) : (
            <div
              className={
                "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-body text-xs font-bold text-white shadow-sm " +
                gradients[gradientIndex]
              }
            >
              {getInitials(user.name)}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate font-body text-sm font-semibold text-text-primary">
              {user.name}
            </p>
            <p className="truncate font-body text-xs text-text-secondary">
              {user.email}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-4">
        <span
          className={
            "inline-flex rounded-lg border px-2.5 py-1 font-body text-xs font-medium " +
            getRoleBadgeClasses(user.role)
          }
        >
          {user.role}
        </span>
      </td>

      <td className="px-4 py-4">
        <span
          className={
            "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-body text-xs font-medium " +
            getStatusClasses(user.status)
          }
        >
          <span
            className={
              "h-1.5 w-1.5 rounded-full " +
              (user.status === "Actif" ? "bg-emerald-500" : "bg-text-muted")
            }
          ></span>
          {user.status}
        </span>
      </td>

      <td className="px-4 py-4">
        <p className="font-body text-sm text-text-secondary">{user.lastLogin}</p>
      </td>

      <td className="px-4 py-4">
        <div className="flex items-center gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          <button
            type="button"
            onClick={function () {
              onEdit && onEdit(user.id);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-primary-light hover:text-primary"
            title="Modifier"
          >
            <span className="material-symbols-outlined text-lg">edit</span>
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
};
