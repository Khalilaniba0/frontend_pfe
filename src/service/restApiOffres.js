import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

function readCookie(name) {
  const escapedName = name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${escapedName}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function getCandidateJwtToken() {
  return readCookie("jwt_candidat");
}


export async function getOffreById(id) {
  const token = getCandidateJwtToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return await axios.get(`${API_URL}/offre/getOffreById/${id}`, {
    withCredentials: true,
    headers,
  });
}
export async function getOffreByEntreprise(entrepriseId) {
  if (entrepriseId) {
    return await axios.get(`${API_URL}/offre/getOffresByEntreprise/${entrepriseId}`, {
      withCredentials: true,
    });
  }

  return await axios.get(`${API_URL}/offre/getOffresByEntreprise`, { withCredentials: true });
}

export async function createOffre(payload) {
  return await axios.post(`${API_URL}/offre/createOffre`, payload, { withCredentials: true });
}

export async function updateOffre(id, payload) {
  return await axios.put(`${API_URL}/offre/updateOffre/${id}`, payload, { withCredentials: true });
}

export async function toggleOffreStatus(id) {
  return await axios.put(`${API_URL}/offre/updateOffreStatus/${id}`, {}, { withCredentials: true });
}

export async function deleteOffre(id) {
  return await axios.delete(`${API_URL}/offre/deleteOffreById/${id}`, { withCredentials: true });
}
