// Lignes : 82 | Couche : hook | Depend de : restApiRecruitment
import { useCallback, useEffect, useState } from "react";

import {
  getOffresEntreprise,
  getPipelineCandidatures,
  refuserCandidature,
  updateCandidatureEtape,
} from "../service/restApiRecrutement";

function extractArray(response) {
  const payload = response?.data;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  return [];
}

function getErrorMessage(error, fallback) {
  return error?.response?.data?.message || error?.message || fallback;
}

export function useRecruitment() {
  const [candidatures, setCandidatures] = useState([]);
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecruitment = useCallback(async function fetchRecruitment(options = {}) {
    const silent = options?.silent === true;

    if (!silent) {
      setLoading(true);
    }
    setError(null);

    try {
      const [pipelineResponse, offresResponse] = await Promise.all([
        getPipelineCandidatures(),
        getOffresEntreprise(),
      ]);

      const pipelineList = extractArray(pipelineResponse);
      const offresList = extractArray(offresResponse);

      setCandidatures(Array.isArray(pipelineList) ? pipelineList : []);
      setOffres(Array.isArray(offresList) ? offresList : []);
    } catch (requestError) {
      const message = getErrorMessage(requestError, "Impossible de charger le pipeline de recrutement.");
      setError(message);
      throw requestError;
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(function () {
    fetchRecruitment();
  }, [fetchRecruitment]);

  const moveCandidate = useCallback(async function moveCandidate(id, etape, extra) {
    setLoading(true);
    setError(null);
    try {
      const response = await updateCandidatureEtape(id, etape, extra);
      await fetchRecruitment({ silent: true });
      return response?.data;
    } catch (requestError) {
      const message = getErrorMessage(requestError, "Impossible de mettre a jour cette candidature.");
      setError(message);
      throw requestError;
    } finally {
      setLoading(false);
    }
  }, [fetchRecruitment]);

  const rejectCandidate = useCallback(async function rejectCandidate(id) {
    setLoading(true);
    setError(null);
    try {
      const response = await refuserCandidature(id);
      await fetchRecruitment({ silent: true });
      return response?.data;
    } catch (requestError) {
      const message = getErrorMessage(requestError, "Impossible de refuser cette candidature.");
      setError(message);
      throw requestError;
    } finally {
      setLoading(false);
    }
  }, [fetchRecruitment]);

  return {
    candidatures,
    offres,
    loading,
    error,
    refetch: fetchRecruitment,
    moveCandidate,
    rejectCandidate,
  };
}
