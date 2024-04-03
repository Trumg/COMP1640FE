import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { User } from "firebase/auth";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
import CoordinatorPage from "../../Pages/CoordinatorPage/CoordinatorPage";

const CoordinatorRoute: React.FC = () => {
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
        path="/coordinator"
        element={
          <PrivateRoute user={user}>
            <CoordinatorPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default CoordinatorRoute;
