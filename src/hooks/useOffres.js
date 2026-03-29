import { useCallback, useEffect, useMemo, useState } from "react";
import { getAllOffres } from "service/restApiJobs";

const DEFAULT_FILTERS = {
  searchTerm: "",
  locationTerm: "",
  contractTypes: [],
};

function normalizeOffresResponse(response) {
  const payload = response?.data;

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.offres)) {
    return payload.offres;
  }

  if (Array.isArray(payload)) {
    return payload;
  }

  return [];
}

function matchesFilters(offre, filters) {
  const poste = (offre?.poste || "").toLowerCase();
  const entrepriseNom = (offre?.entreprise?.nom || "").toLowerCase();
  const localisation = (offre?.localisation || "").toLowerCase();
  const typeContrat = (offre?.typeContrat || "").toLowerCase();

  const search = (filters.searchTerm || "").toLowerCase().trim();
  const location = (filters.locationTerm || "").toLowerCase().trim();

  const searchMatch =
    !search || poste.includes(search) || entrepriseNom.includes(search);
  const locationMatch = !location || localisation.includes(location);

  const contractMatch =
    !filters.contractTypes.length ||
    filters.contractTypes.some(function (type) {
      return typeContrat === String(type).toLowerCase();
    });

  return searchMatch && locationMatch && contractMatch;
}

export default function useOffres(initialFilters = {}) {
  const [offres, setOffres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  const refresh = useCallback(async function () {
    setIsLoading(true);
    setError("");

    try {
      const response = await getAllOffres();
      setOffres(normalizeOffresResponse(response));
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Impossible de charger les offres pour le moment."
      );
      setOffres([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(
    function () {
      refresh();
    },
    [refresh]
  );

  const filteredOffres = useMemo(
    function () {
      return offres.filter(function (offre) {
        return matchesFilters(offre, filters);
      });
    },
    [offres, filters]
  );

  return {
    offres,
    filteredOffres,
    isLoading,
    error,
    filters,
    setFilters,
    refresh,
  };
}
