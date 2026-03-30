import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import JobStatCard from "components/Jobs/JobStatCard";
import JobsTable from "components/Jobs/JobsTable";

import CreateJobModal from "components/Jobs/CreateJobModal";
import {
  deleteOffre,
  getOffreByEntreprise,
  toggleOffreStatus,
} from "service/restApiOffres";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";


const SOURCE_COLORS = ["bg-primary", "bg-secondary", "bg-primary/40", "bg-secondary/40"];

function getOffreStatus(offre) {
  const rawStatus = String(offre?.statut || offre?.status || "")
    .trim()
    .toLowerCase();

  if (["open", "ouverte", "ouvert", "actif", "active", "en cours"].includes(rawStatus)) {
    return "open";
  }

  if (["paused", "pause", "en pause"].includes(rawStatus)) {
    return "paused";
  }

  return "closed";
}

function getOffreTitle(offre) {
  return offre?.poste || offre?.post || "Poste sans titre";
}

function getCandidateCount(offre) {
  const count = Number(
    offre?.candidaturesCount ?? offre?.nombreCandidatures ?? offre?.candidatsCount ?? offre?.candidatures?.length ?? 0
  );

  return Number.isFinite(count) && count >= 0 ? count : 0;
}

function getDisplayStatus(status) {
  if (status === "open") {
    return "Ouverte";
  }
  if (status === "closed") {
    return "Fermée";
  }
  return "En pause";
}

