import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function readCookie(name) {
  const escapedName = name.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${escapedName}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function getCandidateJwtToken() {
  return readCookie("jwt_candidat");
}

export async function getAllOffres() {
  const token = getCandidateJwtToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  return await axios.get(`${API_URL}/offre/getAllOffres`, {
    headers,
    withCredentials: true,
  });
}
