import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "../../Pages/LoginPage/LoginPage";
import SignupPage from "../../Pages/SignupPage/SignupPage";
import ForgotPasswordPage from "../../Pages/ForgotPasswordPage/ForgotPasswordPage";

const AuthRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
    </Routes>
  );
};

export default AuthRoute;
