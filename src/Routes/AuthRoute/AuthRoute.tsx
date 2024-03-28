import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "../../Pages/AuthPage/LoginPage/LoginPage";
import SignupPage from "../../Pages/AuthPage/SignupPage/SignupPage";
import ResetPage from "../../Pages/AuthPage/ResetPage/ResetPage";
import VerifyPage from "../../Pages/AuthPage/VerifyPage/VerifyPage";
import EmailPasswordPage from "../../Pages/AuthPage/LoginPage/EmailPasswordPage/EmailPasswordPage";

const AuthRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login-email" element={<EmailPasswordPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/reset" element={<ResetPage />} />
      <Route path="/verify" element={<VerifyPage />} />
    </Routes>
  );
};

export default AuthRoute;
