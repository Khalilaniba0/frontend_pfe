// Lignes : 116 | Couche : hook | Depend de : restApiOffres
import { useCallback, useEffect, useState } from "react";

import {
  createOffre,
  deleteOffre,
  getOffreByEntreprise,
  toggleOffreStatus,
  updateOffre,
} from "../service/restApiOffresEntreprise";

function extractArray(payload) {
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  return [];
}

function getErrorMessage(error, fallback) {
  return error?.response?.data?.message || error?.message || fallback;
}

function isOpenStatus(value) {
  var rawStatus = String(value || "")
    .trim()
    .toLowerCase();

  return ["open", "ouverte", "ouvert", "actif", "active", "en cours"].includes(rawStatus);
}

function getToggledStatus(value) {
  return isOpenStatus(value) ? "closed" : "open";
}

function applyStatusToggleToJob(job) {
  var nextStatus = getToggledStatus(job?.statut || job?.status);

  return {
    ...job,
    statut: nextStatus,
    status: nextStatus,
  };
}

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async function fetchJobs(options = {}) {
    const silent = options?.silent === true;

    if (!silent) {
      setLoading(true);
    }
    setError(null);

    try {
      const response = await getOffreByEntreprise();
      setJobs(extractArray(response));
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
    fetchJobs();
  }, [fetchJobs]);

  const createJob = useCallback(async function createJob(payload) {
    setLoading(true);
    setError(null);
    try {
      const response = await createOffre(payload);
      await fetchJobs({ silent: true });
      return response;
    } catch (requestError) {
      const message = getErrorMessage(requestError, "Impossible de creer cette offre.");
      setError(message);
      throw requestError;
    } finally {
      setLoading(false);
    }
  }, [fetchJobs]);

  const updateJob = useCallback(async function updateJob(id, payload) {
    setLoading(true);
    setError(null);
    try {
      const response = await updateOffre(id, payload);
      await fetchJobs({ silent: true });
      return response;
    } catch (requestError) {
      const message = getErrorMessage(requestError, "Impossible de modifier cette offre.");
      setError(message);
      throw requestError;
    } finally {
      setLoading(false);
    }
  }, [fetchJobs]);

  const removeJob = useCallback(async function removeJob(id) {
    var previousJobs = null;

    setJobs(function (currentJobs) {
      previousJobs = currentJobs;
      return currentJobs.filter(function (job) {
        var jobId = job?._id || job?.id;
        return jobId !== id;
      });
    });

    try {
      const response = await deleteOffre(id);
      return response;
    } catch (requestError) {
      if (Array.isArray(previousJobs)) {
        setJobs(previousJobs);
      }

      throw requestError;
    }
  }, []);

  const toggleStatus = useCallback(async function toggleStatus(id) {
    var previousJobs = null;

    setJobs(function (currentJobs) {
      previousJobs = currentJobs;
      return currentJobs.map(function (job) {
        var jobId = job?._id || job?.id;
        if (jobId !== id) {
          return job;
        }
        return applyStatusToggleToJob(job);
      });
    });

    try {
      const response = await toggleOffreStatus(id);
      return response;
    } catch (requestError) {
      if (Array.isArray(previousJobs)) {
        setJobs(previousJobs);
      }

      throw requestError;
    }
  }, []);

  return {
    jobs,
    loading,
    error,
    refetch: fetchJobs,
    createJob,
    updateJob,
    removeJob,
    toggleStatus,
  };
}
