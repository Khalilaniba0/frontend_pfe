import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ROUTES } from "constants/routes";
import { loginUser, logoutUser } from "service/restApiAuth";
import { getAllUsers } from "service/restApiUser";

const AuthContext = createContext(null);
const SESSION_KEY = "talentia_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    async function checkSession() {
      try {
        const stored = sessionStorage.getItem(SESSION_KEY);

        if (!stored) {
          setUser(null);
          return;
        }

        // Validate session by calling a protected route through the service layer
        await getAllUsers();

        try {
          const parsedUser = JSON.parse(stored);
          if (parsedUser && typeof parsedUser === "object" && parsedUser._id) {
            setUser(parsedUser);
          } else {
            sessionStorage.removeItem(SESSION_KEY);
            setUser(null);
          }
        } catch {
          sessionStorage.removeItem(SESSION_KEY);
          setUser(null);
        }
      } catch {
        sessionStorage.removeItem(SESSION_KEY);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    checkSession();
  }, []);

  const login = async function (email, password) {
    const res = await loginUser(email, password);
    const nextUser = res?.data?.data || res?.data?.user || res?.data;
    if (nextUser && typeof nextUser === "object" && nextUser._id) {
      setUser(nextUser);
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    }
    return res;
  };

  const logout = async function () {
    try {
      await logoutUser();
    } finally {
      sessionStorage.removeItem(SESSION_KEY);
      setUser(null);
      window.location.assign(ROUTES.LOGIN);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;
