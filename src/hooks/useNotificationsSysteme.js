import { useCallback, useEffect, useMemo, useState } from "react";

import { useCandidateAuth } from "context/ContexteAuthCandidat";
import {
  deleteNotificationByIdAlt,
  deleteNotificationByIdAlt2,
  deleteNotificationByIdAlt3,
  deleteNotificationById,
  getNotificationsByCandidat,
  markNotificationAsRead,
} from "service/restApiNotifications";

const POLLING_INTERVAL_MS = 60000;

function extractArray(response) {
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

function getCandidateId(candidat) {
  return candidat?._id || candidat?.id || null;
}

export default function useNotifications(options = {}) {
  const enabled = options.enabled !== false;
  const polling = options.polling !== false;
  const { candidat } = useCandidateAuth();
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const candidatId = getCandidateId(candidat);

  const fetchNotifications = useCallback(async function () {
    if (!enabled || !candidatId) {
      if (!candidatId) {
        setNotifications([]);
      }
      setIsLoading(false);
      setError("");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await getNotificationsByCandidat(candidatId);
      setNotifications(extractArray(response));
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Impossible de charger les notifications."
      );
    } finally {
      setIsLoading(false);
    }
  }, [candidatId, enabled]);

  useEffect(
    function () {
      if (!enabled) {
        return undefined;
      }

      fetchNotifications();

      if (!candidatId || !polling) {
        return undefined;
      }

      const intervalId = window.setInterval(function () {
        fetchNotifications();
      }, POLLING_INTERVAL_MS);

      return function () {
        window.clearInterval(intervalId);
      };
    },
    [fetchNotifications, candidatId, enabled, polling]
  );

  const markAsRead = useCallback(async function (id) {
    if (!id) {
      return;
    }

    setNotifications(function (previousNotifications) {
      return previousNotifications.map(function (notification) {
        const notificationId = notification?._id || notification?.id;
        if (notificationId !== id) {
          return notification;
        }

        return { ...notification, statut: "lue" };
      });
    });

    try {
      await markNotificationAsRead(id);
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Impossible de marquer la notification comme lue."
      );
      fetchNotifications();
    }
  }, [fetchNotifications]);

  const unreadCount = useMemo(
    function () {
      return notifications.filter(function (notification) {
        return notification?.statut !== "lue";
      }).length;
    },
    [notifications]
  );

  const deleteOne = useCallback(async function (id) {
    if (!id) {
      return;
    }

    const previousNotifications = notifications;

    setNotifications(function (currentNotifications) {
      return currentNotifications.filter(function (notification) {
        const notificationId = notification?._id || notification?.id;
        return notificationId !== id;
      });
    });

    try {
      const deleters = [
        deleteNotificationById,
        deleteNotificationByIdAlt,
        deleteNotificationByIdAlt2,
        deleteNotificationByIdAlt3,
      ];

      let lastError = null;
      for (let index = 0; index < deleters.length; index += 1) {
        try {
          await deleters[index](id);
          lastError = null;
          break;
        } catch (deleteError) {
          const status = deleteError?.response?.status;
          if (status === 404 || status === 405) {
            lastError = deleteError;
            continue;
          }
          throw deleteError;
        }
      }

      if (lastError) {
        throw lastError;
      }
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          "Impossible de supprimer cette notification."
      );
      setNotifications(previousNotifications);
    }
  }, [notifications]);

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    refetch: fetchNotifications,
    markAsRead,
    deleteOne,
  };
}
