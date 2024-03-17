import React from "react";
import { Route, Routes } from "react-router-dom";

import GuestPage from "../../Pages/GuestPage/GuestPage";

const GuestRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestPage />} />
    </Routes>
  );
};

export default GuestRoute;
