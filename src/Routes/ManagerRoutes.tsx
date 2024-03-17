import React from "react";
import { Route, Routes } from "react-router-dom";
import ManagerPage from "../Pages/ManagerPage/ManagerPage";

const ManagerRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/manager" element={<ManagerPage />} />
    </Routes>
  );
};

export default ManagerRoutes;
