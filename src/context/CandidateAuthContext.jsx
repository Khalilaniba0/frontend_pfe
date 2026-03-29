import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getCandidateJwtToken } from "service/restApiJobs";
import {
  connecterCandidat,
  deconnecterCandidat,
  inscrireCandidat,
  getMonProfil,
} from "service/restApiCandidat";

const CandidateAuthContext = createContext(null);

function setCandidatFromResponse(res, setCandidat) {
  const data = res?.data?.data || res?.data?.candidat || res?.data;
  if (data && typeof data === "object") {
    setCandidat(data);
  }
}

export function CandidateAuthProvider({ children }) {
  const [candidat, setCandidat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = Boolean(candidat);

  useEffect(function () {
    async function hydrate() {
      try {
        const token = getCandidateJwtToken();
        if (!token) {
          setCandidat(null);
          return;
        }
        const res = await getMonProfil();
        setCandidatFromResponse(res, setCandidat);
      } catch {
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
