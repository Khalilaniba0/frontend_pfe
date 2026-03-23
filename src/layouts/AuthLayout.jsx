import React from "react";

import AuthFooter from "components/layout/AuthFooter.jsx";


export default function AuthLayout({ children }) {
  return (
    <div className="h-screen flex flex-col bg-background-light font-display overflow-hidden">
      
      <main className="flex-1 flex items-stretch overflow-hidden min-h-0">
        {children}
      </main>
      <AuthFooter />
    </div>
  );
}
