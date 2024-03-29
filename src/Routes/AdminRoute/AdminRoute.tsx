import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { User } from "firebase/auth"; // Import User type from firebase/auth

import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AdminPage from "../../Pages/AdminPage/AdminPage";
import AdminDashboardPage from "../../Pages/AdminPage/AdminDashboard/AdminDashboardPage";

const AdminRoute: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); // Use User type from firebase/auth
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);
        setIsFetching(false);
      } else {
        setUser(null);
        setIsFetching(false); // Fixed typo here
      }
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }

  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <PrivateRoute user={user}>
            <AdminPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute user={user}>
            <AdminDashboardPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AdminRoute;
