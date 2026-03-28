import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getAllOffresRH() {
  return await axios.get(`${API_URL}/offre/getAllOffres`, { withCredentials: true });
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
