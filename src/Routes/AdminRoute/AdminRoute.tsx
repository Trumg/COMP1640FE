import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminPage from "../../Pages/AdminPage/AdminPage";

const AdminRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
};

export default AdminRoute;