function formatDate(value) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const [totalCandidatsReels, setTotalCandidatsReels] = useState(0);

  const chargerOffres = useCallback(async function () {
    setLoading(true);
    setError(null);
    try {
      const [offresRes, candidaturesRes] = await Promise.all([
        getOffreByEntreprise(),
        axios.get(`${API_URL}/candidature/getAllCandidatures`, { withCredentials: true }).catch(function () { return { data: [] }; }),
      ]);
      const data = offresRes?.data?.data || offresRes?.data || [];
      setOffres(Array.isArray(data) ? data : []);

      const cands = Array.isArray(candidaturesRes?.data?.data)
        ? candidaturesRes.data.data
        : Array.isArray(candidaturesRes?.data)
          ? candidaturesRes.data
          : [];
      setTotalCandidatsReels(cands.length);
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors du chargement des offres");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(
    function () {
      chargerOffres();
    },
    [chargerOffres]
  );

  useEffect(
    function () {
      if (toast) {
        const timer = setTimeout(function () {
          setToast(null);
        }, 4000);
        return function () {
          clearTimeout(timer);
        };
      }
    },
    [toast]
  );

  const handleCreateSuccess = useCallback(
    function (createdOffre) {
      const title = getOffreTitle(createdOffre);
      setToast(title);
      setShowCreateModal(false);
      chargerOffres();
    },
    [chargerOffres]
  );

  const handleToggleStatus = async function (id) {
    try {
      await toggleOffreStatus(id);
      setOffres(function (prev) {
        return prev.map(function (o) {
          if (o._id !== id) {
            return o;
          }

          const currentStatus = getOffreStatus(o);
          const nextStatus = currentStatus === "open" ? "closed" : "open";

          return { ...o, statut: nextStatus, status: nextStatus };
        });
      });
    } catch (err) {
      console.error("Erreur toggle statut:", err.response?.data || err.message);
    }
  };

  const handleDelete = async function (id) {
    if (!window.confirm("Supprimer cette offre ?")) {
      return;
    }

    try {
      await deleteOffre(id);
      setOffres(function (prev) {
        return prev.filter(function (o) {
          return o._id !== id;
        });
      });
    } catch (err) {
      console.error("Erreur suppression:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Erreur lors de la suppression");
    }
  };

  const filteredOffres = offres.filter(function (o) {
    const title = getOffreTitle(o);
    const department = o?.departement || "";
    const location = o?.localisation || "";
    const query = search.toLowerCase();

    return (
      title.toLowerCase().includes(query) ||
      department.toLowerCase().includes(query) ||
      location.toLowerCase().includes(query)
    );
  });

  const jobs = filteredOffres.map(function (offre) {
    const candidateCount = getCandidateCount(offre);

    return {
      _id: offre?._id,
      title: getOffreTitle(offre),
      department: offre?.departement || "-",
      location: offre?.localisation || "-",
      status: getDisplayStatus(getOffreStatus(offre)),
      candidates: {
        avatars: [],
        extra: candidateCount,
      },
      createdDate: formatDate(offre?.createdAt),
      deadlineDate: formatDate(offre?.dateLimite),
      onToggleStatus: handleToggleStatus,
      onDelete: handleDelete,
    };
  });

  const totalOffres = offres.length;
  const offresActives = offres.filter(function (o) {
    return getOffreStatus(o) === "open";
  }).length;
  const totalCandidats = totalCandidatsReels || offres.reduce(function (sum, o) {
    return sum + getCandidateCount(o);
  }, 0);

  const stats = [
    {
      icon: "work_history",
      label: "Total d'offres",
      value: totalOffres,
      badge: null,
      badgeLabel: "",
      iconBg: "bg-primary-light",
      iconColor: "text-primary",
      trend: "neutral",
    },
    {
      icon: "rocket_launch",
      label: "Offres actives",
      value: offresActives,
      badge: String(offresActives),
      badgeLabel: "en cours",
      iconBg: "bg-secondary-light",
      iconColor: "text-secondary",
      trend: "neutral",
    },
    {
      icon: "person_search",
      label: "Candidatures reçues",
      value: totalCandidats.toLocaleString("fr-FR"),
      badge: null,
      badgeLabel: "",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      trend: "neutral",
    },
  ];

  const sources = useMemo(function () {
    if (!offres.length) {
      return [{ label: "Aucune donnée", percent: 100, color: "bg-primary/20" }];
    }

    const byDepartment = offres.reduce(function (acc, offre) {
      const key = offre?.departement || "Non défini";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const entries = Object.entries(byDepartment).sort(function (a, b) {
      return b[1] - a[1];
    });

    const total = entries.reduce(function (sum, entry) {
      return sum + entry[1];
    }, 0);

    return entries.slice(0, 4).map(function (entry, index) {
      return {
        label: entry[0],
        percent: Math.max(1, Math.round((entry[1] / total) * 100)),
        color: SOURCE_COLORS[index % SOURCE_COLORS.length],
      };
    });
  }, [offres]);

  const recrutementStats = useMemo(function () {
    const durations = offres
      .map(function (offre) {
        const createdAt = new Date(offre?.createdAt);
        const dateLimite = new Date(offre?.dateLimite);

        if (Number.isNaN(createdAt.getTime()) || Number.isNaN(dateLimite.getTime())) {
          return null;
        }

        const diffDays = Math.ceil((dateLimite.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : null;
      })
      .filter(function (value) {
        return value !== null;
      });

    if (!durations.length) {
      return { days: 22, improvement: 5 };
    }

    const average = Math.max(
      1,
      Math.round(
        durations.reduce(function (sum, value) {
          return sum + value;
        }, 0) / durations.length
      )
    );

    return {
      days: average,
      improvement: Math.max(0, Math.round(average * 0.1)),
    };
  }, [offres]);

  return (
    <div className="animate-fade-in space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-xl font-bold tracking-tight text-text-primary md:text-3xl lg:text-4xl">
            Gestion des Offres
          </h1>
          <p className="mt-1 font-body text-sm text-text-secondary">
            Visualisez et gérez vos{" "}
            <span className="font-semibold tabular-nums text-primary">{totalOffres}</span>{" "}
            recrutements actifs
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 font-body text-sm font-medium text-text-primary shadow-sm transition-all duration-150 hover:border-primary/30 hover:shadow-md"
          >
            <span className="material-symbols-outlined text-lg text-text-muted">
              download
            </span>
            Exporter
          </button>
          <button
            type="button"
            onClick={function () {
              setShowCreateModal(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 font-body text-sm font-semibold text-white shadow-md shadow-primary/20 transition-all duration-150 hover:bg-primary-dark hover:shadow-lg"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Créer une offre
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {stats.map(function (stat) {
          return <JobStatCard key={stat.label} {...stat} />;
        })}
      </section>

      <div className="relative max-w-md">
        <span className="material-symbols-outlined pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-xl text-text-muted">
          search
        </span>
        <input
          type="text"
          value={search}
          onChange={function (e) {
            setSearch(e.target.value);
          }}
          placeholder="Rechercher par titre, département ou localisation..."
          className="w-full rounded-xl border border-border bg-white py-2.5 pl-11 pr-4 font-body text-sm text-text-primary shadow-sm transition-all duration-150 placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {loading ? (
        <section className="overflow-hidden rounded-2xl border border-border bg-white px-6 py-12 text-center shadow-sm">
          <p className="font-body text-sm text-text-secondary">Chargement...</p>
        </section>
      ) : error ? (
        <section className="overflow-hidden rounded-2xl border border-border bg-white px-6 py-12 text-center shadow-sm">
          <p className="font-body text-sm text-red-500">{error}</p>
        </section>
      ) : offres.length === 0 ? (
        <section className="overflow-hidden rounded-2xl border border-border bg-white px-6 py-12 text-center shadow-sm">
          <p className="font-body text-sm text-text-secondary">Aucune offre disponible</p>
        </section>
      ) : (
        <JobsTable jobs={jobs} total={jobs.length} />
      )}

      

      {showCreateModal && (
        <CreateJobModal
          onClose={function () {
            setShowCreateModal(false);
          }}
          onSuccess={handleCreateSuccess}
        />
      )}

      {toast && (
        <div className="fixed left-4 right-4 top-4 z-[9999] flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 shadow-lg sm:left-auto sm:right-6 sm:top-6 sm:max-w-md">
          <span className="material-symbols-outlined text-success">
            check_circle
          </span>
          <div className="min-w-0">
            <p className="font-display text-sm font-semibold text-text-primary">
              Offre publiée avec succès
            </p>
            <p className="break-words text-xs text-text-secondary">
              "{toast}" a été ajoutée à vos offres actives.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
