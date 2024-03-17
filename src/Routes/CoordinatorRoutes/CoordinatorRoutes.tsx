import React from "react";
import { Route, Routes } from "react-router-dom";
import CoordinatorPage from "../../Pages/CoordinatorPage/CoordinatorPage";

const CoordinatorRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/coordinator" element={<CoordinatorPage />} />
    </Routes>
  );
};

export default CoordinatorRoutes;
