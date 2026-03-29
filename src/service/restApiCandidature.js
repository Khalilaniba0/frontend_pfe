import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  process.env.VITE_API_URL ||
  "http://localhost:5000";

export async function postuler(formData) {
  return await axios.post(`${API_URL}/condidature/postuler`, formData, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export async function getMesCandidatures() {
  return await axios.get(`${API_URL}/condidature/mesCandidatures`, {
    withCredentials: true,
  });
}

export async function annulerCandidature(id) {
  return await axios.delete(`${API_URL}/condidature/annuler/${id}`, {
    withCredentials: true,
  });
}
