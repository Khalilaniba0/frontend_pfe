import axios from "axios";
import { API_URL } from "config/api";

function getCandidateToken() {
  try {
    return window.localStorage.getItem("candidatToken");
  } catch {
    return null;
  }
}

function withCandidateAuth(config) {
  const token = getCandidateToken();
  if (!token) {
    return config;
  }

  return {
    ...config,
    headers: {
      ...(config?.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function postuler(formData) {
  return await axios.post(
    `${API_URL}/candidature/postuler`,
    formData,
    withCandidateAuth({
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
    })
  );
}

export async function getMesCandidatures() {
  return await axios.get(
    `${API_URL}/candidature/mesCandidatures`,
    withCandidateAuth({
    withCredentials: true,
    })
  );
}

export async function annulerCandidature(id) {
  return await axios.delete(
    `${API_URL}/candidature/annuler/${id}`,
    withCandidateAuth({
    withCredentials: true,
    })
  );
}
