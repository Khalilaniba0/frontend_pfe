import axios from "axios";
import { API_URL } from "config/api";

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
  return await axios.get(`${API_URL}/offre/getOffresDisponibles`, {
    withCredentials: true,
  });
}
