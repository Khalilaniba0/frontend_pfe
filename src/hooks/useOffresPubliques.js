// Lignes : 67 | Couche : hook | Depend de : restApiJobs, restApiOffres
import { useCallback, useEffect, useState } from "react";

import { getAllOffres } from "../service/restApiOffresPubliques";
import { getOffreById } from "../service/restApiOffresEntreprise";

function isOffreDisponible(offre) {
  const rawStatus = String(offre?.statut || offre?.status || "")
    .trim()
    .toLowerCase();

  if (!rawStatus) {
    return true;
  }

  return ["open", "ouverte", "ouvert", "actif", "active", "en cours"].includes(rawStatus);
}

function normalizeOffre(offre) {
  return {
    ...offre,
    poste: offre?.poste || offre?.post || "",
  };
}

function extractArray(payload) {
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  return [];
}

function extractOffre(payload) {
  if (payload?.data?.data) return payload.data.data;
  if (payload?.data) return payload.data;
  return payload || null;
}

function getErrorMessage(error, fallback) {
  return error?.response?.data?.message || error?.message || fallback;
}

export function useOffres() {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOffres = useCallback(async function fetchOffres(options = {}) {
    const silent = options?.silent === true;

    if (!silent) {
      setLoading(true);
    }
    setError(null);

    try {
      const response = await getAllOffres();
      const mapped = extractArray(response)
        .filter(isOffreDisponible)
        .map(normalizeOffre);
      setOffres(mapped);
      return response;
    } catch (requestError) {
      const message = getErrorMessage(requestError, "Impossible de charger les offres.");
      setError(message);
      throw requestError;
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(function () {
    fetchOffres();
  }, [fetchOffres]);

  const fetchOffreById = useCallback(async function fetchOffreById(id) {
    if (!id) {
      return null;
    }

    setError(null);

    try {
      const response = await getOffreById(id);
      return extractOffre(response);
    } catch (requestError) {
      const message = getErrorMessage(requestError, "Impossible de charger le detail de cette offre.");
      setError(message);
      throw requestError;
    }
  }, []);

  return {
    offres,
    loading,
    error,
    refetch: fetchOffres,
    fetchOffreById,
  };
}
