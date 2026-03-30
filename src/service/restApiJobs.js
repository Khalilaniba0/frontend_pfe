import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

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

function isOffreDisponible(offre) {
  const rawStatus = String(offre?.statut || offre?.status || "")
    .trim()
    .toLowerCase();

  if (!rawStatus) {
    return true;
  }

  return ["open", "ouverte", "ouvert", "actif", "active", "en cours"].includes(rawStatus);
}

function normalizeOffre(offre) {
  return {
    ...offre,
    // Some backend payloads use "post" while candidate cards expect "poste".
    poste: offre?.poste || offre?.post || "",
  };
}

function extractOffresOrThrow(payload) {
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.offres)) return payload.offres;
  if (Array.isArray(payload)) return payload;
  throw new Error("Format de reponse invalide pour /offre/getOffresDisponibles");
}

export async function getAllOffres() {
  const response = await axios.get(`${API_URL}/offre/getOffresDisponibles`, {
    withCredentials: true,
  });

  const payload = response?.data;
  const offres = extractOffresOrThrow(payload);

  return {
    ...response,
    data: {
      ...payload,
      data: offres.filter(isOffreDisponible).map(normalizeOffre),
    },
  };
}
