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

export async function loginUser(email, password) {
    return await axios.post(`${API_URL}/user/login`, { email, password }, { withCredentials: true });
}

export async function registerEntreprise(payload) {
    return await axios.post(`${API_URL}/entreprise/registerEntreprise`, payload, { withCredentials: true });
}

export async function logoutUser() {
    return await axios.post(`${API_URL}/user/logout`, {}, { withCredentials: true });
}

export async function updatePassword(userId, newPassword) {
    return await axios.put(
        `${API_URL}/user/updateUser/${userId}`,
        { motDePasse: newPassword },
        getAuthConfig()
    );
}