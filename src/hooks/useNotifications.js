import { useCallback, useEffect, useMemo, useState } from "react";

import { useCandidateAuth } from "context/CandidateAuthContext";
import {
  deleteNotificationById,
  getNotificationsByCandidat,
  markNotificationAsRead,
} from "service/restApiNotification";

const POLLING_INTERVAL_MS = 60000;

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
      const data = await getNotificationsByCandidat(candidatId);
      setNotifications(Array.isArray(data) ? data : []);
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
      await deleteNotificationById(id);
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
