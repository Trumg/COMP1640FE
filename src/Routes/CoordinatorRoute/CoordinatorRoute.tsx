import React from "react";
import { Route, Routes } from "react-router-dom";

import CoordinatorPage from "../../Pages/CoordinatorPage/CoordinatorPage";

const CoordinatorRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/coordinator" element={<CoordinatorPage />} />
    </Routes>
  );
};

export default CoordinatorRoute;
