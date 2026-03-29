import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOffreById } from "../../service/restApiOffres";
import Navbar from "components/layout/Navbar.jsx";
import { useCandidateAuth } from "context/CandidateAuthContext";
import PostulerModal from "components/Candidate/PostulerModal";

// ─── Sous-composants réutilisables ────────────────────────────────────────────

/**
 * Badge inline (type contrat, remote, localisation…)
 */
function OffreBadge({ icon, label, variant = "default" }) {
  const variants = {
    default: "bg-[#e5e9e9] text-[#2c2f30]",
    secondary: "bg-[#dae2fd] text-[#4a5167]",
    muted: "bg-[#dfe3e3] text-[#595c5c]",
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-bold rounded-lg flex items-center gap-1.5 ${variants[variant]}`}
    >
      {icon && (
        <span className="material-symbols-outlined text-sm">{icon}</span>
      )}
      {label}
    </span>
  );
}

/**
 * Tag compétence
 */
function SkillTag({ label }) {
  return (
    <span className="px-4 py-2 bg-[#e5e9e9] text-[#2c2f30] font-bold rounded-xl text-sm cursor-default hover:-translate-y-1 hover:bg-[#006478] hover:text-white transition-all duration-200">
      {label}
    </span>
  );
}

/**
 * Skeleton loader pendant le chargement
 */
function JobDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="h-4 bg-[#e5e9e9] rounded w-48 mb-4" />
        <div className="h-10 bg-[#e5e9e9] rounded w-3/4 mb-4" />
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-7 bg-[#e5e9e9] rounded-lg w-20" />
          ))}
        </div>
        <div className="h-24 bg-[#eff1f1] rounded-xl" />
      </div>
      <div className="bg-white rounded-2xl p-8 shadow-sm space-y-4">
        <div className="h-6 bg-[#e5e9e9] rounded w-48" />
        <div className="h-4 bg-[#eff1f1] rounded w-full" />
        <div className="h-4 bg-[#eff1f1] rounded w-5/6" />
        <div className="h-4 bg-[#eff1f1] rounded w-4/6" />
      </div>
    </div>
  );
}

/**
 * Message d'erreur
 */
function ErrorState({ message, onBack }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <span className="material-symbols-outlined text-6xl text-[#b31b25] mb-4">
        error_outline
      </span>
      <h2 className="text-2xl font-bold text-[#2c2f30] mb-2">
        Offre introuvable
      </h2>
      <p className="text-[#595c5c] mb-8 max-w-sm">
        {message || "Cette offre n'existe pas ou a été supprimée."}
      </p>
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-6 py-3 bg-[#006478] text-white font-bold rounded-xl hover:bg-[#005363] transition-colors"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Retour aux offres
      </button>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Formate une date ISO en "Publié il y a X jours / heures"
 */
function formatPublishedDate(dateStr) {
  if (!dateStr) return "Date inconnue";
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000);
  if (days > 0) return `Publié il y a ${days} jour${days > 1 ? "s" : ""}`;
  if (hours > 0) return `Publié il y a ${hours} heure${hours > 1 ? "s" : ""}`;
  return "Publié récemment";
}

/**
 * Normalise la réponse API : gère data.data, data.offre, data directement
 */
function extractOffre(response) {
  const payload = response?.data;
  if (!payload) return null;
  // Cas 1 : { data: { ... } }
  if (payload.data && typeof payload.data === "object" && !Array.isArray(payload.data)) {
    return payload.data;
  }
  // Cas 2 : { offre: { ... } }
  if (payload.offre) return payload.offre;
  // Cas 3 : l'objet racine est déjà l'offre (a un _id)
  if (payload._id) return payload;
  return null;
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useCandidateAuth();

  const [offre, setOffre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [showPostulerModal, setShowPostulerModal] = useState(false);

  function handlePostuler() {
    if (!isAuthenticated) {
      sessionStorage.setItem("redirectAfterAuth", `/offres/${id}`);
      navigate(`/candidat/login?redirect=/offres/${id}`);
      return;
    }
    setShowPostulerModal(true);
  }

  useEffect(() => {
    if (!id) {
      setError("Identifiant d'offre manquant.");
      setLoading(false);
      return;
    }

    const fetchOffre = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getOffreById(id);
        const data = extractOffre(response);
        if (!data) throw new Error("Format de réponse inattendu.");
        setOffre(data);
      } catch (err) {
        console.error("[JobDetail] Erreur chargement offre :", err);
        setError(
          err?.response?.data?.message ||
            "Impossible de charger cette offre. Veuillez réessayer."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOffre();
  }, [id]);

  // ── Données affichées (avec fallbacks si le backend renvoie des champs différents) ──
  const titre = offre?.poste || offre?.titre || offre?.title || "Offre d'emploi";
  const entrepriseNom =
    offre?.entreprise?.nom ||
    offre?.entreprise?.name ||
    offre?.nomEntreprise ||
    "Entreprise";
  const localisation = offre?.localisation || offre?.location || "Non précisé";
  const typeContrat = offre?.typeContrat || offre?.contrat || offre?.type || "CDI";
  const salaire = offre?.salaire || offre?.salary || null;
  const description = offre?.description || offre?.about || null;
  const responsabilites = offre?.responsabilites || offre?.responsibilities || [];
  const competences =
    offre?.competences ||
    offre?.skills ||
    offre?.technologies ||
    [];
  const datePublication = offre?.createdAt || offre?.publishedAt || null;
  const recruteur = offre?.recruteur || offre?.recruiter || null;
  const logoEntreprise = offre?.entreprise?.logo || offre?.logoEntreprise || null;
  const tailleEntreprise = offre?.entreprise?.taille || offre?.tailleEntreprise || null;
  const secteur = offre?.entreprise?.secteur || offre?.secteur || null;
  const rawStatus = String(offre?.statut || offre?.status || "").toLowerCase();
  const isStatusClosed = rawStatus === "closed" || rawStatus === "fermee" || rawStatus === "fermée";
  const isDatePassed = offre?.dateLimite && new Date(offre.dateLimite).getTime() < Date.now();
  const isClosed = isStatusClosed || isDatePassed;

  const isRemote =
    offre?.remote ||
    offre?.teletravail ||
    localisation?.toLowerCase().includes("remote") ||
    localisation?.toLowerCase().includes("télétravail");

  // ── Rendu ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#f5f7f7] font-['Plus_Jakarta_Sans'] flex flex-col">
      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <Navbar />

      {/* ── Contenu principal ── */}
      <main className="flex-1 pt-20 pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <JobDetailSkeleton />
              </div>
            </div>
          ) : error ? (
            <ErrorState message={error} onBack={() => navigate("/offres")} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start lg:min-h-[calc(100vh-140px)]">
            {/* ────────── Colonne gauche : détails de l'offre ────────── */}
            <div className="lg:col-span-8 space-y-6">
              {/* En-tête de l'offre */}
              <section className="bg-white rounded-2xl p-6 shadow-[0_20px_40px_rgba(15,23,42,0.04)]">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-5">
                  <div>
                    <span className="text-xs font-bold text-[#006478] tracking-widest uppercase mb-2 block font-['Epilogue']">
                      {entrepriseNom} · Recrutement
                    </span>
                    <h1 className="font-['Epilogue'] text-2xl md:text-3xl font-extrabold text-[#2c2f30] tracking-tight mb-4">
                      {titre}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                      <OffreBadge icon="work" label={typeContrat} variant="default" />
                      {isRemote && (
                        <OffreBadge icon="language" label="Remote" variant="secondary" />
                      )}
                      <OffreBadge icon="location_on" label={localisation} variant="muted" />
                    </div>
                  </div>
                  {datePublication && (
                    <p className="text-[#595c5c] text-sm font-medium whitespace-nowrap">
                      {formatPublishedDate(datePublication)}
                    </p>
                  )}
                </div>

                {/* Fourchette salariale */}
                {salaire && (
                  <div className="mt-6 bg-[#eff1f1] rounded-xl p-5 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#3ddaff]/30 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#006478]">
                        payments
                      </span>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[#595c5c] uppercase tracking-wider mb-0.5">
                        Fourchette Salariale
                      </p>
                      <p className="text-xl font-black text-[#2c2f30] font-['Epilogue']">
                        {salaire}
                      </p>
                    </div>
                  </div>
                )}
              </section>

              {/* Corps de l'offre */}
              <section className="bg-white rounded-2xl p-6 shadow-[0_20px_40px_rgba(15,23,42,0.04)] space-y-8">
                {/* À propos de la mission */}
                {description && (
                  <article>
                    <h2 className="font-['Epilogue'] text-xl font-bold text-[#2c2f30] mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-[#006478] rounded-full inline-block" />
                      À propos de la mission
                    </h2>
                    <div className="space-y-3 text-[#595c5c] leading-relaxed">
                      {typeof description === "string" ? (
                        description.split("\n").map((para, i) =>
                          para.trim() ? <p key={i}>{para}</p> : null
                        )
                      ) : (
                        <p>{String(description)}</p>
                      )}
                    </div>
                  </article>
                )}

                {/* Responsabilités */}
                {responsabilites.length > 0 && (
                  <article>
                    <h2 className="font-['Epilogue'] text-xl font-bold text-[#2c2f30] mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-[#006478] rounded-full inline-block" />
                      Vos Responsabilités
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {responsabilites.map((item, i) => {
                        const text = typeof item === "string" ? item : item.texte || item.text;
                        return (
                          <li
                            key={i}
                            className="flex gap-3 p-4 bg-[#f5f7f7] rounded-xl border border-[#abadae]/15 items-start"
                          >
                            <span className="material-symbols-outlined text-[#006478] text-xl mt-0.5 flex-shrink-0">
                              check_circle
                            </span>
                            <span className="text-sm font-medium text-[#2c2f30] leading-relaxed">
                              {text}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                )}

                {/* Compétences requises */}
                {competences.length > 0 && (
                  <article>
                    <h2 className="font-['Epilogue'] text-xl font-bold text-[#2c2f30] mb-4 flex items-center gap-2">
                      <span className="w-1 h-6 bg-[#006478] rounded-full inline-block" />
                      Compétences Requises
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {competences.map((skill, i) => (
                        <SkillTag key={i} label={typeof skill === "string" ? skill : skill.nom || skill.name || String(skill)} />
                      ))}
                    </div>
                  </article>
                )}

                
              </section>
            </div>

            {/* ────────── Colonne droite : sidebar ────────── */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
              {/* Carte entreprise */}
              <section className="bg-white rounded-2xl p-6 shadow-[0_20px_40px_rgba(15,23,42,0.04)] text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3ddaff] to-[#006478] rounded-3xl rotate-6 opacity-20" />
                  {logoEntreprise ? (
                    <img
                      src={logoEntreprise}
                      alt={`Logo ${entrepriseNom}`}
                      className="relative w-full h-full object-cover rounded-3xl shadow-sm border-2 border-white"
                    />
                  ) : (
                    <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-[#3ddaff]/30 to-[#006478]/30 flex items-center justify-center border-2 border-white shadow-sm">
                      <span className="text-3xl font-black text-[#006478] font-['Epilogue']">
                        {entrepriseNom.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="font-['Epilogue'] text-2xl font-black text-[#2c2f30] mb-2">
                  {entrepriseNom}
                </h3>
                {secteur && (
                  <p className="text-[#595c5c] text-sm mb-6">{secteur}</p>
                )}

                <div className="space-y-3 mb-6">
                  {isClosed ? (
                    <div className="space-y-2">
                      <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-100 py-3 text-sm font-bold text-gray-500">
                        <span className="material-symbols-outlined text-sm">lock</span>
                        Offre fermée
                      </span>
                      <button
                        disabled
                        className="w-full py-4 bg-gray-300 text-gray-500 font-bold rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        Postuler maintenant
                        <span className="material-symbols-outlined text-sm">send</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handlePostuler}
                      className="w-full py-4 bg-gradient-to-r from-[#3ddaff] to-[#006478] text-white font-bold rounded-xl shadow-lg shadow-[#006478]/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      Postuler maintenant
                      <span className="material-symbols-outlined text-sm">send</span>
                    </button>
                  )}
                  <button
                    onClick={() => setSaved((s) => !s)}
                    className={`w-full py-4 border-2 font-bold rounded-xl transition-colors flex items-center justify-center gap-2 ${
                      saved
                        ? "border-[#006478] bg-[#006478]/5 text-[#006478]"
                        : "border-[#dfe3e3] bg-transparent text-[#2c2f30] hover:bg-[#eff1f1]"
                    }`}
                  >
                    {saved ? "Sauvegardé" : "Sauvegarder"}
                    <span className="material-symbols-outlined text-sm">
                      {saved ? "bookmark_added" : "bookmark"}
                    </span>
                  </button>
                </div>

                {(tailleEntreprise || secteur) && (
                  <div className="mt-4 pt-4 border-t border-[#e5e9e9] grid grid-cols-2 gap-4 text-left">
                    {tailleEntreprise && (
                      <div>
                        <p className="text-[10px] font-black uppercase text-[#595c5c] tracking-widest mb-1">
                          Taille
                        </p>
                        <p className="text-sm font-bold text-[#2c2f30]">{tailleEntreprise}</p>
                      </div>
                    )}
                    {secteur && (
                      <div>
                        <p className="text-[10px] font-black uppercase text-[#595c5c] tracking-widest mb-1">
                          Secteur
                        </p>
                        <p className="text-sm font-bold text-[#2c2f30]">{secteur}</p>
                      </div>
                    )}
                  </div>
                )}
              </section>

              {/* Carte recruteur (si disponible) */}
              {recruteur && (
                <section className="bg-[#eff1f1] rounded-2xl p-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#595c5c] mb-4">
                    Besoin d'aide ?
                  </h4>
                  <div className="flex items-center gap-4">
                    {recruteur.avatar ? (
                      <img
                        src={recruteur.avatar}
                        alt={recruteur.nom || recruteur.name || "Recruteur"}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#006478]/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#006478]">
                          person
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-[#2c2f30]">
                        {recruteur.nom || recruteur.name || "Recruteur"}
                      </p>
                      <p className="text-xs text-[#595c5c] font-medium">
                        {recruteur.poste || recruteur.role || "Responsable Recrutement"}
                      </p>
                    </div>
                  </div>
                  {recruteur.email && (
                    <a
                      href={`mailto:${recruteur.email}`}
                      className="mt-4 w-full text-xs font-bold text-[#006478] flex items-center justify-center gap-1 hover:underline"
                    >
                      Contacter{" "}
                      {recruteur.prenom || recruteur.nom?.split(" ")[0] || "le recruteur"}
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                  )}
                </section>
              )}

              {/* Retour aux offres */}
              <button
                onClick={() => navigate("/offres")}
                className="w-full py-3 flex items-center justify-center gap-2 text-sm font-semibold text-[#595c5c] hover:text-[#006478] transition-colors"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Toutes les offres
              </button>
            </aside>
            </div>
          )}
        </div>
      </main>

      {showPostulerModal && (
        <PostulerModal
          offreId={id}
          offreTitre={titre}
          onClose={() => setShowPostulerModal(false)}
          onSuccess={() => {
            setShowPostulerModal(false);
          }}
        />
      )}
    </div>
  );
}