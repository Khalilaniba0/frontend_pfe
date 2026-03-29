import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

export async function getAllUsers() {
  return await axios.get(`${API_URL}/user/getAllUsers`, {
    withCredentials: true,
  });
}

export async function getUserById(id) {
  return await axios.get(`${API_URL}/user/getUserById/${id}`, {
    withCredentials: true,
  });
}

export async function createRh(payload) {
  return await axios.post(`${API_URL}/user/createRh`, payload, {
    withCredentials: true,
  });
}

export async function createAdmin(payload) {
  return await axios.post(`${API_URL}/user/createAdmin`, payload, {
    withCredentials: true,
  });
}

export async function updateUser(id, payload) {
  return await axios.put(`${API_URL}/user/updateUser/${id}`, payload, {
    withCredentials: true,
  });
}

export async function deleteUser(id) {
  return await axios.delete(`${API_URL}/user/deleteUser/${id}`, {
    withCredentials: true,
  });
}