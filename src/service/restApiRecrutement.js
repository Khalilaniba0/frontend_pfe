import axios from "axios";
import { API_URL } from "config/api";

function getRhToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem("token");
}

function getRhAuthConfig() {
  const token = getRhToken();

  return {
    withCredentials: true,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  };
}

function extractArrayOrThrow(res, endpoint) {
  const payload = res?.data;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  throw new Error(`Format de reponse invalide pour ${endpoint}`);
}

export async function getPipelineCandidatures() {
  const res = await axios.get(
    `${API_URL}/candidature/getAllCandidatures`,
    getRhAuthConfig()
  );
  return extractArrayOrThrow(res, "/candidature/getAllCandidatures");
}

export async function updateCandidatureEtape(id, etape, extra = {}) {
  return await axios.put(
    `${API_URL}/candidature/updateCandidatureEtape/${id}`,
    { etape, ...extra },
    getRhAuthConfig()
  );
}

export async function refuserCandidature(id) {
  return await axios.put(
    `${API_URL}/candidature/refuserCandidature/${id}`,
    {},
    getRhAuthConfig()
  );
}

export async function deleteCandidature(id) {
  const response = await axios.delete(
    `${API_URL}/candidature/deleteCandidatureById/${id}`,
    getRhAuthConfig()
  );
  return response.data;
}

export async function getOffresEntreprise() {
  const res = await axios.get(`${API_URL}/offre/getOffresByEntreprise`, getRhAuthConfig());
  return extractArrayOrThrow(res, "/offre/getOffresByEntreprise");
}
