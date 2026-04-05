import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ROUTES } from "constants/routes";
import Navbar from "components/miseEnPage/BarreNavigation.jsx";
import PostulerModal from "components/Candidat/PostulerModal";
import { useCandidateAuth } from "context/ContexteAuthCandidat";
import { getOffreById } from "service/restApiOffresEntreprise";
import { resolveEntrepriseMediaUrl } from "service/restApiEntreprise";

function formatPublishedDate(dateStr) {
  if (!dateStr) return null;
  var diff = Date.now() - new Date(dateStr).getTime();
  var days = Math.floor(diff / 86400000);
  var hours = Math.floor(diff / 3600000);
  if (days > 0) return "Publié il y a " + days + " jour" + (days > 1 ? "s" : "");
  if (hours > 0) return "Publié il y a " + hours + " heure" + (hours > 1 ? "s" : "");
  return "Publié récemment";
}

function formatDateFr(dateStr) {
  if (!dateStr) return null;
  var date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function extractOffre(response) {
  var payload = response?.data;
  if (!payload) return null;
  if (payload.data && typeof payload.data === "object" && !Array.isArray(payload.data)) {
    return payload.data;
  }
  if (payload.offre && typeof payload.offre === "object") {
    return payload.offre;
  }
  if (payload._id) {
    return payload;
  }
  return null;
}

function toStringList(value) {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value
      .map(function (item) {
        if (typeof item === "string") return item.trim();
        return (item?.texte || item?.text || item?.nom || item?.name || "").trim();
      })
      .filter(Boolean);
  }
  if (typeof value === "string") {
    var normalizedValue = value.trim();
    if (!normalizedValue) return [];
    if (normalizedValue.indexOf("\n") === -1 && normalizedValue.length > 300) {
      return [normalizedValue];
    }
    return value
      .split("\n")
      .map(function (line) {
        return line.trim();
      })
      .filter(Boolean);
  }
  return [];
}

function getCompanyInitials(companyName) {
  var normalizedName = typeof companyName === "string" ? companyName.trim() : "";

  if (!normalizedName) {
    return "EN";
  }

  var words = normalizedName.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  }

  return normalizedName.slice(0, 2).toUpperCase();
}

