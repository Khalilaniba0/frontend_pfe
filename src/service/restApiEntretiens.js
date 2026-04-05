import axios from "axios";
import { API_URL } from "config/api";

export async function getAllEntretiens() {
  return await axios.get(`${API_URL}/entretien/getAllEntretiens`, {
    withCredentials: true,
  });
}

export async function createEntretien(payload) {
  return await axios.post(`${API_URL}/entretien/createEntretien`, { ...payload }, {
    withCredentials: true,
  });
}

export function connectGoogleCalendar(redirectPath) {
  const nextPath =
    typeof redirectPath === "string" && redirectPath.length > 0
      ? redirectPath
      : "/dashboard/settings?tab=integrations";

  const params = new URLSearchParams({ redirect: nextPath });
  window.location.href = `${API_URL}/auth/google?${params.toString()}`;
}

export async function deleteEntretien(id) {
  return await axios.delete(`${API_URL}/entretien/deleteEntretienById/${id}`, {
    withCredentials: true,
  });
}

export async function getRecruteurs() {
  return await axios.get(`${API_URL}/user/getAllUsers`, {
    withCredentials: true,
  });
}
