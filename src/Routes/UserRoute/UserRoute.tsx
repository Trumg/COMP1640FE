import React from "react";
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
import { useGetInfoUser } from "../../Hooks/useToken";
import UserProfilePage from "../../Pages/UserPage/UserProfilePage/UserProfilePage";
import UserSettingPage from "../../Pages/UserPage/UserSettingPage/UserSettingPage";
import UserPostPage from "../../Pages/UserPage/UserPostPage/UserPostPage";

const UserRoute: React.FC = () => {
  const userInfo = useGetInfoUser();

  return (
    <Routes>
      <Route
        path="/post"
        element={
          <PrivateRoute user={userInfo}>
            <UserPostPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute user={userInfo}>
            <UserProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
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
