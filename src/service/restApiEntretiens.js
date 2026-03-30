import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

function extractArrayOrThrow(res, endpoint) {
  const payload = res?.data;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload)) return payload;
  throw new Error(`Format de reponse invalide pour ${endpoint}`);
}

export async function getAllEntretiens() {
  const res = await axios.get(`${API_URL}/entretien/getAllEntretiens`, {
    withCredentials: true,
  });
  return extractArrayOrThrow(res, "/entretien/getAllEntretiens");
}

export async function getEntretienById(id) {
  return await axios.get(`${API_URL}/entretien/getEntretienById/${id}`, {
    withCredentials: true,
  });
}

export async function createEntretien(payload) {
  return await axios.post(`${API_URL}/entretien/createEntretien`, payload, {
    withCredentials: true,
  });
}

export async function updateEntretien(id, payload) {
  return await axios.put(
    `${API_URL}/entretien/updateEntretien/${id}`,
    payload,
    { withCredentials: true }
  );
}

export async function deleteEntretien(id) {
  return await axios.delete(`${API_URL}/entretien/deleteEntretienById/${id}`, {
    withCredentials: true,
  });
}

export async function getCandidaturesDisponibles() {
  const res = await axios.get(`${API_URL}/candidature/getAllCandidatures`, {
    withCredentials: true,
  });
  const all = extractArrayOrThrow(res, "/candidature/getAllCandidatures");
  return all.filter(function (c) {
    return c.etape === "preselectionne" || c.etape === "entretien_planifie";
  });
}

export async function getRecruteurs() {
  const res = await axios.get(`${API_URL}/user/getAllUsers`, {
    withCredentials: true,
  });
  const all = extractArrayOrThrow(res, "/user/getAllUsers");
  return all.filter(function (u) {
    return u.role === "rh" || u.role === "admin";
  });
}
