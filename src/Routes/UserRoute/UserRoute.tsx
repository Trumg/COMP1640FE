import React from "react";
import { Route, Routes } from "react-router-dom";

import UserProfilePage from "../../Pages/UserPage/UserProfilePage/UserProfilePage";
import UserSettingPage from "../../Pages/UserPage/UserSettingPage/UserSettingPage";

const UserRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/profile" element={<UserProfilePage />} />
      <Route path="/settings" element={<UserSettingPage />} />
    </Routes>
  );
};

export default UserRoute;
