import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  connecterCandidat,
  deconnecterCandidat,
  inscrireCandidat,
  getMonProfil,
} from "service/restApiCandidat";

const CandidateAuthContext = createContext(null);
const CANDIDAT_LOCAL_KEY = "candidat";
const CANDIDAT_TOKEN_KEY = "candidatToken";

function safeRead(storage, key) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function safeWrite(storage, key, value) {
  try {
    storage.setItem(key, value);
  } catch {
    /* no-op */
  }
}

function safeRemove(storage, key) {
  try {
    storage.removeItem(key);
  } catch {
    /* no-op */
  }
}

function extractTokenFromResponse(res) {
  return (
    res?.data?.token ||
    res?.data?.data?.token ||
    res?.data?.accessToken ||
    res?.data?.data?.accessToken ||
    null
  );
}

function setCandidatFromResponse(res, setCandidat) {
  const data = res?.data?.data || res?.data?.candidat || res?.data;
  if (data && typeof data === "object") {
    setCandidat(data);
    safeWrite(window.localStorage, CANDIDAT_LOCAL_KEY, JSON.stringify(data));
  }

  const token = extractTokenFromResponse(res);
  if (token) {
    safeWrite(window.localStorage, CANDIDAT_TOKEN_KEY, token);
  }
}

export function CandidateAuthProvider({ children }) {
  const [candidat, setCandidat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = Boolean(candidat);

  useEffect(function () {
    async function hydrate() {
      try {
        const res = await getMonProfil();
        setCandidatFromResponse(res, setCandidat);
      } catch {
        const storedRaw = safeRead(window.localStorage, CANDIDAT_LOCAL_KEY);
        if (storedRaw) {
          try {
            const parsed = JSON.parse(storedRaw);
            if (parsed && typeof parsed === "object") {
              setCandidat(parsed);
              return;
            }
          } catch {
            safeRemove(window.localStorage, CANDIDAT_LOCAL_KEY);
          }
        }

        setCandidat(null);
      } finally {
        setIsLoading(false);
      }
    }
    hydrate();
  }, []);

  const login = async function (email, motDePasse) {
    const res = await connecterCandidat(email, motDePasse);
    setCandidatFromResponse(res, setCandidat);
    return res;
  };

  const logout = async function () {
    try {
      await deconnecterCandidat();
    } finally {
      setCandidat(null);
      safeRemove(window.localStorage, CANDIDAT_LOCAL_KEY);
      safeRemove(window.localStorage, CANDIDAT_TOKEN_KEY);
    }
  };

  const register = async function (payload) {
    const res = await inscrireCandidat(payload);
    setCandidatFromResponse(res, setCandidat);
    return res;
  };

  const refreshProfile = async function () {
    try {
      const res = await getMonProfil();
      setCandidatFromResponse(res, setCandidat);
    } catch {
      /* silently fail */
    }
  };

  return (
    <CandidateAuthContext.Provider
      value={{
        candidat,
        isAuthenticated,
        isLoading,
        login,
        logout,
        register,
        refreshProfile,
      }}
    >
      {children}
    </CandidateAuthContext.Provider>
  );
}

CandidateAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCandidateAuth() {
  const context = useContext(CandidateAuthContext);
  if (!context) {
    throw new Error(
      "useCandidateAuth must be used within a CandidateAuthProvider"
    );
  }
  return context;
}

export default CandidateAuthContext;
