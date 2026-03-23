import React from "react";
import AuthFooter from "components/layout/AuthFooter.jsx";

export default function AuthLayout({ children }) {
  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-bg-page font-body">
      <main className="flex min-h-0 flex-1 items-stretch overflow-hidden">
        {children}
      </main>
      <AuthFooter />
    </div>
  );
}
