import axios from "axios";
import { API_ORIGIN, API_URL } from "config/api";

function getAuthConfig() {
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("token")
      : null;

  return {
    withCredentials: true,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  };
}

export async function getMyEntreprise() {
  return await axios.get(
    `${API_URL}/entreprise/getMyEntreprise`,
    getAuthConfig(),
  );
}

export async function updateEntreprise(payload) {
  const config = getAuthConfig();

  if (typeof FormData !== "undefined" && payload instanceof FormData) {
    config.headers = {
      ...config.headers,
      "Content-Type": "multipart/form-data",
    };
  }

  return await axios.put(
    `${API_URL}/entreprise/updateEntreprise`,
    payload,
    config,
  );
}

export function resolveEntrepriseMediaUrl(mediaPath) {
  if (!mediaPath || typeof mediaPath !== "string") return "";
  if (/^https?:\/\//i.test(mediaPath) || mediaPath.startsWith("data:")) {
    return mediaPath;
  }

  if (mediaPath.startsWith("/")) {
    return `${API_ORIGIN}${mediaPath}`;
  }

  return `${API_ORIGIN}/${mediaPath}`;
}
