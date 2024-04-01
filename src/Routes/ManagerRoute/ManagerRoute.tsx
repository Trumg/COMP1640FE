import React from "react";
import { Route, Routes } from "react-router-dom";

import ManagerPage from "../../Pages/ManagerPage/ManagerPage";
import ManagerDashboardPage from "./ManagerDashboardPage/ManagerDashboardPage";

const ManagerRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/manager" element={<ManagerPage />} />
      <Route path="/manager/dashboard" element={<ManagerDashboardPage />} />
    </Routes>
  );
};

export default ManagerRoute;
