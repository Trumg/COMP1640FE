import React from "react";
import { Route, Routes } from "react-router-dom";
import AccessDeniedPage from "../../Pages/AccessDeniedPage/AccessDeniedPage";

const AccessDeniedRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/access-denied" element={<AccessDeniedPage />} />
    </Routes>
  );
};

export default AccessDeniedRoute;
