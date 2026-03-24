import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export async function getAllUsers() {
    return await axios.get(`${API_URL}/user/getAllUsers`);
}
export async function deleteUser(id) {
    return await axios.delete(`${API_URL}/user/deleteUser/${id}`);
}