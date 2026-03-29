import React, { useState, useEffect } from "react";
import { getRecentCandidatures } from "service/restApiDashboard";

function getEtapeConfig(etape) {
  switch (etape) {
    case "soumise":
      return {
        text: "Candidature soumise",
        icon: "fas fa-user-plus",
        iconBg: "bg-indigo-50",
        iconColor: "text-indigo-500",
      };
    case "preselectionne":
      return {
        text: "Présélectionné(e)",
        icon: "fas fa-check-circle",
        iconBg: "bg-secondary-light",
        iconColor: "text-secondary",
      };
    case "entretien_planifie":
      return {
        text: "Entretien planifié",
        icon: "fas fa-calendar-check",
        iconBg: "bg-orange-50",
        iconColor: "text-orange-500",
      };
    case "entretien_passe":
      return {
        text: "Entretien passé",
        icon: "fas fa-check-circle",
        iconBg: "bg-primary-light",
        iconColor: "text-primary",
      };
    case "accepte":
      return {
        text: "Candidature acceptée",
        icon: "fas fa-plus-circle",
        iconBg: "bg-secondary-light",
        iconColor: "text-secondary",
      };
    case "refuse":
      return {
        text: "Candidature refusée",
        icon: "fas fa-times-circle",
        iconBg: "bg-red-50",
        iconColor: "text-red-500",
      };
    default:
      return {
        text: "Mise à jour",
        icon: "fas fa-info-circle",
        iconBg: "bg-gray-50",
        iconColor: "text-gray-500",
      };
  }
}

function timeAgo(dateStr) {
  if (!dateStr) return "";
  var now = new Date();
  var date = new Date(dateStr);
  var diff = Math.floor((now - date) / 1000);

  if (diff < 60) return "Il y a quelques secondes";
  if (diff < 3600) return "Il y a " + Math.floor(diff / 60) + " min";
  if (diff < 86400) return "Il y a " + Math.floor(diff / 3600) + "h";
  if (diff < 604800) return "Il y a " + Math.floor(diff / 86400) + " jour(s)";
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    var cancelled = false;

    async function fetchData() {
      try {
        const items = await getRecentCandidatures();
        if (!cancelled) {
          setActivities(
            items.map(function (c) {
              var config = getEtapeConfig(c.etape);
              var person = c.nom || c.candidat?.nom || c.email || "Candidat";
              var offrePoste = c.offre?.poste || "";
              return {
                text: config.text + (offrePoste ? " pour " + offrePoste : ""),
                person: person,
                time: timeAgo(c.createdAt),
                icon: config.icon,
                iconBg: config.iconBg,
                iconColor: config.iconColor,
              };
            })
          );
        }
      } catch (err) {
        console.error("Erreur activité récente:", err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return function () {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-sm">
      <header className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold tracking-tight text-text-primary">
          Activité récente
        </h3>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 font-body text-xs font-semibold text-primary">
          {activities.length}
        </span>
      </header>

      <div className="relative flex flex-1 flex-col">
        <div className="absolute bottom-4 left-4 top-4 w-px bg-border"></div>

        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="font-body text-sm text-text-muted">Chargement...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <p className="font-body text-sm text-text-muted">
              Aucune activité récente
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {activities.map(function (item, index) {
              return (
                <li
                  key={index}
                  className="group relative flex cursor-default items-start gap-3 rounded-lg p-1 pl-0 transition-colors duration-150 hover:bg-bg-soft"
                >
                  <div
                    className={
                      "relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg transition-transform duration-150 group-hover:scale-105 " +
                      item.iconBg +
                      " " +
                      item.iconColor
                    }
                  >
                    <i className={item.icon + " text-xs"}></i>
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <p className="font-body text-sm leading-snug text-text-secondary">
                      <span className="font-semibold text-text-primary">
                        {item.person}
                      </span>{" "}
                      {item.text}
                    </p>
                    <p className="mt-1 font-body text-xs text-text-muted">
                      {item.time}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <footer className="mt-4 border-t border-border pt-4">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg py-2 font-body text-sm font-medium text-primary transition-colors duration-150 hover:bg-primary-light"
        >
          Voir toute l'activité
          <i className="fas fa-arrow-right text-xs"></i>
        </button>
      </footer>
    </div>
  );
}
