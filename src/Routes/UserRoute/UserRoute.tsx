import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
import { User } from "firebase/auth";

import PrivateRoute from "../PrivateRoute/PrivateRoute";
import UserPostPage from "../../Pages/UserPage/UserPostPage/UserPostPage";

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
              <PrivateRoute
                allowedRoles={["Admin", "Manager", "Coordinator"]}
                user={user} // Pass 'user' state directly here
              >
                <UserPostPage />
              </PrivateRoute>
            }
          />
        </>
      )}
    </Routes>
  );
};

export default UserRoute;
