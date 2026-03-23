import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Utilisateur hardcodé pour le développement
  // Changer "admin" en "rh" pour tester le rôle RH
  const [user] = useState({
    name: "Jane Doe",
    email: "jane.doe@talentia.com",
    role: "admin", // "rh" | "admin"
  });

  return (
    <AuthContext.Provider value={{ user }}>
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
