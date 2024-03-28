import React from "react";
import { Route, Routes } from "react-router-dom";

import LogInPage from "../../Pages/AuthPage/LoginPage/LogInPage";
import SignUpPage from "../../Pages/AuthPage/SignUpPage/SignUpPage";
import ResetPage from "../../Pages/AuthPage/ResetPage/ResetPage";
import VerifyPage from "../../Pages/AuthPage/VerifyPage/VerifyPage";

const AuthRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/reset-password" element={<ResetPage />} />
      <Route path="/verify-email" element={<VerifyPage />} />
    </Routes>
  );
};

export default AuthRoute;
