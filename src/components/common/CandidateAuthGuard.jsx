import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCandidateAuth } from "context/CandidateAuthContext";

export default function CandidateAuthGuard() {
  const { isAuthenticated, isLoading } = useCandidateAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-teal-500 border-t-transparent" />
          <p className="text-sm font-medium text-gray-500">Chargement…</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    sessionStorage.setItem("redirectAfterAuth", location.pathname);
    return (
      <Navigate
        to={`/candidat/login?redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return <Outlet />;
}
