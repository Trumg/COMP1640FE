import React from "react";
import { Route, Routes } from "react-router-dom";

import GuestPage from "../../Pages/GuestPage/GuestPage";
import AccessDeniedPage from "../../Pages/AccessDeniedPage/AccessDeniedPage";
// import NotFoundPage from "../../Pages/NotFoundPage/NotFoundPage";

const GuestRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestPage />} />
      {/* <Route path="/*" element={<NotFoundPage />} /> */}
      <Route path="/access-denied" element={<AccessDeniedPage />} />
    </Routes>
  );
};

export default GuestRoute;
