import React from "react";
import { Route, Routes } from "react-router-dom";

import GuestPage from "../../Pages/GuestPage/GuestPage";
// import NotFoundPage from "../../Pages/NotFoundPage/NotFoundPage";

const GuestRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestPage />} />
      {/* <Route path="/*" element={<NotFoundPage />} /> */}
    </Routes>
  );
};

export default GuestRoutes;
