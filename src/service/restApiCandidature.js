import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

export async function postuler(formData) {
  return await axios.post(`${API_URL}/candidature/postuler`, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function getMesCandidatures() {
  return await axios.get(`${API_URL}/candidature/mesCandidatures`, {
    withCredentials: true,
  });
}

export async function annulerCandidature(id) {
  return await axios.delete(`${API_URL}/candidature/annuler/${id}`, {
    withCredentials: true,
  });
}

export async function modifierCandidature(id, payload) {
  return await axios.put(`${API_URL}/candidature/modifier/${id}`, payload, {
    withCredentials: true,
  });
}

export async function getCandidatureById(id) {
  return await axios.get(`${API_URL}/candidature/getCandidatureById/${id}`, {
    withCredentials: true,
  });
}

export async function getCandidaturesByOffre(offreId) {
  return await axios.get(
    `${API_URL}/candidature/getCandidaturesByOffre/${offreId}`,
    {
      withCredentials: true,
    }
  );
}

export async function deleteCandidatureById(id) {
  return await axios.delete(`${API_URL}/candidature/deleteCandidatureById/${id}`, {
    withCredentials: true,
  });
}
