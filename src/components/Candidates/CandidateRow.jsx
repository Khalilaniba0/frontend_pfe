import React from "react";
import PropTypes from "prop-types";
import CandidateStatusBadge from "components/Candidates/CandidateStatusBadge";
import MatchScoreBar from "components/Candidates/MatchScoreBar";

const gradients = [
  "from-pink-400 to-rose-500",
  "from-violet-400 to-purple-500",
  "from-sky-400 to-blue-500",
  "from-emerald-400 to-teal-500",
  "from-amber-400 to-orange-500",
];

export default function CandidateRow({
  name,
  email,
  avatar,
  role,
  score,
  status,
  appliedDate,
}) {
  const initials = name
    .split(" ")
    .map(function (n) {
      return n[0];
    })
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const gradientIndex =
    name.split("").reduce(function (acc, char) {
      return acc + char.charCodeAt(0);
    }, 0) % gradients.length;

  return (
    <tr className="group cursor-pointer transition-colors duration-150 hover:bg-bg-soft/50">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-xl">
            {avatar ? (
              <img
                src={avatar}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className={
                  "flex h-full w-full items-center justify-center bg-gradient-to-br font-body text-xs font-bold text-white " +
                  gradients[gradientIndex]
                }
              >
                {initials}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate font-body text-sm font-semibold text-text-primary">
              {name}
            </p>
            <p className="truncate font-body text-xs text-text-secondary">
              {email}
            </p>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-bg-soft px-2.5 py-1 font-body text-sm font-medium text-text-primary">
          <span className="material-symbols-outlined text-sm text-text-muted">
            work
          </span>
          {role}
        </span>
      </td>

      <td className="px-6 py-4">
        <MatchScoreBar score={score} />
      </td>

      <td className="px-6 py-4">
        <CandidateStatusBadge status={status} />
      </td>

      <td className="px-6 py-4">
        <span className="font-body text-xs tabular-nums text-text-secondary">
          {appliedDate}
        </span>
      </td>

      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-primary-light hover:text-primary"
            title="Voir le profil"
          >
            <span className="material-symbols-outlined text-lg">
              visibility
            </span>
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-bg-soft hover:text-text-primary"
            title="Plus d'options"
          >
            <span className="material-symbols-outlined text-lg">
              more_horiz
            </span>
          </button>
        </div>
      </td>
    </tr>
  );
}

CandidateRow.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  role: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  appliedDate: PropTypes.string.isRequired,
};

CandidateRow.defaultProps = {
  avatar: null,
};
