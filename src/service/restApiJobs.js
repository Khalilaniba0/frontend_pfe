import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  process.env.VITE_API_URL ||
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

export async function getAllOffres() {
  const token = getCandidateJwtToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  const publicEndpoints = [
    "/offre/getAllOffresDisponibles",
    "/offre/getOffresDisponibles",
    "/offre/getAllOffres",
  ];

  let response;

  try {
    // Public listing should work for visitors without forcing credentialed CORS.
    for (let index = 0; index < publicEndpoints.length; index += 1) {
      try {
        response = await axios.get(`${API_URL}${publicEndpoints[index]}`);
        break;
      } catch (publicError) {
        if (index === publicEndpoints.length - 1) {
          throw publicError;
        }
      }
    }
  } catch (error) {
    if (!token) {
      throw error;
    }

    response = await axios.get(`${API_URL}/offre/getAllOffres`, {
      headers,
      withCredentials: true,
    });
  }

  const payload = response?.data;
  const offres = Array.isArray(payload?.data)
    ? payload.data
    : Array.isArray(payload?.offres)
    ? payload.offres
    : Array.isArray(payload)
    ? payload
    : [];

  return {
    ...response,
    data: {
      ...payload,
      data: offres.filter(isOffreDisponible).map(normalizeOffre),
    },
  };
}
