import axios from "axios";
import { API_URL } from "config/api";

export async function getDashboardOffres() {
  return await axios.get(`${API_URL}/offre/getOffresByEntreprise`, {
    withCredentials: true,
  });
}

export async function getDashboardCandidatures() {
  return await axios.get(`${API_URL}/candidature/getAllCandidatures`, {
    withCredentials: true,
  });
}

export async function getDashboardEntretiens() {
  return await axios.get(`${API_URL}/entretien/getAllEntretiens`, {
    withCredentials: true,
  });
}
