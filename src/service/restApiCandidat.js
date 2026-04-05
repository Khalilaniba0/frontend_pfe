import axios from "axios";
import { API_URL } from "config/api";

export async function inscrireCandidat(payload) {
  return await axios.post(`${API_URL}/candidat/inscrire`, payload, {
    withCredentials: true,
  });
}

export async function connecterCandidat(email, motDePasse) {
  return await axios.post(
    `${API_URL}/candidat/connecter`,
    { email, motDePasse },
    { withCredentials: true }
  );
}

export async function deconnecterCandidat() {
  return await axios.post(
    `${API_URL}/candidat/deconnecter`,
    {},
    { withCredentials: true }
  );
}

export async function getMonProfil() {
  return await axios.get(`${API_URL}/candidat/monProfil`, {
    withCredentials: true,
  });
}

export async function mettreAJourProfil(payload) {
  return await axios.put(`${API_URL}/candidat/mettreAJourProfil`, payload, {
    withCredentials: true,
  });
}
