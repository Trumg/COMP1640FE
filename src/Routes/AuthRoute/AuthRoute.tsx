import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "../../Pages/AuthPage/LoginPage/LoginPage";
import SignupPage from "../../Pages/AuthPage/SignupPage/SignupPage";
import ResetPage from "../../Pages/AuthPage/ResetPage/ResetPage";
import VerifyPage from "../../Pages/AuthPage/VerifyPage/VerifyPage";
import LoginEmailPasswordPage from "../../Pages/AuthPage/LoginPage/LoginEmailPasswordPage/LoginEmailPasswordPage";
import LoginPhonePage from "../../Pages/AuthPage/LoginPage/LoginPhonePage/LoginPhonePage";
const AuthRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login-email" element={<LoginEmailPasswordPage />} />
      <Route path="/login-phone" element={<LoginPhonePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/reset-password" element={<ResetPage />} />
      <Route path="/verify-email" element={<VerifyPage />} />
    </Routes>
  );
};

export default AuthRoute;
