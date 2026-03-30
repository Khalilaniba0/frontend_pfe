import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:5000";

function normalizeNotificationsResponse(response) {
  const payload = response?.data;

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.notifications)) {
    return payload.notifications;
  }

  if (Array.isArray(payload)) {
    return payload;
  }

  return [];
}

export async function getNotificationsByCandidat(candidatId) {
  if (!candidatId) {
    return [];
  }

  const response = await axios.get(
    `${API_URL}/notification/getNotificationsByCandidat/${candidatId}`,
    {
      withCredentials: true,
    }
  );

  return normalizeNotificationsResponse(response);
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

async function deleteWithFallback(pathCandidates) {
  let lastError = null;

  for (const path of pathCandidates) {
    try {
      return await axios.delete(`${API_URL}${path}`, {
        withCredentials: true,
      });
    } catch (error) {
      const status = error?.response?.status;
      if (status === 404 || status === 405) {
        lastError = error;
        continue;
      }
      throw error;
    }
  }

  if (lastError) {
    throw lastError;
  }

  return null;
}

export async function deleteNotificationById(id) {
  if (!id) {
    return null;
  }

  return await deleteWithFallback([
    `/notification/deleteNotification/${id}`,
    `/notification/deleteNotificationById/${id}`,
    `/notification/deleteById/${id}`,
    `/notification/delete/${id}`,
  ]);
}
