import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

import { AuthProvider } from "context/AuthContext";
import { CandidateAuthProvider } from "context/CandidateAuthContext";
import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <CandidateAuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CandidateAuthProvider>
  </AuthProvider>
);
