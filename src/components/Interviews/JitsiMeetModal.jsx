// src/components/Interviews/JitsiMeetModal.jsx
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

/**
 * Modal plein écran pour les entretiens vidéo via Jitsi Meet.
 * Charge dynamiquement l'API Jitsi et intègre l'iframe dans l'application.
 */
export default function JitsiMeetModal({ roomUrl, candidatName, onClose }) {
  const jitsiContainerRef = useRef(null);
  const apiRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Extraire le nom de la salle depuis l'URL
    const extractRoomName = (url) => {
      try {
        const urlObj = new URL(url);
        // Supprimer le slash initial du pathname
        return urlObj.pathname.replace(/^\//, "");
      } catch {
        // Si l'URL est invalide, utiliser directement la valeur
        return url.replace("https://meet.jit.si/", "");
      }
    };

    const roomName = extractRoomName(roomUrl);
    const JITSI_SCRIPT_ID = "jitsi-external-api";
    const JITSI_SCRIPT_SRC = "https://meet.jit.si/external_api.js";

    // Charger le script Jitsi dynamiquement
    const loadJitsiScript = () => {
      return new Promise((resolve, reject) => {
        // Vérifier si le script est déjà chargé
        if (window.JitsiMeetExternalAPI) {
          resolve();
          return;
        }

        const existingScript = document.getElementById(JITSI_SCRIPT_ID);
        if (existingScript) {
          existingScript.addEventListener("load", resolve);
          existingScript.addEventListener("error", reject);
          return;
        }

        const script = document.createElement("script");
        script.id = JITSI_SCRIPT_ID;
        script.src = JITSI_SCRIPT_SRC;
        script.async = true;
        script.onload = resolve;
        script.onerror = () => reject(new Error("Impossible de charger Jitsi Meet"));
        document.body.appendChild(script);
      });
    };

    // Initialiser l'API Jitsi
    const initJitsi = async () => {
      try {
        await loadJitsiScript();

        if (!jitsiContainerRef.current || !window.JitsiMeetExternalAPI) {
          return;
        }

        const api = new window.JitsiMeetExternalAPI("meet.jit.si", {
          roomName: roomName,
          parentNode: jitsiContainerRef.current,
          width: "100%",
          height: "100%",
          configOverwrite: {
            startWithAudioMuted: false,
            startWithVideoMuted: false,
            disableDeepLinking: true,
          },
          interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: [
              "microphone",
              "camera",
              "chat",
              "raisehand",
              "tileview",
              "hangup",
            ],
            SHOW_JITSI_WATERMARK: false,
          },
          userInfo: {
            displayName: "Recruteur — Talentia",
          },
        });

        apiRef.current = api;

        // Écouter l'événement de fermeture
        api.addEventListener("readyToClose", () => {
          onClose();
        });

        // Masquer le loader une fois prêt
        api.addEventListener("videoConferenceJoined", () => {
          setIsLoading(false);
        });

        // Fallback pour masquer le loader après un délai
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);
      } catch (err) {
        setError(err.message || "Une erreur est survenue");
        setIsLoading(false);
      }
    };

    initJitsi();

    // Nettoyage au démontage
    return () => {
      if (apiRef.current) {
        apiRef.current.dispose();
        apiRef.current = null;
      }
    };
  }, [roomUrl, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: "rgba(15, 23, 42, 0.95)" }}
    >
      {/* ── Header ── */}
      <div
        className="flex items-center justify-between px-6 py-4 flex-shrink-0"
        style={{ backgroundColor: "#0f172a" }}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-xl text-primary">
              videocam
            </span>
          </div>
          <div>
            <h2 className="font-display font-semibold text-white text-base leading-tight">
              {candidatName}
            </h2>
            <p className="text-sm text-gray-400 font-body">
              Entretien en cours
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 font-display font-medium text-sm text-white transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
          Quitter l'entretien
        </button>
      </div>

      {/* ── Zone vidéo ── */}
      <div className="flex-1 relative">
        {/* Loader */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
            <span className="material-symbols-outlined text-5xl text-primary animate-spin mb-4">
              progress_activity
            </span>
            <p className="text-white font-display font-medium">
              Connexion à la salle...
            </p>
            <p className="text-gray-400 text-sm font-body mt-1">
              Préparation de votre entretien vidéo
            </p>
          </div>
        )}

        {/* Erreur */}
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
            <span className="material-symbols-outlined text-5xl text-red-400 mb-4">
              error
            </span>
            <p className="text-white font-display font-medium mb-2">
              Erreur de connexion
            </p>
            <p className="text-gray-400 text-sm font-body mb-4">{error}</p>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-body text-sm transition-colors"
            >
              Fermer
            </button>
          </div>
        )}

        {/* Conteneur Jitsi */}
        <div
          ref={jitsiContainerRef}
          className="w-full h-full"
          style={{ display: error ? "none" : "block" }}
        />
      </div>
    </div>
  );
}

JitsiMeetModal.propTypes = {
  roomUrl: PropTypes.string.isRequired,
  candidatName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
