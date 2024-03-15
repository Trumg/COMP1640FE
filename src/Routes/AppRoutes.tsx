import React from "react";
import { Route, Routes } from "react-router-dom";

import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import UserPage from "../Pages/UserPage/UserPage";
import ManagerPage from "../Pages/ManagerPage/ManagerPage";
import AdminPage from "../Pages/AdminPage/AdminPage";
import SignupPage from "../Pages/SignupPage/SignupPage";
import ProfilePage from "../Pages/UserPage/ProfilePage";
import SettingPage from "../Pages/UserPage/SettingPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* User Routes */}
      <Route path="/user" element={<UserPage />} />
      <Route path="/user/profile" element={<ProfilePage />} />
      <Route path="/user/settings" element={<SettingPage />} />

      {/* Authorization */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/signup" element={<SignupPage />} />

      {/* Management */}
      <Route path="/dashboard/manager" element={<ManagerPage />} />
      <Route path="/dashboard/admin" element={<AdminPage />} />
    </Routes>
  );
};

export default AppRoutes;
