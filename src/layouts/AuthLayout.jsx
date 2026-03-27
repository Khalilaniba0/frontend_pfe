import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-bg-page font-body">
      <main className="flex min-h-[100dvh] flex-1 items-stretch">
        {children}
      </main>
    </div>
  );
}
