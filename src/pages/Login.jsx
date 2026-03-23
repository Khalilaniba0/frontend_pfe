import React from "react";

import AuthLayout from "layouts/AuthLayout.jsx";
import AuthHero from "components/Sections/AuthHero.jsx";
import LoginForm from "components/auth/LoginForm.jsx";

export default function Login() {
  return (
    <AuthLayout>
      <AuthHero />
      <LoginForm />
    </AuthLayout>
  );
}
