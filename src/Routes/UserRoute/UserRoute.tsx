import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { User } from "firebase/auth";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
import UserPostPage from "../../Pages/UserPage/UserPostPage/UserPostPage";
import UserProfilePage from "../../Pages/UserPage/UserProfilePage/UserProfilePage";
import UserSettingPage from "../../Pages/UserPage/UserSettingPage/UserSettingPage";

const UserRoute: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);
        setIsFetching(false);
      } else {
        setUser(null);
        setIsFetching(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Routes>
      {!isFetching && (
        <>
          <Route
            path="/post"
            element={
              <PrivateRoute user={user}>
                <UserPostPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute user={user}>
                <UserProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute user={user}>
                <UserSettingPage />
              </PrivateRoute>
            }
          />
        </>
      )}
    </Routes>
  );
};

export default UserRoute;
