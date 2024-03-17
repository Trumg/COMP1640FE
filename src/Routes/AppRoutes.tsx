import React from "react";
import { Route, Routes } from "react-router-dom";
import GuestPage from "../Pages/GuestPage/GuestPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SignupPage from "../Pages/SignupPage/SignupPage";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/404" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PublicRoutes;
