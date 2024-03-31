import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { User } from "firebase/auth";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ManagerPage from "../../Pages/ManagerPage/ManagerPage";
import ManagerDashboardPage from "./ManagerDashboardPage/ManagerDashboardPage";

const ManagerRoute: React.FC = () => {
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
        path="/manager"
        element={
          <PrivateRoute user={user}>
            <ManagerPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/manager/dashboard"
        element={
          <PrivateRoute user={user}>
            <ManagerDashboardPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default ManagerRoute;
