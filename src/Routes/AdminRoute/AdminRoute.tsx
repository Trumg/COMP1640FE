import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { User } from "firebase/auth";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
import AdminPage from "../../Pages/AdminPage/AdminPage";

const AdminRoute: React.FC = () => {
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
            path="/admin"
            element={
              <PrivateRoute user={user}>
                <AdminPage />
              </PrivateRoute>
            }
          />
        </>
      )}
    </Routes>
  );
};

export default AdminRoute;
