import React from "react";

import AuthLayout from "layouts/AuthLayout.jsx";
import AuthHero from "components/Sections/AuthHero.jsx";
import LoginForm from "components/auth/LoginForm.jsx";

export default function Login() {
  return (
    <AuthLayout>
      <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,_#d8ecff_0,_#eef4f9_42%,_#f4f7fb_100%)] px-4 py-3 font-body md:px-6 md:py-4">
        <div className="mx-auto flex w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-lg md:min-h-[640px]">
          <AuthHero />
          <LoginForm />
        </div>
      </div>
    </AuthLayout>
  );
}
