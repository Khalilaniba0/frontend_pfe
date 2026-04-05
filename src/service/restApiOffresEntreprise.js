import axios from "axios";
import { API_URL } from "config/api";

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
      ...getRhAuthConfig(),
    });
  }

  return await axios.get(`${API_URL}/offre/getOffresByEntreprise`, getRhAuthConfig());
}

export async function createOffre(payload) {
  return await axios.post(`${API_URL}/offre/createOffre`, payload, getRhAuthConfig());
}

export async function updateOffre(id, payload) {
  return await axios.put(`${API_URL}/offre/updateOffre/${id}`, payload, getRhAuthConfig());
}

export async function toggleOffreStatus(id) {
  return await axios.put(`${API_URL}/offre/updateOffreStatus/${id}`, {}, getRhAuthConfig());
}

export async function deleteOffre(id) {
  return await axios.delete(`${API_URL}/offre/deleteOffreById/${id}`, getRhAuthConfig());
}
