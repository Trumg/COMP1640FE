import React from "react";
import { Route, Routes } from "react-router-dom";

import UserPage from "../Pages/UserPage/UserPage";

const UserRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/user" element={<UserPage />} />
    </Routes>
  );
};

export default UserRoutes;
