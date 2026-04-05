import axios from "axios";
import { API_URL } from "config/api";

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

export async function getAllUsers() {
  return await axios.get(`${API_URL}/user/getAllUsers`, getAuthConfig());
}

export async function getUserById(id) {
  return await axios.get(`${API_URL}/user/getUserById/${id}`, getAuthConfig());
}

export async function createRh(payload) {
  return await axios.post(`${API_URL}/user/createRh`, payload, getAuthConfig());
}

export async function createAdmin(payload) {
  return await axios.post(
    `${API_URL}/user/createAdmin`,
    payload,
    getAuthConfig(),
  );
}

export async function updateUser(id, payload) {
  return await axios.put(
    `${API_URL}/user/updateUser/${id}`,
    payload,
    getAuthConfig(),
  );
}

export async function deleteUser(id) {
  return await axios.delete(`${API_URL}/user/deleteUser/${id}`, getAuthConfig());
}