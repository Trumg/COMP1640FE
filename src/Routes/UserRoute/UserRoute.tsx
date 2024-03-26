import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { User } from "firebase/auth";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
import UserPage from "../../Pages/UserPage/UserPage";
import UserProfile from "../../Pages/UserPage/UserProfile";

const UserRoute: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);
      } else {
        setUser(null);
      }
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return;
  }

  return (
    <Routes>
      <Route
        path="/user"
        element={
          <PrivateRoute user={user}>
            <UserPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/user/profile"
        element={
          <PrivateRoute user={user}>
            <UserProfile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default UserRoute;
