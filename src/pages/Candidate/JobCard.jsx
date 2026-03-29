import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * JobCard — carte d'offre côté candidat
 * Affiche les infos résumées d'une offre et navigue vers /offres/:id au clic
 */
export default function JobCard({ offre }) {
  const navigate = useNavigate();

  if (!offre) return null;

  // Normalisation des champs (supporte plusieurs nommages backend)
  const id = offre._id || offre.id;
  const titre = offre.poste || offre.titre || offre.title || "Offre d'emploi";
  const entrepriseNom =
    offre.entreprise?.nom ||
    offre.entreprise?.name ||
    offre.nomEntreprise ||
    "Entreprise";
  const localisation = offre.localisation || offre.location || "Non précisé";
  const typeContrat = offre.typeContrat || offre.contrat || offre.type || "CDI";
  const salaire = offre.salaire || offre.salary || null;
  const datePublication = offre.createdAt || offre.publishedAt || null;

  // Calcul de l'ancienneté
  const getAnciennete = (dateStr) => {
    if (!dateStr) return null;
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Aujourd'hui";
    if (days === 1) return "Hier";
    if (days < 30) return `Il y a ${days}j`;
    return `Il y a ${Math.floor(days / 30)} mois`;
  };

  const isRemote =
    offre.remote ||
    offre.teletravail ||
    localisation?.toLowerCase().includes("remote") ||
    localisation?.toLowerCase().includes("télétravail");

  const handleVoirDetail = () => {
    if (id) {
      navigate(`/offres/${id}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e5e9e9] hover:shadow-md hover:border-[#006478]/20 transition-all duration-200 flex flex-col gap-4">
      {/* En-tête */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Logo entreprise ou initiale */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3ddaff]/20 to-[#006478]/20 flex items-center justify-center flex-shrink-0">
            {offre.entreprise?.logo ? (
              <img
                src={offre.entreprise.logo}
                alt={entrepriseNom}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <span className="text-lg font-black text-[#006478] font-['Epilogue']">
                {entrepriseNom.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h3 className="font-['Epilogue'] text-base font-bold text-[#2c2f30] leading-tight">
              {titre}
            </h3>
            <p className="text-sm text-[#595c5c] font-medium">{entrepriseNom}</p>
          </div>
        </div>

        {/* Date publication */}
        {datePublication && (
          <span className="text-xs text-[#747778] whitespace-nowrap flex-shrink-0">
            {getAnciennete(datePublication)}
          </span>
        )}
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <span className="px-2.5 py-1 bg-[#e5e9e9] text-[#2c2f30] text-xs font-bold rounded-lg flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">work</span>
          {typeContrat}
        </span>
        {isRemote && (
          <span className="px-2.5 py-1 bg-[#dae2fd] text-[#4a5167] text-xs font-bold rounded-lg flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">language</span>
            Remote
          </span>
        )}
        <span className="px-2.5 py-1 bg-[#dfe3e3] text-[#595c5c] text-xs font-bold rounded-lg flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">location_on</span>
          {localisation}
        </span>
      </div>

      {/* Salaire */}
      {salaire && (
        <p className="text-sm font-bold text-[#2c2f30]">
          <span className="text-[#006478]">💰</span> {salaire}
        </p>
      )}

      {/* CTA */}
      <div className="pt-2 border-t border-[#e5e9e9]">
        <button
          onClick={handleVoirDetail}
          disabled={!id}
          className="w-full py-2.5 bg-[#006478] text-white text-sm font-bold rounded-xl hover:bg-[#005363] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Voir le détail
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}