import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "../../Pages/AuthPage/LoginPage/LoginPage";
import SignupPage from "../../Pages/AuthPage/SignupPage/SignupPage";
import SignupEmailPasswordPage from "../../Pages/AuthPage/SignupPage/SignupEmailPasswordPage/SignupEmailPasswordPage";
import ResetPage from "../../Pages/AuthPage/ResetPage/ResetPage";
import LoginEmailPasswordPage from "../../Pages/AuthPage/LoginPage/LoginEmailPasswordPage/LoginEmailPasswordPage";

const AuthRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login-email" element={<LoginEmailPasswordPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signup-email" element={<SignupEmailPasswordPage />} />
      <Route path="/reset-password" element={<ResetPage />} />
    </Routes>
  );
};

export default AuthRoute;
