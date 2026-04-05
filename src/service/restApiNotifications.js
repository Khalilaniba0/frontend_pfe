import axios from "axios";
import { API_URL } from "config/api";

export async function getNotificationsByCandidat(candidatId) {
  if (!candidatId) {
    return null;
  }

  return await axios.get(
    `${API_URL}/notification/getNotificationsByCandidat/${candidatId}`,
    {
      withCredentials: true,
    }
  );
}

export async function markNotificationAsRead(id) {
  if (!id) {
    return null;
  }

  return await axios.put(
    `${API_URL}/notification/markAsRead/${id}`,
    {},
    {
      withCredentials: true,
    }
  );
}

export async function deleteNotificationById(id) {
  if (!id) {
    return null;
  }

  return await axios.delete(`${API_URL}/notification/deleteNotification/${id}`, {
    withCredentials: true,
  });
}

export async function deleteNotificationByIdAlt(id) {
  if (!id) {
    return null;
  }

  return await axios.delete(`${API_URL}/notification/deleteNotificationById/${id}`, {
    withCredentials: true,
  });
}

export async function deleteNotificationByIdAlt2(id) {
  if (!id) {
    return null;
  }

  return await axios.delete(`${API_URL}/notification/deleteById/${id}`, {
    withCredentials: true,
  });
}

export async function deleteNotificationByIdAlt3(id) {
  if (!id) {
    return null;
  }

  return await axios.delete(`${API_URL}/notification/delete/${id}`, {
    withCredentials: true,
  });
}
