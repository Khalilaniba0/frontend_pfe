import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { MapPin, Clock, DollarSign, ChevronRight, Bookmark } from "lucide-react";
import { ROUTES } from "constants/routes";

const CONTRACT_BADGES = {
  CDI: "border-emerald-200 bg-emerald-50 text-emerald-700",
  CDD: "border-amber-200 bg-amber-50 text-amber-700",
};

function getRelativeTimeLabel(dateValue) {
  if (!dateValue) {
    return "Récente";
  }

  const postedDate = new Date(dateValue);
  if (Number.isNaN(postedDate.getTime())) {
    return "Récente";
  }

  const diffMs = Date.now() - postedDate.getTime();
  const diffHours = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60)));

  if (diffHours < 24) {
    return `Il y a ${diffHours}h`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    return `Il y a ${diffDays}j`;
  }

  const diffMonths = Math.floor(diffDays / 30);
  return `Il y a ${diffMonths} mois`;
}

function getSalaryLabel(offre) {
  if (offre?.salaire) {
    return offre.salaire;
  }

  if (offre?.salaireMin && offre?.salaireMax) {
    return `${offre.salaireMin} - ${offre.salaireMax} MAD`;
  }

  if (offre?.salaireMin) {
    return `A partir de ${offre.salaireMin} MAD`;
  }

  return "Salaire a discuter";
}

export default function JobCard({ offre, viewMode }) {
  const navigate = useNavigate();
  const offreId = offre?._id || offre?.id;
  const poste = offre?.poste || "Poste non renseigne";
  const entrepriseNom = offre?.entreprise?.nom || "Entreprise";
  const localisation = offre?.localisation || "Localisation non precisee";
  const typeContrat = (offre?.typeContrat || "CDI").toUpperCase();
  const badgeClass =
    CONTRACT_BADGES[typeContrat] || "border-sky-200 bg-sky-50 text-sky-700";

  const salaireLabel = getSalaryLabel(offre);
  const dateLabel = getRelativeTimeLabel(offre?.createdAt || offre?.datePublication);
  const logoLetters = entrepriseNom.slice(0, 2).toUpperCase();

  return (
    <article
      onClick={function () {
        if (offreId) {
          navigate(`/offres/${offreId}`);
        }
      }}
      className={
        "group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-[0_14px_34px_rgba(19,200,236,0.16)] " +
        (viewMode === "list" ? "md:flex md:items-center md:gap-5" : "")
      }
    >
      <div className="flex items-start justify-between gap-4 md:min-w-0 md:flex-1">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-gradient-to-r from-[#00D2FF] to-[#3a7bd5] text-sm font-bold text-white shadow-sm">
            {logoLetters}
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-semibold uppercase tracking-wider text-slate-500">
              {entrepriseNom}
            </p>
            <h3 className="truncate text-base font-bold text-slate-900">{poste}</h3>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-slate-400" />
                {localisation}
              </span>
              <span className="flex items-center gap-1.5">
                <DollarSign size={14} className="text-slate-400" />
                {salaireLabel}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-slate-400" />
                {dateLabel}
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={function (e) {
            e.stopPropagation();
            // Handle save logic here
          }}
          className="text-slate-300 transition-colors hover:text-primary-dark"
          aria-label="Sauvegarder l'offre"
        >
          <Bookmark size={18} />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 md:mt-0 md:min-w-[170px] md:border-t-0 md:pt-0">
        <span
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${badgeClass}`}
        >
          {typeContrat}
        </span>

        <Link
          to={offreId ? `/offres/${offreId}` : ROUTES.CANDIDATE_OFFRES}
          aria-disabled={!offreId}
          className={
            "inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#00D2FF] to-[#3a7bd5] px-3 py-2 text-sm font-semibold text-white no-underline shadow-sm transition-all duration-200 " +
            (offreId
              ? "hover:brightness-105 hover:shadow-md"
              : "pointer-events-none opacity-60")
          }
        >
          Voir le detail
          <ChevronRight size={16} />
        </Link>
      </div>
    </article>
  );
}

JobCard.propTypes = {
  offre: PropTypes.shape({
    poste: PropTypes.string,
    localisation: PropTypes.string,
    typeContrat: PropTypes.string,
    salaire: PropTypes.string,
    salaireMin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    salaireMax: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    createdAt: PropTypes.string,
    datePublication: PropTypes.string,
    entreprise: PropTypes.shape({
      nom: PropTypes.string,
    }),
  }).isRequired,
  viewMode: PropTypes.oneOf(["grid", "list"]),
};

JobCard.defaultProps = {
  viewMode: "grid",
};
