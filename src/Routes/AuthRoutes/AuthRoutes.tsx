import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "../../Pages/LoginPage/LoginPage";
import SignupPage from "../../Pages/SignupPage/SignupPage";

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default AuthRoutes;
