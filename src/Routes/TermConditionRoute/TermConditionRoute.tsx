import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { User } from "firebase/auth";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
import TermConditionPage from "../../Pages/TermConditionPage/TermConditionPage";

const TermConditionRoute: React.FC = () => {
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
        path="/terms-conditions"
        element={
          <PrivateRoute user={user}>
            <TermConditionPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default TermConditionRoute;
