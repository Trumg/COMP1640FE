import React from "react";
import { Route, Routes } from "react-router-dom";

import UserProfilePage from "../../Pages/UserPage/UserProfilePage/UserProfilePage";
import UserSettingPage from "../../Pages/UserPage/UserSettingPage/UserSettingPage";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import { useGetInfoUser } from "../../Hooks/useToken";

const UserRoute: React.FC = () => {
  const userInfo = useGetInfoUser();

  return (
    <Routes>
      <Route
        path="/user/profile"
        element={
          <PrivateRoute user={userInfo}>
            <UserProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/settings"
        element={
          <PrivateRoute user={userInfo}>
            <UserSettingPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default UserRoute;
