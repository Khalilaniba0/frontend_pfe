import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

function extractArrayOrThrow(res, endpoint) {
  const payload = res?.data;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  throw new Error(`Format de reponse invalide pour ${endpoint}`);
}

export async function getPipelineCandidatures() {
  const res = await axios.get(`${API_URL}/candidature/getAllCandidatures`, {
    withCredentials: true,
  });
  return extractArrayOrThrow(res, "/candidature/getAllCandidatures");
}

export async function updateCandidatureEtape(id, etape, extra = {}) {
  const response = await axios.put(
    `${API_URL}/candidature/updateCandidatureEtape/${id}`,
    { etape, ...extra },
    { withCredentials: true }
  );
  return response.data;
}

export async function refuserCandidature(id) {
  return await axios.put(
    `${API_URL}/candidature/refuserCandidature/${id}`,
    {},
    { withCredentials: true }
  );
}

export async function deleteCandidature(id) {
  const response = await axios.delete(
    `${API_URL}/candidature/deleteCandidatureById/${id}`,
    { withCredentials: true }
  );
  return response.data;
}

export async function getOffresEntreprise() {
  const res = await axios.get(`${API_URL}/offre/getOffresByEntreprise`, {
    withCredentials: true,
  });
  return extractArrayOrThrow(res, "/offre/getOffresByEntreprise");
}
