import React from "react";
import { Route, Routes } from "react-router-dom";
import UserPage from "../Pages/UserPage/UserPage";
import ProfilePage from "../Pages/UserPage/ProfilePage";
import SettingPage from "../Pages/UserPage/SettingPage";

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/user" element={<UserPage />} />
      <Route path="/user/profile" element={<ProfilePage />} />
      <Route path="/user/settings" element={<SettingPage />} />
    </Routes>
  );
};

export default UserRoutes;