function JobHero(props) {
  var titre = props.titre;
  var typeContrat = props.typeContrat;
  var publishedLabel = props.publishedLabel;
  var entrepriseNom = props.entrepriseNom;
  var localisation = props.localisation;
  var salaire = props.salaire;
  var isClosed = props.isClosed;
  var onPostuler = props.onPostuler;
  var showBackButton = props.showBackButton;
  var onBack = props.onBack;

  return (
    <section
      className={
        "relative overflow-hidden bg-gradient-to-br from-[#00629f] to-[#3197e8] px-4 text-white md:px-8 " +
        (showBackButton ? "pt-3 pb-12 md:pt-4 md:pb-16" : "py-16 md:py-24")
      }
    >
      {showBackButton && (
        <div className="relative z-20 mx-auto mb-3 max-w-7xl">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/90 px-4 py-2 text-sm font-semibold text-[#0b5f9a] shadow-sm transition-all hover:bg-white"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Retour aux offres
          </button>
        </div>
      )}

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          {(typeContrat || publishedLabel) && (
            <div className="mb-6 flex items-center gap-3">
              {typeContrat && (
                <span className="rounded-sm bg-[#ffdea8] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#271900]">
                  {typeContrat}
                </span>
              )}
              {publishedLabel && (
                <span className="text-sm font-medium text-[#d0e4ff]">{publishedLabel}</span>
              )}
            </div>
          )}

          <h1 className="mb-4 text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-6xl">
            {titre}
          </h1>

          <div className="flex flex-wrap items-center gap-3 font-medium text-[#d0e4ff] sm:gap-6">
            {entrepriseNom && (
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">business</span>
                <span>{entrepriseNom}</span>
              </div>
            )}
            {localisation && (
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">location_on</span>
                <span>{localisation}</span>
              </div>
            )}
            {salaire && (
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">payments</span>
                <span>{salaire}</span>
              </div>
            )}
          </div>
        </div>

        <div className="shrink-0">
          <button
            type="button"
            disabled={isClosed}
            onClick={onPostuler}
            className={
              "rounded-full px-6 py-3 text-base font-extrabold shadow-xl transition-all active:scale-95 sm:px-10 sm:py-4 sm:text-lg " +
              (isClosed
                ? "cursor-not-allowed bg-slate-200 text-slate-500"
                : "bg-white text-[#00629f] hover:bg-[#f2f4f6]")
            }
          >
            {isClosed ? "Offre fermée" : "Postuler"}
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 opacity-10">
        <div className="h-full w-full translate-x-1/2 rotate-12 rounded-3xl bg-white" />
      </div>
    </section>
  );
}

function JobDetailsPanel(props) {
  var descriptionParagraphs = props.descriptionParagraphs;
  var responsibilities = props.responsibilities;

  return (
    <div className="min-w-0 overflow-hidden lg:col-span-8">
      <section>
        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-[#191c1e]">
          <span className="h-8 w-2 rounded-full bg-[#006973]" />
          Description du poste
        </h2>

        <div className="space-y-6 text-lg leading-relaxed text-[#404751] break-words overflow-wrap-anywhere">
          {descriptionParagraphs.length > 0 ? (
            descriptionParagraphs.map(function (paragraph, idx) {
              return (
                <p key={idx} className="break-words whitespace-pre-wrap">
                  {paragraph}
                </p>
              );
            })
          ) : (
            <p>Aucune description fournie par l'entreprise.</p>
          )}

          {responsibilities.length > 0 && (
            <ul className="space-y-4 pt-4">
              {responsibilities.map(function (line, idx) {
                return (
                  <li key={idx} className="flex gap-4">
                    <span className="material-symbols-outlined mt-1 text-[#006973]">
                      check_circle
                    </span>
                    <span>{line}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

function JobSkillsPanel(props) {
  var skills = props.skills;
  var additionalInfo = props.additionalInfo;

  return (
    <section className="rounded-[2rem] bg-[#f2f4f6] p-6">
      <h2 className="mb-6 text-xl font-bold text-[#191c1e]">Compétences requises</h2>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#00629f]">
            Technical Stack
          </h3>
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map(function (skill, idx) {
                return (
                  <span
                    key={idx}
                    className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#404751]"
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-[#404751]">Compétences non renseignées.</p>
          )}
        </div>
        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#00629f]">
            Informations clés
          </h3>
          {additionalInfo.length > 0 ? (
            <ul className="space-y-3 text-sm text-[#404751]">
              {additionalInfo.map(function (item) {
                return (
                  <li key={item.label} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#006973]" />
                    <span>
                      <strong>{item.label}:</strong> {item.value}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-[#404751]">Aucune information complémentaire fournie.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function JobSidebar(props) {
  var entrepriseNom = props.entrepriseNom;
  var logoEntreprise = props.logoEntreprise;
  var skills = props.skills;
  var additionalInfo = props.additionalInfo;
  var [logoLoadError, setLogoLoadError] = useState(false);

  useEffect(
    function () {
      setLogoLoadError(false);
    },
    [logoEntreprise]
  );

  var shouldShowLogo = Boolean(logoEntreprise) && !logoLoadError;

  return (
    <aside className="space-y-8 lg:col-span-4">
      <div className="rounded-[2rem] border border-transparent bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-[#f2f4f6]">
            {shouldShowLogo ? (
              <img
                src={logoEntreprise}
                alt={entrepriseNom}
                className="h-full w-full object-cover"
                onError={function () {
                  setLogoLoadError(true);
                }}
              />
            ) : (
              <span className="text-xl font-black text-[#00629f]">
                {getCompanyInitials(entrepriseNom)}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#191c1e]">{entrepriseNom}</h3>
          </div>
        </div>
      </div>

      <JobSkillsPanel
        skills={skills}
        additionalInfo={additionalInfo}
      />
    </aside>
  );
}

function LoadingState() {
  return (
    <div className="mx-auto mt-10 max-w-7xl animate-pulse px-8">
      <div className="mb-6 h-8 w-1/3 rounded bg-[#e0e3e5]" />
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8">
          <div className="h-40 rounded-[2rem] bg-[#eceef0]" />
          <div className="h-56 rounded-[2rem] bg-[#eceef0]" />
        </div>
        <div className="space-y-4 lg:col-span-4">
          <div className="h-72 rounded-[2rem] bg-[#eceef0]" />
          <div className="h-48 rounded-[2rem] bg-[#eceef0]" />
        </div>
      </div>
    </div>
  );
}

function ErrorState(props) {
  var message = props.message;
  var onBack = props.onBack;

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-6 py-28 text-center">
      <span className="material-symbols-outlined mb-4 text-6xl text-red-500">error</span>
      <h2 className="mb-2 text-2xl font-bold text-[#191c1e]">Offre introuvable</h2>
      <p className="mb-8 text-[#404751]">{message || "Impossible de charger cette offre."}</p>
      <button
        type="button"
        onClick={onBack}
        className="rounded-full bg-[#00629f] px-8 py-3 font-bold text-white transition-colors hover:bg-[#004a79]"
      >
        Retour aux offres
      </button>
    </div>
  );
}

export default function JobDetail(props) {
  var showNavbar = props.showNavbar !== false;
  var forceCandidateApply = Boolean(props.forceCandidateApply);
  var backToRoute = props.backToRoute || ROUTES.CANDIDATE.OFFRES;
  var params = useParams();
  var id = params.id;
  var navigate = useNavigate();
  var candidateAuth = useCandidateAuth();
  var isAuthenticated = candidateAuth.isAuthenticated;

  var [offre, setOffre] = useState(null);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState(null);
  var [showPostulerModal, setShowPostulerModal] = useState(false);

  useEffect(
    function () {
      if (!id) {
        setError("Identifiant d'offre manquant.");
        setLoading(false);
        return;
      }

      async function fetchOffre() {
        try {
          setLoading(true);
          setError(null);
          var response = await getOffreById(id);
          var data = extractOffre(response);
          if (!data) {
            throw new Error("Format de réponse inattendu.");
          }
          setOffre(data);
        } catch (err) {
          setError(
            err?.response?.data?.message ||
              "Impossible de charger cette offre. Veuillez réessayer."
          );
        } finally {
          setLoading(false);
        }
      }

      fetchOffre();
    },
    [id]
  );

  var titre = offre?.poste || offre?.titre || offre?.title || "Offre d'emploi";
  var entrepriseNom =
    offre?.entreprise?.nom ||
    offre?.entreprise?.name ||
    offre?.nomEntreprise ||
    "Entreprise non renseignée";
  var localisation = offre?.localisation || offre?.location || null;
  var typeContrat = offre?.typeContrat || offre?.contrat || offre?.type || null;
  var salaireDirect = offre?.salaire || offre?.salary || null;
  var salaireMin = offre?.salaireMin;
  var salaireMax = offre?.salaireMax;
  var salaire = salaireDirect;
  if (!salaire && (salaireMin || salaireMax)) {
    if (salaireMin && salaireMax) {
      salaire = salaireMin + "€ - " + salaireMax + "€";
    } else if (salaireMin) {
      salaire = "A partir de " + salaireMin + "€";
    } else {
      salaire = "Jusqu'à " + salaireMax + "€";
    }
  }
  var datePublication = offre?.createdAt || offre?.publishedAt || null;
  var publishedLabel = formatPublishedDate(datePublication);
  var rawStatus = String(offre?.statut || offre?.status || "").toLowerCase();
  var isStatusClosed = rawStatus === "closed" || rawStatus === "fermee" || rawStatus === "fermée";
  var isDatePassed =
    offre?.dateLimite && new Date(offre.dateLimite).getTime() < Date.now();
  var isClosed = isStatusClosed || isDatePassed;
  var modeContratRaw = offre?.modeContrat || null;
  var modeContrat =
    modeContratRaw === "presentiel"
      ? "Présentiel"
      : modeContratRaw === "hybride"
        ? "Hybride"
        : modeContratRaw === "remote"
          ? "Remote"
          : modeContratRaw;
  var departement = offre?.departement || null;
  var niveauExperience = offre?.niveauExperience || offre?.experience || null;
  var dateLimite = formatDateFr(offre?.dateLimite);

  var descriptionParagraphs = useMemo(
    function () {
      var baseDescription = offre?.description || offre?.about || "";
      var lines = toStringList(baseDescription);
      return lines;
    },
    [offre]
  );

  var responsibilities = useMemo(
    function () {
      return toStringList(offre?.responsabilites || offre?.responsibilities);
    },
    [offre]
  );

  var skills = useMemo(
    function () {
      return toStringList(offre?.competences || offre?.skills || offre?.technologies || offre?.requirements);
    },
    [offre]
  );

  var additionalInfo = useMemo(
    function () {
      var items = [];
      if (niveauExperience) {
        items.push({ label: "Niveau", value: String(niveauExperience) });
      }
      if (departement) {
        items.push({ label: "Département", value: String(departement) });
      }
      if (modeContrat) {
        items.push({ label: "Mode de travail", value: String(modeContrat) });
      }
      if (dateLimite) {
        items.push({ label: "Date limite", value: String(dateLimite) });
      }
      return items;
    },
    [niveauExperience, departement, modeContrat, dateLimite]
  );

  var logoEntreprise = resolveEntrepriseMediaUrl(
    offre?.entreprise?.logo || offre?.logoEntreprise || offre?.logo || ""
  );

  function handlePostuler() {
    if (isClosed) {
      return;
    }

    if (!forceCandidateApply && !isAuthenticated) {
      var redirectUrl = "/offres/" + id;
      sessionStorage.setItem("redirectAfterAuth", redirectUrl);
      navigate("/candidat/login?redirect=" + encodeURIComponent(redirectUrl));
      return;
    }

    setShowPostulerModal(true);
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e]">
      <link
        href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      {showNavbar ? <Navbar /> : null}

      <main className={"pb-20 font-['Manrope'] " + (showNavbar ? "pt-24" : "-mt-8 pt-0")}>
        {!loading && !error && showNavbar && (
          <div className="mx-auto max-w-7xl px-4 pt-4 pb-2 md:px-8">
            <button
              type="button"
              onClick={function () { navigate(backToRoute); }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-[#00629f] hover:text-[#00629f] hover:shadow-md"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Retour aux offres
            </button>
          </div>
        )}
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState
            message={error}
            onBack={function () {
              navigate(backToRoute);
            }}
          />
        ) : (
          <>
            <JobHero
              titre={titre}
              typeContrat={typeContrat}
              publishedLabel={publishedLabel}
              entrepriseNom={entrepriseNom}
              localisation={localisation}
              salaire={salaire}
              isClosed={isClosed}
              onPostuler={handlePostuler}
              showBackButton={!showNavbar}
              onBack={function () {
                navigate(backToRoute);
              }}
            />

            <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-6 px-4 md:mt-12 md:gap-8 md:px-8 lg:grid-cols-12">
              <JobDetailsPanel
                descriptionParagraphs={descriptionParagraphs}
                responsibilities={responsibilities}
              />
              <JobSidebar
                entrepriseNom={entrepriseNom}
                logoEntreprise={logoEntreprise}
                skills={skills}
                additionalInfo={additionalInfo}
              />
            </div>
          </>
        )}
      </main>

      {showPostulerModal && (
        <PostulerModal
          offreId={id}
          offreTitre={titre}
          onClose={function () {
            setShowPostulerModal(false);
          }}
          onSuccess={function () {
            setShowPostulerModal(false);
          }}
        />
      )}
    </div>
  );
}