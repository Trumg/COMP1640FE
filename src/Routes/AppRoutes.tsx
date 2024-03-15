import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import UserPage from "../Pages/UserPage/UserPage";
import ManagerPage from "../Pages/ManagerPage/ManagerPage";
import AdminPage from "../Pages/AdminPage/AdminPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/dashboard/manager" element={<ManagerPage />} />
      <Route path="/dashboard/admin" element={<AdminPage />} />
    </Routes>
  );
};

export default AppRoutes;
