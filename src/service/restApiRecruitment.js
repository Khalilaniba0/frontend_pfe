import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

function safeArray(res) {
  const d = res?.data;
  if (Array.isArray(d?.data)) return d.data;
  if (Array.isArray(d)) return d;
  return [];
}

export async function getPipelineCandidatures() {
  const res = await axios.get(`${API_URL}/condidature/getAllCandidatures`, {
    withCredentials: true,
  });
  return safeArray(res);
}

export async function updateCandidatureEtape(id, etape) {
  return await axios.put(
    `${API_URL}/condidature/updateCandidatureEtape/${id}`,
    { etape },
    { withCredentials: true }
  );
}

export async function getOffresEntreprise() {
  const res = await axios.get(`${API_URL}/offre/getOffresByEntreprise`, {
    withCredentials: true,
  });
  return safeArray(res);
}
