import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function loginUser(email, password) {
    return await axios.post(`${API_URL}/user/login`, { email, password }, { withCredentials: true });
}

export async function registerEntreprise(payload) {
    return await axios.post(`${API_URL}/entreprise/registerEntreprise`, payload, { withCredentials: true });
}

export async function logoutUser() {
    return await axios.post(`${API_URL}/user/logout`, {}, { withCredentials: true });
}