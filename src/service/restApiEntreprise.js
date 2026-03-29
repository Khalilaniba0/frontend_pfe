import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

export async function getMyEntreprise() {
  return await axios.get(`${API_URL}/entreprise/getMyEntreprise`, {
    withCredentials: true,
  });
}

export async function updateEntreprise(payload) {
  return await axios.put(`${API_URL}/entreprise/updateEntreprise`, payload, {
    withCredentials: true,
  });
}
