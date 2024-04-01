import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboardPage from "../../Pages/AdminPage/AdminDashboardPage/AdminDashboardPage";
import AdminPage from "../../Pages/AdminPage/AdminPage";

const AdminRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
    </Routes>
  );
};

export default AdminRoute;
