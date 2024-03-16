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
      <Route path="/user" element={<UserPage />} />
      <Route path="/user/profile" element={<ProfilePage />} />
      <Route path="/user/settings" element={<SettingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/manager" element={<ManagerPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};

export default AppRoutes;
